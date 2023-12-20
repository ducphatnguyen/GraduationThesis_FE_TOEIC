<template>
    <div>
        <div class="d-flex justify-content-center mt-4">
            <button class="button" @click="setNumberOfQuestions(2)">2 Câu Hỏi</button>
            <button class="button mx-3" @click="setNumberOfQuestions(3)">3 Câu Hỏi</button>
            <button class="button" @click="setNumberOfQuestions(4)">4 Câu Hỏi</button>
        </div>

        <Form @submit="addQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="groupImage">Question Group Image<span class="required-field">*</span></label>
                    <Field type="file" name="groupImage" class="form-control border-secondary custom-font"
                        @change="onImageChange" as="input" v-model="questionLocal.groupImage" />
                    <ErrorMessage name="groupImage" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="groupPassage" class="form-label">Question Group Passage<span
                            class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="questionLocal.groupPassage" @ready="onEditorReady"
                        class="form-control border-secondary custom-font" />
                    <ErrorMessage name="groupPassage" class="error-feedback" />
                </div>
                <hr />
                <div class="row">
                    <div v-for="(question, index) in questionLocal.questions" :key="index" class="col-md-6 mb-4">
                        <div class="form-group">
                            <label :for="'questionContent' + index">Question Content {{ index + 1 }}<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionContent' + index" type="text"
                                class="form-control border-secondary custom-font" v-model="question.questionContent" />
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

                        <div class="form-group">
                            <label :for="'questionExplanation' + index">Question Explanation {{ index + 1 }}<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionExplanation' + index" type="text"
                                class="form-control border-secondary custom-font" v-model="question.questionExplanation" />
                            <ErrorMessage :name="'questionExplanation' + index" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label :for="'questionType' + index" class="form-label">Type<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionType' + index" :id="'questionType' + index"
                                class="form-select border-secondary custom-font" v-model="question.questionType"
                                as="select">
                                <option value="" disabled>Select an option</option>
                                <option value="[Part 7] Câu hỏi điền câu">[Part 7] Câu hỏi điền câu</option>
                                <option value="[Part 7] Câu hỏi suy luận">[Part 7] Câu hỏi suy luận</option>
                                <option value="[Part 7] Câu hỏi tìm thông tin">[Part 7] Câu hỏi tìm thông tin</option>
                                <option value="[Part 7] Câu hỏi tìm chi tiết sai">[Part 7] Câu hỏi tìm chi tiết sai</option>
                                <option value="[Part 7] Câu hỏi tìm từ đồng nghĩa">[Part 7] Câu hỏi tìm từ đồng nghĩa
                                </option>
                                <option value="[Part 7] Câu hỏi về chủ đề, mục đích">[Part 7] Câu hỏi về chủ đề, mục đích
                                </option>
                                <option value="[Part 7] Câu hỏi về hàm ý câu nói">[Part 7] Câu hỏi về hàm ý câu nói</option>
                            </Field>
                            <ErrorMessage :name="'questionType' + index" class="error-feedback" />
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
import { defineComponent, reactive, ref } from "vue";

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
        retrieveQuestions: { type: Function, required: true }, 
    },
    setup(props) {

        const numberOfQuestions = ref(2); // Mặc định số câu hỏi là 2
        // Cập nhật số câu hỏi khi người dùng chọn
        const setNumberOfQuestions = (count) => {
            numberOfQuestions.value = count;
            // Cập nhật danh sách câu hỏi dựa trên số câu hỏi mới
            questionLocal.questions = Array.from({ length: count }, () => ({
                questionContent: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correctOption: "",
                questionType: "",
                questionExplanation: "",
            }));
        };

        const questionLocal = reactive({
            groupImage: null,
            groupPassage: "",
            questions: Array.from({ length: numberOfQuestions.value }, () => ({
                questionContent: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correctOption: "",
                questionType: "",
                questionExplanation: "",
            })),
        });

        const questionFormSchema = yup.object().shape({
            groupImage: yup
                .mixed()
                .required("Vui lòng chọn một tệp ảnh.") // Ràng buộc yêu cầu chọn ảnh
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

        const addQuestion = async () => {
            try {
                // Tạo thông tin nhóm câu hỏi
                const groupFormData = new FormData();
                groupFormData.append("sectionId", props.sectionId);
                if (questionLocal.groupImage) {
                    groupFormData.append("groupImage", questionLocal.groupImage, questionLocal.groupImage.name);
                }
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
                toast.success('Thêm Questions thành công ', {
                    autoClose: 1000,
                });
                props.retrieveQuestions();

            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm Questions', {
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
            numberOfQuestions,
            setNumberOfQuestions,
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
button {
    display: inline-block;
    padding: 10px;
    background-color: #052649;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 20px;
    transition: background-color 0.3s, color 0.3s;
}
.button:hover {
    background-color: #fff;
    color: #052649;
}
button i {
    font-size: 20px;
    color: #000;
}
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
  
  
        