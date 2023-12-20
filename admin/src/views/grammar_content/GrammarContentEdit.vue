<template>
    <div v-if="grammarContent">
        <Form @submit="updateGrammarContent" :validation-schema="grammarContentFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="title" class="form-label">Title<span class="required-field">*</span></label>
                    <Field name="title" type="text" class="form-control border-secondary custom-font"
                        v-model="grammarContentLocal.title" />
                    <ErrorMessage name="title" class="error-feedback" />
                </div>
                <div class="form-group mb-3">
                    <label class="form-label">Content<span class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="grammarContentLocal.content" @ready="onEditorReady"
                        class="form-control border-secondary custom-font" />
                    <ErrorMessage name="content" class="error-feedback" />
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
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import GrammarContentService from "@/services/grammar_content.service";
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
        grammarContentId: { type: Number, required: true },
        retrieveGrammarContents: { type: Function, required: true },
        grammarId: { type: String, required: true },
    },

    setup(props) {

        const grammarContent = ref(null);
        const grammarContentLocal = reactive({});

        const grammarContentFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tiêu đề phải có giá trị.")
                .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
                .max(50, "Tiêu đề có nhiều nhất 50 ký tự."),
        });

        const onEditorReady = (editor) => {
            // After mounting the application change the height
            editor.editing.view.change(writer => {
                writer.setStyle('height', '250px', editor.editing.view.document.getRoot());
            });
        };

        const getGrammarContent = async () => {
            try {
                const data = await GrammarContentService.get(props.grammarContentId);
                grammarContentLocal.title = data.title;
                grammarContentLocal.content = data.content;
                grammarContent.value = data;
                console.log(grammarContent.value)
            } catch (error) {
                console.log(error);
            }
        };

        const updateGrammarContent = async (data) => {
            try {
                data.grammarId = props.grammarId;
                data.content = grammarContentLocal.content;
                console.log(data)
                await GrammarContentService.update(props.grammarContentId, data);
                props.retrieveGrammarContents();
                toast.success('Chỉnh sửa Grammar thành công ', {
                    autoClose: 1000
                    // position: 'bottom-right', // Đặt vị trí ở góc dưới cùng bên phải
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi chỉnh sửa Grammar', {
                    autoClose: 1000
                    // position: 'bottom-right', // Đặt vị trí ở góc dưới cùng bên phải
                });
            }
        };

        onMounted(async () => {
            await getGrammarContent();
        });

        return {
            grammarContentLocal,
            grammarContent,
            grammarContentFormSchema,
            updateGrammarContent,
            getGrammarContent,
            editor: ClassicEditor, // Trả về CKEditor 5 để bạn có thể sử dụng trong template
            onEditorReady
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
