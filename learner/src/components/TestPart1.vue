<template>
    <div class="col-lg col-md col-sm">
        <div class="card specific-card border-0 shadow-lg">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg col-md col-sm">
                        <!-- Vòng lặp để hiển thị các câu hỏi -->
                        <div class="question-section" v-for="(question, index) in questions" :key="index"
                            :id="'question-' + index">
                            <div class="card specific-card mb-3 border-0 shadow-lg">
                                <div class="card-body ">
                                    <span class="badge text-bg-secondary" style="font-size:14px">{{ question.questionType
                                    }}</span>
                                    <!-- Audio -->
                                    <div class="audio-container mb-2">
                                        <audio controls style="width:400px">
                                            <source :src="getAudioUrl(question.questionAudio)" type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                    <!-- Image -->
                                    <div class="image-container">
                                        <img :src="getImageUrl(question.questionImage)" alt="Luyện thi Listening TOEIC"
                                            style="width: 400px; height: 300px;" class="question-image" loading="lazy" />
                                    </div>

                                    <ul class="mt-5">
                                        <button class="btn button5 mb-2"
                                            style="background-color: #e8f2ff; color: #35509a; width: 60px;">{{ index + 1
                                            }}
                                        </button>

                                        <li v-for="(option, optionIndex) in getOptions(question)" :key="optionIndex"
                                            :class="getOptionClass(question, option)">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio" :value="option"
                                                    v-model="question.selectedOption" :disabled="question.isGraded"
                                                    :name="'flexRadioDefault-' + question.questionId" />
                                                {{ option }}
                                                <div v-if="question.isGraded && option === question.correctOption"
                                                    class="result-icon">
                                                    <i class="fas fa-check" style="color: green"></i>
                                                </div>
                                                <div v-if="question.isGraded && option === question.selectedOption && option !== question.correctOption"
                                                    class="result-icon">
                                                    <i class="fas fa-times" style="color: red"></i>
                                                </div>
                                            </label>
                                        </li>
                                        <button v-if="!question.isGraded" @click="clearSelection(question)"
                                            class="btn btn-link text-decoration-none">
                                            Clear Selection
                                        </button>
                                    </ul>
                                    
                                    <div v-if="question.isGraded" class="feedback-section">
                                        <button @click="toggleTranscript(index)"
                                            class="btn btn-link btn-sm mt-2 link-offset-3">
                                            {{ showTranscript[index] ? 'Hide Transcript' : 'Show Transcript' }}
                                        </button>

                                        <div v-if="showTranscript[index]" class="transcript">
                                            <div class="transcript-original">
                                                <div v-html="question.questionScript"></div>
                                            </div>
                                            <div class="transcript-translation" v-if="question.translatedScript">
                                                <span class="badge text-bg-success">Bản dịch</span>
                                                <div v-html="question.translatedScript"></div>
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
        <div class="card specific-card border-0" style="position: sticky; top: 95px; z-index: 1;">
            <div class="card-body border-0">
                <div class="question-list-section">
                    <h5 class="fw-normal fs-5 text-center">Question Palette</h5>
                    <div class="question-buttons mb-5 mx-2 lesson-content " style="display: flex; flex-wrap: wrap;">
                        <button v-for="(q, index) in questions" :key="index" @click="scrollToQuestion(index)" :class="{
                            correct: q.answered && q.selectedOption === q.correctOption,
                            incorrect: q.answered && q.selectedOption !== q.correctOption,
                            selected: q.selectedOption !== null, // Thêm lớp 'selected' khi tùy chọn đã chọn
                            graded: q.isGraded, // Thêm lớp 'graded' khi đã chấm điểm
                        }" :style="{
                                backgroundColor: q.selectedOption
                                    ? q.isGraded
                                        ? q.selectedOption === q.correctOption
                                            ? 'green'
                                            : 'red'
                                        : 'orange'
                                    : '', // Màu nền câu đã chọn và mặc định
                                color: q.selectedOption ? 'white' : 'black', // Màu chữ của câu đã chọn và mặc định
                            }" class="equal-size-button">
                            <span class="order-number">
                                {{ index + 1 }}
                            </span>
                        </button>
                    </div>
                    <div class="score">
                        <i class="fas fa-square" style="color: green"></i> {{ getCorrectCount }}/{{
                            questions.length }}
                        <i class="fas fa-square ms-2" style="color: red"></i> {{ getIncorrectCount }}/{{
                            questions.length }}
                    </div>
                    <div class="row mt-3">
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-light" @click="refreshPage" v-if="isSubmited===true">
                                <i class="fas fa-sync-alt text-success"></i> Refresh
                            </button>
                            <button class="button" @click="submitAnswers" v-if="isSubmited===false">
                                Chấm điểm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
    props: {
        questions: Array,
        submitAnswers: Function,
        refreshPage: Function,
        isSubmited: Boolean,
        getImageUrl: Function,
        getAudioUrl: Function,
        translateText: Function,
        getOptions: Function,
        getOptionClass: Function,
        clearSelection: Function,
        checkAnswer: Function,
    },
    
    setup(props) {
        const showTranscript = ref({});
        const toggleTranscript = async (index) => {
            showTranscript.value[index] = !showTranscript.value[index];
            if (showTranscript.value[index]) {
                const question = props.questions[index];
                console.log(question)
                const transcript = question.questionScript;
                const targetLanguage = "vi"; // Tiếng Việt
                try {
                    const translatedTranscript = await props.translateText(transcript, targetLanguage);
                    question.translatedScript = translatedTranscript;
                } catch (error) {
                    console.error("Translation Error:", error);
                }
            }
        };

        const getCorrectCount = computed(() => {
            return props.questions.filter((q) => q.answered && q.selectedOption === q.correctOption).length;
        });
        const getIncorrectCount = computed(() => {
            return props.questions.filter((q) => q.answered && q.selectedOption !== q.correctOption).length;
        });
        const scrollToQuestion = (index) => {
            const questionElement = document.getElementById(`question-${index}`);
            if (questionElement) {
                questionElement.scrollIntoView({ behavior: "smooth" });
            }
            console.log(index)
        };

        return {
            showTranscript,
            toggleTranscript,
            scrollToQuestion,

            getCorrectCount,
            getIncorrectCount,
        };
    },
});
</script>

<style scoped>
@import "@/assets/test.css";
</style>