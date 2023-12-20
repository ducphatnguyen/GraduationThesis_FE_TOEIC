<template>
    <div v-if="section">
        <Form @submit="updateSection" :validation-schema="sectionFormSchema" enctype="multipart/form-data">
            
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label class="form-label">Name<span class="required-field">*</span></label>
                    <Field name="name" type="text" class="form-control border-secondary custom-font " 
                        v-model="sectionLocal.name" />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="description" class="form-label">Description<span class="required-field">*</span></label>
                    <Field name="description" type="text" id="description" class="form-control border-secondary custom-font" as="textarea"
                        v-model="sectionLocal.description" style="resize: none; height: 100px; width: 100%;" />
                    <ErrorMessage name="description" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="image" class="form-label">Image<span class="required-field">*</span></label>
                    <Field name="image" id="image" class="form-control border-secondary custom-font" v-model="sectionLocal.image" as="input" 
                        type="file" @change="onFileChange" />
                    <ErrorMessage name="image" class="error-feedback" />
                </div>

                <div class="form-group mb-3">
                    <label for="type" class="form-label">Type<span class="required-field">*</span></label>
                    <Field name="type" id="type" class="form-select border-secondary custom-font" v-model="sectionLocal.type" as="select">
                        <option value="" disabled>Select an option</option>
                        <option value="1">Nghe</option>
                        <option value="2">Đọc</option>
                        <option value="3">Nói</option>
                        <option value="4">Viết</option>
                    </Field>
                    <ErrorMessage name="type" class="error-feedback" />
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

import SectionService from "@/services/section.service";

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
        sectionId: { type: Number, required: true },
        retrieveSections: { type: Function, required: true }, // Nhận prop retrieveSections
    },

    setup(props) {
        const section = ref(null);
        const sectionLocal = reactive({}); // Sử dụng reactive thay vì ref để lưu dữ liệu của section

        const sectionFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            description: yup
                .string()
                .required("Mô tả phải có giá trị.")
                .min(2, "Mô tả phải ít nhất 2 ký tự.")
                .max(255, "Mô tả không được vượt quá 255 ký tự."),
            type: yup.string().required("Loại phải được chọn."),
            image: yup
                .mixed()
                // .required("Vui lòng chọn một tệp ảnh.") // Ràng buộc yêu cầu chọn ảnh
                .test("fileType", "Chỉ chấp nhận tệp ảnh jpeg, png hoặc gif", (value) => {
                    if (!value) return true; // Bỏ qua nếu không có tệp
                    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
                    return allowedFormats.includes(value.type); // Kiểm tra định dạng tệp
                })
                .test("fileSize", "Tệp ảnh quá lớn", (value) => {
                    if (!value) return true; // Bỏ qua nếu không có tệp
                    return value.size <= 1024 * 1024; // Kiểm tra kích thước tệp (ví dụ: 1 MB)
                }),
        });

        const onFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                sectionLocal.image = file;
            } else {
                sectionLocal.image = null;
            }
        };

        const getSection = async () => {
            try {
                // Truyền giá trị trong đối tượng cho section -> form
                const data = await SectionService.get(props.sectionId);
                sectionLocal.name = data.name;
                sectionLocal.description = data.description;
                sectionLocal.type = data.type;
                // sectionLocal.image = null; // Bắt đầu với ảnh null để không cập nhật ảnh nếu không có thay đổi
                section.value = data;
            } catch (error) {
                console.log(error);
            }
        };

        const updateSection = async () => {
            try {
                const formData = new FormData();
                formData.append("name", sectionLocal.name);
                formData.append("description", sectionLocal.description);
                formData.append("type", sectionLocal.type);
                if (sectionLocal.image) {
                    formData.append("image", sectionLocal.image, sectionLocal.image.name);
                }
                await SectionService.update(props.sectionId, formData);
                props.retrieveSections();
                // Hiển thị toast thông báo khi chỉnh sửa thành công
                toast.success('Chỉnh sửa dạng phần thành công ', {
                    autoClose: 2000,
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
            await getSection();
        });
        
        return {
            sectionLocal,
            section,
            onFileChange,
            sectionFormSchema,
            updateSection,
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
