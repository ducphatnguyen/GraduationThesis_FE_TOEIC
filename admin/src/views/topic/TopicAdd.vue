<template>
    <div>
        <Form @submit="addTopic" :validation-schema="topicFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="topicName" class="form-label">Topic Name<span class="required-field">*</span></label>
                    <Field name="topicName" id="topicName" type="text" class="form-control border-secondary custom-font" 
                        v-model="topicLocal.topicName" />
                    <ErrorMessage name="topicName" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="image" class="form-label">Image<span class="required-field">*</span></label>
                    <Field name="image" id="image" class="form-control border-secondary custom-font" v-model="topicLocal.image" as="input"
                        type="file" @change="onFileChange" />
                    <ErrorMessage name="image" class="error-feedback" />
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button class="btn btn-primary">Lưu</button>
            </div>
        </Form>
    </div>
</template>
  
<script>
import { defineComponent, reactive } from "vue";

import TopicService from "@/services/topic.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
// Import useToast từ vue3-toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    // Truyền từ SectionOverView xuống 
    props: {
        retrieveTopics: { type: Function, required: true }, // Nhận prop retrieveSections
    },
    setup(props) {
        const topicLocal = reactive({});

        const topicFormSchema = yup.object().shape({
            topicName: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            image: yup
                .mixed()
                .required("Vui lòng chọn một tệp ảnh.") // Ràng buộc yêu cầu chọn ảnh
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

        const onFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                topicLocal.image = file;
            }
            else {
                topicLocal.image = null;
            }
        };

        const addTopic = async () => {
            try {
                const formData = new FormData();
                formData.append("topicName", topicLocal.topicName);
                formData.append("image", topicLocal.image, topicLocal.image.name);
                await TopicService.create(formData);
                props.retrieveTopics();
                toast.success('Thêm chủ đề thành công ', {
                    autoClose: 1000,
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

        return {
            topicLocal,
            onFileChange,
            topicFormSchema,
            addTopic,
        };
    },
});
</script>
  
<style scoped>
label {
    font-weight: 600;
    font-size: 14px;
    color: rgb(44, 44, 44);
}
.error-feedback {
    color: red;
    font-size: 13px;
}
.required-field {
    color: red;
    font-size: 14px;
    margin-left: 4px;
}
</style>
  