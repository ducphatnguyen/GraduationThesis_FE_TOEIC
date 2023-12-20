<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card specific-card mt-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-center">
                            <img src="https://www.vividsites.com/mm/images/Voice-UI.png"
                                alt="" width="100px;" height="100px">

                        </div>
                        <h2 class="text-center my-3">Speaking: Miêu tả một bức tranh</h2>
                        <h5 class="card-title text-primary">Directions:</h5>
                        <p class="card-text">
                            Trong phần kiểm tra này, bạn sẽ mô tả hình ảnh trên màn hình càng chi tiết càng tốt.
                            Có thể. Bạn sẽ có <strong>45</strong> giây để chuẩn bị phản hồi. Sau đó, bạn sẽ có
                            <strong>30</strong> giây để nói
                            về bức tranh.
                        </p>
                        <h5 class="card-title text-primary">Tiêu chí đánh giá:</h5>
                        <span class="badge bg-success-subtle border border-successs-subtle text-success-emphasis rounded-pill">Phát âm, ngữ điệu, trọng âm.</span>
                        <span class="badge bg-success-subtle border border-successs-subtle text-success-emphasis rounded-pill mx-3">Từ vựng, ngữ pháp, và các tính liên kết.</span>
                        <span class="badge bg-success-subtle border border-successs-subtle text-success-emphasis rounded-pill">Sự tương thích nội dung.</span>
                    </div>
                </div>
                <div class="card specific-card mt-3">
                    <div class="card-body">
                        <button class="button" @click="startTest" v-if="!isReadyToTest">
                            Sẵn sàng luyện tập
                        </button>
                        <div v-if="isReadyToTest">

                            <button class="button bg-primary" @click="refreshAllQuestions">
                                Làm lại
                            </button>

                            <div class="word-item">
                                <div class="mb-5">
                                    <div class="text-end" style="font-size:20px">
                                        <span class="badge bg-primary-subtle border border-primary-subtle text-primary-emphasis rounded-pill" style="background-color: orange">
                                            <span style="font-size:22px;">&#9200;</span>Chuẩn bị: {{
                                                preparingCountdown[currentIndex] }}
                                            s
                                        </span>
                                        <span class="badge ms-3 bg-success-subtle border border-successs-subtle text-success-emphasis rounded-pill">
                                            <span>
                                                <span style="font-size:22px;">&#9200;</span>Ghi âm: {{
                                                    recordingCountdown[currentIndex] }}
                                                s</span>
                                        </span>
                                    </div>
                                    <button class="btn mb-3" v-if="isRecording[currentIndex] === null"
                                        style="background-color: #052649;" @click="toggleReading(currentIndex)">
                                        <i
                                            :class="isReading[currentIndex] ? 'fas fa-stop text-danger' : 'fas fa-headphones text-white'"></i>
                                    </button>
                                    <div class="word-info d-flex justify-content-center">
                                        <img :src="getImageUrl(questions[currentIndex].questionImage)" alt="Passage Image"
                                            style="width:300px" />
                                    </div>

                                    <div class="word-info ">
                                        <button class="btn button5 my-2 me-3"
                                            style="background-color: #e8f2ff; color: #35509a; width: 40px;">{{ currentIndex + 1
                                            }}</button>
                                        <br>
                                        <strong class="ms-3 text-success">Hint to answer:</strong> {{ questions[currentIndex].suggestedAnswer
                                        }}
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <audio class="my-3" :ref="'audioElement_' + currentIndex" :src="recordedAudios[currentIndex]"
                                            controls></audio>
                                    </div>
                                    <div class="word-actions d-flex justify-content-center">
                                        <button class="btn" style="background-color: #052649;"
                                            @click="startRecording(currentIndex)" v-if="isRecording[currentIndex] === false">
                                            <i class="fas fa-microphone text-white"></i>
                                        </button>
                                        <button class="btn" style="background-color: #052649;" @click="stopRecording(currentIndex)"
                                            v-if="isRecording[currentIndex] === true">
                                            <i class="fas fa-stop text-danger"></i>
                                        </button>
                                        <button class="p-2 badge bg-info-subtle border border-info-subtle text-info-emphasis rounded-pill ms-3" v-if="isRecording[currentIndex] === null">Đã hoàn
                                            thành <i class="fa-solid fa-circle-check text-success"></i></button>
                                    </div>
                                    <div class="mt-3">
                                        <div class="alert alert-light text-primary" role="alert">
                                            <strong class="ms-3" style="color:#052649">Kết quả:</strong> {{
                                                recordedText[currentIndex] }}
                                        </div>
                                    </div>
                                    <div class="mt-5 d-flex justify-content-center">
                                        <button class="button d-flex" @click="showPreviousQuestion" v-if="currentIndex !== 0">
                                            Previous
                                        </button>
                                        <button class="button ms-3" @click="showNextQuestion"
                                            v-if="isRecording[currentIndex] === null && currentIndex < questions.length - 1">Next</button>
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
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from 'vue';

import TestService from "@/services/test.service";
export default {
    props: {
        testId: { type: String, required: true },
    },

    setup(props) {

        const refreshAllQuestions = () => {
            currentIndex.value = 0;
            clearInterval(preparationInterval.value);
            clearInterval(recordingInterval.value);
            retrieveQuestions();
            startTest();
        };

        const questions = ref([]);

        const isReading = ref([]);

        const recordedAudios = ref([]);
        const isRecording = ref([]);
        const isPreparingCountDown = ref([]);
        const isRecordingCountDown = ref([]);

        const preparingCountdown = ref([]);
        const recordingCountdown = ref([]);
        const recordedText = ref([]);

        const retrieveQuestions = async () => {
            try {
                questions.value = await TestService.getQuestionsByTestId(props.testId);

                isReading.value = questions.value.map(() => false);
                
                isPreparingCountDown.value = questions.value.map(() => false);
                isRecordingCountDown.value = questions.value.map(() => false);
                preparingCountdown.value = questions.value.map(() => 45);
                recordingCountdown.value = questions.value.map(() => 30);

                isRecording.value = questions.value.map(() => false);
                recordedText.value = questions.value.map(() => '')
                recordedAudios.value = questions.value.map(() => null);

                console.log(preparingCountdown.value);
                console.log(recordingCountdown.value);
                console.log(questions.value);
            } catch (error) {
                console.log(error);
            }
        };

        const speechSynthesis = window.speechSynthesis;
        const speechUtterance = new SpeechSynthesisUtterance();
        const isSelectedVoice = ref(false);
        onBeforeMount(() => {
            const setupSelectedVoice = () => {
                const voices = speechSynthesis.getVoices();
                for (const voice of voices) {
                    if (voice.name === 'Google US English' || voice.name === 'Microsoft Aria Online (Natural) - English (United States)') {
                        speechUtterance.voice = voice;
                        isSelectedVoice.value = true;
                        break;
                    }
                }
            };
            setupSelectedVoice();
            speechSynthesis.addEventListener('voiceschanged', () => {
                setupSelectedVoice();
            });
        });

        onMounted(() => {
            retrieveQuestions();
        });

        onBeforeUnmount(() => {
            clearInterval(preparationInterval.value);
            clearInterval(recordingInterval.value);
            clearInterval(r.value);
            stopReadingPassage(currentIndex.value);
            
            if (mediaRecorder.value != null) {
                console.log(mediaRecorder.value)
                if(mediaRecorder.value.stream != null) {
                    const stream = mediaRecorder.value.stream;
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                }
            }

        });

        const mediaRecorder = ref(null);
        console.log(mediaRecorder.value)
        // MediaRecorder
        const setupMediaRecorder = () => {
            return new Promise((resolve, reject) => {
                navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
                    const recorder = new MediaRecorder(stream);
                    recorder.addEventListener("dataavailable", (event) => {
                        if (event.data.size > 0) {
                            const currentIndex = recordedAudios.value.recordingIndex;
                            recordedAudios.value[currentIndex] = URL.createObjectURL(event.data);
                        }
                    });
                    resolve(recorder);
                }).catch(reject);
            });
        };

        // Đọc (hệ thống)
        const toggleReading = (currentIndex) => {
            if (isReading.value[currentIndex]) {
                stopReadingPassage(currentIndex);
            } else {
                readPassage(currentIndex);
            }
        };
        const r = ref();
        const readPassage = (currentIndex) => {
            const question = questions.value[currentIndex];
            console.log(question)
            speechUtterance.text = question.suggestedAnswer;
            speechSynthesis.speak(speechUtterance);
            isReading.value[currentIndex] = true;
            console.log(isReading.value[currentIndex])
            // Kéo dài thời gian đọc
            r.value = setInterval(() => {
                console.log(isReading.value[currentIndex]);
                if (!isReading.value[currentIndex]) {
                    clearInterval(r.value);
                } else {
                    speechSynthesis.pause();
                    speechSynthesis.resume();
                }
            }, 14000);
        };
        const stopReadingPassage = (currentIndex) => {
            if (isReading.value[currentIndex]) {
                speechSynthesis.cancel();
                isReading.value[currentIndex] = false;
                console.log(isReading.value[currentIndex])
            }
        };

        const preparationInterval = ref(null);
        const stopPreparingCountdown = () => {
            if (isPreparingCountDown[currentIndex.value]) {
                isPreparingCountDown[currentIndex.value] = false;
                console.log(isPreparingCountDown[currentIndex.value])
                isRecordingCountDown[currentIndex.value] = true;
            }
        };

        const recordingInterval = ref(null);
        const stopRecordingCountdown = () => {
            if (isRecordingCountDown[currentIndex.value]) {
                isRecordingCountDown[currentIndex.value] = false;
            }
        };

        const startRecording = async (currentIndex) => {
            stopPreparingCountdown();
            mediaRecorder.value = await setupMediaRecorder();
            console.log(mediaRecorder.value)
            if (isRecording.value[currentIndex]) {
                return;
            }
            startSpeechToTextRecognition();
            isRecording.value[currentIndex] = true;
            recordedAudios.value.recordingIndex = currentIndex;
            mediaRecorder.value.start();
        };
        const stopRecording = (currentIndex) => {
            if (!isRecording.value[currentIndex]) {
                return;
            }
            speechRecognition.stop();
            stopRecordingCountdown();
            isRecording.value[currentIndex] = null;
            mediaRecorder.value.stop();
            const stream = mediaRecorder.value.stream;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };

        const isReadyToTest = ref(false);
        const startTest = () => {
            console.log(currentIndex.value)
            isReadyToTest.value = true;
            isPreparingCountDown[currentIndex.value] = true;
            isRecordingCountDown[currentIndex.value] = false;

            preparationInterval.value = setInterval(() => {
                if (isPreparingCountDown[currentIndex.value]) {
                    preparingCountdown.value[currentIndex.value]--;
                    if (preparingCountdown.value[currentIndex.value] <= 0) {
                        isPreparingCountDown[currentIndex.value] = false;
                        clearInterval(preparationInterval.value);
                        isRecordingCountDown[currentIndex.value] = true;
                        startRecording(currentIndex.value);
                    }
                }
            }, 1000);

            recordingInterval.value = setInterval(() => {
                if (isRecordingCountDown[currentIndex.value]) {
                    recordingCountdown.value[currentIndex.value]--;
                    if (recordingCountdown.value[currentIndex.value] <= 0) {
                        stopRecording(currentIndex.value);
                        clearInterval(recordingInterval.value);
                    }
                }
            }, 1000);

        };

        const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        let currentTranscript = ''; // Biến lưu trữ transcript hiện tại
        const startSpeechToTextRecognition = () => {

            // Tắt nghe đoạn văn
            stopReadingPassage(currentIndex.value);
            speechRecognition.lang = "en-US";
            speechRecognition.continuous = true;
            // speechRecognition.interimResults = true;

            speechRecognition.addEventListener("result", (event) => {
                const lastResultIndex = event.results.length - 1;
                const transcript = event.results[lastResultIndex][0].transcript;
                // Câu nói mới
                if (transcript !== currentTranscript) {
                    console.log(transcript)
                    // Cộng vào recordedText 
                    recordedText.value[currentIndex.value] += transcript;
                    // Cập nhật transcript hiện tại với nội dung mới
                    currentTranscript = transcript;
                    console.log(currentTranscript);
                }
                console.log(recordedText.value[currentIndex.value]);
            });

            speechRecognition.addEventListener("end", () => {
                speechRecognition.stop();
            });

            speechRecognition.start();
        };


        const currentIndex = ref(0);
        const showNextQuestion = () => {
            if (currentIndex.value < questions.value.length - 1) {
                currentIndex.value++;
                clearInterval(preparationInterval.value);
                clearInterval(recordingInterval.value);
                console.log(isRecording.value[currentIndex.value])
                if (isRecording.value[currentIndex.value] !== null) {
                    startTest();
                }
            }
            console.log(currentIndex.value)
        };
        const showPreviousQuestion = () => {
            if (currentIndex.value > 0) {
                currentIndex.value--;
                clearInterval(preparationInterval.value);
                clearInterval(recordingInterval.value);
                console.log(isRecording.value[currentIndex.value])
                if (isRecording.value[currentIndex.value] !== null) {
                    startTest();
                }
            }
            console.log(currentIndex.value)
        };

        const getImageUrl = (imageName) => {
            if (imageName) {
                return `http://localhost:9004/images/${imageName}`;
            }
            return "";
        };

        return {
            questions,

            isPreparingCountDown,
            isRecordingCountDown,
            recordingCountdown,
            preparingCountdown,
  
            isReading,
            isRecording,
            recordedAudios,
            readPassage,
            stopReadingPassage,
            toggleReading,
            startRecording,
            stopRecording,
            startTest,
            isReadyToTest,
            showNextQuestion,
            showPreviousQuestion,
            currentIndex,

            recordedText,
            isSelectedVoice,
            getImageUrl,
            refreshAllQuestions

        };
    },
};
</script>
  
<style scoped>@import "@/assets/test.css";</style>
  