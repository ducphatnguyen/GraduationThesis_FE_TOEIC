<template>
    <div class="page">
        <SignInForm @submit:signin="submitSignIn" />
    </div>
</template>
  
<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import userService from "@/services/user.service";
import SignInForm from "@/components/SignInForm.vue";
import { useLearnerStore } from "@/stores/useLearnerStore";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
    components: {
        SignInForm,
    },
    setup() {
        const store = useLearnerStore();
        const router = useRouter();

        const checkRefreshTokenValidity = () => {
            const refreshToken = localStorage.getItem("learnerRefreshToken");
            const refreshTokenExpireTime = Number(localStorage.getItem("learnerRefreshTokenExpirationTime"));
            const currentTime = Date.now();

            if (refreshToken && refreshTokenExpireTime && refreshTokenExpireTime < currentTime) {
                // Refresh Token đã hết hạn, gọi hàm đăng xuất để xóa các token cũ
                console.log("Refresh Token đã hết hạn. Đăng xuất người học.");
                userService.signOut();
                console.log(1)
                localStorage.removeItem("learnerToken");
                localStorage.removeItem("learnerRefreshToken");
                localStorage.removeItem("learnerAccessTokenExpirationTime");
                localStorage.removeItem("learnerRefreshTokenExpirationTime");
                store.setIsAuthenticatedLearner(false);
                router.push({ name: "learner.signin" });
                return false; // Không thực hiện đăng nhập mới
            }
            return true; // Refresh Token còn hạn, thực hiện đăng nhập mới
        };

        const submitSignIn = async (data) => {
            try {
                // Kiểm tra tính hợp lệ của Refresh Token nếu nó tồn tại trong localStorage trước khi thực hiện đăng nhập mới
                if (!checkRefreshTokenValidity()) {
                    return;
                }
                console.log(1)
                const response = await userService.signIn(data);
                const token = response.token;
                const roles = response.roles;
                const refreshToken = response.refreshToken;
                const jwtExpirationTime = response.jwtExpirationTime; // Lấy thời gian hết hạn của access token từ response
                console.log(jwtExpirationTime)

                const refreshTokenExpirationTime = response.refreshTokenExpirationTime; // Lấy thời gian hết hạn của refresh token từ response
                store.setIsAuthenticatedLearner(true);

                userService.saveToken(token, refreshToken, jwtExpirationTime, refreshTokenExpirationTime);
                if (roles.includes("ROLE_LEARNER")) {
                    console.log("Xin chào Learner");
                    router.push({ name: "home" }); // Điều hướng đến trang home
                }
            } catch (error) {
                console.log(error);
                const jsonResponse = JSON.parse(error.request.response);
                toast.error(jsonResponse.message, {
                    autoClose: 2000,
                    position: 'top-center',
                });
            }
        };
        return {
            store,
            submitSignIn,

        };
    },
});
</script>
  