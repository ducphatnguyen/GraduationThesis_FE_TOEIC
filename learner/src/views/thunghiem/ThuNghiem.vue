<template>
    <!-- Modal image -->
    <div class="modal zoom" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Bảng điểm thi TOEIC</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex justify-content-center">
                    <img class="my-3" src="https://ace.edu.vn/wp-content/uploads/2022/06/dt-compressor-1.jpg" alt=""
                        loading="lazy">
                </div>
            </div>
        </div>
    </div>

    <div class="bg-test">
        <div class="container-fluid">
            <div class="row mt-3">
                <div class="col-lg col-md col-sm">
                    <div class="alert alert-danger" role="alert">
                        <i class="fa-solid fa-triangle-exclamation me-3"></i>Bạn chưa tạo mục tiêu cho quá trình luyện thi
                        của mình. Tạo ngay.
                    </div>
                    <div class="alert alert-warning" role="alert">
                        <i class="fa-solid fa-circle-exclamation me-3"></i>Đánh giá điểm chỉ dành riêng cho Full Test 200
                        câu.
                    </div>

                    <div class="card specific-card border-0 shadow-lg mb-4">
                        <div class="card-body">
                            <div class="row">
                                <!-- Card 1 -->
                                <div class="col-md-3">
                                    <div class="card radius-10 border-start border-0 border-3 border-success card-with-effect"
                                        @click="toggleEffect">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <p class="mb-0 text-secondary">Trả lời đúng</p>
                                                    <h4 class="my-1 text-success">{{ userExamById.numCorrectAnswers }}/{{
                                                        userExamById.numCorrectAnswers + userExamById.numWrongAnswers +
                                                        userExamById.numSkippedQuestions }}</h4>

                                                </div>
                                                <div
                                                    class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                                                    <i class="fa-solid fa-circle-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card 2 -->
                                <div class="col-md-3">
                                    <div
                                        class="card radius-10 border-start border-0 border-3 border-danger card-with-effect">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <p class="mb-0 text-secondary">Trả lời sai</p>
                                                    <h4 class="my-1 text-danger">{{ userExamById.numWrongAnswers }}/{{
                                                        userExamById.numCorrectAnswers + userExamById.numWrongAnswers +
                                                        userExamById.numSkippedQuestions }}</h4>

                                                </div>
                                                <div
                                                    class="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                                                    <i class="fa-solid fa-circle-xmark"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card 3 -->
                                <div class="col-md-3">
                                    <div
                                        class="card radius-10 border-start border-0 border-3 border-secondary card-with-effect">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <p class="mb-0 text-secondary">Bỏ qua</p>
                                                    <h4 class="my-1 text-secondary">{{ userExamById.numSkippedQuestions
                                                    }}/{{
                                                        userExamById.numCorrectAnswers + userExamById.numWrongAnswers +
                                                        userExamById.numSkippedQuestions }}</h4>
                                                </div>
                                                <div
                                                    class="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                                                    <i class="fa-solid fa-minus"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Card 4 -->
                                <div class="col-md-3">
                                    <div
                                        class="card radius-10 border-start border-0 border-3 border-warning card-with-effect">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <p class="mb-0 text-secondary">Hoàn thành trong</p>
                                                    <h4 class="my-1 text-warning">{{ userExamById.completionTime }}</h4>
                                                </div>
                                                <div
                                                    class="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
                                                    <i class="fa-solid fa-clock"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="card border-0">
                                <div class="row g-0">

                                    <!-- Tiến độ trên thang điểm 990 -->
                                    <div class="col-4 d-flex justify-content-center align-items-center">
                                        <CircleProgress :percent="percent" :viewport="true" :is-gradient="true" />
                                        <span class="score-value">{{ userExamById.totalScore }}/{{ maxScore }}</span>
                                    </div>

                                    <!-- Điểm nghe và đọc -->
                                    <div class="col-8">
                                        <div class="card-body border mt-3 me-3">
                                            <h5 class="card-title"><i class="fa-solid fa-headphones"></i> LISTENING:
                                                {{ userExamById.numListeningCorrectAnswers }}/100
                                            </h5>
                                            <div class="progress" role="progressbar" aria-label="Success example"
                                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div class="progress-bar bg-success"
                                                    style="width:{{ userExamById.listeningScore*100/maxListeningScore }}%">
                                                    {{ userExamById.listeningScore }}</div>
                                            </div>

                                        </div>
                                        <div class="card-body border me-3">
                                            <h5 class="card-title"><i class="fa-solid fa-book-open-reader"></i> READING:
                                                {{ userExamById.numReadingCorrectAnswers }}/100</h5>
                                            <div class="progress" role="progressbar" aria-label="Success example"
                                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <div class="progress-bar bg-success"
                                                    style="width: {{ userExamById.readingScore*100/maxListeningScore }}%">
                                                    {{ userExamById.readingScore }}</div>
                                            </div>

                                        </div>

                                        <div>
                                            <!-- Button trigger modal -->
                                            <button type="button" class="btn btn-link link-offset-3" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal">
                                                <i class="fa-solid fa-circle-info me-1 mt-3"></i> Xem chi tiết cách tính
                                                điểm
                                            </button>
                                        </div>
                                        <p class="">Nhận xét: Bạn làm rất tốt, chúc mừng bạn !!!</p>
                                    </div>

                                </div>
                            </div>
                            <div class="row my-3" id="reviewAnswers">
                                <button type="button" class="btn btn-primary">Xem lại toàn bộ đáp án</button>
                            </div>

                            <div class="row">
                                <div class="col-6" v-for="(question) in questions" :key="question.userExamQuestionId">
                                    <button class="btn my-2"
                                        style="background-color: #e8f2ff; color: #35509a; width: 60px; border-radius: 50%;">
                                        {{ question.examQuestion.orderNumber }}
                                    </button>
                                    {{ question.examQuestion.correctOption }}:
                                    <span v-if="question.selectedOption === null">
                                        Không trả lời
                                    </span>
                                    <span v-else>
                                        {{ question.selectedOption }}
                                    </span>
                                    <i v-if="question.isCorrect === 1" class="fa-solid fa-check text-success mx-2"></i>
                                    <i v-else-if="question.isCorrect === 0" class="fa-solid fa-xmark text-danger mx-2"></i>
                                    <i v-else class="fa-solid fa-minus mx-2"></i>


                                    <a href="" class="text-decoration-none"></a>

                                    <!-- Mở modal chỉnh sửa Section -->
                                    <button type="button" class="btn btn-link text-decoration-none" data-bs-toggle="modal"
                                        :data-bs-target="'#viewDetailsModal-' + question.userExamQuestionId">
                                        [Xem chi tiết]
                                    </button>
                                    <!-- Modal chỉnh sửa Section -->
                                    <div :id="'viewDetailsModal-' + question.userExamQuestionId" class="modal zoom"
                                        tabindex="-1"
                                        :aria-labelledby="'viewDetailsModalLabel-' + question.userExamQuestionId"
                                        aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5"
                                                        :id="'viewDetailsModalLabel-' + question.userExamQuestionId"><i
                                                            class="fa-regular fa-circle-question me-3"
                                                            style="color: rgb(22, 42, 114)"></i>Câu hỏi {{
                                                                question.examQuestion.orderNumber }}
                                                    </h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="audio-container mt-5 mb-2"
                                                                v-if="question.examQuestion.questionAudio">
                                                                <audio controls style="width:400px">
                                                                    <source
                                                                        :src="getAudioUrl(question.examQuestion.questionAudio)"
                                                                        type="audio/mpeg" />
                                                                    Your browser does not support the audio element.
                                                                </audio>
                                                            </div>

                                                            <div class="audio-image-container mt-3">
                                                                <div class="image-container"
                                                                    v-if="question.examQuestion.questionImage">
                                                                    <img :src="getImageUrl(question.examQuestion.questionImage)"
                                                                        style="width: 400px" alt="Luyện thi Listening TOEIC"
                                                                        class="question-image" loading="lazy" />
                                                                </div>
                                                            </div>

                                                            <div class="audio-image-container mt-5">
                                                                <div class="audio-container mb-2"
                                                                    v-if="question.examQuestion.questionPassage">
                                                                    <p v-html="question.examQuestion.questionPassage"></p>
                                                                </div>
                                                            </div>


                                                            <button class="btn button5 mb-2"
                                                                style="background-color: #e8f2ff; color: #35509a; width: 60px;">
                                                                {{
                                                                    question.examQuestion.orderNumber
                                                                }}
                                                            </button>

                                                            <span class="ms-1">{{ question.examQuestion.questionContent
                                                            }}</span>

                                                            <li v-for="(option, optionIndex) in getOptions(question)"
                                                                style="list-style-type:none" :key="optionIndex"
                                                                :class="getOptionClass(question, option)">
                                                                <label class="form-check-label">
                                                                    <input class="form-check-input" type="radio"
                                                                        :value="option" v-model="question.selectedOption"
                                                                        disabled
                                                                        :name="'flexRadioDefault-' + question.examQuestion.examQuestionId" />
                                                                    {{ option }}
                                                                    <div v-if="option === question.examQuestion.correctOption"
                                                                        class="result-icon">
                                                                        <i class="fas fa-check" style="color: green"></i>
                                                                    </div>
                                                                    <div v-if="option === question.selectedOption && option !== question.examQuestion.correctOption"
                                                                        class="result-icon">
                                                                        <i class="fas fa-times" style="color: red"></i>
                                                                    </div>

                                                                </label>
                                                            </li>

                                                            <div v-if="question.examQuestion.questionScript !== ''"
                                                                class="feedback-section">
                                                                <button
                                                                    @click="toggleTranscript(question.examQuestion.examQuestionId)"
                                                                    class="btn btn-link btn-sm mt-2 link-offset-3">
                                                                    {{ showTranscript[question.examQuestion.examQuestionId]
                                                                        ? 'Hide Transcript' : 'Show Transcript' }}
                                                                </button>
                                                                <div v-if="showTranscript[question.examQuestion.examQuestionId]"
                                                                    class="transcript"
                                                                    v-html="question.examQuestion.questionScript"></div>
                                                            </div>


                                                            <div v-if="question.examQuestion.questionExplanation !== ''"
                                                                class="feedback-section">
                                                                <button
                                                                    @click="toggleExplanation(question.examQuestion.examQuestionId)"
                                                                    class="btn btn-link btn-sm mt-2 link-offset-3">
                                                                    {{ showExplanation[question.examQuestion.examQuestionId]
                                                                        ? 'Hide Explanation' : 'Show Explanation' }}
                                                                </button>
                                                                <div v-if="showExplanation[question.examQuestion.examQuestionId]"
                                                                    class="explanation"
                                                                    v-html="question.examQuestion.questionExplanation">
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none border-0">
                    <router-link :to="{ name: 'learningroute' }"
                        class="btn btn-primary d-flex justify-content-center mb-3 border rounded-4">
                        Thống kê kết quả luyện thi
                    </router-link>

                    <div class="card specific-card border-0 shadow">

                        <div class="card-header border-0 text-center">
                            Thông tin kỳ thi
                        </div>
                        <div class="card-body border-0">
                            <p>- Bộ đề thi: ETS 2023</p>
                            <p v-if="userExamById.exam">- {{ userExamById.exam.examName }}</p>
                            <p v-if="userExamById.exam">- {{ userExamById.exam.examDuration }}</p>
                        </div>
                        <div class="row">
                            <div class="col d-flex justify-content-center">
                                <div class="btn btn-outline-primary border rounded-4" @click="scrollToQuestion()">
                                    Xem đáp án
                                </div>
                            </div>
                            <div class="col d-flex justify-content-center">
                                <router-link :to="{ name: 'exam-fulltest' }">
                                    <div class="btn btn-outline-primary border rounded-4">
                                        Tiếp tục thi
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div class="card-footer border-0 d-flex justify-content-center">
                            <a href="#" class="btn btn-light"> <span style="font-size:20px">🎯 Mục tiêu: 900/990</span></a>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted } from 'vue';
import CircleProgress from 'vue3-circle-progress';
import "vue3-circle-progress/dist/circle-progress.css";
import UserExamService from "@/services/user_exam.service";
import UserExamQuestionService from "@/services/user_exam_question.service";

export default defineComponent({
    props: {
        userExamId: { type: String, required: true }
    },
    components: {
        CircleProgress,
    },
    setup(props) {

        const percent = ref(0);
        const maxScore = ref(990);
        const maxListeningScore = ref(495);
        const maxReadingScore = ref(495);

        const userExamById = ref([]);
        const retrieveUserExamById = async () => {
            try {
                console.log(props.userExamId)
                userExamById.value = await UserExamService.getUserExamById(props.userExamId);
                console.log(userExamById.value);

                percent.value = (userExamById.value.totalScore / maxScore.value) * 100;
                // totalScore.value = userExamById.value.totalScore;
            } catch (error) {
                console.log(error);
            }
        };

        const questions = ref([]);
        const retrieveQuestionsByUserExamId = async () => {
            try {
                console.log(props.userExamId);
                questions.value = await UserExamQuestionService.getQuestionsByUserExamId(props.userExamId);
                console.log(questions.value)

            } catch (error) {
                console.log(error);
            }
        };

        const scrollToQuestion = () => {
            const examQuestionElement = document.getElementById(`reviewAnswers`);
            if (examQuestionElement) {
                examQuestionElement.scrollIntoView({ behavior: "smooth" });
            }
        };

        const getImageUrl = (imageName) => {
            if (imageName) {
                // Tạo URL cho ảnh bằng cách kết hợp đường dẫn cơ sở và tên ảnh
                return `http://localhost:9004/images/${imageName}`;
            }
            return "";
        };

        const getAudioUrl = (audioName) => {
            if (audioName) {
                // Tạo URL cho ảnh bằng cách kết hợp đường dẫn cơ sở và tên ảnh
                return `http://localhost:9004/audios/${audioName}`;
            }
            return "";
        };

        const showTranscript = ref({});
        const toggleTranscript = (examQuestionId) => {
            showTranscript.value[examQuestionId] = !showTranscript.value[examQuestionId];
        };

        const showExplanation = ref({});
        const toggleExplanation = (examQuestionId) => {
            showExplanation.value[examQuestionId] = !showExplanation.value[examQuestionId];
        };

        const getOptions = (question) => {
            if (question.examQuestion.orderNumber >= 7 && question.examQuestion.orderNumber <= 31) {
                return [question.examQuestion.optionA, question.examQuestion.optionB, question.examQuestion.optionC];
            }
            return [question.examQuestion.optionA, question.examQuestion.optionB, question.examQuestion.optionC, question.examQuestion.optionD];
        };

        const getOptionClass = (question, option) => {
            return {
                'highlight-row': option === question.examQuestion.selectedOption,
            };
        };

        onMounted(() => {
            retrieveUserExamById();
            retrieveQuestionsByUserExamId();
        });

        return {
            maxScore,
            percent,
            userExamById,
            maxListeningScore,
            maxReadingScore,
            scrollToQuestion,
            questions,
            getImageUrl,
            getAudioUrl,
            showTranscript,
            toggleTranscript,
            getOptions,
            getOptionClass,
            showExplanation,
            toggleExplanation
        };
    },
});
</script>
  

<style scoped>
@import "@/assets/test.css";

.modal.zoom .modal-dialog {
    transition: transform 0.2s ease-out;
    transform: scale(0.4);
}

.modal.zoom.show .modal-dialog {
    transform: scale(1);
}

.score-value {
    position: absolute;
    top: 47%;
    left: 17%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.vue3-circle-progress .circle-percent {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.widgets-icons-2 {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ededed;
    font-size: 27px;
    border-radius: 10px;
}

.bg-gradient-scooter {
    background: #17ead9;
    background: -webkit-linear-gradient(45deg, #17ead9, #0f6c3a) !important;
    background: linear-gradient(45deg, #07bb13, #076933) !important;
}

.bg-gradient-ohhappiness {
    background: #00b09b;
    background: -webkit-linear-gradient(45deg, #800909, #5f0f13) !important;
    background: linear-gradient(45deg, #ed1123, #e51f36) !important;
}

.bg-gradient-bloody {
    background: #f54ea2;
    background: -webkit-linear-gradient(45deg, #0d0417, #08031d) !important;
    background: linear-gradient(45deg, #8b8990, #7e7a7a) !important;
}

.bg-gradient-blooker {
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}
</style>