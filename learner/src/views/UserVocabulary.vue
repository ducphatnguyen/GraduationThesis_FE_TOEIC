<template>
    <div class="container bg-light rounded">
        <div class="row my-5">
            <div class="col-lg col-md col-sm">
                <div class="pcss3t pcss3t-effect-scale pcss3t-theme-1">
                    <input type="radio" name="pcss3t" checked id="tab1" class="tab-content-first">
                    <label for="tab1">
                        <img class="icon-bolt"
                            src="https://aten.edu.vn/wp-content/uploads/2022/11/cach-ghi-chep-tu-vung-ielts-giup-ban-nho-mai-khong-quen-so-1.jpg"
                            style="width:100px; height:100px; object-fit: contain;" alt="" loading="lazy">
                    </label>
                    <ul>
                        <li class="tab-content tab-content-first typography">
                            <div class="card specific-card mb-4">
                                <div class="card-body lesson-content">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table class="table ">
                                                <thead>
                                                    <tr>
                                                        <th>Chủ đề</th>
                                                        <th>Từ vựng</th>
                                                        <th>Ảnh</th>
                                                        <th>Phiên âm</th>
                                                        <th>Nghĩa</th>
                                                        <th>Nghe</th>
                                                        <th>Luyện tập</th>
                                                        <th>Phát âm của bạn</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(userVocabulary, index) in userVocabularies"
                                                        class="align-middle" :key="userVocabulary.userVocabularyId">
                                                        <td>
                                                            {{ userVocabulary.vocabulary.topic.topicName }}
                                                        </td>
                                                        <td v-if="userVocabulary.isCorrect === null">
                                                            {{ userVocabulary.vocabulary.word }}
                                                        </td>
                                                        <td v-else
                                                            :class="userVocabulary.isCorrect === true ? 'text-success fw-bold' : 'text-danger fw-bold'">
                                                            {{
                                                                userVocabulary.vocabulary.word }}
                                                        </td>
                                                        <td>
                                                            <img :src="getImageUrl(userVocabulary.vocabulary.image)"
                                                                class="vocabulary-image" />
                                                        </td>
                                                        <td>{{ userVocabulary.vocabulary.ipa }}</td>
                                                        <td>
                                                            {{ userVocabulary.vocabulary.meaning }}
                                                        </td>
                                                        <td>
                                                            <button class="btn btn-light" @click="speakWord(index)">
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
                                                        <td>{{ userVocabulary.lowerTranscript }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";

import UserVocabularyService from "@/services/user_vocabulary.service";

import VueJwtDecode from "vue-jwt-decode";

export default defineComponent({
    setup() {

        const getImageUrl = (imageName) => {
            if (imageName) {
                return `http://localhost:9004/images/vocabulary/${imageName}`;
            }
            return "http://localhost:9004/images/default-image.png";
        };

        const userId = ref(null);
        const getUserId = async () => {
            try {
                const learnerToken = localStorage.getItem("learnerToken");
                const decoded = VueJwtDecode.decode(learnerToken);
                userId.value = decoded.id;
            } catch (error) {
                console.log(error);
            }
        };

        const userVocabularies = ref([]);
        const retrieveUserVocabularies = async () => {
            try {
                const apiData = await UserVocabularyService.getUserVocabulariesByUserId(userId.value);
                // Lặp qua dữ liệu từ API và khởi tạo 'isCorrect' là null
                userVocabularies.value = apiData.map(item => ({ ...item, isCorrect: null }));
                console.log(userVocabularies.value);
            } catch (error) {
                console.log(error);
            }
        };

        const speechSynthesis = window.speechSynthesis;
        const speechUtterance = new SpeechSynthesisUtterance();
        const speakWord = (index) => {
            const userVocabulary = userVocabularies.value[index].vocabulary;
            console.log(userVocabulary)
            speechUtterance.text = userVocabulary.word;
            speechSynthesis.speak(speechUtterance);
        };

        const isSpeaking = ref(false);
        const activeIndex = ref(null);
        const practicePronunciation = (index) => {
            const userVocabulary = userVocabularies.value[index];
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "en-US";
            recognition.interimResults = true;

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
                    const isCorrect = lowerTranscript === userVocabulary.vocabulary.word.toLowerCase();
                    console.log(isCorrect)
                    Object.assign(userVocabulary, { isCorrect, lowerTranscript }); // Gán giá trị cho lowerTranscript
                    console.log(userVocabulary)
                });
                recognition.addEventListener("end", () => {
                    recognition.stop();
                    isSpeaking.value = false;
                    activeIndex.value = null;
                });
                recognition.start();
            }

        };

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

        onMounted(async () => {
            await getUserId();
            retrieveUserVocabularies();
        });

        return {
            getImageUrl,
            userVocabularies,
            speakWord,
            practicePronunciation,

            isSpeaking,
            activeIndex
        };
    },
});
</script>

<style scoped>
@import "@/assets/navtab.css";

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
