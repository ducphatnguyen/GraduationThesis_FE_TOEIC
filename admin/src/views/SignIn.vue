<template>
  <div class="page">
    <SignInForm @submit:signin="submitSignIn" />
    <p class="text-center text-danger">{{ message }}</p>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import SignInForm from "@/components/SignInForm.vue";
import { defineComponent, ref } from "vue";

import { useAdminStore } from "@/stores/useAdminStore";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    SignInForm,
  },
  setup() {
    const store = useAdminStore();
    const router = useRouter();
    const message = ref("");

    const checkRefreshTokenValidity = () => {
      const refreshToken = localStorage.getItem("adminRefreshToken");
      const refreshTokenExpireTime = Number(localStorage.getItem("adminRefreshTokenExpirationTime"));
      const currentTime = Date.now();
      if (refreshToken && refreshTokenExpireTime && refreshTokenExpireTime < currentTime) {
        // Refresh Token đã hết hạn, gọi hàm đăng xuất để xóa các token cũ
        console.log("Refresh Token đã hết hạn. Đăng xuất người dùng.");
        userService.signOut();
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRefreshToken");
        localStorage.removeItem("adminAccessTokenExpirationTime");
        localStorage.removeItem("adminRefreshTokenExpirationTime");
        store.setIsAuthenticatedAdmin(false);
        router.push({ name: "admin.signin" });
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

        const response = await userService.signIn(data);
        const token = response.token;
        const roles = response.roles;
        const refreshToken = response.refreshToken;
        const jwtExpirationTime = response.jwtExpirationTime; // Lấy thời gian hết hạn của access token từ response
        const refreshTokenExpirationTime = response.refreshTokenExpirationTime; // Lấy thời gian hết hạn của refresh token từ response

        store.setIsAuthenticatedAdmin(true);
        // Lưu Refresh Token, jwtExpirationTime và refreshTokenExpirationTime vào Local Storage
        userService.saveToken(token, refreshToken, jwtExpirationTime, refreshTokenExpirationTime);

        if (roles.includes("ROLE_ADMIN")) {
          console.log("Xin chào Admin");
          router.push({ name: "admin.dashboard.show" });
        }
      } catch (error) {
        console.log(error);
        message.value = "Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.";
      }
    };

    return {
      store,
      message,
      submitSignIn,
    };
  },
});
</script>
