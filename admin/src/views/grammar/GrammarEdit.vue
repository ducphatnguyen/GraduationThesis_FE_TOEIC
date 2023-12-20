<template>
    <div v-if="grammar">
        <Form @submit="updateGrammar" :validation-schema="grammarFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="grammarName" class="form-label">Grammar Name<span class="required-field">*</span></label>
                    <Field name="grammarName" type="text" class="form-control border-secondary custom-font" 
                        v-model="grammarLocal.grammarName" />
                    <ErrorMessage name="name" class="error-feedback" />
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

import GrammarService from "@/services/grammar.service";

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
        grammarId: { type: Number, required: true },
        retrieveGrammars: { type: Function, required: true }, 
    },

    setup(props) {
        const grammar = ref(null);
        const grammarLocal = reactive({}); 

        const grammarFormSchema = yup.object().shape({
            grammarName: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });

        const getGrammar = async () => {
            try {
                const data = await GrammarService.get(props.grammarId);
                grammarLocal.grammarName = data.grammarName;
                // grammarLocal.image = null; // Bắt đầu với ảnh null để không cập nhật ảnh nếu không có thay đổi
                grammar.value = data;
            } catch (error) {
                console.log(error);
            }
        };

        const updateGrammar = async () => {
            try {
                const formData = new FormData();
                formData.append("grammarName", grammarLocal.grammarName);
                if (grammarLocal.image) {
                    formData.append("image", grammarLocal.image, grammarLocal.image.name);
                }
                await GrammarService.update(props.grammarId, formData);
                props.retrieveGrammars();
                toast.success('Chỉnh sửa Grammar thành công ', {
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
        onMounted(async () => {
            await getGrammar();
        });
        return {
            grammarLocal,
            grammar,
            grammarFormSchema,
            updateGrammar,
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
