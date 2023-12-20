<template>
    <div class="container my-5">
        <div class="content" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
            <div class="left-side">
                <div class="address details">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="topic">Address</div>
                    <div class="text-one">Bình Tân</div>
                    <div class="text-two">Vĩnh Long</div>
                </div>

                <div class="phone details">
                    <i class="fas fa-phone-alt"></i>
                    <div class="topic">Phone</div>
                    <div class="text-one">+0123456789</div>
                    <div class="text-two">+0987654321</div>
                </div>

                <div class="email details">
                    <i class="fas fa-envelope"></i>
                    <div class="topic">Email</div>
                    <div class="text-one">duc894580@gmail.com</div>
                    <div class="text-two">ducb1910213@student.ctu.edu.vn</div>
                </div>
            </div>

            <div class="right-side">
                <div class="topic-text">Gửi cho chúng tôi đánh giá</div>
                <p>Chúng tôi luôn luôn sẵn sàng lắng nghe những đóng góp của các bạn. Hãy cho chúng tôi biết điều đó là
                    gì!!!</p>
                <Form @submit="addFeedback" :validation-schema="feedbackFormSchema" enctype="multipart/form-data">
                    <div class="input-box">
                        <Field name="name" id="name" type="text" placeholder="Enter your name"
                            v-model="feedbackLocal.name" />
                    </div>
                    <ErrorMessage name="name" class="error-feedback" />
                    <div class="input-box">
                        <Field name="email" id="email" type="text" placeholder="Enter your email"
                            v-model="feedbackLocal.email" />
                    </div>
                    <ErrorMessage name="email" class="error-feedback" />
                    <div class="input-box message-box">
                        <Field name="review" id="review" type="text" placeholder="Enter your message"
                            v-model="feedbackLocal.review" />
                    </div>
                    <ErrorMessage name="review" class="error-feedback" />
                    <div class="input-box ">
                        <div class="rate">
                            <Field type="radio" id="star5" name="rating" value="5" v-model="feedbackLocal.rating"
                                required />
                            <label for="star5" title="text">5 stars</label>
                            <Field type="radio" id="star4" name="rating" value="4" v-model="feedbackLocal.rating"
                                required />
                            <label for="star4" title="text">4 stars</label>
                            <Field type="radio" id="star3" name="rating" value="3" v-model="feedbackLocal.rating"
                                required />
                            <label for="star3" title="text">3 stars</label>
                            <Field type="radio" id="star2" name="rating" value="2" v-model="feedbackLocal.rating"
                                required />
                            <label for="star2" title="text">2 stars</label>
                            <Field type="radio" id="star1" name="rating" value="1" v-model="feedbackLocal.rating"
                                required />
                            <label for="star1" title="text">1 star</label>
                        </div>
                    </div>
                    <p>
                        <ErrorMessage name="rating" class="error-feedback" />
                    </p>
                    <button class="button">Đánh giá ngay</button>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

import FeedbackService from "@/services/feedback.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        retrieveFeedbacks: { type: Function },
    },
    setup() {
        const feedbackLocal = reactive({});
        const feedbackFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Email không hợp lệ."),
            review: yup
                .string()
                .required("Đánh giá phải có giá trị."),
            rating: yup
                .number()
                .required("Điểm đánh giá phải có giá trị.")
                .min(1, "Điểm đánh giá tối thiểu là 1.")
                .max(5, "Điểm đánh giá tối đa là 5."),
        });

        const addFeedback = async () => {
            try {
                console.log(feedbackLocal.rating)
                const formData = new FormData();
                formData.append("name", feedbackLocal.name);
                formData.append("email", feedbackLocal.email);
                formData.append("review", feedbackLocal.review);
                formData.append("rating", feedbackLocal.rating);
                await FeedbackService.create(formData);
                toast.success('Thêm đánh giá thành công ', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm đánh giá', {
                    autoClose: 1000,
                });
            }
        };

        return {
            feedbackLocal,
            feedbackFormSchema,
            addFeedback,
        };
    },
});
</script>
<style scoped>
@import "@/assets/feedback.css";
</style>