<template>
    <div class="page">
        <Form @submit="addGrammarContent" :validation-schema="grammarContentFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">

                <div class="form-group mb-3">
                    <label for="title" class="form-label">Title<span class="required-field">*</span></label>
                    <Field name="title" id="title" type="text" class="form-control border-secondary custom-font"
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
                <button class="btn btn-primary">Lưu</button>
            </div>

        </Form>
    </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

import GrammarContentService from "@/services/grammar_content.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
        grammarId: { type: String, required: true }, // Khai báo props sectionId
        retrieveGrammarContents: { type: Function, required: true }, // Nhận prop retrieveSections
    },
    setup(props) {
        const grammarContentLocal = reactive({});

        const grammarContentFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tiêu đề phải có giá trị.")
                .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
                .max(50, "Tiêu đề có nhiều nhất 50 ký tự."),
            });

        const onEditorReady = (editor) => {
            // Thay đổi height
            editor.editing.view.change(writer => {
                writer.setStyle('height', '250px', editor.editing.view.document.getRoot());
            });
        };
        const addGrammarContent = async () => {
            try {
                console.log(props.grammarId)
                await GrammarContentService.create(props.grammarId, grammarContentLocal);
                props.retrieveGrammarContents();
                toast.success('Thêm Grammar Content thành công ', {
                    autoClose: 1000
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm Grammar Grammar Content ', {
                    autoClose: 1000
                });
            }
        };
        return {
            grammarContentLocal,
            grammarContentFormSchema,
            addGrammarContent,
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