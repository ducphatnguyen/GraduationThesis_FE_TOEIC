<template>
    <div class="page">
        <Form @submit="addQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="row">
                    <div class="col">
                        <div class="form-group mb-3">
                            <label for="questionText" class="form-label">Text<span
                                    class="required-field">*</span></label>
                            <Field name="questionText" id="questionText" type="text"
                                class="form-control border-secondary custom-font" v-model="questionLocal.questionText" />
                            <ErrorMessage name="questionText" class="error-feedback" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="suggestedAnswer" class="form-label">Suggested Answer<span
                                    class="required-field">*</span></label>
                                    <ckeditor :editor="editor" v-model="questionLocal.suggestedAnswer" @ready="onEditorReady"
                                class="form-control border-secondary custom-font" />
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
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
        retrieveQuestions: { type: Function, required: true }, 
    },
    setup(props) {

        const questionLocal = reactive({});

        const questionFormSchema = yup.object().shape({
            questionText: yup
                .string()
                .required("questionText phải có giá trị.")
                .min(2, "questionText phải ít nhất 2 ký tự.")
                .max(1000, "questionText có nhiều nhất 1000 ký tự."),
            suggestedAnswer: yup
                .string()
                .required("suggestedAnswer phải có giá trị.")
                .min(2, "suggestedAnswer phải ít nhất 2 ký tự.")
                .max(2000, "suggestedAnswer có nhiều nhất 2000 ký tự."),
        });

        const addQuestion = async () => {
            try {
                console.log(props.sectionId);
                const formData = new FormData();
                formData.append("sectionId", props.sectionId);
                formData.append("questionText", questionLocal.questionText);
                formData.append("suggestedAnswer", questionLocal.suggestedAnswer);
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

        const onEditorReady = (editor) => {
            // Thay đổi chiều cao
            editor.editing.view.change(writer => {
                writer.setStyle('height', '250px', editor.editing.view.document.getRoot());
            });
        };

        return {
            questionLocal,
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
  