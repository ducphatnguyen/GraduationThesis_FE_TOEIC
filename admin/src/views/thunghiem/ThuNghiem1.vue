<template>
    <div class="row">
        <div>
            <select class="form-select" v-model="translationMode" @change="setTranslationMode">
                <option value="en-vi">Dịch tiếng Anh sang tiếng Việt</option>
                <option value="vi-en">Dịch tiếng Việt sang tiếng Anh</option>
            </select>
        </div>

        <div class="col-md-6">
            <h1>Dịch thuật</h1>
            <div class="form-group">
                <div class="position-relative">
                    <textarea class="form-control" v-model="textToTranslate" placeholder="Nhập văn bản cần dịch"
                        :maxlength="5000"></textarea>
                    <small class="position-absolute bottom-0 end-0 text-danger me-2 mb-2">
                        {{ characterCount }} / 5000
                    </small>
                </div>
            </div>
            <div>
                <button class="btn btn-primary"
                    @click="isTranslating ? stopTranslationSpeechRecognition() : startTranslationSpeechRecognition()">
                    <i v-if="!isTranslating" class="fas fa-microphone"></i>
                    <i v-else class="fas fa-stop"></i>
                </button>
            </div>
        </div>
        
        <div class="col-md-6">
            <h1>Kết quả dịch thuật</h1>
            <div class="form-group">
                <textarea class="form-control" v-model="translatedTextTemp" placeholder="Bản dịch" readonly></textarea>
            </div>
            <div>
                <button class="btn btn-primary"
                    @click="isPlaying ? stopConvertedTextSpeech() : convertTranslatedTextToSpeech()">
                    <i v-if="!isPlaying" class="fas fa-headphones"></i>
                    <i v-else class="fas fa-stop"></i>
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted, computed, watch } from "vue";

export default {
    setup() {
        const textToTranslate = ref("");
        const translatedText = ref("");
        const translatedTextTemp = ref("");
        const translatedSpeechSynthesis = window.speechSynthesis;
        const translatedSpeechUtterance = new SpeechSynthesisUtterance();
        const translationRecognition = ref(null);
        const isTranslating = ref(false);
        const isPlaying = ref(false);
        const translationMode = ref("en-vi");

        const characterCount = computed(() => {
            return textToTranslate.value.length;
        });

        const setTranslationMode = () => {
            translateText();
            translatedText.value = translatedTextTemp.value;
        };

        const translateText = () => {
            const apiKey = "AIzaSyD-7uWTjTodZba7ky7mgfSgnVxAX_opoh8";
            const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

            if (textToTranslate.value.trim() !== "") {
                const sourceLang = translationMode.value.split("-")[0];
                const targetLang = translationMode.value.split("-")[1];

                const data = {
                    q: textToTranslate.value,
                    source: sourceLang,
                    target: targetLang,
                };

                fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((result) => {
                        const translatedResult = result.data.translations[0].translatedText;
                        translatedTextTemp.value = translatedResult;
                        console.log(translatedTextTemp.value);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            } else {
                translatedTextTemp.value = "";
            }
        };

        const convertTranslatedTextToSpeech = () => {
            if (translatedTextTemp.value.trim() !== "") {
                translatedSpeechUtterance.text = translatedTextTemp.value;
                translatedSpeechSynthesis.speak(translatedSpeechUtterance);
                isPlaying.value = true;
            } else {
                alert("Không có văn bản để đọc phiên dịch.");
            }
        };

        const stopConvertedTextSpeech = () => {
            if (translatedSpeechSynthesis.speaking) {
                translatedSpeechSynthesis.cancel();
                isPlaying.value = false;
            }
        };

        const stopTranslatedSpeech = () => {
            if (translatedSpeechSynthesis.speaking) {
                translatedSpeechSynthesis.cancel();
            }
            isPlaying.value = false;
        };

        const startTranslationSpeechRecognition = () => {
            translationRecognition.value = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            translationRecognition.value.lang = "en-US";
            translationRecognition.value.interimResults = true;

            isTranslating.value = true;

            translationRecognition.value.addEventListener("result", (event) => {
                const lastResultIndex = event.results.length - 1;
                const transcript = event.results[lastResultIndex][0].transcript;
                textToTranslate.value = transcript;
            });

            translationRecognition.value.addEventListener("end", () => {
                translationRecognition.value.stop();
                isTranslating.value = false;
            });

            translationRecognition.value.start();
        };

        const stopTranslationSpeechRecognition = () => {
            translationRecognition.value.stop();
            isTranslating.value = false;
        };

        onMounted(() => {
            translateText();
            translatedSpeechSynthesis;
            translatedSpeechUtterance;
        });

        watch(textToTranslate, () => {
            translateText();
        });

        return {
            textToTranslate,
            translatedText,
            translatedTextTemp,
            characterCount,
            setTranslationMode,
            translateText,
            convertTranslatedTextToSpeech,
            stopConvertedTextSpeech,
            stopTranslatedSpeech,
            startTranslationSpeechRecognition,
            stopTranslationSpeechRecognition,
            isTranslating,
            isPlaying,
            translationMode,
        };
    },
};
</script>
  
<style>
.container {
    padding: 20px;
}

h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

textarea {
    resize: none;
}

.btn i {
    font-size: 20px;
}

.btn i.fa-stop {
    color: red;
}

.text-danger {
    color: red;
}

.text-danger small {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2px;
}

.d-flex {
    display: flex;
}

.justify-content-center {
    justify-content: center;
}

.align-items-center {
    align-items: center;
}
</style>
  