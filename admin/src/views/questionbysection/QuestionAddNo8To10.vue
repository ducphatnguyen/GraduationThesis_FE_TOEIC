<template>
    <div>
        <Form @submit="addQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="groupImage">Question Group Image<span class="required-field">*</span></label>
                    <Field type="file" name="groupImage" class="form-control border-secondary custom-font"
                        @change="onImageChange" as="input" v-model="questionLocal.groupImage" />
                    <ErrorMessage name="groupImage" class="error-feedback" />
                </div>
                <div class="form-group mb-3">
                    <label for="groupText" class="form-label">Question Group Text<span
                            class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="questionLocal.groupText" @ready="onEditorReady"
                        class="form-control border-secondary custom-font" />
                    <ErrorMessage name="groupText" class="error-feedback" />
                </div>
                <hr>
                <div class="row">
                    <div v-for="(question, index) in questionLocal.questions" :key="index" class="col-md-4 mb-4">
                        <div class="form-group mb-3">
                            <label :for="'questionContent' + index">Question Content {{ index + 1 }}<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionContent' + index" type="text"
                                class="form-control border-secondary custom-font " v-model="question.questionContent" />
                            <ErrorMessage :name="'questionContent' + index" class="error-feedback" />
                        </div>
                        <div class="form-group mb-3">
                            <label :for="'suggestedAnswer' + index">Suggested Answer<span
                                    class="required-field">*</span></label>
                            <Field :name="'suggestedAnswer' + index" as="textarea" :style="{height: '150px', resize: 'none' }"
                                class="form-control border-secondary custom-font" v-model="question.suggestedAnswer" />
                            <ErrorMessage :name="'suggestedAnswer' + index" class="error-feedback" />
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
import QuestionGroupService from "@/services/question_group.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// Import useToast từ vue3-toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
        ckeditor: CKEditor.component,
    },
    props: {
        sectionId: { type: String, required: true },
        retrieveQuestions: { type: Function, required: true }, // Nhận prop retrieveSections
    },
    setup(props) {

        const questionLocal = reactive({
            // Dữ liệu của nhóm câu hỏi, bao gồm các câu hỏi con
            groupImage: null,
            groupText: "",
            questions: [
                {
                    questionContent: "",
                    suggestedAnswer: "",
                },
                {
                    questionContent: "",
                    suggestedAnswer: "",
                },
                {
                    questionContent: "",
                    suggestedAnswer: "",
                },
            ],
        });

        const questionFormSchema = yup.object().shape({
            // groupImage: yup
            //     .mixed()
            //     .required("Vui lòng chọn một tệp ảnh.") // Ràng buộc yêu cầu chọn ảnh
            //     .test("fileType", "Chỉ chấp nhận tệp ảnh jpeg, png hoặc gif", (value) => {
            //         if (!value) return true; // Bỏ qua nếu không có tệp
            //         const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
            //         return allowedFormats.includes(value.type); // Kiểm tra định dạng tệp
            //     })
            //     .test("fileSize", "Tệp ảnh quá lớn", (value) => {
            //         if (!value) return true; // Bỏ qua nếu không có tệp
            //         return value.size <= 1024 * 1024; // Kiểm tra kích thước tệp (ví dụ: 1 MB)
            //     }),

            questionContent0: yup
                .string()
                .required("questionContent phải có giá trị.")
                .min(2, "questionContent phải ít nhất 2 ký tự.")
                .max(500, "questionContent có nhiều nhất 500 ký tự."),
            questionContent1: yup
                .string()
                .required("questionContent phải có giá trị.")
                .min(2, "questionContent phải ít nhất 2 ký tự.")
                .max(500, "questionContent có nhiều nhất 500 ký tự."),
            questionContent2: yup
                .string()
                .required("questionContent phải có giá trị.")
                .min(2, "questionContent phải ít nhất 2 ký tự.")
                .max(500, "questionContent có nhiều nhất 500 ký tự."),

            suggestedAnswer0: yup
                .string()
                .required("suggestedAnswer phải có giá trị.")
                .min(2, "suggestedAnswer phải ít nhất 2 ký tự.")
                .max(500, "suggestedAnswer có nhiều nhất 500 ký tự."),
            suggestedAnswer1: yup
                .string()
                .required("suggestedAnswer phải có giá trị.")
                .min(2, "suggestedAnswer phải ít nhất 2 ký tự.")
                .max(500, "suggestedAnswer có nhiều nhất 500 ký tự."),
            suggestedAnswer2: yup
                .string()
                .required("suggestedAnswer phải có giá trị.")
                .min(2, "suggestedAnswer phải ít nhất 2 ký tự.")
                .max(500, "suggestedAnswer có nhiều nhất 500 ký tự."),
        });

        const addQuestion = async () => {
            try {
                console.log(props.sectionId);
                // Tạo thông tin nhóm câu hỏi trước
                const groupFormData = new FormData();
                groupFormData.append("sectionId", props.sectionId);
                groupFormData.append("groupText", questionLocal.groupText);
                if (questionLocal.groupImage) {
                    groupFormData.append("groupImage", questionLocal.groupImage, questionLocal.groupImage.name);
                }
                // Gửi dữ liệu nhóm câu hỏi lên server và lấy groupId
                const response = await QuestionGroupService.create(groupFormData);
                console.log(response)
                const groupId = response.groupId;
                console.log(groupId)
                // Gửi dữ liệu từng câu hỏi con lên server
                for (const question of questionLocal.questions) {
                    const formData = new FormData();
                    formData.append("sectionId", props.sectionId);
                    formData.append("groupId", groupId);
                    formData.append("questionContent", question.questionContent);
                    formData.append("suggestedAnswer", question.suggestedAnswer);

                    // Gửi dữ liệu câu hỏi lên server
                    await QuestionService.create(formData);
                }
                toast.success('Thêm câu hỏi thành công ', {
                    autoClose: 1000,
                });
                props.retrieveQuestions();

            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm câu hỏi', {
                    autoClose: 1000,
                });
            }
        };

        // Hàm xử lý thay đổi hình ảnh
        const onImageChange = (event) => {
            const file = event.target.files[0];
            questionLocal.groupImage = file;
        };

        const onEditorReady = (editor) => {
            // Thay đổi chiều cao
            editor.editing.view.change(writer => {
                writer.setStyle('height', '170px', editor.editing.view.document.getRoot());
            });
        };

        return {
            questionLocal,
            onImageChange,
            questionFormSchema,
            addQuestion,
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
  
  
        