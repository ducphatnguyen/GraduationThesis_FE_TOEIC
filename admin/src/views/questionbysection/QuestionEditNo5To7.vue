<template>
    <div v-if="question">
        <Form :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="groupText" class="form-label">Question Group Text<span
                            class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="questionLocal.groupText" @ready="onEditorReady"
                        class="form-control border-secondary custom-font" />
                    <ErrorMessage name="groupText" class="error-feedback" />
                </div>
                <!-- Thêm một button để cập nhật thông tin Question Group -->
                <button type="button" class="btn btn-secondary" @click="updateQuestionGroup">Update Question Group</button>
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
                        suggestedAnswer: item.suggestedAnswer,
                    };
                    // Thêm câu hỏi vào mảng
                    questions.push(questionItem);
                }
                console.log(questions)
                // Gán mảng câu hỏi và giá trị groupScript từ dữ liệu API
                questionLocal.questions = questions;
                questionLocal.groupText = data[0].questionGroup.groupText;
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
                    formData.append("suggestedAnswer", questionToUpdate.suggestedAnswer);
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
                groupFormData.append("groupText", questionLocal.groupText);
                // Sử dụng QuestionGroupService để cập nhật thông tin Question Group
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
    