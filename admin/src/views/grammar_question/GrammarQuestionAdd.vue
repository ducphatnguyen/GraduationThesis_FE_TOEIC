<template>
    <div class="page">
        <Form @submit="addGrammarQuestion" :validation-schema="grammarQuestionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">

                <div class="form-group mb-3">
                    <label for="questionContent" class="form-label">Question Content<span
                            class="required-field">*</span></label>
                    <Field name="questionContent" type="text" class="form-control border-secondary custom-font"
                        v-model="grammarQuestionLocal.questionContent" />
                    <ErrorMessage name="questionContent" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="optionA" class="form-label">Option A<span class="required-field">*</span></label>
                    <Field name="optionA" type="text" class="form-control border-secondary custom-font"
                        v-model="grammarQuestionLocal.optionA" />
                    <ErrorMessage name="optionA" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="optionB" class="form-label">Option B<span class="required-field">*</span></label>
                    <Field name="optionB" type="text" class="form-control border-secondary custom-font"
                        v-model="grammarQuestionLocal.optionB" />
                    <ErrorMessage name="optionB" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="optionC" class="form-label">Option C<span class="required-field">*</span></label>
                    <Field name="optionC" type="text" class="form-control border-secondary custom-font"
                        v-model="grammarQuestionLocal.optionC" />
                    <ErrorMessage name="optionC" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="optionD" class="form-label">Option D<span class="required-field">*</span></label>
                    <Field name="optionD" type="text" class="form-control border-secondary custom-font"
                        v-model="grammarQuestionLocal.optionD" />
                    <ErrorMessage name="optionD" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="correctOption" class="form-label">Correct Option<span
                            class="required-field">*</span></label>
                    <div class="d-flex">
                        <div class="form-check">
                            <Field class="form-check-input" type="radio" id="correctOptionA" name="correctOption"
                                v-model="grammarQuestionLocal.correctOption" value="A" />
                            <label class="form-check-label me-3" for="correctOptionA">A</label>
                        </div>
                        <div class="form-check">
                            <Field class="form-check-input" type="radio" id="correctOptionB" name="correctOption"
                                v-model="grammarQuestionLocal.correctOption" value="B" />
                            <label class="form-check-label me-3" for="correctOptionB">B</label>
                        </div>
                        <div class="form-check">
                            <Field class="form-check-input" type="radio" id="correctOptionC" name="correctOption"
                                v-model="grammarQuestionLocal.correctOption" value="C" />
                            <label class="form-check-label me-3" for="correctOptionC">C</label>
                        </div>
                        <div class="form-check">
                            <Field class="form-check-input" type="radio" id="correctOptionD" name="correctOption"
                                v-model="grammarQuestionLocal.correctOption" value="D" />
                            <label class="form-check-label me-3" for="correctOptionD">D</label>
                        </div>

                    </div>
                    <ErrorMessage name="correctOption" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="questionExplanation" class="form-label">Question Explanation<span
                            class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="grammarQuestionLocal.questionExplanation" @ready="onEditorReady"
                        class="form-control border-secondary custom-font" />
                    <ErrorMessage name="questionExplanation" class="error-feedback" />
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

import GrammarQuestionService from "@/services/grammar_question.service";

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
        grammarId: { type: String, required: true }, // Khai báo props sectionId
        retrieveGrammarQuestions: { type: Function, required: true }, // Nhận prop retrieveSections
    },
    setup(props) {
        const grammarQuestionLocal = reactive({});

        const grammarQuestionFormSchema = yup.object().shape({
            questionContent: yup
                .string()
                .required("questionContent phải có giá trị.")
                .min(2, "questionContent phải ít nhất 2 ký tự.")
                .max(500, "questionContent có nhiều nhất 500 ký tự."),
            optionA: yup
                .string()
                .required("OptionA phải có giá trị.")
                .min(2, "OptionA phải ít nhất 2 ký tự.")
                .max(500, "OptionA có nhiều nhất 500 ký tự."),
            optionB: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 500 ký tự."),
            optionC: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 500 ký tự."),
            optionD: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 500 ký tự."),
            correctOption: yup
                .string()
                .required("correctOption phải có giá trị."),
        });

        const onEditorReady = (editor) => {
            // Thay đổi height
            editor.editing.view.change(writer => {
                writer.setStyle('height', '250px', editor.editing.view.document.getRoot());
            });
        };
        const addGrammarQuestion = async () => {
            try {
                console.log(props.grammarId)
                const formData = new FormData();
                formData.append("grammarId", props.grammarId);
                formData.append("questionContent", grammarQuestionLocal.questionContent);
                formData.append("optionA", grammarQuestionLocal.optionA);
                formData.append("optionB", grammarQuestionLocal.optionB);
                formData.append("optionC", grammarQuestionLocal.optionC);
                formData.append("optionD", grammarQuestionLocal.optionD);

                // Xác định đáp án được chọn và đặt giá trị cho correctOption
                switch (grammarQuestionLocal.correctOption) {
                    case "A":
                        formData.append("correctOption", grammarQuestionLocal.optionA);
                        break;
                    case "B":
                        formData.append("correctOption", grammarQuestionLocal.optionB);
                        break;
                    case "C":
                        formData.append("correctOption", grammarQuestionLocal.optionC);
                        break;
                    case "D":
                        formData.append("correctOption", grammarQuestionLocal.optionD);
                        break;
                    default:
                        formData.append("correctOption", ""); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
                }

                formData.append("questionExplanation", grammarQuestionLocal.questionExplanation);
                await GrammarQuestionService.create(formData);
                props.retrieveGrammarQuestions();
                toast.success('Thêm câu hỏi ngữ pháp thành công ', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm câu hỏi ngữ pháp ', {
                    autoClose: 1000
                });
            }
        };
        
        return {
            grammarQuestionLocal,
            grammarQuestionFormSchema,
            addGrammarQuestion,
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