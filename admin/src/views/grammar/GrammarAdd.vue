<template>
    <div>
        <Form @submit="addGrammar" :validation-schema="grammarFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="grammarName" class="form-label">Grammar Name<span class="required-field">*</span></label>
                    <Field name="grammarName" id="grammarName" type="text" class="form-control border-secondary custom-font" 
                        v-model="grammarLocal.grammarName" />
                    <ErrorMessage name="name" class="error-feedback" />
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
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import GrammarService from "@/services/grammar.service";
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
        retrieveGrammars: { type: Function, required: true }, 
    },
    setup(props) {
        const grammarLocal = reactive({});

        const grammarFormSchema = yup.object().shape({
            grammarName: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });

        const addGrammar = async () => {
            try {
                const formData = new FormData();
                formData.append("grammarName", grammarLocal.grammarName);
                await GrammarService.create(formData);
                props.retrieveGrammars();
                toast.success('Thêm ngữ pháp thành công ', {
                    autoClose: 1000,
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

        return {
            grammarLocal,
            grammarFormSchema,
            addGrammar,
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
  