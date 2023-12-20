<template>
    <div class="page">
        <Form @submit="addQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="row">
                    <div class="col">
                        
                        <div class="form-group mb-3">
                            <label for="questionImage" class="form-label">Question Image<span
                                    class="required-field">*</span></label>
                            <Field name="questionImage" id="questionImage" class="form-control border-secondary custom-font"
                                v-model="questionLocal.questionImage" as="input" type="file" @change="onImageChange" />
                            <ErrorMessage name="questionImage" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="suggestedAnswer" class="form-label">Suggested Answer<span
                                    class="required-field">*</span></label>
                            <Field name="suggestedAnswer" id="suggestedAnswer" as="textarea"    :style="{height: '150px', resize: 'none' }"
                                class="form-control border-secondary custom-font" v-model="questionLocal.suggestedAnswer" />
                            <ErrorMessage name="suggestedAnswer" class="error-feedback" />
                        </div>

                    </div>
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

import QuestionService from "@/services/question.service";

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
        sectionId: { type: String, required: true }, // Khai báo props sectionId
        retrieveQuestions: { type: Function, required: true }, // Nhận prop retrieveQuestions
    },
    setup(props) {

        const questionLocal = reactive({});

        const questionFormSchema = yup.object().shape({
            suggestedAnswer: yup
                .string()
                .required("suggestedAnswer phải có giá trị.")
                .min(2, "suggestedAnswer phải ít nhất 2 ký tự.")
                .max(1000, "suggestedAnswer có nhiều nhất 1000 ký tự."),
            questionImage: yup
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

        const onImageChange = (event) => {
            const file = event.target.files[0];
            questionLocal.questionImage = file;
        };

        const addQuestion = async () => {
            try {
                console.log(props.sectionId);
                const formData = new FormData();
                formData.append("sectionId", props.sectionId);
                formData.append("suggestedAnswer", questionLocal.suggestedAnswer);
                if (questionLocal.questionImage) {
                    formData.append("questionImage", questionLocal.questionImage, questionLocal.questionImage.name);
                }
                await QuestionService.create(formData);
                props.retrieveQuestions();
                toast.success('Thêm câu hỏi thành công ', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm câu hỏi', {
                    autoClose: 1000,
                });
            }
        };
        return {
            questionLocal,
            onImageChange,
            questionFormSchema,
            addQuestion,
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
  