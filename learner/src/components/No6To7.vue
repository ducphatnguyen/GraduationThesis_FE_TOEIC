<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card specific-card mt-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/10101/10101901.png" alt="" width="100px;" height="100px">
                        </div>
                        <h2 class="text-center my-3">Writing: Trả lời yêu cầu bằng văn bản</h2>
                        <h5 class="card-title">Directions:</h5>
                        <p class="card-text">
                            Trong phần kiểm tra này, bạn sẽ thể hiện khả năng viết phản hồi cho e-mail của mình tốt đến mức
                            nào.
                            Câu trả lời của bạn sẽ được chấm điểm dựa trên chất lượng và sự đa dạng của câu, từ vựng và cách
                            tổ chức.
                            Bạn sẽ có 10 phút để đọc và trả lời e-mail.
                        </p>
                        <h5 class="card-title">Tiêu chí đánh giá:</h5>
                        <span class="badge bg-success-subtle border border-successs-subtle text-success-emphasis rounded-pill">Chất lượng và sự đa dạng của các mẫu câu sử dụng</span>
                        <span class="badge bg-success-subtle border border-successs-subtle text-success-emphasis rounded-pill mx-3">Từ vựng</span>
                        <span class="badge bg-success-subtle border border-successs-subtle text-success-emphasis rounded-pill">Tổ chức sắp xếp bài viết</span>
                    </div>
                </div>

                <div class="card specific-card mt-3">
                    <div class="card-body">
                        <button class="button" @click="startTest" v-if="!isReadyToTest">
                            Sẵn sàng luyện tập
                        </button>

                        <div v-if="isReadyToTest">

                            <button type="button" class="button mt-3" @click="confirmSubmit"
                                v-if="isReadyToTest && !isTestSubmitted">
                                Submit
                            </button>
                            <button class="button bg-danger" @click="refreshAllQuestions" v-if="isTestSubmitted">
                                Làm lại
                            </button>


                            <div class="word-item">
                                <div class="mb-5">
                                    <div class="text-end" style="font-size:20px">
                                        <span class="badge bg-primary-subtle border border-primary-subtle text-primary-emphasis rounded-pill">
                                            <i class="fa-solid fa-clock me-3"></i>Remaining: {{ formatTime(totalTime) }}
                                        </span>
                                    </div>

                                    <div class="word-info">
                                        <button class="btn button5 my-2 me-3"
                                            style="background-color: #e8f2ff; color: #35509a; width: 40px;">{{ currentIndex + 1
                                            }}</button>
                                        <br>
                                        <strong class="ms-3">Text:</strong>
                                        <div class="ms-3" v-html="questions[currentIndex].questionText"></div>
                                    </div>

                                    <div class="word-info mb-3" v-if="isTestSubmitted">
                                        <strong class="ms-3 text-success">Hint to answer:</strong>
                                        <div class="ms-3 border border-secondary p-2 border-2" v-html="questions[currentIndex].suggestedAnswer"></div>
                                    </div>

                                    <div class="mt-3">
                                        <div class="form-floating">
                                            <textarea class="form-control" v-model="userAnswers[currentIndex]"
                                                placeholder="Leave a comment here" id="floatingTextarea"
                                                style="height: 100px" :readonly="isTestSubmitted"></textarea>
                                            <label for="floatingTextarea">Your answer</label>
                                        </div>
                                    </div>

                                    <div class="mt-5 d-flex justify-content-center">
                                        <button class="button btn-primary d-flex" @click="showPreviousQuestion"
                                            v-if="currentIndex !== 0">
                                            Previous
                                        </button>
                                        <button class="button btn-primary ms-3" @click="showNextQuestion"
                                            v-if="currentIndex < questions.length - 1">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';

import TestService from "@/services/test.service";
import Swal from 'sweetalert2';

export default {
    props: {
        testId: { type: String, required: true },
    },
    setup(props) {

        const refreshAllQuestions = () => {
            isTestSubmitted.value = false;
            userAnswers.value = Array(questions.length).fill('');
            currentIndex.value = 0;
            totalTime.value = 1200;
            startTest();
        };

        const questions = ref([]);
        const retrieveQuestions = async () => {
            try {
                questions.value = await TestService.getQuestionsByTestId(props.testId);
                console.log(questions.value);
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            retrieveQuestions();
        });

        const isReadyToTest = ref(false);
        const totalTime = ref(1200); // Tổng thời gian đếm ngược cho bài thi (8 phút * 60 giây)
        const timer = ref();
        const startTest = () => {
            isReadyToTest.value = true;
            // Bắt đầu đếm ngược toàn bộ bài thi
            timer.value = setInterval(() => {
                totalTime.value--;
                if (totalTime.value <= 0) {
                    submitTest();
                }
            }, 1000);
        };

        const confirmSubmit = async () => {
            const shouldSubmit = await Swal.fire({
                icon: 'question',
                title: 'Bạn thực sự muốn nộp',
                text: 'Bạn thực sự muốn nộp?',
                showCancelButton: true,
                confirmButtonText: 'Nộp',
                cancelButtonText: 'Quay lại',
            });
            if (shouldSubmit.isConfirmed) {
                submitTest();
            }
        };

        const isTestSubmitted = ref(false);
        const submitTest = () => {
            console.log('submit')
            isTestSubmitted.value = true;
            clearInterval(timer.value);
        };

        // Dữ liệu và các hàm khác
        const userAnswers = ref(Array(questions.length).fill(''));

        const formatTime = (time) => {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;
            if (hours > 0) {
                return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
            } else if (minutes > 0) {
                return `${padZero(minutes)}:${padZero(seconds)}`;
            } else {
                return `${padZero(seconds)}`;
            }
        };
        const padZero = (number) => {
            return number.toString().padStart(2, "0");
        };

        const currentIndex = ref(0);
        const showNextQuestion = () => {
            if (currentIndex.value < questions.value.length - 1) {
                currentIndex.value++;
            }
        };
        const showPreviousQuestion = () => {
            if (currentIndex.value > 0) {
                currentIndex.value--;
            }
        };

        const getImageUrl = (imageName) => {
            if (imageName) {
                return `http://localhost:9004/images/${imageName}`;
            }
            return "";
        };


        return {
            questions,
            isReadyToTest,
            totalTime,
            startTest,
            currentIndex,
            showNextQuestion,
            showPreviousQuestion,
            formatTime,

            submitTest,
            isTestSubmitted,
            userAnswers,
            getImageUrl,
            confirmSubmit,
            refreshAllQuestions
        };
    },
};
</script>

<style scoped>
@import "@/assets/test.css";
</style>
  


