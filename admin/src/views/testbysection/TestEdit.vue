<template>
    <div v-if="test">
        <Form @submit="updateTest" :validation-schema="testFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="testName" class="form-label">Test Name<span class="required-field">*</span></label>
                    <Field name="testName" type="text" class="form-control border-secondary custom-font"
                        v-model="testLocal.testName" />
                    <ErrorMessage name="testName" class="error-feedback" />
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
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import TestService from "@/services/test.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    props: {
        testId: { type: Number, required: true },
        retrieveTests: { type: Function, required: true },
        sectionId: { type: String, required: true },
    },

    setup(props) {

        const test = ref(null);
        const testLocal = reactive({ });

        const testFormSchema = yup.object().shape({
            testName: yup
                .string()
                .required("Tên bài học phải có giá trị.")
                .min(2, "Tên bài học phải ít nhất 2 ký tự.")
                .max(100, "Tên bài học có nhiều nhất 100 ký tự."),
        });

        const getTest = async () => {
            try {
                const data = await TestService.get(props.testId);
                testLocal.testName = data.testName;
                test.value = data;
                console.log(test.value)
            } catch (error) {
                console.log(error);
            }
        };

        const updateTest = async (data) => { 
            try {
                data.sectionId = props.sectionId;
                await TestService.update(props.testId, data); 
                props.retrieveTests();
                toast.success('Chỉnh sửa bài kiểm tra thành công ', {
                    autoClose: 1000
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi chỉnh sửa bài kiểm tra', {
                    autoClose: 1000
                });
            }
        };

        onMounted(async () => {
            await getTest();
        });

        return {
            testLocal,
            test,
            testFormSchema,
            updateTest,
            getTest
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
