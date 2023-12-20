<template>
    <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
        <Form @submit="submitSignUp" :validation-schema="signUpFormSchema">
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
                                <h3 class="header-title">ĐĂNG KÝ</h3>
                                <div class="login-form">

                                    <div class="form-group mb-3">
                                        <Field name="name" type="text" class="form-control"
                                            v-model="signUpLocal.name" placeholder="Họ và tên" />
                                        <ErrorMessage name="name" class="text-danger" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <Field name="username" type="text" class="form-control"
                                            v-model="signUpLocal.username" placeholder="UserName" />
                                        <ErrorMessage name="username" class="text-danger" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <Field name="email" type="email" class="form-control" v-model="signUpLocal.email"
                                            placeholder="Email" />
                                        <ErrorMessage name="email" class="text-danger" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <Field name="password" type="password" class="form-control"
                                            v-model="signUpLocal.password" placeholder="Mật khẩu" />
                                        <ErrorMessage name="password" class="text-danger" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <Field name="passwordConfirmation" type="password" class="form-control"
                                            v-model="signUpLocal.passwordConfirmation" placeholder="Xác nhận mật khẩu" />
                                        <ErrorMessage name="passwordConfirmation" class="text-danger" />
                                    </div>

                                    <div class="form-group mb-3">
                                        <Field name="address" type="text" class="form-control" v-model="signUpLocal.address"
                                            placeholder="Địa chỉ" />
                                        <ErrorMessage name="address" class="text-danger" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <Field name="phoneNumber" type="text" class="form-control"
                                            v-model="signUpLocal.phoneNumber" placeholder="Số điện thoại" />
                                        <ErrorMessage name="phoneNumber" class="text-danger" />
                                    </div>

                                    <div class="form-group mb-3">
                                        <Field name="gender" class="form-control" v-model="signUpLocal.gender" as="select">
                                            <option value="" disabled>Chọn giới tính</option>
                                            <option value="0">Nam</option>
                                            <option value="1">Nữ</option>
                                        </Field>
                                        <ErrorMessage name="gender" class="text-danger" />
                                    </div>

                                    <div class="form-group text-center">
                                        <button class="btn btn-primary">Đăng Ký</button>
                                    </div>
                                    <div class="form-group">
                                        <div class="text-center">
                                            Thành viên mới?
                                            <router-link :to="{ name: 'signin' }" class="text-decoration-none">
                                                Đăng nhập ngay
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
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineComponent, reactive } from "vue";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props, context) {
        const signUpLocal = reactive({
            name: "",
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            address: "",
            phoneNumber: "",
            gender: "",
        });

        const signUpFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Email không được để trống.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            // email: yup
            //     .string()
            //     .required("Email không được để trống.")
            //     .min(2, "Tên phải ít nhất 2 ký tự.")
            //     .max(50, "Tên có nhiều nhất 50 ký tự."),
            // username: yup.string().required("Tài khoản không được để trống."),
            // email: yup
            //     .string()
            //     .required("Email không được để trống."),
            // password: yup.string().required("Mật khẩu không được để trống."),
            passwordConfirmation: yup
                .string()
                .oneOf(
                    [yup.ref("password"), null],
                    "Mật khẩu xác nhận không trùng khớp."
                )
                .required("Mật khẩu xác nhận không được để trống."),
            address: yup.string().required("Địa chỉ không được để trống."),
            phoneNumber: yup
                .string()
                .required("Số điện thoại không được để trống.")
                .matches(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số."),
            gender: yup.string().required("Giới tính phải được chọn."),
        });

        const submitSignUp = () => {
            context.emit("submit:signup", signUpLocal);
        };

        return {
            signUpLocal,
            signUpFormSchema,
            submitSignUp,
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
    background: green;
    border-color: green;
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
}
</style>
  