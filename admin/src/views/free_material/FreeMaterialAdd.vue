<template>
    <div>
        <Form @submit="addFreeMaterial" :validation-schema="freeMaterialFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label for="title" class="form-label">Title<span class="required-field">*</span></label>
                    <Field name="title" id="title" type="text" class="form-control border-secondary custom-font"
                        v-model="freeMaterialLocal.title" />
                    <ErrorMessage name="title" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="description" class="form-label">Description</label>
                    <Field name="description" id="description" type="text" class="form-control border-secondary custom-font"
                        v-model="freeMaterialLocal.description" />
                    <ErrorMessage name="description" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="filePdf" class="form-label">File PDF<span class="required-field">*</span></label>
                    <Field name="filePdf" id="filePdf" class="form-control border-secondary custom-font"
                        v-model="freeMaterialLocal.file" as="input" type="file" @change="onFilePdfChange" />
                    <ErrorMessage name="filePdf" class="error-feedback" />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button class="btn btn-primary">Save</button>
            </div>
        </Form>
    </div>
</template>
  
<script>
import { defineComponent, reactive } from "vue";

import FreeMaterialService from "@/services/free_material.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        retrieveFreeMaterials: { type: Function, required: true },
    },
    setup(props) {
        const freeMaterialLocal = reactive({});

        const freeMaterialFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tiêu đề phải được chọn.")
                .min(2, "Tiêu đề phải chứa ít nhất 2 ký tự")
                .max(50, "Tiêu đề không vượt quá 50 ký tự"),
            description: yup
                .string()
                .max(255, "Mô tả không được vượt quá 255 ký tự"),
            filePdf: yup
                .mixed()
                .required("Vui lòng chọn file pdf")
                .test("fileType", "Only accept PDF files", (value) => {
                    if (!value) return true;
                    return value.type === "application/pdf"; // Chỉ chấp nhận tệp PDF
                })
                .test("fileSize", "File is too large", (value) => {
                    if (!value) return true;
                    return value.size <= 1024 * 1024 * 10; // Giới hạn kích thước file (ví dụ: 10 MB)
                }),
        });

        const onFilePdfChange = (event) => {
            const filePdf = event.target.files[0];
            if (filePdf) {
                freeMaterialLocal.filePdf = filePdf;
            }
            else {
                freeMaterialLocal.filePdf = null;
            }
        };

        const addFreeMaterial = async () => {
            try {
                const formData = new FormData();
                formData.append("title", freeMaterialLocal.title);
                formData.append("description", freeMaterialLocal.description);
                formData.append("filePdf", freeMaterialLocal.filePdf, freeMaterialLocal.filePdf.name);

                await FreeMaterialService.create(formData);
                props.retrieveFreeMaterials();
                toast.success('Thêm tài liệu miễn phí thành công', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm tài liệu miễn phí', {
                    autoClose: 1000,
                });
            }
        };

        return {
            freeMaterialLocal,
            onFilePdfChange,
            freeMaterialFormSchema,
            addFreeMaterial,
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
  