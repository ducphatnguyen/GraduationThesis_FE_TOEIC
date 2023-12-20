<template>
    <div class="button-container mt-5">
        <button :class="{ active: showTheory }" @click="showTheory = true">
            Lý thuyết
        </button>
        <button :class="{ active: !showTheory }" @click="showTheory = false">
            Trắc nghiệm
        </button>
    </div>

    <div class="container" v-show="showTheory">

        <div class="row mb-3 mt-1">
            <div class="col-lg col-md col-sm">
                <div class="card specific-card mt-4">
                    <h1 class="text-center">
                        <span>{{ grammarName }}</span>
                    </h1>
                    <div class="card-body" style="min-height: 500px;">
                        <h4 class="card-title text-center lesson-title mb-5 ms-1">
                            <!-- <span>{{ grammarName }}</span> -->
                        </h4>
                        <i class="fa-solid fa-book book-icon ms-1"></i>
                        <div v-for="grammarContent in grammarContents" :key="grammarContent.contentId" class="mb-2">
                            <h4 class="card-subtitle mb-2 text-body-secondary lesson-subtitle">
                                <span class="highlight">{{ grammarContent.title }}</span>
                            </h4>
                            <p class="card-text" v-html="grammarContent.content"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none">
                <h5 class="text-center"><i class="fa-solid fa-bolt text-warning me-2"></i>OTHER GRAMMARS</h5>
                <div style="max-height:500px; overflow: auto;">
                    <div class="card mb-2 me-2 mt-2" v-for="grammar in grammars" :key="grammar.grammarId">
                        <router-link :to="{ name: 'grammar.show', params: { grammarId: grammar.grammarId } }"
                            class="card-body custom-card text-decoration-none">
                            <span class="card-text">{{ grammar.grammarName }}</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid" v-show="!showTheory">
        <div class="row mt-3">
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

                                            <ul class="mt-5">
                                                <button class="btn button5 mb-2"
                                                    style="background-color: #e8f2ff; color: #35509a; width: 60px;">{{ index
                                                        + 1
                                                    }}
                                                </button>
                                                <span class="ms-3">{{ question.questionContent }}</span>

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
                                                <button @click="toggleExplanation(index)"
                                                    class="btn btn-link btn-sm mt-2 link-offset-3">
                                                    {{ showExplanation[index] ? 'Hide Explanation' : 'Show Explanation' }}
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
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none border-0">
                <div class="card specific-card border-0" style="position: sticky; top: 95px; z-index: 1;">
                    <div class="card-body border-0">
                        <div class="question-list-section">
                            <h5 class="fw-normal fs-5 text-center">Question Palette</h5>
                            <div class="question-buttons mb-5 mx-2 lesson-content " style="display: flex; flex-wrap: wrap;">
                                <button v-for="(q, index) in questions" :key="index" @click="scrollToQuestion(index)"
                                    :class="{
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
                                    <button class="btn btn-light" @click="refreshPage" v-if="isSubmited === true">
                                        <i class="fas fa-sync-alt text-success"></i> Refresh
                                    </button>
                                    <button class="button" @click="submitAnswers" v-if="isSubmited === false">
                                        Chấm điểm
                                    </button>
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
import { defineComponent, ref, onMounted, watch, computed, watchEffect } from "vue";

import GrammarService from "@/services/grammar.service";
import GrammarContentService from "@/services/grammar_content.service";
import GrammarQuestionService from "@/services/grammar_question.service";

import Swal from 'sweetalert2';

export default defineComponent({
    props: {
        grammarId: { type: String, required: true }
    },
    setup(props) {

        const showTheory = ref(true);

        const grammars = ref([]);
        const fetchGrammars = async () => {
            try {
                grammars.value = await GrammarService.allEnable();
                console.log(grammars.value);
            } catch (error) {
                console.log(error);
            }
        };
        const grammarContents = ref([]);
        const grammarName = ref("");
        const retrieveGrammarContents = async () => {
            try {
                console.log(props.grammarId);
                grammarContents.value = await GrammarContentService.getEnableGrammarContentsByGrammar(props.grammarId);
                console.log(grammarContents.value);
                grammarName.value = grammarContents.value[0].grammar.grammarName;
            } catch (error) {
                console.log(error);
            }
        };
        onMounted(() => {
            fetchGrammars();
            retrieveGrammarContents();
        });
        watch(() => props.grammarId, () => {
            fetchGrammars();
            retrieveGrammarContents();
        });

        const showExplanation = ref({});
        const toggleExplanation = async (index) => {
            console.log(index)
            showExplanation.value[index] = !showExplanation.value[index];
            console.log(showExplanation.value[index])
            if (showExplanation.value[index]) {

                const question = questions.value[index];
                console.log(questions.value[index])
                const explanation = question.questionExplanation;
                console.log(explanation)
                const targetLanguage = "vi"; // Tiếng Việt

                try {
                    const translatedExplanation = await translateText(explanation, targetLanguage);
                    question.translatedExplanation = translatedExplanation;
                } catch (error) {
                    console.error("Lỗi khi dịch:", error);
                }
            }
        };

        const scrollToQuestion = (index) => {
            const questionElement = document.getElementById(`question-${index}`);
            if (questionElement) {
                questionElement.scrollIntoView({ behavior: "smooth" });
            }
            console.log(index)
        };

        const questions = ref([]);
        const retrieveGrammarQuestions = async () => {
            try {
                questions.value = await GrammarQuestionService.getEnableGrammarQuestionsByGrammar(props.grammarId);
                console.log(questions.value)
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            retrieveGrammarQuestions();
        });

        const getCorrectCount = ref(0);
        const getIncorrectCount = ref(0);
        // Sử dụng watchEffect để theo dõi sự thay đổi trong questions
        watchEffect(() => {
            getCorrectCount.value = questions.value.filter((q) => q.answered && q.selectedOption === q.correctOption).length;
            getIncorrectCount.value = questions.value.filter((q) => q.answered && q.selectedOption !== q.correctOption).length;

            // Sử dụng getCorrectCount và getIncorrectCount ở đây
            console.log('Correct Count:', getCorrectCount.value);
            console.log('Incorrect Count:', getCorrectCount.value);
        });



        const submitAnswers = async () => {
            // Đã trả lời ít nhất 1 câu
            const answeredQuestions = questions.value.filter(question => question.selectedOption);
            if (answeredQuestions.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Bạn chưa trả lời bất kỳ câu nào. Vui lòng chọn đáp án!',
                });
            } else if (answeredQuestions.length < questions.value.length) {
                const result = await Swal.fire({
                    icon: 'question',
                    title: 'Bạn chưa hoàn thành tất cả câu hỏi',
                    text: 'Bạn thực sự muốn nộp?',
                    showCancelButton: true,
                    confirmButtonText: 'Nộp',
                    cancelButtonText: 'Quay lại',
                });
                if (result.isConfirmed) {
                    continueSubmit();
                }
            } else {
                const result = await Swal.fire({
                    icon: 'question',
                    title: 'Bạn có chắc chắn muốn nộp?',
                    showCancelButton: true,
                    confirmButtonText: 'Nộp',
                    cancelButtonText: 'Quay lại',
                });
                if (result.isConfirmed) {
                    continueSubmit();
                }
            }
        };

        const isSubmited = ref(false)
        const continueSubmit = () => {
            questions.value.forEach((question) => {
                if (question.selectedOption) {
                    question.answered = true;
                }
                question.isGraded = true;
                isSubmited.value = true;
            });
            // Tính điểm 
            const correctCount = questions.value.filter(
                (question) => question.answered && question.selectedOption === question.correctOption
            ).length;
            const incorrectCount = questions.value.filter(
                (question) => question.answered && question.selectedOption !== question.correctOption
            ).length;
            // Hiển thị kết quả
            Swal.fire({
                icon: 'info',
                title: 'Kết quả',
                html: `Số câu đúng: <strong>${correctCount}</strong><br>Số câu sai: <strong>${incorrectCount}</strong>`,
            });
        };

        // Làm lại
        const refreshPage = () => {
            questions.value.forEach((question) => {
                question.selectedOption = null;
                question.answered = false;
                question.isGraded = false;
            });
            isSubmited.value = false;
        };

        const getOptions = (question) => {
            return [question.optionA, question.optionB, question.optionC, question.optionD];
        };

        const getOptionClass = (question, option) => {
            return {
                'highlight-row': option === question.selectedOption,
            };
        };

        const clearSelection = (question) => {
            question.selectedOption = null;
        };

        const checkAnswer = (question) => {
            console.log(question.selectedOption)
            if (question.selectedOption) {
                question.answered = true;
            }
        };

        const translateText = async (text, targetLanguage) => {
            const apiKey = "AIzaSyD-7uWTjTodZba7ky7mgfSgnVxAX_opoh8";
            const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
            const sourceLang = 'en'; // Ngôn ngữ là tiếng Anh (Anh -> Việt)
            const data = {
                q: text,
                source: sourceLang,
                target: targetLanguage,
            };
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                return result.data.translations[0].translatedText;
            } catch (error) {
                throw error;
            }
        };


        return {
            grammars,
            grammarContents,
            grammarName,
            showTheory,

            questions,
            isSubmited,
            submitAnswers,
            refreshPage,

            getOptions,
            getOptionClass,
            clearSelection,
            checkAnswer,
            translateText,

            showExplanation,
            toggleExplanation,
            scrollToQuestion,
            getCorrectCount,
            getIncorrectCount,
        };
    },
});
</script>
  
<style scoped>
@import "@/assets/test.css";

.button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 60px;
}

.button-container button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fff;
    border: 1px #fff;
    border-radius: 20px;
    cursor: pointer;
    margin: 0 10px;
    transition: background-color 0.3s ease;
}

.button-container button.active {
    background-color: #ccc;
    font-weight: bold;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 700;
    color: #34447c;
}

.custom-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    transition: color 0.3s;
}

.card-text {
    flex-grow: 1;
    font-size: 15px;
}

.custom-card:hover {
    color: #007aff;
    transform: none;
}

.card {
    position: relative;
    transition: transform 0.3s;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(11, 21, 114, 0.1);
    border-radius: 10px;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(26, 25, 128, 0.2);
}

.card.specific-card:hover {
    transform: none;
    box-shadow: 0 4px 8px rgba(72, 87, 219, 0.1);
}

.card.specific-card:hover .text-body-secondary {
    color: #666;
}

.lesson-title {
    font-weight: bold;
    font-size: 24px;
    color: #34447c;
    margin-bottom: 10px;
}

.lesson-subtitle {
    font-weight: bold;
    font-size: 18px;
    color: #666;
    margin-bottom: 5px;
}

.card.specific-card {
    border: 2px solid #052649;
}

.card.specific-card:hover {
    transform: none;
    box-shadow: 0 4px 8px rgba(72, 87, 219, 0.1);
    border-color: #041930;
}

.book-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: #052649;
}

.highlight {
    background-color: #bfedd2;
}
</style>
  