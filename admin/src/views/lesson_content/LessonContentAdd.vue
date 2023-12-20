<template>
    <div class="page">
        <Form @submit="addLessonContent" :validation-schema="lessonContentFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="title" class="form-label">Title<span class="required-field">*</span></label>
                    <Field name="title" id="title" type="text" class="form-control border-secondary custom-font"
                        v-model="lessonContentLocal.title" />
                    <ErrorMessage name="title" class="error-feedback" />
                </div>
                <div class="form-group mb-3">
                    <label class="form-label">Content<span class="required-field">*</span></label>
                    <ckeditor :editor="editor" v-model="lessonContentLocal.content" @ready="onEditorReady"  class="form-control border-secondary custom-font"/>
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

import LessonContentService from "@/services/lesson_content.service";

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
        lessonId: { type: String, required: true }, 
        retrieveLessonContents: { type: Function, required: true },
    },
    setup(props) {
        const lessonContentLocal = reactive({});

        const lessonContentFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tiêu đề phải có giá trị.")
                .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
                .max(50, "Tiêu đề có nhiều nhất 50 ký tự."),
        });

        const onEditorReady = (editor) => {
            // Thay đổi chiều cao
            editor.editing.view.change(writer => {
                writer.setStyle('height', '250px', editor.editing.view.document.getRoot());
            });
        };

        const addLessonContent = async () => {
            try {
                console.log(props.lessonId)
                await LessonContentService.create(props.lessonId, lessonContentLocal);
                props.retrieveLessonContents();
                toast.success('Thêm nội dung bài học thành công ', {
                    autoClose: 1000
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm nội dung bài học', {
                    autoClose: 1000
                });
            }
        };

        return {
            lessonContentLocal,
            lessonContentFormSchema,
            addLessonContent,
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