<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li class="current">
                    <i class="fas fa-users"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Learner</button>
                </li>
            </ol>
        </nav>
    </div>
    <div>
        <LearnerList :learners="learners" :getAllLearners="getAllLearners"></LearnerList>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import UserService from "@/services/user.service";

import LearnerList from "@/components/learner/LearnerList.vue";

export default defineComponent({
    components: {
        LearnerList,
    },
    setup() {
        const learners = ref([]);
        const activeIndex = ref(-1);

        const getAllLearners = async () => {
            try {
                learners.value = await UserService.getAllLearners();
                console.log(learners.value)
            } catch (error) {
                console.log(error);
            }
        };
        getAllLearners();
        return {
            learners,
            activeIndex,
            getAllLearners,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
