<template></template>
<script>
import { defineComponent, onMounted, onBeforeUnmount } from "vue";

import userService from "@/services/user.service";
import { useRouter } from "vue-router";
import { useAdminStore } from '@/stores/useAdminStore';

export default defineComponent({
    setup() {
        const adminStore = useAdminStore();
        const router = useRouter();
        let tokenRefreshInterval;

        // Function to schedule the refreshToken check
        const scheduleRefreshToken = async () => {
            const refreshTokenExpireTime = Number(localStorage.getItem("adminRefreshTokenExpirationTime"));
            const timeUntilRefreshTokenExpiry = refreshTokenExpireTime - Date.now();

            if (timeUntilRefreshTokenExpiry > 0) {
                setTimeout(async () => {
                    // Gọi checkTokenValidity để kiểm tra refreshToken và refresh token
                    const isValid = await userService.checkTokensValidity();
                    if (!isValid) {
                        console.log("Refresh token has expired. User needs to sign in again.");
                        localStorage.removeItem("adminToken");
                        localStorage.removeItem("adminRefreshToken");
                        localStorage.removeItem("adminAccessTokenExpirationTime");
                        localStorage.removeItem("adminRefreshTokenExpirationTime");
                        adminStore.setIsAuthenticatedAdmin(false);
                        router.push({ name: "admin.signin" });
                    } else {
                        // Lên lịch kiểm tra tiếp theo
                        scheduleRefreshToken();
                    }
                }, timeUntilRefreshTokenExpiry);
            } else {
                console.log("Refresh token has expired. User needs to sign in again.");
            }
        };

        onMounted(async () => {
            // Get the jwtExpirationTime from localStorage
            const jwtExpirationTime = Number(localStorage.getItem("adminAccessTokenExpirationTime"));
            const now = Date.now();
            const timeUntilTokenExpiry = jwtExpirationTime - now;
            if (timeUntilTokenExpiry <= 0) {
                // Token has already expired, so perform the necessary actions
                await userService.checkTokensValidity();
                return;
            }
            // Set the token refresh interval
            tokenRefreshInterval = setInterval(() => {
                userService.checkTokensValidity();
            }, timeUntilTokenExpiry);

            // Schedule the refreshToken check
            scheduleRefreshToken();
        });
        onBeforeUnmount(() => {
            // Clear the interval when the component is unmounted to prevent memory leaks
            clearInterval(tokenRefreshInterval);
        });

        return {};
    },
});
</script>
