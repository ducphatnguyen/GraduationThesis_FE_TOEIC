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
                    <button class="btn btn-link text-decoration-none fw-bolder">Grammar Content</button>
                </li>
            </ol>
        </nav>
    </div>
    <div>
        <GrammarContentList :grammarContents="grammarContents" :grammarId="grammarId"
            :retrieveGrammarContents="retrieveGrammarContents" />
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import GrammarContentService from "@/services/grammar_content.service";
import GrammarContentList from "@/components/grammar_content/GrammarContentList.vue";

export default defineComponent({
    components: {
        GrammarContentList,
    },
    props: {
        grammarId: { type: String, required: true },
    },
    setup(props) {
        const grammarContents = ref([]);
        const retrieveGrammarContents = async () => {
            try {
                console.log(props.grammarId)
                grammarContents.value = await GrammarContentService.getGrammarContentsByGrammar(props.grammarId);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveGrammarContents();
        return {
            grammarContents,
            retrieveGrammarContents,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
  