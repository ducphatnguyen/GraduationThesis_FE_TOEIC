<template>
    <div v-if="topic">
        <Form @submit="updateTopic" :validation-schema="topicFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="topicName" class="form-label">Topic Name<span class="required-field">*</span></label>
                    <Field name="topicName" type="text" class="form-control border-secondary custom-font"
                        v-model="topicLocal.topicName" />
                    <ErrorMessage name="topicName" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="image" class="form-label">Image<span class="required-field">*</span></label>
                    <Field name="image" class="form-control border-secondary custom-font" v-model="topicLocal.image"
                        as="input" type="file" @change="onFileChange" />
                    <ErrorMessage name="image" class="error-feedback" />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button class="btn btn-primary" data-bs-dismiss="modal">Lưu</button>
            </div>
        </Form>
    </div>
</template>
  
<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import TopicService from "@/services/topic.service";
// Import useToast từ vue3-toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    props: {
        topicId: { type: Number, required: true },
        retrieveTopics: { type: Function, required: true }, // Nhận prop retrieveTopics
    },

    setup(props) {
        const topic = ref(null);
        const topicLocal = reactive({}); // Sử dụng reactive thay vì ref để lưu dữ liệu của topic

        const topicFormSchema = yup.object().shape({
            topicName: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            image: yup
                .mixed()
                // .required("Vui lòng chọn một tệp ảnh.") // Ràng buộc yêu cầu chọn ảnh
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
            } else {
                topicLocal.image = null;
            }
        };

        const getTopic = async () => {
            try {
                // Truyền giá trị trong đối tượng cho topic -> form
                const data = await TopicService.get(props.topicId);
                topicLocal.topicName = data.topicName;
                // topicLocal.image = null; // Bắt đầu với ảnh null để không cập nhật ảnh nếu không có thay đổi
                topic.value = data;
            } catch (error) {
                console.log(error);
            }
        };

        const updateTopic = async () => {
            try {
                const formData = new FormData();
                formData.append("topicName", topicLocal.topicName);
                if (topicLocal.image) {
                    formData.append("image", topicLocal.image, topicLocal.image.name);
                }
                await TopicService.update(props.topicId, formData);
                props.retrieveTopics();
                // Hiển thị toast thông báo khi chỉnh sửa thành công
                toast.success('Chỉnh sửa chủ đề thành công ', {
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
        onMounted(async () => {
            await getTopic();
        });
        return {
            topicLocal,
            topic,
            onFileChange,
            topicFormSchema,
            updateTopic,
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
