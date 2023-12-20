<template>
    <div class="container" >
        <h1 class="text-center mt-5">
            HỒ SƠ CÁ NHÂN
        </h1>
        <div class="card border-2 rounded-5 bg-opacity-10 mt-4 mb-5" style="max-width: 1300px; background-color: white;">
            <div class="row">
                <div class="col-4 my-4">
                    <Form :validation-schema="profileImageFormSchema" enctype="multipart/form-data">
                        <div class="d-flex justify-content-center align-items-center">
                            <img class="rounded-circle" :src="getImageUrl(profileImage)" alt="" loading="lazy">
                        </div>
                        <div class="d-flex justify-content-center align-items-center mt-3">
                            <label for="fileInput" class="btn btn-success text-white">
                                Upload ảnh
                            </label>
                            <Field type="file" name="image" id="fileInput" ref="fileInput" style="display: none;" as="input"
                                @change="onFileChange" />

                        </div>
                        <div class="d-flex justify-content-center align-items-center">
                            <ErrorMessage name="image" class="error-feedback" />
                        </div>
                    </Form>
                </div>

                <div class="col-8 d-flex align-items-center ">
                    <div class="card-body">

                        <div class="button-container mt-5">
                            <button type="button" :class="{ active: showProfilePage }" @click="showProfilePage = true">
                                Thông tin chung
                            </button>
                            <button type="button" :class="{ active: !showProfilePage }" @click="showProfilePage = false">
                                Đổi mật khẩu
                            </button>
                        </div>
                    
                        <Form @submit="updateProfile" :validation-schema="userFormSchema" enctype="multipart/form-data">
                            <div class="row" v-show="showProfilePage">
                                <div class="col-sm-6 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text border-secondary" id="basic-addon1"><i
                                                class="fa-solid fa-user"></i></span>
                                        <Field type="text" name="username" class="form-control border-secondary custom-font"
                                            v-model="userLocal.username" disabled />
                                        <ErrorMessage name="username" class="error-feedback" />
                                    </div>
                                </div>

                                <div class="col-sm-6 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text border-secondary" id="basic-addon1"><i
                                                class="fa-solid fa-envelope"></i></span>
                                        <Field type="email" name="email" class="form-control border-secondary custom-font"
                                            v-model="userLocal.email" disabled />
                                        <ErrorMessage name="email" class="error-feedback" />
                                    </div>
                                </div>

                                <div class="col-sm-6 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text border-secondary" id="basic-addon1"><i
                                                class="fa-solid fa-venus-mars"></i></span>
                                        <Field name="gender" class="form-control border-secondary custom-font"
                                            v-model="userLocal.gender" as="select">
                                            <option value="" disabled>Chọn giới tính</option>
                                            <option value="0">Nam</option>
                                            <option value="1">Nữ</option>
                                        </Field>
                                    </div>
                                    <ErrorMessage name="gender" class="error-feedback" />
                                </div>

                                <div class="col-sm-6 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text border-secondary" id="basic-addon1"><i
                                                class="fa-solid fa-phone"></i></span>
                                        <Field type="text" name="phoneNumber"
                                            class="form-control border-secondary custom-font"
                                            v-model="userLocal.phoneNumber" />
                                    </div>
                                    <ErrorMessage name="phoneNumber" class="error-feedback" />
                                </div>

                                <div class="col-sm-12 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text border-secondary" id="basic-addon1"><i
                                                class="fa-solid fa-address-book"></i></span>
                                        <Field type="text" name="address" class="form-control border-secondary custom-font"
                                            v-model="userLocal.address" />
                                    </div>
                                    <ErrorMessage name="address" class="error-feedback" />
                                </div>
                                <div class="d-flex justify-content-center mt-2">
                                    <button class="button d-flex justify-content-center">CẬP NHẬT THÔNG TIN</button>
                                </div>
                            </div>
                        </Form>

                        <Form @submit="changePassword" enctype="multipart/form-data">
                            <div class="row" v-show="!showProfilePage">
                                <div class="col-sm-12 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text border-secondary" id="basic-addon1"><i
                                                class="fa-solid fa-key me-2"></i> Mật khẩu cũ</span>
                                        <Field type="password" name="oldPassWord"
                                            class="form-control border-secondary custom-font"
                                            v-model="userLocal.oldPassWord" place-holder="Mật khẩu cũ" />
                                    </div>
                                    <ErrorMessage name="oldPassWord" class="error-feedback" />
                                </div>
                                <div class="col-sm-12 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text border-secondary" id="basic-addon1"><i
                                                class="fa-solid fa-lock me-2"></i> Mật khẩu mới</span>
                                        <Field type="password" name="newPassWord"
                                            class="form-control border-secondary custom-font"
                                            v-model="userLocal.newPassWord" place-holder="Mật khẩu mới" />
                                    </div>
                                    <ErrorMessage name="newPassWord" class="error-feedback" />
                                </div>
                                <div class="d-flex justify-content-center mt-2">
                                    <button class="button d-flex justify-content-center">ĐỔI MẬT KHẨU</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, reactive, onMounted } from "vue";

import UserService from "@/services/user.service";
import ProfileImageService from "@/services/profile_image.service";

import VueJwtDecode from "vue-jwt-decode";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({

    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {

        const userId = ref();
        const user = ref();
        const userLocal = reactive({
            oldPassWord: "",
            newPassWord: "",
        });

        const userFormSchema = yup.object().shape({
            address: yup.string().required("Địa chỉ không được để trống."),
            phoneNumber: yup
                .string()
                .required("Số điện thoại không được để trống.")
                .matches(/^\d{10}$/, "Số điện thoại phải có đúng 10 chữ số."),
            gender: yup.string().required("Giới tính phải được chọn."),
        });

        const profileImageFormSchema = yup.object().shape({
            image: yup
                .mixed()
                .test("fileType", "Chỉ chấp nhận tệp ảnh jpeg, png hoặc gif", (value) => {
                    if (!value) return true; // Bỏ qua nếu không có tệp
                    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
                    return allowedFormats.includes(value.type); // Kiểm tra định dạng tệp
                })
                .test("fileSize", "Tệp ảnh quá lớn", (value) => {
                    if (!value) return true; // Bỏ qua nếu không có tệp
                    return value.size <= 1024 * 1024; // Kiểm tra kích thước tệp (ví dụ: 1 MB)
                }),
        });

        const onFileChange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                userLocal.image = file;
                // Validate the form
                const isValid = await profileImageFormSchema.isValid({ image: file });
                if (isValid) {
                    updateProfileImage();
                } else {
                    // Handle validation error, maybe show a message to the user
                    console.log('Validation error: The selected file is not valid.');
                }
            } else {
                userLocal.image = null;
            }
        };

        const profileImage = ref();
        const getUserById = async () => {
            try {
                const adminToken = localStorage.getItem("adminToken");
                const decoded = VueJwtDecode.decode(adminToken);
                const username = decoded.sub;
                userId.value = await UserService.getUserIdByUsername(username);

                const data = await UserService.getUserById(userId.value);
                console.log(data)

                userLocal.username = data.username;
                userLocal.email = data.email;
                userLocal.address = data.address;
                userLocal.phoneNumber = data.phoneNumber;
                userLocal.gender = data.gender;
                user.value = data;

                profileImage.value = data.image;
                console.log(profileImage.value)

            } catch (error) {
                console.log(error);
            }
        };

        const getImageUrl = (imageName) => {
            if (imageName) {
                // Tạo URL cho ảnh bằng cách kết hợp đường dẫn cơ sở và tên ảnh
                return `http://localhost:9004/images/${imageName}`;
            }
            return "http://localhost:9004/images/anhdaidienmacdinh.jpg";
        };

        const updateProfileImage = async () => {
            try {
                const formData = new FormData();
                if (userLocal.image) {
                    formData.append("image", userLocal.image, userLocal.image.name);
                }
                await ProfileImageService.update(userId.value, formData);
                getUserById();
                toast.success('Upload ảnh đại diện thành công', {
                    autoClose: 2000,
                });
            } catch (error) {
                console.log(error);
                const jsonResponse = JSON.parse(error.request.response);
                toast.error(jsonResponse.message, {
                    autoClose: 2000,
                    position: 'top-right',
                });
            }
        };

        const showProfilePage = ref(true);
        const updateProfile = async (data) => { 
            try {
                data.address = userLocal.address;
                data.phoneNumber = userLocal.phoneNumber;
                data.gender = userLocal.gender;

                console.log(data)
                await UserService.update(userId.value, data); 
                getUserById();
                toast.success('Chỉnh sửa thông tin cá nhân thành công ', {
                    autoClose: 2000
                });
            } catch (error) {
                console.log(error);
                const jsonResponse = JSON.parse(error.request.response);
                toast.error(jsonResponse.message, {
                    autoClose: 2000,
                    position: 'top-right',
                });
            }
        };
        const changePassword = async (data) => {
            try {
                data.oldPassWord = userLocal.oldPassWord;
                data.newPassWord = userLocal.newPassWord;
                console.log(data)
                await UserService.changePassword(userId.value, data); 
                getUserById();
                toast.success('Đổi mật khẩu thành công ', {
                    autoClose: 2000
                });
            } catch (error) {
                console.log(error);
                const jsonResponse = JSON.parse(error.request.response);
                toast.error(jsonResponse.message, {
                    autoClose: 2000,
                    position: 'top-right',
                });
            }
        };

        onMounted(() => {
            getUserById();
        });

        return {
            userLocal,
            user,
            onFileChange,
            userFormSchema,
            profileImageFormSchema,
            getImageUrl,
            profileImage,
            updateProfileImage,
            updateProfile,
            changePassword,
            showProfilePage,
        };
    },
});
</script>
  
<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 60px;
}
.button-container button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fff;
    border: 1px #fff;
    border-radius: 20px;
    cursor: pointer;
    margin: 0 10px;
    transition: background-color 0.3s ease;
}
.button-container button.active {
    background-color: rgb(60, 53, 135);
    font-weight: bold;
    color: white;
}
.button {
    display: inline-block;
    padding: 10px;
    background-color: #052649;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 20px;
    transition: background-color 0.3s, color 0.3s;
}
.button:hover {
    background-color: #fff;
    color: #052649;
}
button i {
    font-size: 20px;
    color: #000;
}
h1 {
    font-weight: 700;
    color: #34447c;
}
.rounded-circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
}
label {
    font-weight: 600;
    font-size: 14px;
    color: rgb(44, 44, 44);
}
.error-feedback {
    color: red;
    font-size: 13px;
}
</style>
  