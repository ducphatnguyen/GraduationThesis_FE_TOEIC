<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="text-to-speech">
                    <h1>Chuyển đổi văn bản thành giọng nói</h1>
                    <div class="form-group">
                        <textarea class="form-control" v-model="textToSpeak" placeholder="Nhập văn bản"></textarea>
                    </div>
                    <div>
                        <button class="btn btn-primary" @click="convertTextToSpeech">Đọc</button>
                        <button class="btn btn-danger" @click="stopSpeech">Dừng</button>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="input-group">
                    <input type="text" class="form-control" v-model="transcript"
                        placeholder="Kết quả nhận dạng giọng nói" />
                    <div class="input-group-append">
                        <button class="btn btn-light-emphasis" @click="startSpeechRecognition">
                            <i class="fas fa-microphone" :class="{ active: isSpeaking }"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h1>Từ vựng và phiên âm</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Từ vựng</th>
                            <th>Phiên âm</th>
                            <th>Nghe phát âm</th>
                            <th>Tập nói</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(word, index) in wordList" :key="index">
                            <td v-if="word.isCorrect === null">{{ word.vocabulary }}</td>
                            <td v-if="word.isCorrect !== null">
                                <a v-for="practice in word.practice" :style="{ color: practice.color }" :key="practice.id">
                                    {{ practice.char }}
                                </a>
                            </td>
                            <td>{{ word.pronunciation }}</td>
                            <td>
                                <button class="btn btn-primary" @click="speakWord(index)">
                                    <i class="fas fa-headphones"></i>
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-primary" @click="practicePronunciation(index)">
                                    <i class="fas fa-microphone"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, watch } from 'vue';

export default {
    setup() {
        const textToSpeak = ref('');
        const speechSynthesis = window.speechSynthesis;
        const speechUtterance = new SpeechSynthesisUtterance();
        const transcript = ref('');
        const recognition = ref(null);
        const isSpeaking = ref(false);
        const wordList = ref([
            {
                vocabulary: 'apple',
                pronunciation: 'ˈæpəl',
                isCorrect: null,
                practice: [],
            },
            {
                vocabulary: 'banana',
                pronunciation: 'bəˈnænə',
                isCorrect: null,
                practice: [],
            },
            {
                vocabulary: 'orange',
                pronunciation: 'ˈɔrɪndʒ',
                isCorrect: null,
                practice: [],
            },
        ]);

        const convertTextToSpeech = () => {
            if (textToSpeak.value.trim() !== '') {
                speechUtterance.text = textToSpeak.value;
                speechSynthesis.speak(speechUtterance);
            }
        };

        const stopSpeech = () => {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
        };

        const startSpeechRecognition = () => {
            recognition.value = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.value.lang = 'en-US'; // Ngôn ngữ tiếng Anh
            recognition.value.interimResults = true; // Kết quả tạm thời

            isSpeaking.value = true; // Thiết lập isSpeaking thành true khi bắt đầu nói chuyện

            recognition.value.addEventListener('result', (event) => {
                const lastResultIndex = event.results.length - 1;
                transcript.value = event.results[lastResultIndex][0].transcript;
            });

            recognition.value.addEventListener('end', () => {
                recognition.value.stop();
                isSpeaking.value = false;
            });
            recognition.value.start();
        };

        const stopSpeechRecognition = () => {
            recognition.value.stop();
            isSpeaking.value = false; // Thiết lập isSpeaking thành false khi dừng nói chuyện
        };

        const speakWord = (index) => {
            const word = wordList.value[index];
            speechUtterance.text = word.vocabulary;
            speechSynthesis.speak(speechUtterance);
        };

        const compareStrings = (string1, string2) => {
            const positions = [];
            const minLength = Math.min(string1.length, string2.length);
            for (let i = 0; i < minLength; i++) {
                if (string1[i] !== string2[i]) {
                    positions.push(i);
                }
            }

            if (string1.length > string2.length) {
                for (let i = minLength; i < string1.length; i++) {
                    positions.push(i);
                }
            } else if (string1.length < string2.length) {
                for (let i = minLength; i < string2.length; i++) {
                    positions.push(i);
                }
            }
            return positions;
        };

        const practicePronunciation = (index) => {
            const word = wordList.value[index];
            let transcriptValue = '';
            const recognitionValue = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognitionValue.lang = 'en-US'; // Ngôn ngữ tiếng Anh
            recognitionValue.interimResults = true; // Kết quả tạm thời

            recognitionValue.addEventListener('result', (event) => {
                const lastResultIndex = event.results.length - 1;
                transcriptValue = event.results[lastResultIndex][0].transcript.toLowerCase();
            });

            recognitionValue.addEventListener('end', () => {
                recognitionValue.stop();
                const isCorrect = compareStrings(word.vocabulary, transcriptValue);
                const practice = practiceWord(word.vocabulary, isCorrect);
                Object.assign(word, { practice });
                Object.assign(word, { isCorrect });
            });

            recognitionValue.start();
        };

        const practiceWord = (string, isCorrect) => {
            const practice = [];
            for (let i = 0; i < string.length; i++) {
                if (isCorrect.includes(i)) {
                    practice.push({ char: string.charAt(i), color: 'red' });
                } else {
                    practice.push({ char: string.charAt(i), color: 'green' });
                }
            }
            return practice;
        };

        // Watch for changes in textToSpeak
        watch(textToSpeak, (newValue) => {
            if (newValue.trim() === '') {
                stopSpeech();
            }
        });

        return {
            textToSpeak,
            transcript,
            isSpeaking,
            wordList,
            convertTextToSpeech,
            stopSpeech,
            startSpeechRecognition,
            stopSpeechRecognition,
            speakWord,
            practicePronunciation,
        };
    },
};
</script>
  
<style scoped>
.text-to-speech {
    padding: 20px;
    text-align: center;
}

button i {
    font-size: 20px;
    color: #000;
}

button i.active {
    /* Áp dụng hiệu ứng khi isSpeaking là true */
    color: #ff0000;
    /* Đổi màu sắc biểu tượng khi active */
    animation: pulse 1s infinite;
    /* Ví dụ: tạo hiệu ứng pulsating animation */
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

.text-success {
    color: green;
}

.text-danger {
    color: red;
}

.input-group {
    border: 1px solid #6694c2;
    border-radius: 10px;
    overflow: hidden;
}

.input-group .form-control {
    border: none;
    box-shadow: none;
    outline: none;
}

.input-group .btn {
    border: none;
    background-color: transparent;
    box-shadow: none;
    outline: none;
}
</style>
  