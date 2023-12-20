<template>
    <div class="page">
        <Form @submit="addQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="row">
                    <div class="col">
                        <div class="form-group mb-3">
                            <label for="questionText" class="form-label">Text<span
                                    class="required-field">*</span></label>
                            <Field name="questionText" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.questionText" />
                            <ErrorMessage name="questionText" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="suggestedAnswer" class="form-label">Suggested Answer<span
                                    class="required-field">*</span></label>
                            <Field name="suggestedAnswer" as="textarea" :style="{height: '150px', resize: 'none' }" class="form-control border-secondary custom-font"
                                v-model="questionLocal.suggestedAnswer" />
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
                .max(500, "questionText có nhiều nhất 500 ký tự."),
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
        return {
            questionLocal,
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
    