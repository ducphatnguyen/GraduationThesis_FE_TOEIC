<template>
    <div ontouchstart="" class="d-flex justify-content-end mb-2">
        <div class="button" @click="autoRandom">
            <div>RANDOM</div>
        </div>
        <div class="button ms-1" @click="submitQuestions" :disabled="!isSubmitEnabled">
            <div>SUBMIT</div>
        </div>
    </div>
    <table class="table text-center table-bordered shadow">
        <thead class="shadow">
            <tr class="align-middle">
                <th><button class="btn btn-primary rounded-5 disabled">USED</button></th>
                <th>SELECTED {{ selectedQuestions.length }}/15</th>
                <th>No.</th>
                <th>CONTENT</th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>CORRECT ANS</th>
                <th>EXPLANATION</th>
                <th>IMAGE</th>
                <th>PASSAGE</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(groupedQuestions, groupId, groupIndex) in groupedQuestionMap" :key="groupId">
                <tr v-for="(question, index) in groupedQuestions" :key="question.questionId" 
                    class="table-row shadow-on-hover align-middle">
                    <td v-if="index === 0" :rowspan="groupedQuestions.length"><button style="font-size: 12px" class="btn btn-success rounded-5 disabled">{{
                        question.usage }}</button></td>

                    <td v-if="index === 0" :rowspan="groupedQuestions.length">
                        <input type="checkbox" :id="'checkbox_' + question.questionId" v-model="selectedQuestions"
                            :value="question.questionId"
                            :disabled="selectedQuestions.length >= 15 && !selectedQuestions.includes(question.questionId)"
                            @click="selectGroup(groupedQuestions)">
                    </td>

                    <td v-if="index === 0" :rowspan="groupedQuestions.length">
                        {{ groupIndex + 1 }}
                    </td>
                    <td>{{ question.questionContent }}</td>
                    <td>{{ question.optionA }}</td>
                    <td>{{ question.optionB }}</td>
                    <td>{{ question.optionC }}</td>
                    <td>{{ question.optionD }}</td>
                    <td>{{ question.correctOption }}</td>
                    <td>{{ question.questionExplanation }}</td>
                    <td class="question-image" v-if="index === 0" :rowspan="groupedQuestions.length">
                        <img :src="getImageUrl(question.questionGroup.groupImage) || ' '" style="width:100px" />
                    </td>
                    <td v-if="index === 0" :rowspan="groupedQuestions.length">
                        <div :title="question.questionGroup.groupPassage" v-html="getLimitedPassage(question.questionGroup.groupPassage)"></div>
                    </td>
                </tr>
            </template>
            <tr v-if="paginatedQuestions.length === 0">
                <td colspan="12">No data available</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
import { defineComponent, ref, computed, onMounted } from "vue";
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
        getImageUrl: { type: Function, required: true },
        sectionId: { type: String, required: true },
        testId: { type: String, required: true },
        retrieveQuestions: Function
    },

    setup(props) {

        const selectedQuestions = ref([]);
        const selectedGroupId = ref(''); // Initialize selectedGroupId as an empty string
        const selectGroup = (groupedQuestions) => {
            const groupQuestionIds = groupedQuestions.map(question => question.questionId);
            // Check if all groupQuestionIds are in selectedQuestions
            const allSelected = groupQuestionIds.every(id => selectedQuestions.value.includes(id));
            if (allSelected) {
                // Chọn lại nhóm
                selectedQuestions.value = selectedQuestions.value.filter(questionId => {
                    return !groupQuestionIds.includes(questionId);
                });
                selectedGroupId.value = ''; // Clear the selectedGroupId
            } else {
                // Chọn nhóm
                selectedQuestions.value = [...selectedQuestions.value, ...groupQuestionIds];
                selectedGroupId.value = groupedQuestions[0].questionGroup.groupId; // Set the selectedGroupId
            }
        };

        const fetchQuestions = async () => {
            const questions = await TestService.getQuestionsByTestId(props.testId);
            console.log(questions)
            selectedQuestions.value = questions.map(question => question.questionId); 
        };

        const isSubmitEnabled = ref(false);
        const autoRandom = () => {
            const maxSelected = 15; // Số lượng câu hỏi cần chọn
            const totalGroups = Object.keys(groupedQuestionMap.value).length;
            if (totalGroups < 3) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không đủ nhóm câu hỏi để random.',
                });
                return;
            }
            const randomGroups = [];
            while (randomGroups.length < 3) {
                const randomGroupIndex = Math.floor(Math.random() * totalGroups);
                const randomGroupId = Object.keys(groupedQuestionMap.value)[randomGroupIndex];

                if (!randomGroups.includes(randomGroupId)) {
                    randomGroups.push(randomGroupId);
                }
            }

            const randomQuestions = [];
            for (const groupId of randomGroups) {
                const groupQuestions = groupedQuestionMap.value[groupId];
                const randomIndexes = [];

                while (randomIndexes.length < Math.ceil(maxSelected / 3)) {
                    const randomIndex = Math.floor(Math.random() * groupQuestions.length);
                    if (!randomIndexes.includes(randomIndex)) {
                        randomIndexes.push(randomIndex);
                    }
                }

                for (const randomIndex of randomIndexes) {
                    randomQuestions.push(groupQuestions[randomIndex].questionId);
                }
            }

            selectedQuestions.value = randomQuestions;
            isSubmitEnabled.value = true; // Bật nút submit
        };


        const submitQuestions = async () => {
            if (selectedQuestions.value.length < 15) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Vui lòng chọn đủ 15 câu hỏi trước khi submit.',
                });
                return;
            }
            try {
                const response = await TestService.addOrUpdateQuestionToTest(props.testId, selectedQuestions.value);
                console.log(response)
                toast.success('Chỉ định câu hỏi Phần 7 đoạn ba thành công ', {
                    autoClose: 1000
                });
            } catch (error) {
                console.log(error);
                toast.error('Chỉ định câu hỏi Phần 7 đoạn ba thất bại ', {
                    autoClose: 1000
                });
            }
           
            selectedQuestions.value = [];
            isSubmitEnabled.value = false;

            props.retrieveQuestions();
            fetchQuestions();

        };

        onMounted(() => {
            fetchQuestions();
        });
        fetchQuestions();

        
        const getLimitedPassage = (groupPassage) => {
            const MAX_PASSAGE_LENGTH = 200;
            if (groupPassage.length > MAX_PASSAGE_LENGTH) {
                return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
            } else {
                return groupPassage;
            }
        };

        // Group questions by groupId
        const groupedQuestionMap = computed(() => {
            const groups = {};
            for (const question of props.paginatedQuestions) {
                const groupId = question.questionGroup.groupId;
                if (!groups[groupId]) {
                    groups[groupId] = [question];
                } else {
                    groups[groupId].push(question);
                }
            }
            return groups;
        });

        return {
            selectedQuestions,
            isSubmitEnabled,
            autoRandom,
            submitQuestions,
            getLimitedPassage,
            groupedQuestionMap,
            selectGroup
        };
    },
});
</script>
  
<style scoped>
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
.question-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
}
.table {
    font-size: 13px;
}
audio {
    width: 100%;
    max-width: 160px;
}
</style>
  