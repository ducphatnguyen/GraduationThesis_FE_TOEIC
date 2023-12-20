<template>
    <div>
        <Form @submit="addQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">

                <div class="form-group mb-3">
                    <label for="groupPassage" class="form-label">Question Group Passage<span
                            class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="questionLocal.groupPassage" @ready="onEditorReady"
                        class="form-control border-secondary custom-font" />
                    <ErrorMessage name="groupPassage" class="error-feedback" />
                </div>

                <hr>
                <div class="row">
                    <div v-for="(question, index) in questionLocal.questions" :key="index" class="col-md-6 mb-5">
                        <div class="form-group">
                            <label :for="'questionContent' + index">Question Content {{ index + 1 }}<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionContent' + index" type="text"
                                class="form-control border-secondary custom-font " v-model="question.questionContent" />
                            <ErrorMessage :name="'questionContent' + index" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label :for="'optionA' + index">Option A<span class="required-field">*</span></label>
                            <Field :name="'optionA' + index" type="text" class="form-control border-secondary custom-font"
                                v-model="question.optionA" />
                            <ErrorMessage :name="'optionA' + index" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label :for="'optionB' + index">Option B<span class="required-field">*</span></label>
                            <Field :name="'optionB' + index" type="text" class="form-control border-secondary custom-font"
                                v-model="question.optionB" />
                            <ErrorMessage :name="'optionB' + index" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label :for="'optionC' + index">Option C<span class="required-field">*</span></label>
                            <Field :name="'optionC' + index" type="text" class="form-control border-secondary custom-font"
                                v-model="question.optionC" />
                            <ErrorMessage :name="'optionC' + index" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label :for="'optionD' + index">Option D<span class="required-field">*</span></label>
                            <Field :name="'optionD' + index" type="text" class="form-control border-secondary custom-font"
                                v-model="question.optionD" />
                            <ErrorMessage :name="'optionD' + index" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label>Correct Answer<span class="required-field">*</span></label>
                            <div>
                                <div class="form-check form-check-inline" v-for="option in ['A', 'B', 'C', 'D']"
                                    :key="option">
                                    <Field :name="'correctOption' + index" :id="'option' + option + index" type="radio"
                                        class="form-check-input" :value="option" v-model="question.correctOption" />
                                    <label class="form-check-label" :for="'option' + option + index">{{ option }}</label>
                                </div>
                            </div>
                            <ErrorMessage :name="'correctOption' + index" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label :for="'questionType' + index" class="form-label">Type<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionType' + index" :id="'questionType' + index"
                                class="form-select border-secondary custom-font" v-model="question.questionType"
                                as="select">
                                <option value="" disabled>Select an option</option>
                                <option value="[Part 6] Câu hỏi ngữ pháp">[Part 6] Câu hỏi ngữ pháp</option>
                                <option value="[Part 6] Câu hỏi từ vựng">[Part 6] Câu hỏi từ vựng</option>
                                <option value="[Part 6] Câu hỏi từ loại">[Part 6] Câu hỏi từ loại</option>
                                <option value="[Part 6] Câu hỏi điền câu">[Part 6] Câu hỏi điền câu</option>

                            </Field>
                            <ErrorMessage :name="'questionType' + index" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label :for="'questionExplanation' + index">Question Explanation<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionExplanation' + index" type="text"
                                class="form-control border-secondary custom-font" v-model="question.questionExplanation" />
                            <ErrorMessage :name="'questionExplanation' + index" class="error-feedback" />
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
            groupPassage: "",
            questions: [
                {
                    questionContent: "",
                    optionA: "",
                    optionB: "",
                    optionC: "",
                    optionD: "",
                    correctOption: "",
                    questionType: "",
                    questionExplanation: "",
                },
                {
                    questionContent: "",
                    optionA: "",
                    optionB: "",
                    optionC: "",
                    optionD: "",
                    correctOption: "",
                    questionType: "",
                    questionExplanation: "",
                },
                {
                    questionContent: "",
                    optionA: "",
                    optionB: "",
                    optionC: "",
                    optionD: "",
                    correctOption: "",
                    questionType: "",
                    questionExplanation: "",
                },
                {
                    questionContent: "",
                    optionA: "",
                    optionB: "",
                    optionC: "",
                    optionD: "",
                    correctOption: "",
                    questionType: "",
                    questionExplanation: "",
                },
            ],
        });

        const questionFormSchema = yup.object().shape({
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
            questionContent3: yup
                .string()
                .required("questionContent phải có giá trị.")
                .min(2, "questionContent phải ít nhất 2 ký tự.")
                .max(500, "questionContent có nhiều nhất 500 ký tự."),


            optionA0: yup
                .string()
                .required("OptionA phải có giá trị.")
                .min(2, "OptionA phải ít nhất 2 ký tự.")
                .max(500, "OptionA có nhiều nhất 50 ký tự."),
            optionA1: yup
                .string()
                .required("OptionA phải có giá trị.")
                .min(2, "OptionA phải ít nhất 2 ký tự.")
                .max(500, "OptionA có nhiều nhất 50 ký tự."),
            optionA2: yup
                .string()
                .required("OptionA phải có giá trị.")
                .min(2, "OptionA phải ít nhất 2 ký tự.")
                .max(500, "OptionA có nhiều nhất 50 ký tự."),
            optionA3: yup
                .string()
                .required("OptionA phải có giá trị.")
                .min(2, "OptionA phải ít nhất 2 ký tự.")
                .max(500, "OptionA có nhiều nhất 50 ký tự."),

            optionB0: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 50 ký tự."),
            optionB1: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 50 ký tự."),
            optionB2: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 50 ký tự."),
            optionB3: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 50 ký tự."),

            optionC0: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 50 ký tự."),
            optionC1: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 50 ký tự."),
            optionC2: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 50 ký tự."),
            optionC3: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 50 ký tự."),

            optionD0: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 50 ký tự."),
            optionD1: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 50 ký tự."),
            optionD2: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 50 ký tự."),
            optionD3: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 50 ký tự."),

            correctOption0: yup
                .string()
                .required("correctOption phải có giá trị."),
            correctOption1: yup
                .string()
                .required("correctOption phải có giá trị."),
            correctOption2: yup
                .string()
                .required("correctOption phải có giá trị."),
            correctOption3: yup
                .string()
                .required("correctOption phải có giá trị."),

            questionType0: yup.string().required("Loại phải được chọn."),
            questionType1: yup.string().required("Loại phải được chọn."),
            questionType2: yup.string().required("Loại phải được chọn."),
            questionType3: yup.string().required("Loại phải được chọn."),

            questionExplanation0: yup
                .string()
                .required("questionExplanation phải có giá trị.")
                .min(2, "questionExplanation phải ít nhất 2 ký tự.")
                .max(1000, "questionExplanation có nhiều nhất 1000 ký tự."),
            questionExplanation1: yup
                .string()
                .required("questionExplanation phải có giá trị.")
                .min(2, "questionExplanation phải ít nhất 2 ký tự.")
                .max(1000, "questionExplanation có nhiều nhất 1000 ký tự."),
            questionExplanation2: yup
                .string()
                .required("questionExplanation phải có giá trị.")
                .min(2, "questionExplanation phải ít nhất 2 ký tự.")
                .max(1000, "questionExplanation có nhiều nhất 1000 ký tự."),
            questionExplanation3: yup
                .string()
                .required("questionExplanation phải có giá trị.")
                .min(2, "questionExplanation phải ít nhất 2 ký tự.")
                .max(1000, "questionExplanation có nhiều nhất 1000 ký tự."),

        });

        const addQuestion = async () => {
            try {
                // Tạo thông tin nhóm câu hỏi
                const groupFormData = new FormData();
                groupFormData.append("sectionId", props.sectionId);
                groupFormData.append("groupPassage", questionLocal.groupPassage);
                console.log(questionLocal.groupPassage)
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
                    formData.append("optionA", question.optionA);
                    formData.append("optionB", question.optionB);
                    formData.append("optionC", question.optionC);
                    formData.append("optionD", question.optionD);

                    // formData.append("correctOption", question.correctOption);
                    // Xác định đáp án được chọn và đặt giá trị cho correctOption
                    switch (question.correctOption) {
                        case "A":
                            formData.append("correctOption", question.optionA);
                            break;
                        case "B":
                            formData.append("correctOption", question.optionB);
                            break;
                        case "C":
                            formData.append("correctOption", question.optionC);
                            break;
                        case "D":
                            formData.append("correctOption", question.optionD);
                            break;
                        default:
                            formData.append("correctOption", ""); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
                    }

                    formData.append("questionType", question.questionType);
                    formData.append("questionExplanation", question.questionExplanation);

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

        const onEditorReady = (editor) => {
            // Thay đổi chiều cao
            editor.editing.view.change(writer => {
                writer.setStyle('height', '170px', editor.editing.view.document.getRoot());
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
  
  
        