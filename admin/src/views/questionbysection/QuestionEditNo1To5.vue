<template>
    <div v-if="question">
        <Form @submit="updateQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
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
                            <label for="questionContent" class="form-label">Question Content<span
                                    class="required-field">*</span></label>
                            <Field name="questionContent" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.questionContent" />
                            <ErrorMessage name="questionContent" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="suggestedAnswer" class="form-label">Suggested Answer<span
                                    class="required-field">*</span></label>
                            <ckeditor :editor="editor" v-model="questionLocal.suggestedAnswer" @ready="onEditorReady"
                                class="form-control border-secondary custom-font" />
                            <!-- <ErrorMessage name="suggestedAnswer" class="error-feedback" /> -->
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
import { defineComponent, onMounted, reactive, ref } from "vue";

import QuestionService from "@/services/question.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// Import useToast từ vue3-toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
        ckeditor: CKEditor.component,
    },

    props: {
        sectionId: { type: String, required: true },
        questionId: { type: Number, required: true },
        retrieveQuestions: { type: Function, required: true }, // Nhận prop retrieveSections
    },

    setup(props) {
        const question = ref(null);
        const questionLocal = reactive({});

        const questionFormSchema = yup.object().shape({
            questionContent: yup
                .string()
                .required("questionContent phải có giá trị.")
                .min(2, "questionContent phải ít nhất 2 ký tự.")
                .max(500, "questionContent có nhiều nhất 500 ký tự."),
            // suggestedAnswer: yup
            //     .string()
            //     .required("suggestedAnswer phải có giá trị.")
            //     .min(2, "suggestedAnswer phải ít nhất 2 ký tự.")
            //     .max(500, "suggestedAnswer có nhiều nhất 500 ký tự."),
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

        const getQuestion = async () => {
            try {
                // Truyền giá trị trong đối tượng cho section -> form
                const data = await QuestionService.get(props.questionId);
                questionLocal.questionContent = data.questionContent;
                questionLocal.suggestedAnswer = data.suggestedAnswer;
                // questionLocal.questionImage = null; // Bắt đầu với ảnh null để không cập nhật ảnh nếu không có thay đổi
                // questionLocal.questionAudio = null; // Bắt đầu với ảnh null để không cập nhật ảnh nếu không có thay đổi
                question.value = data;
            } catch (error) {
                console.log(error);
            }
        };

        const updateQuestion = async (data) => {
            try {
                console.log(props.questionId)
                const formData = new FormData();
                formData.append("sectionId", props.sectionId);
                formData.append("questionContent", questionLocal.questionContent);
                formData.append("suggestedAnswer", questionLocal.suggestedAnswer);
                if (questionLocal.questionImage) {
                    formData.append("questionImage", questionLocal.questionImage, questionLocal.questionImage.name);
                }
                formData.append("questionScript", questionLocal.questionScript);
                await QuestionService.update(props.questionId, formData);
                props.retrieveQuestions();
                toast.success('Chỉnh sửa câu hỏi thành công ', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi chỉnh sửa câu hỏi', {
                    autoClose: 1000,
                });
            }
        };

        const onEditorReady = (editor) => {
            // Thay đổi chiều cao
            editor.editing.view.change(writer => {
                writer.setStyle('height', '170px', editor.editing.view.document.getRoot());
            });
        };

        onMounted(async () => {
            await getQuestion();
        });

        return {
            questionLocal,
            question,
            onImageChange,
            questionFormSchema,
            updateQuestion,
            editor: ClassicEditor, 
            onEditorReady,
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
