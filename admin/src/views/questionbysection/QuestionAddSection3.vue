<template>
    <div>
        <Form @submit="addQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="groupImage">Question Group Image<span class="required-field">*</span></label>
                    <Field type="file" id="groupImage" name="groupImage" class="form-control border-secondary custom-font"
                        @change="onImageChange" as="input" v-model="questionLocal.groupImage" />
                    <ErrorMessage name="groupImage" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="groupAudio">Question Group Audio<span class="required-field">*</span></label>
                    <Field type="file" id="groupAudio" name="groupAudio" class="form-control border-secondary custom-font"
                        @change="onAudioChange" as="input" v-model="questionLocal.groupAudio" />
                    <ErrorMessage name="groupAudio" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label class="form-label">Question Group Script<span class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="questionLocal.groupScript" @ready="onEditorReady"
                        class="form-control border-secondary custom-font" />
                    <ErrorMessage name="groupScript" class="error-feedback" />
                </div>

                <hr>

                <div class="row">
                    <div v-for="(question, index) in questionLocal.questions" :key="index" class="col-md-4">
                        <div class="form-group">
                            <label :for="'questionContent' + index">Question Content {{ index + 1 }}<span
                                    class="required-field">*</span></label>
                            <Field :name="'questionContent' + index" :id="'questionContent' + index" type="text"
                                class="form-control border-secondary custom-font " v-model="question.questionContent" />
                            <ErrorMessage :name="'questionContent' + index" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <label :for="'optionA' + index">Option A<span class="required-field">*</span></label>
                            <Field :name="'optionA' + index" :id="'optionA' + index" type="text"
                                class="form-control border-secondary custom-font" v-model="question.optionA" />
                            <ErrorMessage :name="'optionA' + index" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label :for="'optionB' + index">Option B<span class="required-field">*</span></label>
                            <Field :name="'optionB' + index" :id="'optionB' + index" type="text"
                                class="form-control border-secondary custom-font" v-model="question.optionB" />
                            <ErrorMessage :name="'optionB' + index" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label :for="'optionC' + index">Option C<span class="required-field">*</span></label>
                            <Field :name="'optionC' + index" :id="'optionC' + index" type="text"
                                class="form-control border-secondary custom-font" v-model="question.optionC" />
                            <ErrorMessage :name="'optionC' + index" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label :for="'optionD' + index">Option D<span class="required-field">*</span></label>
                            <Field :name="'optionD' + index" :id="'optionD' + index" type="text"
                                class="form-control border-secondary custom-font" v-model="question.optionD" />
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
                                <option value="[Part 3] Câu hỏi kết hợp bảng biểu">[Part 3] Câu hỏi kết hợp bảng biểu
                                </option>
                                <option value="[Part 3] Câu hỏi về chi tiết cuộc hội thoại">[Part 3] Câu hỏi về chi tiết
                                    cuộc hội thoại</option>
                                <option value="[Part 3] Câu hỏi về chủ đề, mục đích">[Part 3] Câu hỏi về chủ đề, mục đích
                                </option>
                                <option value="[Part 3] Câu hỏi về danh tính người nói">[Part 3] Câu hỏi về danh tính người
                                    nói</option>
                                <option value="[Part 3] Câu hỏi về địa điểm hội thoại">[Part 3] Câu hỏi về địa điểm hội
                                    thoại</option>
                                <option value="[Part 3] Câu hỏi về hàm ý câu nói">[Part 3] Câu hỏi về hàm ý câu nói</option>
                                <option value="[Part 3] Câu hỏi về hành động tương lai">[Part 3] Câu hỏi về hành động tương
                                    lai</option>
                                <option value="[Part 3] Câu hỏi về yêu cầu, gợi ý">[Part 3] Câu hỏi về yêu cầu, gợi ý
                                </option>
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
import { defineComponent, reactive } from "vue";

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
        retrieveQuestions: { type: Function, required: true }, // Nhận prop retrieveSections
    },
    setup(props) {

        const questionLocal = reactive({
            // Dữ liệu của nhóm câu hỏi, bao gồm các câu hỏi con
            groupImage: null,
            groupAudio: null,
            groupScript: "",
            questions: [
                {
                    questionContent: "",
                    optionA: "",
                    optionB: "",
                    optionC: "",
                    optionD: "",
                    correctOption: "",
                    questionType: "",
                },
                {
                    questionContent: "",
                    optionA: "",
                    optionB: "",
                    optionC: "",
                    optionD: "",
                    correctOption: "",
                    questionType: "",
                },
                {
                    questionContent: "",
                    optionA: "",
                    optionB: "",
                    optionC: "",
                    optionD: "",
                    correctOption: "",
                    questionType: "",
                },
            ],
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

            groupAudio: yup
                .mixed()
                .required("Vui lòng chọn một tệp âm thanh.")
                .test("fileType", "Chỉ chấp nhận tệp âm thanh MP3", (value) => {
                    if (!value) return true;
                    const allowedFormats = ["audio/mpeg"];
                    return allowedFormats.includes(value.type);
                })
                .test("fileSize", "Tệp âm thanh quá lớn", (value) => {
                    if (!value) return true;
                    return value.size <= 1024 * 1024 * 10;
                }),

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

            correctOption0: yup
                .string()
                .required("correctOption phải có giá trị."),
            correctOption1: yup
                .string()
                .required("correctOption phải có giá trị."),
            correctOption2: yup
                .string()
                .required("correctOption phải có giá trị."),

            questionType0: yup.string().required("Loại phải được chọn."),
            questionType1: yup.string().required("Loại phải được chọn."),
            questionType2: yup.string().required("Loại phải được chọn."),

        });

        const addQuestion = async () => {
            try {
                // Tạo thông tin nhóm câu hỏi trước
                const groupFormData = new FormData();
                groupFormData.append("sectionId", props.sectionId);
                groupFormData.append("groupImage", questionLocal.groupImage, questionLocal.groupImage.name);
                groupFormData.append("groupAudio", questionLocal.groupAudio, questionLocal.groupAudio.name);
                groupFormData.append("groupScript", questionLocal.groupScript);
                console.log(questionLocal.groupScript)
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
                            formData.append("correctOption", "");
                    }
                    formData.append("questionType", question.questionType);
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
                    // position: 'bottom-right', // Đặt vị trí ở góc dưới cùng bên phải
                });
            }
        };

        // Thay đổi hình ảnh
        const onImageChange = (event) => {
            const file = event.target.files[0];
            questionLocal.groupImage = file;
        };

        // Thay đổi âm thanh
        const onAudioChange = (event) => {
            const file = event.target.files[0];
            questionLocal.groupAudio = file;
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
            onAudioChange,
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
  
  
        