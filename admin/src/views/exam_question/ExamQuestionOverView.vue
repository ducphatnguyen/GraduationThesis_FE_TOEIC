<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li>
                    <i class="fa-solid fa-file"></i>
                    <router-link :to="{name: 'admin.exam.all'}">
                        <button class="btn btn-link text-decoration-none text-dark fw-bolder">Exam</button>
                    </router-link>
                </li>
                <li class="current">
                    <i class="fa-solid fa-clipboard-question"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Exam Question</button>
                </li>
            </ol>
        </nav>
    </div>
    <ExamQuestionList :examQuestions="examQuestions" :examId = "examId"
        :retrieveExamQuestions="retrieveExamQuestions"/>
</template>
  
<script>
import { defineComponent, ref } from "vue";

import ExamQuestionService from "@/services/exam_question.service";
import ExamQuestionList from "@/components/exam_question/ExamQuestionList.vue";

export default defineComponent({
    components: {
        ExamQuestionList,
    },
    props: {
        examId: { type: String, required: true },
    },
    setup(props) {
        const examQuestions = ref([]);

        const retrieveExamQuestions = async () => {
            try {
                console.log(props.examId)
                examQuestions.value = await ExamQuestionService.getQuestionsByExamId(props.examId);
                console.log(examQuestions.value)
            } catch (error) {
                console.log(error);
            }
        };
        retrieveExamQuestions();
        return {
            examQuestions,
            retrieveExamQuestions,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
  