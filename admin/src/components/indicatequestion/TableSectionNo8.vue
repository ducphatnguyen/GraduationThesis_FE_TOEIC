<template>
    <div ontouchstart="" class="d-flex justify-content-end mb-2">
        <div class="button" @click="autoRandom">
            <div>RANDOM</div>
        </div>
        <div class="button ms-1" @click="submitQuestions" :disabled="!isSubmitEnabled">
            <div>SUBMIT</div>
        </div>
    </div>
    <table class="table text-center table-hover shadow">
        <thead class="shadow">
            <tr class="align-middle">
                <th><button class="btn btn-primary rounded-5 disabled">USED</button></th>
                <th>SELECTED {{ selectedQuestions.length }}/1</th>
                <th>No.</th>
                <th>TEXT</th>
                <th>SUGGESTED ANSWER</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(question, index) in paginatedQuestions" :key="question.questionId"
                class="table-row shadow-on-hover align-middle">
                <td><button style="font-size: 12px" class="btn btn-success rounded-5 disabled">{{
                    question.usage }}</button></td>
                <td>
                    <input type="checkbox" :id="'checkbox_' + question.questionId" v-model="selectedQuestions"
                        :value="question.questionId"
                        :disabled="selectedQuestions.length >= 1 && !selectedQuestions.includes(question.questionId)">
                </td>
                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                <td>{{ question.questionText }}</td>
                <td>{{ question.suggestedAnswer }}</td>
            </tr>
            <tr v-if="paginatedQuestions.length === 0">
                <td colspan="12">No data available</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
import { defineComponent, ref, onMounted } from "vue";
import TestService from "@/services/test.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    props: {
        paginatedQuestions: { type: Array, required: true },
        currentPage: { type: Number, required: true },
        ITEMS_PER_PAGE: { type: Number, required: true },
        sectionId: { type: String, required: true },
        testId: { type: String, required: true },
        retrieveQuestions: Function
    },
    setup(props) {

        const selectedQuestions = ref([]);
        const fetchQuestions = async () => {
            const questions = await TestService.getQuestionsByTestId(props.testId);
            console.log(questions)
            selectedQuestions.value = questions.map(question => question.questionId);
        };

        const isSubmitEnabled = ref(false);
        const autoRandom = () => {
            const maxSelected = 1; // Số lượng checkbox cần chọn
            const totalQuestions = props.paginatedQuestions.length;
            if (totalQuestions < maxSelected) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không đủ câu hỏi để random.',
                });
                return;
            }
            const randomIndexes = [];
            while (randomIndexes.length < maxSelected) {
                const randomIndex = Math.floor(Math.random() * totalQuestions);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            selectedQuestions.value = randomIndexes.map(index => props.paginatedQuestions[index].questionId);
            isSubmitEnabled.value = true; // Enable the submit button
            console.log(selectedQuestions);
        };

        const submitQuestions = async () => {
            if (selectedQuestions.value.length < 1) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Vui lòng chọn câu hỏi trước khi submit.',
                });
                return;
            }
            try {
                const response = await TestService.addOrUpdateQuestionToTest(props.testId, selectedQuestions.value);
                console.log(response)
                toast.success('Chỉ định câu hỏi Speaking (6-7) thành công ', {
                    autoClose: 1000
                });
            } catch (error) {
                console.log(error);
                toast.error('Chỉ định câu hỏi Speaking (6-7) thất bại ', {
                    autoClose: 1000
                });
            }
            // Reset selectedQuestions and isSubmitEnabled after submission
            selectedQuestions.value = [];
            isSubmitEnabled.value = false;

            props.retrieveQuestions();
            fetchQuestions();
        };

        onMounted(() => {
            fetchQuestions();
        });

        return {
            selectedQuestions,
            isSubmitEnabled,
            autoRandom,
            submitQuestions,
        };
    },
});
</script>

<style scoped>
.table-row.shadow-on-hover:hover {
    box-shadow: 0 2px 3px rgba(196, 181, 181, 0.9);
}

th {
    color: #052649;
    font-weight: bold;
}

td {
    color: #052649;
    font-weight: normal;
}

.button {
    position: relative;
    display: inline-block;
    margin-bottom: 15px;
}

.button div {
    color: white;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    text-decoration: none;
    background-color: #FFA12B;
    display: block;
    position: relative;
    padding: 10px 20px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-shadow: 0px 1px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=1px);

    -webkit-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    -moz-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.button div:active {
    top: 10px;
    background-color: #F78900;

    -webkit-box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
    -moz-box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3pxpx 0 #915100;
    box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
}

.button:after {
    content: "";
    height: 100%;
    width: 100%;
    padding: 4px;
    position: absolute;
    bottom: -15px;
    left: -4px;
    z-index: -1;
    background-color: #2B1800;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.table {
    font-size: 13px;
}

audio {
    width: 100%;
    max-width: 300px;
}</style>