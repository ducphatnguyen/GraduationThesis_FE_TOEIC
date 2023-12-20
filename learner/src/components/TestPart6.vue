<template>
    <div class="col-lg col-md col-sm">
        <div class="card specific-card border-0 shadow-lg">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 mt-3" v-for="(groupQuestions, groupId) in groupedQuestions" :key="groupId">
                        <!-- Display group image and passage -->
                        <div class="row">
                            <div class="col-md-6 bg-light rounded">
                                <div class="audio-image-container mt-5">
                                    <div class="audio-container mb-2" v-if="shouldDisplayGroupContent(groupQuestions)">
                                        <p v-html="groupQuestions[0].questionGroup.groupPassage"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="scrollable-container">
                                    <div v-for="(question, index) in groupQuestions" :key="index" class="ms-3">
                                        <div :id="'question-' + groupId + '-' + index" class="question">
                                            <span class="badge text-bg-secondary mb-2" style="font-size:14px">{{
                                                question.questionType }}</span>
                                            <div class="row mb-4">
                                                <ul>
                                                    <button class="btn button5 mb-2"
                                                        style="background-color: #e8f2ff; color: #35509a; width: 60px;">{{
                                                            calculateQuestionNumber(groupId, index) + 1 }}</button>

                                                    <span class="ms-1">{{ question.questionContent }}</span>
                                                    <li v-for="(option, optionIndex) in getOptions(question)"
                                                        :key="optionIndex" :class="getOptionClass(question, option)">
                                                        <label class="form-check-label">
                                                            <input class="form-check-input" type="radio" :value="option"
                                                                v-model="question.selectedOption"
                                                                :disabled="question.isGraded"
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
                                                    <button @click="toggleExplanation(index)"
                                                        class="btn btn-link btn-sm link-offset-3">
                                                        {{ showExplanation[index] ? 'Hide Explanation' : 'Show Explanation'
                                                        }}
                                                    </button>

                                                    <div v-if="showExplanation[index]" class="transcript">
                                                        <div class="explanation-original">
                                                            <div v-html="question.questionExplanation"></div>
                                                        </div>
                                                        <div class="transcript-translation"
                                                            v-if="question.translatedExplanation">
                                                            <span class="badge text-bg-success">Bản dịch</span>
                                                            <div v-html="question.translatedExplanation"></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="mt-3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none  border-0">
        <div class="card specific-card border-0" style="position: sticky; top: 95px; z-index: 1;">
            <div class="card-body border-0">
                <div class="question-list-section">
                    <h5 class="fw-normal fs-5 text-center">Question Palette</h5>
                    <div class="question-buttons mb-5 mx-2 lesson-content " style="display: flex; flex-wrap: wrap;">
                        <template v-for="(groupQuestions, groupId) in groupedQuestions">
                            <button v-for="(question, index) in groupQuestions" :key="question.id"
                                @click="scrollToQuestion(groupId, index)" :class="{
                                    correct: question.answered && question.selectedOption === question.correctOption,
                                    incorrect: question.answered && question.selectedOption !== question.correctOption,
                                    selected: question.selectedOption !== null, // Thêm lớp 'selected' khi tùy chọn đã chọn
                                    graded: question.isGraded,
                                }" :style="{
                                    backgroundColor: question.selectedOption
                                        ? question.isGraded
                                            ? question.selectedOption === question.correctOption
                                                ? 'green'
                                                : 'red'
                                            : 'orange'
                                        : '', // Màu nền câu đã chọn và mặc định
                                    color: question.selectedOption ? 'white' : 'black', // Màu chữ của câu đã chọn và mặc định
                                }" class="equal-size-button">
                                <span class="order-number">
                                    {{ calculateQuestionNumber(groupId, index) + 1 }}
                                </span>
                            </button>

                        </template>
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
        translateText: Function,
        getOptions: Function,
        getOptionClass: Function,
        clearSelection: Function,
        checkAnswer: Function,
    },
    setup(props) {
        console.log(props.questions)
        const showExplanation = ref({});
        const toggleExplanation = async (index) => {
            showExplanation.value[index] = !showExplanation.value[index];

            if (showExplanation.value[index]) {
                const question = props.questions[index];
                const explanation = question.questionExplanation;
                const targetLanguage = "vi"; // Tiếng Việt

                try {
                    const translatedExplanation = await props.translateText(explanation, targetLanguage);
                    question.translatedExplanation = translatedExplanation;
                } catch (error) {
                    console.error("Lỗi khi dịch:", error);
                }
            }
        };
        
        const groupedQuestions = computed(() => groupQuestionsByGroupId(props.questions));
        const groupQuestionsByGroupId = (questions) => {
            const grouped = {};
            for (const question of questions) {
                const groupKey = question.questionGroup.groupId || 'default';
                if (!grouped[groupKey]) {
                    grouped[groupKey] = [];
                }
                grouped[groupKey].push(question);
            }
            console.log(grouped)
            return grouped;
        };
        
        const isGroupAnswered = (groupQuestions) => {
            return groupQuestions.every((question) => question.answered);
        };
        const calculateQuestionNumber = (groupId, questionIndex) => {
            let questionNumber = questionIndex;
            for (let i = 0; i < groupId; i++) {
                if (groupedQuestions.value[i]) {
                    questionNumber += groupedQuestions.value[i].length;
                }
            }
            return questionNumber;
        };

        const shouldDisplayGroupContent = (groupQuestions) => {
            return groupQuestions[0].questionGroup.groupImage || groupQuestions[0].questionGroup.groupPassage;
        };

        const getCorrectCount = computed(() => {
            return props.questions.filter((q) => q.answered && q.selectedOption === q.correctOption).length;
        });
        const getIncorrectCount = computed(() => {
            return props.questions.filter((q) => q.answered && q.selectedOption !== q.correctOption).length;
        });

        const scrollToQuestion = (groupId, index) => {
            const questionElement = document.getElementById(`question-${groupId}-${index}`);
            if (questionElement) {
                questionElement.scrollIntoView({ behavior: "smooth" });
            }
        };

        return {
            groupedQuestions,
            isGroupAnswered,
            calculateQuestionNumber,
            shouldDisplayGroupContent,
            scrollToQuestion,
            getCorrectCount,
            getIncorrectCount,
            showExplanation,
            toggleExplanation,
        };
    },
});
</script>
  

<style scoped>
@import "@/assets/test.css";
</style>