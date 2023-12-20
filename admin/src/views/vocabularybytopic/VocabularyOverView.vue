<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li>
                    <i class="fas fa-file-alt"></i>
                    <router-link :to="{name: 'admin.topic.all'}">
                        <button class="btn btn-link text-decoration-none fw-bolder">Topic</button>
                    </router-link>
                </li>
                <li class="current">
                    <i class="fa-solid fa-braille"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Vocabulary</button>
                </li>
            </ol>
        </nav>
    </div>
    <VocabularyList :vocabularies="vocabularies" :topicId="topicId" :retrieveVocabularies="retrieveVocabularies" />
</template>
  
<script>
import { defineComponent, ref } from 'vue';

import VocabularyService from "@/services/vocabulary.service";

import VocabularyList from "@/components/vocabularybytopic/VocabularyList.vue";

export default defineComponent({
    components: {
        VocabularyList,
    },
    props: {
        topicId: { type: String, required: true }
    },
    setup(props, context) {
        console.log(props.topicId)
        const vocabularies = ref([]);
        const activeIndex = ref(-1);

        const retrieveVocabularies = async () => {
            try {
                console.log()
                // Gọi API để lấy danh sách từ vựng dựa trên topicId
                vocabularies.value = await VocabularyService.getVocabularyByTopic(props.topicId);
                console.log(vocabularies.value)
            } catch (error) {
                console.log(error);
            }
        };
        // Khi component được tạo, gọi API để lấy danh sách từ vựng ban đầu
        retrieveVocabularies();
        return {
            vocabularies,
            activeIndex,
            retrieveVocabularies,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>

  