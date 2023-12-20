<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li>
                    <i class="fa-solid fa-house"></i>
                    <router-link :to="{name: 'admin.section.all'}">
                        <button class="btn btn-link text-decoration-none fw-bolder">Section</button>
                    </router-link>
                </li>
                <li class="current">
                    <i class="fa-regular fa-circle-question"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Question</button>
                </li>
            </ol>
        </nav>
    </div>
    <QuestionList :questions="questions" :sectionId = "sectionId"
        :retrieveQuestions="retrieveQuestions"/>
</template>
  
<script>
import QuestionList from "@/components/questionbysection/QuestionList.vue";
import QuestionService from "@/services/question.service";
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {
        QuestionList,
    },
    props: {
        sectionId: { type: String, required: true },
    },
    setup(props) {
        const questions = ref([]);

        const retrieveQuestions = async () => {
            try {
                console.log(props.sectionId)
                questions.value = await QuestionService.getQuestionsBySection(props.sectionId);
                console.log(questions.value)
            } catch (error) {
                console.log(error);
            }
        };
        retrieveQuestions();
        return {
            questions,
            retrieveQuestions,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
  