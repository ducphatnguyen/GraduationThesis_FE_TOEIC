<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1>Luyện đọc bằng cách ghi âm</h1>
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
                            <td>{{ word.vocabulary }}</td>
                            <td>{{ word.pronunciation }}</td>
                            <td>
                                <button class="btn btn-primary" @click="speakWord(index)">
                                    <i class="fas fa-headphones"></i>
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-primary" @click="startRecording(index)"
                                    :disabled="isRecording[index]">
                                    <i class="fas fa-microphone"></i>
                                </button>
                                <button class="btn btn-danger" @click="stopRecording(index)"
                                    :disabled="!isRecording[index]">
                                    <i class="fas fa-stop"></i>
                                </button>
                                <audio :ref="'audioElement_' + index" :src="recordedAudios[index]" controls></audio>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            speechSynthesis: null,
            speechUtterance: null,
            transcript: "",
            recognition: null,
            isSpeaking: false,
            isRecording: [],
            recordedAudios: {},
            mediaRecorder: null,
            wordList: [
                { vocabulary: "apple", pronunciation: "ˈæpəl", isCorrect: null },
                { vocabulary: "banana", pronunciation: "bəˈnænə", isCorrect: null },
                { vocabulary: "orange", pronunciation: "ˈɔrɪndʒ", isCorrect: null },
            ],
        };
    },
    mounted() {

        this.speechSynthesis = window.speechSynthesis;
        this.speechUtterance = new SpeechSynthesisUtterance();
        this.recognition = new (window.SpeechRecognition ||
            window.webkitSpeechRecognition)();
        this.recognition.lang = "en-US";
        this.recognition.interimResults = true;
        this.recognition.addEventListener("result", (event) => {
            const lastResultIndex = event.results.length - 1;
            const transcript = event.results[lastResultIndex][0].transcript;
            this.transcript = transcript;
        });
        this.recognition.addEventListener("end", () => {
            this.recognition.stop();
            this.isSpeaking = false;
        });
        //Nguyên nhân tự động bật micro
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.addEventListener("dataavailable", (event) => {
                if (event.data.size > 0) {
                    const index = this.recordedAudios.recordingIndex;
                    this.recordedAudios[index] = URL.createObjectURL(event.data);
                }
            });
        });
    },
    methods: {
        speakWord(index) {
            const word = this.wordList[index];
            this.speechUtterance.text = word.vocabulary;
            this.speechSynthesis.speak(this.speechUtterance);
        },

        startRecording(index) {
            if (this.isRecording[index]) {
                return;
            }
            this.isRecording[index] = true;
            this.recordedAudios.recordingIndex = index;
            this.mediaRecorder.start();
        },

        stopRecording(index) {
            if (!this.isRecording[index]) {
                return;
            }
            this.isRecording[index] = false;
            this.mediaRecorder.stop();
        },
    },
};
</script>
  
<style></style>
  