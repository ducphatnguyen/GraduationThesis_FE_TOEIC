<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li class="current">
                    <i class="fa-solid fa-comment"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Feedback</button>
                </li>
            </ol>
        </nav>
    </div>
    <FeedbackList :feedbacks="feedbacks"></FeedbackList>
</template>

<script>
import FeedbackList from "@/components/feedback/FeedbackList.vue";
import FeedbackService from "@/services/feedback.service";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        FeedbackList,
    },
    setup() {
        const feedbacks = ref([]);

        const retrieveFeedbacks = async () => {
            try {
                feedbacks.value = await FeedbackService.all();
                console.log(feedbacks.value);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveFeedbacks();
        return {
            feedbacks,
            retrieveFeedbacks,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
