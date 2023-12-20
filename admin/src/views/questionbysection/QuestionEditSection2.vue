<template>
    <div v-if="question">
        <Form @submit="updateQuestion" :validation-schema="questionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="row">
                    <div class="col">
                        <div class="form-group mb-3">
                            <label for="optionA" class="form-label">Option A<span class="required-field">*</span></label>
                            <Field name="optionA" id="optionA" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.optionA" />
                            <ErrorMessage name="optionA" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="optionB" class="form-label">Option B<span class="required-field">*</span></label>
                            <Field name="optionB" id="optionB" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.optionB" />
                            <ErrorMessage name="optionB" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="optionC" class="form-label">Option C<span class="required-field">*</span></label>
                            <Field name="optionC" id="optionC" type="text" class="form-control border-secondary custom-font"
                                v-model="questionLocal.optionC" />
                            <ErrorMessage name="optionC" class="error-feedback" />
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
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="questionType" class="form-label">Type<span class="required-field">*</span></label>
                            <Field name="questionType" id="questionType" class="form-select border-secondary custom-font"
                                v-model="questionLocal.questionType" as="select">
                                <option value="" disabled>Select an option</option>
                                <option value="[Part 2] Câu hỏi đuôi">[Part 2] Câu hỏi đuôi</option>
                                <option value="[Part 2] Câu hỏi HOW">[Part 2] Câu hỏi HOW</option>
                                <option value="[Part 2] Câu hỏi lựa chọn">[Part 2] Câu hỏi lựa chọn</option>
                                <option value="[Part 2] Câu hỏi WHAT">[Part 2] Câu hỏi WHAT</option>
                                <option value="[Part 2] Câu hỏi WHEN">[Part 2] Câu hỏi WHEN</option>
                                <option value="[Part 2] Câu hỏi WHERE">[Part 2] Câu hỏi WHERE</option>
                                <option value="[Part 2] Câu hỏi WHO">[Part 2] Câu hỏi WHO</option>
                                <option value="[Part 2] Câu hỏi WHY">[Part 2] Câu hỏi WHY</option>
                                <option value="[Part 2] Câu hỏi YES/NO">[Part 2] Câu hỏi YES/NO</option>
                                <option value="[Part 2] Câu trần thuật">[Part 2] Câu trần thuật</option>
                                <option value="[Part 2] Câu yêu cầu, đề nghị">[Part 2] Câu yêu cầu, đề nghị</option>
                            </Field>
                            <ErrorMessage name="questionType" class="error-feedback" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group mb-3">
                            <label for="questionAudio" class="form-label">Question Audio<span
                                    class="required-field">*</span></label>
                            <Field name="questionAudio" id="questionAudio" class="form-control border-secondary custom-font"
                                v-model="questionLocal.questionAudio" as="input" type="file" @change="onAudioChange" />
                            <ErrorMessage name="questionAudio" class="error-feedback" />
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label">Question Script<span class="required-field">*</span></label>
                            <ckeditor :editor="editor" v-model="questionLocal.questionScript" @ready="onEditorReady"
                                class="form-control border-secondary custom-font" />
                            <ErrorMessage name="questionScript" class="error-feedback" />
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
            questionAudio: yup
                .mixed()
                // .required("Vui lòng chọn một tệp âm thanh.") 
                .test("fileType", "Chỉ chấp nhận tệp âm thanh MP3", (value) => {
                    if (!value) return true; 
                    const allowedFormats = ["audio/mpeg"];
                    return allowedFormats.includes(value.type); 
                })
                .test("fileSize", "Tệp âm thanh quá lớn", (value) => {
                    if (!value) return true; 
                    return value.size <= 1024 * 1024 * 10; 
                }),
                
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
            questionType: yup.string().required("Loại phải được chọn."),
        });

        const onAudioChange = (event) => {
            const file = event.target.files[0];
            questionLocal.questionAudio = file;
        };

        const onEditorReady = (editor) => {
            // Thay đổi chiều cao
            editor.editing.view.change(writer => {
                writer.setStyle('height', '250px', editor.editing.view.document.getRoot());
            });
        };

        const getQuestion = async () => {
            try {
                // Truyền giá trị trong đối tượng cho section -> form
                const data = await QuestionService.get(props.questionId);
                questionLocal.optionA = data.optionA;
                questionLocal.optionB = data.optionB;
                questionLocal.optionC = data.optionC;
                questionLocal.correctOption = data.correctOption;
                questionLocal.questionType = data.questionType;
                questionLocal.questionScript = data.questionScript;
                // questionLocal.questionAudio = null; // Bắt đầu với ảnh null để không cập nhật ảnh nếu không có thay đổi
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
                formData.append("optionA", questionLocal.optionA);
                formData.append("optionB", questionLocal.optionB);
                formData.append("optionC", questionLocal.optionC);

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
                    default:
                        formData.append("correctOption", questionLocal.correctOption); // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
                }

                formData.append("questionType", questionLocal.questionType);

                if (questionLocal.questionAudio) {
                    formData.append("questionAudio", questionLocal.questionAudio, questionLocal.questionAudio.name);
                }

                formData.append("questionScript", questionLocal.questionScript);
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

        return {
            questionLocal,
            question,
            onAudioChange,
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
