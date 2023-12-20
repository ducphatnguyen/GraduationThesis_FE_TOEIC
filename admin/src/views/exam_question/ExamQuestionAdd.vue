<template>
    <div>
        <Form @submit="addExamQuestion" :validation-schema="examQuestionFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">

                <div class="form-group mb-3">
                    <label for="image" class="form-label">Image<span class="required-field">*</span></label>
                    <input name="questionImage" id="image" class="form-control border-secondary custom-font" type="file"
                        ref="imageInput" multiple />
                    <!-- <ErrorMessage name="image" class="error-feedback" /> -->
                </div>
                <div class="form-group mb-3">
                    <label for="audio" class="form-label">Audio<span class="required-field">*</span></label>
                    <input name="questionAudio" id="audio" class="form-control border-secondary custom-font" type="file"
                        ref="audioInput" multiple />
                    <!-- <ErrorMessage name="audio" class="error-feedback" /> -->
                </div>
                <div class="form-group mb-3">
                    <label for="excelInput" class="form-label">Import Excel<span class="required-field">*</span></label>
                    <input name="file" id="excelInput" class="form-control border-secondary custom-font" type="file"
                        ref="excelInput" accept=".xlsx, .xls"/>
                </div>
                <!-- <div class="form-group mb-3">
                    <label for="excelInput" class="btn btn-success mb-3 text-white">
                        <i class="fas fa-file-import text-white"></i> Import
                    </label>
                    <input id="excelInput" name="file" type="file" ref="excelInput" style="display: none;"
                        accept=".xlsx, .xls" class="text-white" />
                </div> -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button class="btn btn-primary" :disabled="loadingState">
                    Lưu
                    <span v-if="loadingState" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                    <span v-if="loadingState" class="visually-hidden">Loading...</span>
                </button>

            </div>
        </Form>
    </div>
</template>
  
<script>
import { defineComponent, ref } from "vue";

import ExamQuestionService from "@/services/exam_question.service";

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
        examId: { type: String, required: true }, 
        retrieveExamQuestions: { type: Function, required: true },
    },
    setup(props) {

        console.log(props.examId)

        const examQuestionFormSchema = yup.object().shape({
            // name: yup
            //     .string()
            //     .required("Tên phải có giá trị.")
            //     .min(2, "Tên phải ít nhất 2 ký tự.")
            //     .max(50, "Tên có nhiều nhất 50 ký tự."),
            // description: yup
            //     .string()
            //     .required("Mô tả phải có giá trị.")
            //     .min(2, "Mô tả phải ít nhất 2 ký tự.")
            //     .max(255, "Mô tả không được vượt quá 255 ký tự."),
            // type: yup.string().required("Loại phải được chọn."),
            // image: yup
            //     .mixed()
            //     .required("Vui lòng chọn một tệp ảnh.") // Ràng buộc yêu cầu chọn ảnh
            //     .test("fileType", "Chỉ chấp nhận tệp ảnh jpeg, png hoặc gif", (value) => {
            //         if (!value) return true; // Bỏ qua nếu không có tệp
            //         const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
            //         return allowedFormats.includes(value.type); // Kiểm tra định dạng tệp
            //     })
            //     .test("fileSize", "Tệp ảnh quá lớn", (value) => {
            //         if (!value) return true; // Bỏ qua nếu không có tệp
            //         return value.size <= 1024 * 1024; // Kiểm tra kích thước tệp (ví dụ: 1 MB)
            //     }),
        });

        const excelInput = ref(null);
        const imageInput = ref(null);
        const audioInput = ref(null);

        const loadingState = ref(false);
        const addExamQuestion = async () => {

            try {
                loadingState.value = true; // Spinner
                console.log(props.examId)
                // Lấy tất cả các tệp tin hình ảnh và âm thanh
                const imageFiles = imageInput.value.files;
                const audioFiles = audioInput.value.files;
                const excelFile = excelInput.value.files[0]; // Lấy tệp Excel đầu tiên

                // Kiểm tra xem đã chọn ít nhất một tệp trong mỗi loại
                if (imageFiles.length === 0 || audioFiles.length === 0 || !excelFile) {
                    return;
                }

                // Xử lý tất cả các tệp tin hình ảnh
                for (let i = 0; i < imageFiles.length; i++) {
                    const imageFile = imageFiles[i];
                    console.log("Image File:", imageFile);
                    const imageResponse = await ExamQuestionService.uploadExamQuestionImages(imageFile);
                    console.log("Image Response:", imageResponse);
                }

                // Xử lý tất cả các tệp tin âm thanh
                for (let i = 0; i < audioFiles.length; i++) {
                    const audioFile = audioFiles[i];
                    console.log("Audio File:", audioFile);
                    const audioResponse = await ExamQuestionService.uploadExamQuestionAudios(audioFile);
                    console.log("Audio Response:", audioResponse);
                }

                const excelResponse = await ExamQuestionService.importTemplate(excelFile, props.examId);
                console.log(excelResponse)

                props.retrieveExamQuestions();

                imageInput.value.value = '';
                audioInput.value.value = '';
                excelInput.value.value = '';

                toast.success('Import 200 câu hỏi thành công ', {
                    autoClose: 1000
                });

            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi Import 200 câu hỏi', {
                    autoClose: 1000
                });
            }
            finally {
                loadingState.value = false; 
            }
        };

        return {
            examQuestionFormSchema,
            addExamQuestion,
            excelInput,
            imageInput,
            audioInput,
            loadingState
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
  