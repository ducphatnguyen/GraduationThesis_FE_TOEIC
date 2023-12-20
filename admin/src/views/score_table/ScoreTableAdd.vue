<!-- <template>
    <div>
        <Form @submit="addExam" :validation-schema="examFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="examName" class="form-label">Exam Name<span class="required-field">*</span></label>
                    <Field name="examName" id="examName" type="text" class="form-control border-secondary custom-font"
                        v-model="examLocal.examName" />
                    <ErrorMessage name="examName" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="examType" class="form-label">Type<span class="required-field">*</span></label>
                    <Field name="examType" id="examType" class="form-select border-secondary custom-font" v-model="examLocal.examType"
                        as="select">
                        <option value="" disabled>Select an option</option>
                        <option value="0">MiniTest</option>
                        <option value="1">FullTest</option>
                    </Field>
                    <ErrorMessage name="examType" class="error-feedback" />
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
import { defineComponent, ref, reactive } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import ExamService from "@/services/exam.service";
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
        retrieveExams: { type: Function, required: true }, 
    },
    setup(props) {
        const examLocal = reactive({});

        const examFormSchema = yup.object().shape({
            examName: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
                examType: yup.string().required("Loại phải được chọn."),
        });

        const addExam = async () => {
            try {
                const formData = new FormData();
                console.log(examLocal.examName)
                console.log(examLocal.examType)
                formData.append("examName", examLocal.examName);
                formData.append("examType", examLocal.examType);
                await ExamService.create(formData);
                props.retrieveExams();
                toast.success('Thêm Exam thành công ', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                // Hiển thị toast 
                const jsonResponse = JSON.parse(error.request.response);
                toast.error(jsonResponse.message, {
                    autoClose: 2000,
                    position: 'top-right',
                });
            }
        };
        return {
            examLocal,
            examFormSchema,
            addExam,
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
   -->
<template>
    <div>

    </div>
</template>