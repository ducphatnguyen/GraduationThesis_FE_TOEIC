<template>
    <div v-if="question">
        <Form :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">

                <div class="form-group mb-3">
                    <label for="groupPassage" class="form-label">Question Group Passage<span
                            class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="questionLocal.groupPassage" @ready="onEditorReady"
                        class="form-control border-secondary custom-font" />
                    <ErrorMessage name="groupPassage" class="error-feedback" />
                </div>

                <!-- Thêm một button để cập nhật thông tin Question Group -->
                <button type="button" class="btn btn-secondary" @click="updateQuestionGroup">Update Question Group</button>
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
                                    <input :name="'correctOption' + index" :id="'correctOption' + option + index"
                                        type="radio" class="form-check-input" :value="option"
                                        v-model="question.correctOption"
                                        :checked="question.correctOption === question['option' + option]" />
                                    <label class="form-check-label" :for="'correctOption' + option + index">{{ option
                                    }}</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label :for="'questionType' + index" class="form-label">Type<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionType' + index" :id="'questionType' + index"
                                class="form-select border-secondary custom-font" v-model="question.questionType"
                                as="select">
                                <option value="" disabled>Select an option</option>
                                <option value="[Part 6] Hình thức: Bài báo (Article/ Review)">[Part 6] Hình thức: Bài báo
                                    (Article/ Review)</option>
                                <option value="[Part 6] Hình thức: Quảng cáo (Advertisement)">[Part 6] Hình thức: Quảng cáo
                                    (Advertisement)</option>
                                <option value="[Part 6] Hình thức: Thư điện tử/ thư tay (Email/ Letter)">[Part 6] Hình thức:
                                    Thư điện tử/ thư tay (Email/ Letter)</option>
                            </Field>
                            <ErrorMessage :name="'questionType' + index" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label :for="'questionExplanation' + index">Question Explanation {{ index + 1 }}<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionExplanation' + index" type="text"
                                class="form-control border-secondary custom-font " v-model="question.questionExplanation" />
                            <ErrorMessage :name="'questionExplanation' + index" class="error-feedback" />
                        </div>

                        <button type="button" class="btn btn-secondary mt-2"
                            @click="updateQuestion(question.questionId)">Save</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
            </div>
        </Form>
    </div>
</template>
    
<script>
import { defineComponent, onMounted, ref, reactive } from "vue";

import QuestionService from "@/services/question.service";
import QuestionGroupService from "@/services/question_group.service";

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
        groupId: { type: Number, required: true },
        retrieveQuestions: { type: Function, required: true }, // Nhận prop retrieveSections
    },

    setup(props) {
        const question = ref(null);
        const questionLocal = reactive({});
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
                .max(500, "OptionA có nhiều nhất 500 ký tự."),
            optionA1: yup
                .string()
                .required("OptionA phải có giá trị.")
                .min(2, "OptionA phải ít nhất 2 ký tự.")
                .max(500, "OptionA có nhiều nhất 500 ký tự."),
            optionA2: yup
                .string()
                .required("OptionA phải có giá trị.")
                .min(2, "OptionA phải ít nhất 2 ký tự.")
                .max(500, "OptionA có nhiều nhất 500 ký tự."),
            optionA3: yup
                .string()
                .required("OptionA phải có giá trị.")
                .min(2, "OptionA phải ít nhất 2 ký tự.")
                .max(500, "OptionA có nhiều nhất 500 ký tự."),

            optionB0: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 500 ký tự."),
            optionB1: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 500 ký tự."),
            optionB2: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 500 ký tự."),
            optionB3: yup
                .string()
                .required("OptionB phải có giá trị.")
                .min(2, "OptionB phải ít nhất 2 ký tự.")
                .max(500, "OptionB có nhiều nhất 500 ký tự."),

            optionC0: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 500 ký tự."),
            optionC1: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 500 ký tự."),
            optionC2: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 500 ký tự."),
            optionC3: yup
                .string()
                .required("OptionC phải có giá trị.")
                .min(2, "OptionC phải ít nhất 2 ký tự.")
                .max(500, "OptionC có nhiều nhất 500 ký tự."),

            optionD0: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 500 ký tự."),
            optionD1: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 500 ký tự."),
            optionD2: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 500 ký tự."),
            optionD3: yup
                .string()
                .required("OptionD phải có giá trị.")
                .min(2, "OptionD phải ít nhất 2 ký tự.")
                .max(500, "OptionD có nhiều nhất 500 ký tự."),

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

        console.log(props.groupId)

        // Sử dụng async/await để lấy dữ liệu
        const getQuestion = async () => {
            try {
                // Truyền giá trị trong đối tượng cho câu hỏi -> form
                const data = await QuestionService.getQuestionsByQuestionGroup(props.groupId);
                console.log(data);
                // Khởi tạo một mảng để lưu trữ các câu hỏi
                const questions = [];
                // Lặp qua dữ liệu từ API và tạo các đối tượng câu hỏi
                for (const item of data) {
                    const questionItem = {
                        questionId: item.questionId, // Thêm trường questionId
                        questionContent: item.questionContent,
                        optionA: item.optionA,
                        optionB: item.optionB,
                        optionC: item.optionC,
                        optionD: item.optionD,
                        correctOption: item.correctOption,
                        questionType: item.questionType,
                        questionExplanation: item.questionExplanation,
                    };
                    // Thêm câu hỏi vào mảng
                    questions.push(questionItem);
                }
                console.log(questions)
                // Gán mảng câu hỏi và giá trị groupScript từ dữ liệu API
                questionLocal.questions = questions;
                questionLocal.groupPassage = data[0].questionGroup.groupPassage;
                // Gán câu hỏi đầu tiên vào question (nếu cần)
                question.value = data[0];
                console.log(questionLocal)
            } catch (error) {
                console.log(error);
            }
        };

        const updateQuestion = async (questionId) => {
            try {
                console.log(questionId);
                const formData = new FormData();
                formData.append("sectionId", props.sectionId);
                formData.append("questionId", questionId); // Sử dụng questionId để xác định câu hỏi cần cập nhật
                // Tìm câu hỏi trong questionLocal.questions dựa trên questionId
                const questionToUpdate = questionLocal.questions.find(q => q.questionId === questionId);
                if (questionToUpdate) {
                    formData.append("questionContent", questionToUpdate.questionContent);
                    formData.append("optionA", questionToUpdate.optionA);
                    formData.append("optionB", questionToUpdate.optionB);
                    formData.append("optionC", questionToUpdate.optionC);
                    formData.append("optionD", questionToUpdate.optionD);

                    // formData.append("correctOption", questionToUpdate.correctOption);
                    // Xác định đáp án được chọn và đặt giá trị cho correctOption
                    switch (questionToUpdate.correctOption) {
                        case "A":
                            formData.append("correctOption", questionToUpdate.optionA);
                            break;
                        case "B":
                            formData.append("correctOption", questionToUpdate.optionB);
                            break;
                        case "C":
                            formData.append("correctOption", questionToUpdate.optionC);
                            break;
                        case "D":
                            formData.append("correctOption", questionToUpdate.optionD);
                            break;
                        default:
                            formData.append("correctOption", questionToUpdate.correctOption);
                    }

                    formData.append("questionType", questionToUpdate.questionType);
                    formData.append("questionExplanation", questionToUpdate.questionExplanation);
                }

                // Sử dụng QuestionService để cập nhật câu hỏi dựa trên questionId
                await QuestionService.update(questionId, formData);

                toast.success('Chỉnh sửa câu hỏi thành công ', {
                    autoClose: 1000,
                });
                props.retrieveQuestions();
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi chỉnh sửa câu hỏi', {
                    autoClose: 1000,
                });
            }
        };

        const updateQuestionGroup = async () => {
            try {
                const groupFormData = new FormData();
                groupFormData.append("groupPassage", questionLocal.groupPassage);

                await QuestionGroupService.update(props.groupId, groupFormData);

                toast.success('Chỉnh sửa nhóm thành công', {
                    autoClose: 1000,
                });
                props.retrieveQuestions();

            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi chỉnh sửa nhóm', {
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
            updateQuestion,
            updateQuestionGroup,
            questionFormSchema,
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
    