<template>
    <div v-if="tableScore">
        <Form @submit="updateScore" :validation-schema="tableScoreFormSchema" enctype="multipart/form-data">
            <div class="modal-body text-start">
                <div class="form-group mb-3">
                    <label class="form-label">Score<span class="required-field">*</span></label>
                    <Field name="score" type="number" class="form-control border-secondary custom-font " 
                        v-model="tableScoreLocal.score" />
                    <ErrorMessage name="score" class="error-feedback" />
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

import ScoreTableService from "@/services/score_table.service";

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
        scoreTableId: { type: Number, required: true },
        getTableScores: { type: Function, required: true },
    },
    setup(props) {
        const tableScore = ref(null);
        const tableScoreLocal = reactive({}); 

        const tableScoreFormSchema = yup.object().shape({
            score: yup
                .string()
                .required("Điểm phải có giá trị.")
        });
        const getScore = async () => {
            try {
                console.log(props.scoreTableId)
                const data = await ScoreTableService.get(props.scoreTableId);
                tableScoreLocal.score = data.score;
                tableScore.value = data;
            } catch (error) {
                console.log(error);
            }
        };

        const updateScore = async () => {
            try {
                console.log(tableScoreLocal.score)
                const formData = new FormData();
                formData.append("score", tableScoreLocal.score);
                await ScoreTableService.update(props.scoreTableId, formData);
                props.getTableScores();
                toast.success('Chỉnh sửa điểm thành công ', {
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
            await getScore();
        });

        return {
            tableScoreLocal,
            tableScore,
            tableScoreFormSchema,
            updateScore,
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

