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
                            <img src="https://th.bing.com/th/id/R.50feae0671a4ce982b6db0bc095d95ae?rik=eVczvOwjlhkXdw&pid=ImgRaw&r=0"
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
                                            <p class="card-text"><i class="fa-solid fa-user-pen" style="color:chocolate"></i> 3 participants</p>
                                        </div>
                                        <div class="col-5">
                                            <p class="card-text"> <i class="fas fa-clock me-2" style="color: cornflowerblue;"></i>{{ exam.examDuration /
                                                3600 }}
                                                hours</p>
                                        </div>
                                    </div>
                                </div>

                                <router-link
                                    :to="{ name: 'exam-question-fulltest-preparation', params: { examId: exam.examId } }"
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
            <!-- Phần bình luận -->
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
                exams.value = await ExamService.getEnableFullTest();
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
  