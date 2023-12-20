<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li>
                    <i class="fa-solid fa-spell-check"></i>
                    <router-link :to="{name: 'admin.vocabulary.all'}">
                        <button class="btn btn-link text-decoration-none fw-bolder">Vocabulary</button>
                    </router-link>
                </li>
                <li class="current">
                    <i class="fa-solid fa-book"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Vocabulary Question</button>
                </li>
            </ol>
        </nav>
    </div>
    <div>
        <VocabularyQuestionList :vocabularyQuestions="vocabularyQuestions" :topicId="topicId"
            :retrieveVocabularyQuestions="retrieveVocabularyQuestions" />
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import VocabularyQuestionService from "@/services/vocabulary_question.service";
import VocabularyQuestionList from "@/components/vocabulary_question/VocabularyQuestionList.vue";

export default defineComponent({
    components: {
        VocabularyQuestionList,
    },
    props: {
        topicId: { type: String, required: true },
    },
    setup(props) {

        const vocabularyQuestions = ref([]);
        const retrieveVocabularyQuestions = async () => {
            try {
                console.log(props.topicId)
                vocabularyQuestions.value = await VocabularyQuestionService.getVocabularyQuestionsByTopic(props.topicId);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveVocabularyQuestions();
        return {
            vocabularyQuestions,
            retrieveVocabularyQuestions,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
  