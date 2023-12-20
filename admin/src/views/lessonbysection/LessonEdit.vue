<template>
    <div v-if="lesson">
        <Form @submit="updateLesson" :validation-schema="lessonFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="lessonName" class="form-label">Lesson Name<span class="required-field">*</span></label>
                    <Field name="lessonName" id="lessonName" type="text" class="form-control border-secondary custom-font"
                        v-model="lessonLocal.lessonName" />
                    <ErrorMessage name="lessonName" class="error-feedback" />
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
import { defineComponent, onMounted, reactive, ref } from "vue";

import LessonService from "@/services/lesson.service";

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
        lessonId: { type: Number, required: true },
        retrieveLessons: { type: Function, required: true },
        sectionId: { type: String, required: true },
    },

    setup(props) {

        const lesson = ref(null);
        const lessonLocal = reactive({ });

        const lessonFormSchema = yup.object().shape({
            lessonName: yup
                .string()
                .required("Tên bài học phải có giá trị.")
                .min(2, "Tên bài học phải ít nhất 2 ký tự.")
                .max(100, "Tên bài học có nhiều nhất 100 ký tự."),
        });

        const getLesson = async () => {
            try {
                const data = await LessonService.get(props.lessonId);
                lessonLocal.lessonName = data.lessonName;
                lesson.value = data;
                console.log(lesson.value)
            } catch (error) {
                console.log(error);
            }
        };

        const updateLesson = async (data) => { 
            try {
                data.sectionId = props.sectionId;
                await LessonService.update(props.lessonId, data);
                props.retrieveLessons();
                toast.success('Chỉnh sửa bài học thành công ', {
                    autoClose: 1000
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi chỉnh sửa bài học', {
                    autoClose: 1000
                });
            }
        };

        onMounted(async () => {
            await getLesson();
        });

        return {
            lessonLocal,
            lesson,
            lessonFormSchema,
            updateLesson,
            getLesson
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
