<template>
    <div class="page">
        <Form @submit="addTest" :validation-schema="testFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="testName" class="form-label">Test Name<span class="required-field">*</span></label>
                    <Field name="testName" id="testName" type="text" class="form-control border-secondary custom-font"
                        v-model="testLocal.testName" />
                    <ErrorMessage name="testName" class="error-feedback" />
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

import TestService from "@/services/test.service";

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
        sectionId: { type: String, required: true }, // Khai báo props sectionId
        retrieveTests: { type: Function, required: true }, // Nhận prop retrieveSections
    },
    setup(props) {
        const testLocal = reactive({});
        const testFormSchema = yup.object().shape({
            testName: yup
                .string()
                .required("Tên bài học phải có giá trị.")
                .min(2, "Tên bài học phải ít nhất 2 ký tự.")
                .max(100, "Tên bài học có nhiều nhất 100 ký tự."),
        });

        const addTest = async () => {
            try {
                await TestService.create(props.sectionId, testLocal);
                props.retrieveTests();
                toast.success('Thêm bài kiểm tra thành công ', {
                    autoClose: 1000
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm bài kiểm tra', {
                    autoClose: 1000
                });
            }
        };

        return {
            testLocal,
            testFormSchema,
            addTest,
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