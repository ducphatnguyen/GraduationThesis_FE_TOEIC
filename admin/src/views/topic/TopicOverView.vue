<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li class="current">
                    <i class="fas fa-file-alt"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Topic</button>
                </li>
            </ol>
        </nav>
    </div>
    <div>
        <TopicList :topics="topics" :retrieveTopics="retrieveTopics"></TopicList>
    </div>
</template>

<script>
import TopicList from "@/components/topic/TopicList.vue";

import TopicService from "@/services/topic.service";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        TopicList,
    },
    setup() {
        const topics = ref([]);
        const activeIndex = ref(-1);

        const retrieveTopics = async () => {
            try {
                topics.value = await TopicService.all();
                console.log(topics.value)
            } catch (error) {
                console.log(error);
            }
        };
        retrieveTopics();
        return {
            topics,
            activeIndex,
            retrieveTopics,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
