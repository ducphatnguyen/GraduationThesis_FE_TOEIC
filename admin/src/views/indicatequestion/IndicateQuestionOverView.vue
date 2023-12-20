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
                <li>
                    <i class="fa-solid fa-folder"></i>
                    <router-link :to="{name: 'admin.test.all'}">
                        <button class="btn btn-link text-decoration-none fw-bolder">Test</button>
                    </router-link>
                </li>
                <li class="current">
                    <i class="fa-solid fa-pen"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Indicate Question</button>
                </li>
            </ol>
        </nav>
    </div>

    <div>
        <QuestionList :questions="questions" :sectionId = "sectionId" :testId = "testId"
            :retrieveQuestions="retrieveQuestions" />
    </div>
    
</template>
  
<script>
import { defineComponent, ref } from "vue";

import QuestionService from "@/services/question.service";
import QuestionList from "@/components/indicatequestion/IndicateQuestionList.vue";

export default defineComponent({
    components: {
        QuestionList,
    },
    props: {
        sectionId: { type: String, required: true },
        testId: { type: String, required: true },
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