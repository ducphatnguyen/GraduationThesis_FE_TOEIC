<template>
    <div data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
        <div class="container">
            <div id="test">
                <h1 class="text-center mt-5">
                    <span>Start your TOEIC® Online Full Test Now!</span>
                </h1>
            </div>
            <div class="my-5">
                <div class="row d-flex justify-content-start">
                    <div class="col-lg-3 col-md-6 col-sm-12 mb-4" v-for="exam in exams" :key="exam.examId">
                        <div class="card-image">
                            <img src="data:image/jpeg;base64,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"
                                class="card-img-top" alt="..." loading="lazy" />
                        </div>
                        <div class="card-body">
                            <div class="row text-center">
                                
                                <div class="col-md-12">
                                    <p class="fw-bolder">{{ exam.examName }}</p>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <div class="row">
                                        <div class="col-7">
                                            <p class="card-text"><i class="fa-solid fa-user-pen"></i> 3 participants</p>
                                        </div>
                                        <div class="col-5">
                                            <p class="card-text"> <i class="fas fa-clock me-2"></i>{{ exam.examDuration / 3600 }}
                                        hours</p>
                                        </div>
                                    </div>
                                </div>

                                <router-link :to="{ name: 'exam-question-fulltest-preparation', params: { examId: exam.examId } }"
                                    class="text-decoration-none">
                                    <div class="d-flex justify-content-center">
                                        <button type="button" class="button my-2 w-75" style="width:100%">
                                            Thi ngay
                                        </button>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="test">
                <h1 class="text-center mt-5">
                    <span>Bình luận nào!!!</span>
                </h1>
            </div>
            <Comment></Comment>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

import ExamService from "@/services/exam.service";
import Comment from "./Comment.vue";

export default defineComponent({
    components: {
        Comment,
    },
    setup() {
        const exams = ref([]);
        const retrieveExams = async () => {
            try {
                exams.value = await ExamService.getMiniTest();
                console.log(exams.value);
            } catch (error) {
                console.log(error);
            }
        };
        onMounted(() => {
            retrieveExams();
        });
        return {
            exams,
        };

    },
});
</script>

<style scoped>
@import "@/assets/exam.css";
</style>
  