<template>
    <div>
        <Form @submit="addVocabulary" :validation-schema="vocabularyFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="word" class="form-label">Word<span class="required-field">*</span></label>
                    <Field name="word" id="word" type="text" class="form-control border-secondary custom-font" 
                        v-model="vocabularyLocal.word" />
                    <ErrorMessage name="word" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="ipa" class="form-label">IPA</label>
                    <Field name="ipa" id="ipa" type="text" class="form-control border-secondary custom-font" 
                        v-model="vocabularyLocal.ipa" />
                    <ErrorMessage name="ipa" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="meaning" class="form-label">Meaning</label>
                    <Field name="meaning" id="meaning" type="text" class="form-control border-secondary custom-font" 
                        v-model="vocabularyLocal.meaning" />
                    <ErrorMessage name="meaning" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="exampleSentence" class="form-label">Example Sentence</label>
                    <Field name="exampleSentence" id="exampleSentence" type="text" class="form-control border-secondary custom-font" 
                        v-model="vocabularyLocal.exampleSentence" />
                    <ErrorMessage name="exampleSentence" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="image" class="form-label">Image<span class="required-field">*</span></label>
                    <Field name="image" id="image" class="form-control border-secondary custom-font" v-model="vocabularyLocal.image" as="input"
                        type="file" @change="onFileChange" />
                    <ErrorMessage name="image" class="error-feedback" />
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

import VocabularyService from "@/services/vocabulary.service";

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
        topicId: { type: String, required: true }, // Khai báo props topicId
        retrieveVocabularies: { type: Function, required: true },
    },
    setup(props) {
        const vocabularyLocal = reactive({});

        const vocabularyFormSchema = yup.object().shape({
            word: yup
                .string()
                .required("Từ vựng phải có giá trị.")
                .min(2, "Từ vựng phải ít nhất 2 ký tự.")
                .max(50, "Từ vựng có nhiều nhất 50 ký tự."),
            ipa: yup
                .string()
                .required("Vui lòng nhập phiên âm"),
            meaning: yup
                .string()
                .required("Ý nghĩa phải có giá trị.")
                .min(2, "Ý nghĩa phải ít nhất 2 ký tự.")
                .max(100, "Ý nghĩa có nhiều nhất 100 ký tự."),
            exampleSentence: yup
                .string()
                .required("Câu ví dụ phải có giá trị.")
                .min(2, "Câu ví dụ phải ít nhất 2 ký tự.")
                .max(150, "Câu ví dụ có nhiều nhất 150 ký tự."),
            image: yup
                .mixed()
                .required("Please select an image.")
                .test("fileType", "Only accept jpeg, png, or gif image", (value) => {
                    if (!value) return true;
                    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
                    return allowedFormats.includes(value.type);
                })
                .test("fileSize", "Image file is too large", (value) => {
                    if (!value) return true;
                    return value.size <= 1024 * 1024;
                }),
        });

        const onFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                vocabularyLocal.image = file;
            } else {
                vocabularyLocal.image = null;
            }
        };

        const addVocabulary = async () => {
            try {
                const formData = new FormData();
                console.log(props.topicId)
                formData.append("topicId", props.topicId);
                formData.append("word", vocabularyLocal.word);
                formData.append("ipa", vocabularyLocal.ipa);
                formData.append("meaning", vocabularyLocal.meaning);
                formData.append("exampleSentence", vocabularyLocal.exampleSentence);
                formData.append("image", vocabularyLocal.image, vocabularyLocal.image.name);
                await VocabularyService.create(formData);
                props.retrieveVocabularies();
                toast.success('Thêm tự vựng thành công', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm từ vựng', {
                    autoClose: 1000,
                });
            }
        };

        return {
            vocabularyLocal,
            onFileChange,
            vocabularyFormSchema,
            addVocabulary,
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
