<template>
    <div v-if="question">
        <Form @submit="updateQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="row">
                    <div class="col">
                        <div class="form-group mb-3">
                            <label for="questionContent" class="form-label">Question Content<span
                                    class="required-field">*</span></label>
                            <Field name="questionContent" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.questionContent" />
                            <ErrorMessage name="questionContent" class="error-feedback" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="optionA" class="form-label">Option A<span class="required-field">*</span></label>
                            <Field name="optionA" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.optionA" />
                            <ErrorMessage name="optionA" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="optionB" class="form-label">Option B<span class="required-field">*</span></label>
                            <Field name="optionB" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.optionB" />
                            <ErrorMessage name="optionB" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="optionC" class="form-label">Option C<span class="required-field">*</span></label>
                            <Field name="optionC" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.optionC" />
                            <ErrorMessage name="optionC" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="optionD" class="form-label">Option D<span class="required-field">*</span></label>
                            <Field name="optionD" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.optionD" />
                            <ErrorMessage name="optionD" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="correctOption" class="form-label">Correct Option<span
                                    class="required-field">*</span></label>
                            <div class="d-flex">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="correctOptionA" name="correctOption"
                                        v-model="questionLocal.correctOption" value="A" :checked="questionLocal.correctOption === questionLocal.optionA"/>
                                    <label class="form-check-label me-3" for="correctOptionA">A</label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="correctOptionB" name="correctOption"
                                        v-model="questionLocal.correctOption" value="B" :checked="questionLocal.correctOption === questionLocal.optionB"/>
                                    <label class="form-check-label me-3" for="correctOptionB">B</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="correctOptionC" name="correctOption"
                                        v-model="questionLocal.correctOption" value="C" :checked="questionLocal.correctOption === questionLocal.optionC" />
                                    <label class="form-check-label me-3" for="correctOptionC">C</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="correctOptionD" name="correctOption"
                                        v-model="questionLocal.correctOption" value="D" :checked="questionLocal.correctOption === questionLocal.optionD"/>
                                    <label class="form-check-label me-3" for="correctOptionD">D</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="questionType" class="form-label">Type<span class="required-field">*</span></label>
                            <Field name="questionType" id="questionType" class="form-select border-secondary custom-font"
                                v-model="questionLocal.questionType" as="select">
                                <option value="" disabled>Select an option</option>
                                <option value="[Part 5] Câu hỏi ngữ pháp">[Part 5] Câu hỏi ngữ pháp</option>
                                <option value="[Part 5] Câu hỏi từ vựng">[Part 5] Câu hỏi từ vựng</option>
                                <option value="[Part 5] Câu hỏi từ loại">[Part 5] Câu hỏi từ loại</option>
                            </Field>
                            <ErrorMessage name="questionType" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="questionExplanation" class="form-label">Question Explanation<span
                                    class="required-field">*</span></label>
                            <ckeditor :editor="editor" v-model="questionLocal.questionExplanation" @ready="onEditorReady"
                                class="form-control border-secondary custom-font" />
                            <ErrorMessage name="questionExplanation" class="error-feedback" />
                        </div>
                    </div>
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
            questionType: yup.string().required("Loại phải được chọn."),

        });

        const getQuestion = async () => {
            try {
                // Truyền giá trị trong đối tượng cho section -> form
                const data = await QuestionService.get(props.questionId);
                questionLocal.questionContent = data.questionContent;
                questionLocal.optionA = data.optionA;
                questionLocal.optionB = data.optionB;
                questionLocal.optionC = data.optionC;
                questionLocal.optionD = data.optionD;
                questionLocal.correctOption = data.correctOption;
                questionLocal.questionType = data.questionType;
                questionLocal.questionExplanation = data.questionExplanation;

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
                formData.append("optionA", questionLocal.optionA);
                formData.append("optionB", questionLocal.optionB);
                formData.append("optionC", questionLocal.optionC);
                formData.append("optionD", questionLocal.optionD);

                // Xác định đáp án được chọn và đặt giá trị cho correctOption
                switch (questionLocal.correctOption) {
                    case "A":
                        formData.append("correctOption", questionLocal.optionA);
                        break;
                    case "B":
                        formData.append("correctOption", questionLocal.optionB);
                        break;
                    case "C":
                        formData.append("correctOption", questionLocal.optionC);
                        break;
                    case "D":
                        formData.append("correctOption", questionLocal.optionD);
                        break;
                    default:
                        formData.append("correctOption", questionLocal.correctOption); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
                }

                formData.append("questionType", questionLocal.questionType);
                formData.append("questionExplanation", questionLocal.questionExplanation);
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

        onMounted(async () => {
            await getQuestion();
        });

        const onEditorReady = (editor) => {
            // Thay đổi chiều cao
            editor.editing.view.change(writer => {
                writer.setStyle('height', '170px', editor.editing.view.document.getRoot());
            });
        };

        return {
            questionLocal,
            question,
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
