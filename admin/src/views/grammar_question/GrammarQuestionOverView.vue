<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li>
                    <i class="fa-solid fa-spell-check"></i>
                    <router-link :to="{name: 'admin.grammar.all'}">
                        <button class="btn btn-link text-decoration-none fw-bolder">Grammar</button>
                    </router-link>
                </li>
                <li class="current">
                    <i class="fa-solid fa-book"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Grammar Question</button>
                </li>
            </ol>
        </nav>
    </div>
    <div>
        <GrammarQuestionList :grammarQuestions="grammarQuestions" :grammarId="grammarId"
            :retrieveGrammarQuestions="retrieveGrammarQuestions" />
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import GrammarQuestionService from "@/services/grammar_question.service";
import GrammarQuestionList from "@/components/grammar_question/GrammarQuestionList.vue";

export default defineComponent({
    components: {
        GrammarQuestionList,
    },
    props: {
        grammarId: { type: String, required: true },
    },
    setup(props) {

        const grammarQuestions = ref([]);
        const retrieveGrammarQuestions = async () => {
            try {
                console.log(props.grammarId)
                grammarQuestions.value = await GrammarQuestionService.getGrammarQuestionsByGrammar(props.grammarId);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveGrammarQuestions();
        return {
            grammarQuestions,
            retrieveGrammarQuestions,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
  