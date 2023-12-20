<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li class="current">
                    <i class="fa-solid fa-spell-check"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Grammar</button>
                </li>
            </ol>
        </nav>
    </div>
    <GrammarList :grammars="grammars" :retrieveGrammars="retrieveGrammars"></GrammarList>
</template>

<script>
import GrammarList from "@/components/grammar/GrammarList.vue";
import GrammarService from "@/services/grammar.service";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        GrammarList,
    },
    setup(props, context) {
        const grammars = ref([]);
        const activeIndex = ref(-1);

        const retrieveGrammars = async () => {
            try {
                grammars.value = await GrammarService.all();
                console.log(grammars.value);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveGrammars();
        return {
            grammars,
            activeIndex,
            retrieveGrammars,
        };
    },
});
</script>

<style scoped>
@import "@/assets/breadcrumb.css";
</style>