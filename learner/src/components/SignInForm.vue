<template>
    <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
        <Form @submit="submitSignIn" :validation-schema="signInFormSchema">
            <section class="body">
                <div class="container">
                    <div class="login-box">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="logo"><span class="logo-font"></span>TOEIC</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <br />
                                <h3 class="header-title">ĐĂNG NHẬP</h3>
                                <div class="login-form">

                                    <div class="form-group">
                                        <Field name="username" type="text" class="form-control"
                                            v-model="signInLocal.username" placeholder="UserName" />
                                        <ErrorMessage name="username" class="error-feedback" />
                                    </div>
                                    <div class="form-group">
                                        <Field name="password" type="password" class="form-control"
                                            v-model="signInLocal.password" placeholder="Password" />
                                        <ErrorMessage name="password" class="error-feedback" />
                                    </div>

                                    <div class="form-group text-center">
                                        <button class="btn btn-primary">Đăng nhập</button>
                                    </div>

                                    <div class="d-flex justify-content-center">
                                        <button type="button" class="btn btn-danger text-white" @click="signInWithGoogle"><i
                                                class="fa-brands fa-google"></i>
                                            Đăng nhập bằng Google</button>
                                        <div v-if="email">Email: {{ email }}</div>
                                        <div v-if="name">Tên: {{ name }}</div>
                                        <div v-if="image">
                                            <img :src="image" alt="Hình ảnh cá nhân" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="text-center">
                                            Thành viên mới?
                                            <router-link :to="{ name: 'signup' }" class="text-decoration-none">
                                                Đăng ký ngay
                                            </router-link>
                                        </div>
                                        <div class="text-center mt-2">
                                            <router-link :to="{}" class="text-decoration-none">
                                                Đổi mật khẩu
                                            </router-link>
                                        </div>
                                        <div class="text-center mt-2">
                                            Hoặc
                                            <router-link :to="{ name: 'home' }" class="text-decoration-none">
                                                Trở về trang chủ
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 hide-on-mobile">
                                <div id="demo" class="carousel slide" data-ride="carousel">
                                    <!-- Indicators -->
                                    <ul class="carousel-indicators">
                                        <li data-bs-target="#demo" data-bs-slide-to="0" class="active"></li>
                                        <li data-bs-target="#demo" data-bs-slide-to="1"></li>
                                    </ul>
                                    <!-- The slideshow -->
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <div class="slider-feature-card">
                                                <img src="https://efc.edu.vn/wp-content/uploads/2016/11/toeic-la-gi-1.jpg"
                                                    alt="" loading="lazy" />
                                                <h3 class="slider-title">Toeic</h3>
                                                <p class="slider-description">
                                                    Học Toeic để nâng cao cơ hội việc làm
                                                </p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <div class="slider-feature-card">
                                                <img src="https://iigacademy.edu.vn/wp-content/uploads/2021/10/Banner-002-1024x576.jpg"
                                                    alt="" loading="lazy" />
                                                <h3 class="slider-title">Toeic</h3>
                                                <p class="slider-description">
                                                    Học Toeic để phát triển bản thân nhiều hơn
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Left and right controls -->
                                    <a class="carousel-control-prev" href="#demo" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon"></span>
                                    </a>
                                    <a class="carousel-control-next" href="#demo" data-bs-slide="next">
                                        <span class="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Form>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";

import userService from "@/services/user.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { googleTokenLogin } from "vue3-google-login";
import axios from 'axios';

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props, context) {
        const signInLocal = reactive({
            username: "",
            password: "",
        });
        const signInFormSchema = yup.object().shape({
            username: yup.string().required("Username không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
        });

        const submitSignIn = () => {
            context.emit("submit:signin", signInLocal);
        };

        // Bỏ
        const email = ref(null);
        const name = ref(null);
        const image = ref(null);
        // Giả sử có một hàm để đăng ký người dùng mới
        async function registerUserWithGoogle(email, name, password, image) {
            console.log(email)
            // Tạo tài khoản mới với thông tin từ Google
            const newUser = {
                email: email,
                name: name,
                password: password,
                image: image
            };
            console.log(newUser)
            // Lưu tài khoản mới vào cơ sở dữ liệu
            const user = await userService.signUp(newUser);
            console.log(user)
            // Đăng nhập người dùng mới
            const loginData = {
                username: newUser.email,
                password: newUser.password,
            };
            await userService.signIn(loginData);
        }

        // Đăng nhập bằng Google
        const signInWithGoogle = async (data) => {
            try {
                const response = await googleTokenLogin();
                if (response && response.access_token) {
                    const accessToken = response.access_token;
                    const emailResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (emailResponse.data) {
                        const email = emailResponse.data.email;
                        const name = profileResponse.data.name;
                        const image = profileResponse.data.picture;
                        console.log(image)
                        // Kiểm tra xem người dùng có tồn tại trong hệ thống không
                        const userExists = await userService.checkEmailExists(email);
                        console.log(userExists)
                        if (userExists.data === false) {
                            console.log(1)
                            // Nếu người dùng chưa tồn tại, đăng ký người dùng mới
                            await registerUserWithGoogle(email, name, generateRandomPassword(), image);
                        } else {
                            // Đăng nhập người dùng mới
                            signInLocal.username = email
                            signInLocal.password = generateRandomPassword()
                            // Nếu người dùng đã tồn tại, thực hiện đăng nhập
                            await submitSignIn();
                        }
                    }
                }
            } catch (error) {
                console.error('Lỗi khi đăng nhập bằng Google:', error);
            }
        }
        // Hàm tạo mật khẩu ngẫu nhiên
        function generateRandomPassword() {
            return 'randomPassword123';
        }

        return {
            signInLocal,
            signInFormSchema,
            submitSignIn,
            email,
            name,
            image,
            signInWithGoogle
        };
    },
});
</script>
  
<style scoped>
body {
    background: #f5f5f5;
}

@media only screen and (max-width: 767px) {
    .hide-on-mobile {
        display: none;
    }
}

.login-box {
    background: url(https://i.imgur.com/73BxBuI.png);
    background-size: cover;
    background-position: center;
    padding: 50px;
    margin: 50px auto;
    min-height: 700px;
    -webkit-box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 60px -5px rgba(0, 0, 0, 0.1);
}

.logo {
    font-family: "Script MT";
    font-size: 54px;
    text-align: center;
    color: #888888;
    margin-bottom: 50px;
}

.logo .logo-font {
    color: #3bc3ff;
}

@media only screen and (max-width: 767px) {
    .logo {
        font-size: 34px;
    }
}

.header-title {
    text-align: center;
    margin-bottom: 50px;
}

.login-form {
    max-width: 300px;
    margin: 0 auto;
}

.login-form .form-control {
    border-radius: 0;
    margin-bottom: 30px;
}

.login-form .form-group {
    position: relative;
}

.login-form .form-group .forgot-password {
    position: absolute;
    top: 6px;
    right: 15px;
}

.login-form .btn {
    border-radius: 0;
    -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}

.login-form .btn.btn-primary {
    background: #3bc3ff;
    border-color: #31c0ff;
}

.slider-feature-card {
    background: #fff;
    max-width: 280px;
    margin: 0 auto;
    padding: 30px;
    text-align: center;
    -webkit-box-shadow: 0 2px 25px -3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 25px -3px rgba(0, 0, 0, 0.1);
}

.slider-feature-card img {
    height: 80px;
    margin-top: 30px;
    margin-bottom: 30px;
}

.slider-feature-card h3,
.slider-feature-card p {
    margin-bottom: 30px;
}

.carousel-indicators {
    bottom: -50px;
}

.carousel-indicators li {
    cursor: pointer;
    list-style-type: none;
}</style>
  