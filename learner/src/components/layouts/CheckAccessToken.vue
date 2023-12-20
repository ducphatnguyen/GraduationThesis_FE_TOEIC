<template></template>
<script>
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import userService from "@/services/user.service";
import { useLearnerStore } from '@/stores/useLearnerStore';

export default defineComponent({
    setup() {
        const learnerStore = useLearnerStore();
        const router = useRouter();
        let tokenRefreshInterval;
        // Function to schedule the refreshToken check
        const scheduleRefreshToken = async () => {
            const refreshTokenExpireTime = Number(localStorage.getItem("learnerRefreshTokenExpirationTime"));
            const timeUntilRefreshTokenExpiry = refreshTokenExpireTime - Date.now();
            if (timeUntilRefreshTokenExpiry > 0) {
                setTimeout(async () => {
                    // Gọi checkTokenValidity để kiểm tra refreshToken và refresh token
                    const isValid = await userService.checkTokensValidity();
                    if (!isValid) {
                        console.log("Refresh token has expired. User needs to sign in again.");
                        localStorage.removeItem("learnerToken");
                        localStorage.removeItem("learnerRefreshToken");
                        localStorage.removeItem("learnerAccessTokenExpirationTime");
                        localStorage.removeItem("learnerRefreshTokenExpirationTime");
                        learnerStore.setIsAuthenticatedLearner(false);
                        router.push({ name: "signin" });
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
            const jwtExpirationTime = Number(localStorage.getItem("learnerAccessTokenExpirationTime"));
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
