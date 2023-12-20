<template>
    <!-- Thử nghiệm Oauth2 -->
    <div>
        <button class="btn btn-primary" @click="login"><i class="fa-brands fa-google"></i> Đăng nhập bằng Google</button>
        <div v-if="email">Email: {{ email }}</div>
        <div v-if="name">Tên: {{ name }}</div>
        <div v-if="picture">
            <img :src="picture" alt="Hình ảnh cá nhân" />
        </div>
    </div>


</template>
  
<script setup>
import { googleTokenLogin } from "vue3-google-login";
import { ref } from 'vue';
import axios from 'axios';
const email = ref(null);
const name = ref(null);
const picture = ref(null);
const login = async () => {
    try {
        const response = await googleTokenLogin();
        if (response && response.access_token) {
            const accessToken = response.access_token;

            // Cài đặt scope để yêu cầu quyền truy cập vào thông tin name và picture
            const scope = 'email profile https://www.googleapis.com/auth/userinfo.profile';

            const emailResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            // Thêm yêu cầu API để lấy thông tin name và picture
            const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (emailResponse.data) {
                email.value = emailResponse.data.email;
            }
            if (profileResponse.data) {
                name.value = profileResponse.data.name;
                picture.value = profileResponse.data.picture;
            }
        }
    } catch (error) {
        console.error('Lỗi khi đăng nhập bằng Google:', error);
    }
}
</script>
<style scoped></style>
  