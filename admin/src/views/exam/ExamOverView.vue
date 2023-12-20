<template>
    <div>
        <div class="mt-2 bg-white shadow-lg rounded-1">
            <nav class="">
                <ol class="cd-breadcrumb custom-separator">
                    <li class="current">
                        <i class="fa-solid fa-file"></i>
                        <button class="btn btn-link text-decoration-none fw-bolder">Exam</button>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="button-container">
            <button type="button" :class="{ active: showFullTest }" @click="switchToFullTest">
                FullTest
            </button>
            <button type="button" :class="{ active: !showFullTest }" @click="switchToMiniTest">
                MiniTest
            </button>
        </div>
        <ExamList :exams="exams" :retrieveExams="retrieveExams" :showFullTest="showFullTest"></ExamList>
    </div>
</template>
  
<script>
import { defineComponent, ref } from "vue";

import ExamService from "@/services/exam.service";
import ExamList from "@/components/exam/ExamList.vue";

export default defineComponent({
    components: {
        ExamList,
    },
    setup() {
        const exams = ref([]);
        const showFullTest = ref(true);
        const activeIndex = ref(-1);
        const retrieveExams = async () => {
            try {
                if (showFullTest.value == true) {
                    exams.value = await ExamService.getFullTest();
                    console.log(exams.value);
                } else {
                    exams.value = await ExamService.getMiniTest();
                    console.log(exams.value);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const switchToFullTest = () => {
            if (!showFullTest.value) {
                showFullTest.value = true;
                retrieveExams();
            }
        };
        const switchToMiniTest = () => {
            if (showFullTest.value) {
                showFullTest.value = false;
                retrieveExams();
            }
        };
        retrieveExams();
        return {
            exams,
            activeIndex,
            retrieveExams,
            showFullTest,
            switchToFullTest,
            switchToMiniTest,
        };
    },
});
</script>
  
<style scoped>
@import "@/assets/breadcrumb.css";
.button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 60px;
}

.button-container button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fff;
    border: 1px #fff;
    border-radius: 20px;
    cursor: pointer;
    margin: 0 10px;
    transition: background-color 0.3s ease;
}

.button-container button.active {
    background-color: rgb(28, 22, 90);
    font-weight: bold;
    color: white;
}
</style>