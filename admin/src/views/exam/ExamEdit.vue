<template>
    <div v-if="exam">
        <Form @submit="updateExam" :validation-schema="examFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="examName" class="form-label">Name<span class="required-field">*</span></label>
                    <Field name="examName" type="text" class="form-control border-secondary custom-font " 
                        v-model="examLocal.examName" />
                    <ErrorMessage name="examName" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="examType" class="form-label">Type<span class="required-field">*</span></label>
                    <Field name="examType" class="form-select border-secondary custom-font" v-model="examLocal.examType" as="select">
                        <option value="" disabled>Select an option</option>
                        <option value="0">MiniTest</option>
                        <option value="1">FullTest</option>
                    </Field>
                    <ErrorMessage name="examType" class="error-feedback" />
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

import ExamService from "@/services/exam.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
// Import useToast từ vue3-toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        examId: { type: Number, required: true },
        retrieveExams: { type: Function, required: true },
    },
    setup(props) {
        const exam = ref(null);
        const examLocal = reactive({}); 

        const examFormSchema = yup.object().shape({
            examName: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            examType: yup.string().required("Loại phải được chọn."),
        });
        const getExam = async () => {
            try {
                const data = await ExamService.get(props.examId);
                examLocal.examName = data.examName;
                examLocal.examType = data.examType;
                exam.value = data;
            } catch (error) {
                console.log(error);
            }
        };

        const updateExam = async () => {
            try {
                const formData = new FormData();
                formData.append("examName", examLocal.examName);
                formData.append("examType", examLocal.examType);
                await ExamService.update(props.examId, formData);
                props.retrieveExams();
                toast.success('Chỉnh sửa Exam thành công ', {
                    autoClose: 2000,
                });
            } catch (error) {
                console.log(error);
                const jsonResponse = JSON.parse(error.request.response);
                toast.error(jsonResponse.message, {
                    autoClose: 2000,
                    position: 'top-right',
                });
            }
        };
        onMounted(async () => {
            await getExam();
        });
        return {
            examLocal,
            exam,
            examFormSchema,
            updateExam,
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
