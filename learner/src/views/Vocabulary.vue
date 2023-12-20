<template>
    <div class="button-container mt-5">
        <button :class="{ active: showTheory }" @click="showTheory = true">
            Lý thuyết
        </button>
        <button :class="{ active: !showTheory }" @click="showTheory = false">
            Trắc nghiệm
        </button>
    </div>


    <div class="container bg-light rounded" v-show="showTheory">
        <div class="row my-5">

            <h1 class="text-center mt-3 my-5">
                <span>{{ topicName }}</span>
            </h1>

            <div class="col-lg col-md col-sm">
                <div class="pcss3t pcss3t-effect-scale pcss3t-theme-1">
                    <input type="radio" name="pcss3t" checked id="tab1" class="tab-content-first">
                    <label for="tab1">
                        <img class="icon-bolt" src="https://img.meta.com.vn/Data/image/2021/08/28/flash-card-al.jpg"
                            style="width:100px; height:100px; object-fit: contain;" alt="" loading="lazy">
                    </label>

                    <input type="radio" name="pcss3t" id="tab2" class="tab-content-2">
                    <label for="tab2">
                        <img class="icon-bolt"
                            src="https://i0.wp.com/writeonwithmissg.com/wp-content/uploads/2019/12/EngagingVocabularyActivitiesBLOG.png?fit=920%2C520&ssl=1"
                            style="width:100px; height:100px; object-fit: contain;" alt="" loading="lazy">
                    </label>

                    <input type="radio" name="pcss3t" id="tab3" class="tab-content-3">
                    <label for="tab3">
                        <img class="icon-bolt"
                            src="https://learnenglishteens.britishcouncil.org/sites/teens/files/styles/section_block_landing_list/public/field/image/sushi_spell.jpg?itok=jyhdudam"
                            style="width:100px; height:100px; object-fit: contain;" alt="" loading="lazy">
                    </label>

                    <ul>
                        <!-- FLASHCARD -->
                        <li class="tab-content tab-content-first typography">

                            <h3 class="text-center mb-2">LEARN ENGLISH BY FLASH CARD</h3>

                            <div class="card specific-card mb-4">
                                <div class="card-body">
                                    <div class="row">

                                        <div class="flip-card mb-3" v-if="vocabularies.length > 0">
                                            <div class="flip-card-inner pb-3" @click="() => flipCard()">
                                                <div class="flip-card-front">

                                                    <i class="fas fa-headphones headphones-icon"></i>
                                                    <i class="fa-regular fa-lightbulb lightbulb-icon"></i>

                                                    <div class="d-flex justify-content-center align-items-center w-100"
                                                        style="height:90%">
                                                        <img :src="getImageUrl(vocabularies[currentIndex].image)"
                                                            alt="Vocabulary Image" style="width:50%; height: 80%;"
                                                            class="d-flex justify-content-center align-items-center" />
                                                    </div>

                                                    <div class="text-center text-dark" style="font-size:18px;">
                                                        {{ vocabularies[currentIndex].word }}
                                                        {{ vocabularies[currentIndex].ipa }}
                                                    </div>

                                                </div>
                                                <div class="flip-card-back">
                                                    <div class="text-center text-dark" style="font-size:18px;">
                                                        <span
                                                            class="text-decoration-underline link-offset-2 text-success">Dịch
                                                            nghĩa: </span>
                                                        {{ vocabularies[currentIndex].meaning }}<br>
                                                        <span
                                                            class="text-decoration-underline link-offset-2 text-warning">Ví
                                                            dụ: </span>

                                                        {{ vocabularies[currentIndex].exampleSentence }}
                                                        <i class="fas fa-headphones headphones-icon"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="text-center mt-3 mb-3" v-if="vocabularies.length > 0">
                                            <button class="btn btn-light" @click="previousCard">
                                                <i class="fas fa-arrow-left"></i>
                                            </button>
                                            {{ currentIndex + 1 }}/{{ vocabularies.length }}
                                            <button class="btn btn-light" @click="nextCard">
                                                <i class="fas fa-arrow-right"></i>
                                            </button>
                                        </div>

                                        <div class="progress" role="progressbar" aria-label="Example 1px high"
                                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 4px">
                                            <div class="progress-bar" :style="{ width: progressPercentage + '%' }">
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <!-- PRACTICE -->
                        <li class="tab-content tab-content-2 typography">
                            <h3 class="text-center mb-2">PRACTICE</h3>
                            <div class="card specific-card mb-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <!-- <h1>Từ vựng và phiên âm</h1> -->
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>Từ vựng</th>
                                                        <th>Ảnh</th>
                                                        <th>Phiên âm</th>
                                                        <th>Nghĩa</th>
                                                        <th>Nghe</th>

                                                        <th>Luyện tập</th>

                                                        <th>Phát âm của bạn</th>
                                                        <th>Lưu trữ từ vựng</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(vocabulary, index) in vocabularies" class="align-middle"
                                                        :key="vocabulary.vocabularyId">
                                                        <td v-if="vocabulary.isCorrect === null">{{ vocabulary.word }}</td>
                                                        <td v-else
                                                            :class="vocabulary.isCorrect ? 'text-success fw-bold' : 'text-danger fw-bold'">
                                                            {{ vocabulary.word }}
                                                        </td>
                                                        <td>
                                                            <img :src="getImageUrl(vocabulary.image)"
                                                                class="vocabulary-image" />
                                                        </td>
                                                        <td>{{ vocabulary.ipa }}</td>
                                                        <td>{{ vocabulary.meaning }}</td>
                                                        <td>
                                                            <button class="btn"
                                                                style="background-color: rgb(195, 195, 211);"
                                                                @click="speakWord(index)">
                                                                <i class="fas fa-headphones"></i>
                                                            </button>
                                                        </td>

                                                        <td>
                                                            <button class="btn btn-light"
                                                                @click="practicePronunciation(index)">
                                                                <i class="fas fa-microphone"
                                                                    :class="{ 'active': isSpeaking && index === activeIndex }"></i>
                                                            </button>
                                                        </td>


                                                        <td>{{ vocabulary.lowerTranscript }}</td>
                                                        <td>
                                                            <i class="fa-solid fa-star"
                                                                :class="{ 'text-warning': vocabulary.isBookmarked }"
                                                                @click="bookmarkWord(index)"></i>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <!-- GAME -->
                        <li class="tab-content tab-content-3 typography">
                            <h3 class="text-center mb-2">PLAY GAME</h3>
                            <div class="card specific-card card-body mt-3" style="min-height: 500px">
                                <div><i class="fa-solid fa-lightbulb" style="color:orange"></i>{{ hintRefContent }}</div>
                                <div>
                                    <span v-for="(char, index) in displayedWord" :key="index">
                                        {{ char }}&nbsp;
                                    </span>
                                    <div id="message" class="mt-2"
                                        :class="{ correct: messageText === 'Correct Letter', incorrect: messageText === 'Incorrect Letter' }">
                                        {{
                                            messageText
                                        }}</div>
                                    <div id="chanceCount">Chances Left: {{ lossCount }}</div>

                                </div>

                                <div id="letter-container" class="mt-5">
                                    <button v-for="letter in alphabet" :key="letter" class="letters"
                                        :class="{ correct: correctLetters.includes(letter), incorrect: incorrectLetters.includes(letter) }"
                                        @click="checkLetter(letter)"
                                        :disabled="gameOver || correctLetters.includes(letter) || incorrectLetters.includes(letter)"
                                        :data-letter="letter">
                                        {{ letter }}
                                    </button>
                                </div>

                                <!-- <div id="word">{{ wordText }}</div> -->
                                <div class="row mt-3">
                                    <div class="col d-flex justify-content-center">
                                        <div class="button mt-3" style="width:20%" id="start" @click="startGame">
                                            <div>{{ startButtonText }}</div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center mt-2">{{ resultText }}</div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none">
                <h5 class="text-center"><i class="fa-solid fa-bolt text-warning me-2"></i>OTHER TOPICS</h5>
                <div style="max-height:1050px; overflow: auto;">
                    <div class="card mb-2 me-2" v-for="topic in topics" :key="topic.topicId">
                        <router-link :to="{ name: 'topic.show', params: { topicId: topic.topicId } }"
                            class="card-body custom-card text-decoration-none">
                            <span class="card-text">{{ topic.topicName }}</span>
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
import { defineComponent, ref, onMounted, computed, watch, onBeforeMount, watchEffect } from "vue";

import TopicService from "@/services/topic.service";
import VocabularyService from "@/services/vocabulary.service";
import UserVocabularyService from "@/services/user_vocabulary.service";

import VocabularyQuestionService from "@/services/vocabulary_question.service";

import Swal from 'sweetalert2';
import VueJwtDecode from "vue-jwt-decode";

export default defineComponent({
    props: {
        topicId: { type: String, required: true },
    },
    setup(props) {

        const getImageUrl = (imageName) => {
            if (imageName) {
                return `http://localhost:9004/images/vocabulary/${imageName}`;
            }
            return "http://localhost:9004/images/default-image.png";
        };

        const topics = ref([]);
        const retrieveTopics = async () => {
            try {
                topics.value = await TopicService.allEnable();
                console.log(topics.value)
            } catch (error) {
                console.log(error);
            }
        };

        const vocabularies = ref([]);
        const wordsAndMeanings = ref({});
        const words = ref([]);
        const topicName = ref('')
        const retrieveVocabularies = async () => {
            try {
                console.log(props.topicId);
                const apiData = await VocabularyService.getEnableVocabularyByTopic(props.topicId);
                console.log(apiData[0].topic.topicName)
                topicName.value = apiData[0].topic.topicName;
                vocabularies.value = apiData.map(item => ({
                    ...item,
                    isCorrect: null,
                }));
                console.log(vocabularies.value);
                // Từ vựng và nghĩa (Games)
                wordsAndMeanings.value = {};
                vocabularies.value.forEach((vocabulary) => {
                    wordsAndMeanings.value[vocabulary.word] = vocabulary.meaning;
                });
                console.log(wordsAndMeanings.value)

                words.value = Object.keys(wordsAndMeanings.value);
                console.log(words.value)

                generateWord();

            } catch (error) {
                console.log(error);
            }
        };

        // Flash Card
        const currentIndex = ref(0);
        const previousCard = () => {
            if (currentIndex.value > 0) {
                currentIndex.value--;
            }
        };
        const nextCard = () => {
            if (currentIndex.value < vocabularies.value.length - 1) {
                currentIndex.value++;
            }
        };
        const flipCard = () => {
            const cardInner = document.querySelector(".flip-card-inner");
            const isFlipped = cardInner.style.transform === "rotateY(180deg)";
            if (isFlipped) {
                cardInner.style.transform = "rotateY(0deg)";
            } else {
                cardInner.style.transform = "rotateY(180deg)";
            }
        };
        const progressPercentage = computed(() => {
            return ((currentIndex.value + 1) / vocabularies.value.length) * 100;
        });

        // Luyện tập
        onBeforeMount(() => {
            const setupSelectedVoice = () => {
                const voices = speechSynthesis.getVoices();
                console.log(voices)
                for (const voice of voices) {
                    if (voice.name === 'Google US English' || voice.name === 'Microsoft Aria Online (Natural) - English (United States)') {
                        speechUtterance.voice = voice;
                        break;
                    }
                }
            };
            setupSelectedVoice();
            speechSynthesis.addEventListener('voiceschanged', () => {
                setupSelectedVoice();
            });
        });

        const speechSynthesis = window.speechSynthesis;
        const speechUtterance = new SpeechSynthesisUtterance();
        const speakWord = (index) => {
            const vocabulary = vocabularies.value[index];
            speechUtterance.text = vocabulary.word;
            speechSynthesis.speak(speechUtterance);
        };

        const isSpeaking = ref(false);
        const activeIndex = ref(null);
        const practicePronunciation = (index) => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "en-US";
            recognition.interimResults = true;
            const vocabulary = vocabularies.value[index];

            // Kiểm tra nếu đang thu âm
            if (isSpeaking.value) {
                console.log(isSpeaking.value)
                recognition.stop();
                isSpeaking.value = false;
                activeIndex.value = null;
            } else { // Bắt đầu thu âm nếu không đang thu âm
                isSpeaking.value = true;
                activeIndex.value = index;
                recognition.addEventListener("result", (event) => {
                    const lastResultIndex = event.results.length - 1;
                    const transcriptValue = event.results[lastResultIndex][0].transcript;
                    const lowerTranscript = transcriptValue.toLowerCase();
                    console.log(lowerTranscript);
                    const isCorrect = lowerTranscript === vocabulary.word.toLowerCase();
                    Object.assign(vocabulary, { isCorrect, lowerTranscript }); // Gán giá trị cho lowerTranscript
                    console.log(vocabulary)
                });
                recognition.addEventListener("end", () => {
                    recognition.stop();
                    isSpeaking.value = false;
                    activeIndex.value = null;
                });
                recognition.start();
            }
        };


        // Lưu trữ từ vựng
        const userId = ref();
        const userVocabularies = ref([]);
        const retrieveUserVocabularies = async () => {
            try {
                const learnerToken = localStorage.getItem("learnerToken");
                const decoded = VueJwtDecode.decode(learnerToken);
                userId.value = decoded.id;

                userVocabularies.value = await UserVocabularyService.getUserVocabulariesByUserId(userId.value);
                // So sánh từ vựng đánh dấu
                vocabularies.value.forEach((vocabulary) => {
                    vocabulary.isBookmarked = userVocabularies.value.some(
                        (userVocabulary) => userVocabulary.vocabulary.vocabularyId === vocabulary.vocabularyId
                    );
                });

            } catch (error) {
                console.log(error);
            }
        };
        const bookmarkWord = async (index) => {
            if (vocabularies.value.length > 0) {
                const vocabulary = vocabularies.value[index];
                try {
                    if (vocabulary.isBookmarked) {
                        // Xóa đánh dấu
                        console.log("Hello")
                        await UserVocabularyService.deleteUserVocabularyByVocabularyId(vocabulary.vocabularyId, userId.value);
                        vocabulary.isBookmarked = false;
                    } else {
                        // Thêm đánh dấu
                        await UserVocabularyService.createUserVocabulary({
                            vocabularyId: vocabulary.vocabularyId,
                            userId: userId.value,
                        });
                        vocabulary.isBookmarked = true;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        // GAME
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const correctLetters = ref([]);
        const incorrectLetters = ref([]);
        const gameOver = ref(false);
        const messageText = ref("");
        const resultText = ref("");
        const wordText = ref("");
        const hintRefContent = ref("");
        const startButtonText = ref("RESTART");
        const winCount = ref(0);
        const lossCount = ref(0);
        const randomWord = ref("");
        const randomHint = ref("");

        const startGame = () => {
            gameOver.value = false;
            init();
            generateWord();
        };
        const init = () => {
            // Reset các giá trị khi bắt đầu ván chơi mới
            correctLetters.value = [];
            incorrectLetters.value = [];
            winCount.value = 0;
            lossCount.value = 3;
            randomWord.value = "";
            randomHint.value = "";
            messageText.value = "";
            wordText.value = "";
            hintRefContent.value = "";
            resultText.value = "";
        };

        const generateWord = () => {
            randomWord.value = words.value[generateRandomValue(words.value)];
            randomHint.value = wordsAndMeanings.value[randomWord.value];
            hintRefContent.value = ` ${randomHint.value}`;
            wordText.value = randomWord.value;
        };
        const generateRandomValue = (array) => {
            return Math.floor(Math.random() * array.length);
        };
        const stopGame = () => {
            gameOver.value = true;
        };
        const checkLetter = (letter) => {
            const charArray = randomWord.value.toUpperCase().split("");

            if (charArray.includes(letter)) {
                charArray.forEach((char, index) => {
                    if (char === letter) {
                        correctLetters.value.push(char);
                        messageText.value = "Correct Letter";
                        winCount.value += 1;
                        if (winCount.value === charArray.length) {
                            resultText.value = "You Won";
                            startButtonText.value = "PLAY AGAIN";
                            stopGame();
                        }
                    }
                });
            } else {
                incorrectLetters.value.push(letter);
                lossCount.value -= 1;
                messageText.value = `Incorrect Letter`;
                if (lossCount.value === 0) {
                    wordText.value = `The word was: ${randomWord.value}`;
                    resultText.value = "You lose. Game Over :((";
                    stopGame();
                }
            }
        };
        const displayedWord = computed(() => {
            return randomWord.value
                .split('')
                .map((char) => (correctLetters.value.includes(char.toUpperCase()) ? char : '_'));
        });

        onMounted(() => {
            retrieveTopics();
            retrieveVocabularies();
            retrieveUserVocabularies();
            init();
        });
        watch(() => props.topicId, () => {
            retrieveTopics();
            retrieveVocabularies();
            retrieveUserVocabularies();
        });

        const showTheory = ref(true);
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
        const retrieveVocabularyQuestions = async () => {
            try {
                questions.value = await VocabularyQuestionService.getEnableVocabularyQuestionsByTopic(props.topicId);
                console.log(questions.value)
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            retrieveVocabularyQuestions();
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
            getImageUrl,
            topics,
            vocabularies,
            topicName,

            flipCard,
            currentIndex,
            previousCard,
            nextCard,
            progressPercentage,

            speakWord,
            practicePronunciation,
            userVocabularies,
            bookmarkWord,

            hintRefContent,
            displayedWord,
            messageText,
            lossCount,
            alphabet,
            correctLetters,
            incorrectLetters,
            gameOver,
            resultText,
            wordText,
            startButtonText,
            startGame,
            generateRandomValue,
            generateWord,
            checkLetter,

            isSpeaking,
            activeIndex,

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
@import "@/assets/navtab.css";

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

/* button i {
    font-size: 20px;
    color: #000;
} */

button i.active {
    color: #ff0000;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}
</style>
