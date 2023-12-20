<template>
    <div class="container bg-light rounded">
        <div class="row my-5">
            <div class="col-lg col-md col-sm">
                <div class="pcss3t pcss3t-effect-scale pcss3t-theme-1">

                    <input type="radio" name="pcss3t" checked id="tab1" class="tab-content-first">
                    <label for="tab1">
                        <img class="icon-bolt"
                            src="https://3.imimg.com/data3/MV/XK/GLADMIN-154017/dictionaries-books-500x500.jpg"
                            style="width:100px; height:100px; object-fit: contain;" alt="" loading="lazy">
                    </label>

                    <input type="radio" name="pcss3t" id="tab2" class="tab-content-2">
                    <label for="tab2">
                        <img class="icon-bolt"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Woerterbuchstapel_Langenscheidt.jpg"
                            style="width:100px; height:100px; object-fit: contain;" alt="" loading="lazy">
                    </label>

                    <ul>
                        <li class="tab-content tab-content-first typography">
                            <h3 class="text-center mb-2">TRANSLATION</h3>
                            <div id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <span class="accordion-button-text"></span>
                                            <i class="fa-solid fa-book-open"></i>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample">
                                        <div class="accordion-body mb-2">
                                            <div class="card specific-card">
                                                <div class="card-body lesson-content">
                                                    <div class="row">

                                                        <div>
                                                            <select class="form-select" v-model="translationMode"
                                                                @change="setTranslationMode">
                                                                <option value="en-vi">Dịch tiếng Anh sang tiếng Việt
                                                                </option>
                                                                <option value="vi-en">Dịch tiếng Việt sang tiếng Anh
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <h3 class="text-center">Dịch thuật</h3>
                                                            <div class="form-group">
                                                                <div class="position-relative">
                                                                    <textarea rows="7" cols="33" class="form-control"
                                                                        v-model="textToTranslate"
                                                                        placeholder="Nhập văn bản cần dịch"
                                                                        :maxlength="5000"></textarea>
                                                                    <small
                                                                        class="position-absolute bottom-0 end-0 text-danger me-2 mb-2">
                                                                        {{ characterCount }} / 5000
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button class="btn btn-primary mt-2" id="translate-button"
                                                                    @click="isTranslating ? stopTranslationSpeechRecognition() : startTranslationSpeechRecognition()">
                                                                    <i v-if="!isTranslating" class="fas fa-microphone"></i>
                                                                    <i v-else class="fas fa-stop"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <h3 class="text-center">Bản dịch</h3>

                                                            <div class="form-group">
                                                                <textarea rows="7" cols="33" class="form-control"
                                                                    v-model="translatedTextTemp" placeholder="Bản dịch"
                                                                    readonly></textarea>
                                                            </div>

                                                            <div>
                                                                <button class="btn btn-primary mt-2" id="translate-button"
                                                                    @click="isPlaying ? stopConvertedTextSpeech() : convertTranslatedTextToSpeech()">
                                                                    <i v-if="!isPlaying" class="fas fa-headphones"></i>
                                                                    <i v-else class="fas fa-stop"></i>
                                                                </button>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="tab-content tab-content-2 typography">
                            <h3 class="text-center mb-2">DICTIONARY</h3>
                            <div class="container-dictionary">
                                <div class="search-box">

                                    <input type="text" placeholder="Type the word here.." v-model="inputWord" />
                                    <button @click="searchWord">Search</button>

                                </div>
                                <div class="result">

                                    <div class="word">
                                        <h3>{{ lastSearchedWord }}</h3>

                                        <audio ref="audioPlayer" @loadedmetadata="playSound" :src="getAudioSrc"
                                            type="audio/mpeg">
                                        </audio>

                                        <button v-if="sound.src" @click="playSound">
                                            <i class="fas fa-volume-up"></i>
                                        </button>
                                    </div>

                                    <div class="details">
                                        <p><strong class="text-dark" v-if="partOfSpeech">Part of Speech:</strong> {{
                                            partOfSpeech }}</p>
                                        <br>
                                        <p><strong class="text-dark" v-if="phonetic">IPA:</strong> {{ phonetic }}
                                        </p>
                                    </div>
                                    <div class="word-meaning">
                                        <br>
                                        <div v-html="definition"></div>
                                    </div>
                                    <div class="word-example" v-if="example">Example
                                        <div v-html="example"></div>
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
import { defineComponent, ref, onMounted, computed, watch } from "vue";

export default defineComponent({
    setup() {
        // Từ điển dịch thuật
        const textToTranslate = ref("");
        const translatedText = ref("");
        const translatedTextTemp = ref("");

        const translatedSpeechSynthesis = window.speechSynthesis;
        const translatedSpeechUtterance = new SpeechSynthesisUtterance();

        const isPlaying = ref(false);
        const isTranslating = ref(false);

        const characterCount = computed(() => {
            return textToTranslate.value.length;
        });

        const translationMode = ref("en-vi");
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
            console.log("Dừng Text To Speech")
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

        const translationRecognition = ref(null);
        const startTranslationSpeechRecognition = () => {
            translationRecognition.value = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            if (translationMode.value == 'en-vi') {
                translationRecognition.value.lang = "en-US";
                console.log("Tiếng Anh")
            }
            else if (translationMode.value == 'vi-en') {
                translationRecognition.value.lang = "vi-VN";
                console.log("Tiếng Việt")
            }
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

        // Từ điển học thuật
        const inputWord = ref("");
        const lastSearchedWord = ref("");
        const partOfSpeech = ref("");
        const phonetic = ref("");
        const definition = ref("");
        const example = ref("");
        const synonyms = ref("");
        const antonyms = ref("");
        const sound = new Audio();
        const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
        const searchWord = async () => {
            try {
                const response = await fetch(`${apiUrl}${inputWord.value}`);
                const data = await response.json();
                console.log(data);

                const selectedWordData = data[0];
                // Hiển thị phân loại từ và IPA 
                partOfSpeech.value = selectedWordData.meanings.map(meaning => meaning.partOfSpeech).join(', ');
                phonetic.value = selectedWordData.phonetics.map(phonetic => phonetic.text).join(', ');

                // Hiển thị tất cả các định nghĩa, ví dụ ...
                definition.value = "";
                example.value = "";
                for (const meaning of selectedWordData.meanings) {
                    definition.value += `<i class="fa-solid fa-circle-chevron-right me-2 text-success"></i><strong class="text-primary">${meaning.partOfSpeech}:</strong><br>`;
                    const data = [];
                    
                    // Duyệt qua tất cả các định nghĩa
                    for (const def of meaning.definitions) {
                        data.push(`<span class="ms-3">${def.definition}</span> `);
                        if (def.example) {
                            data.push(`<strong class="ms-3">Ex:</strong> ${def.example}`);
                        }
                    }

                    definition.value += data.join("<br>");
                    if (meaning.synonyms != '') {
                        definition.value += `<br><strong class="ms-3">Synonyms: </strong>${meaning.synonyms}`;
                    }
                    if (meaning.antonyms != '') {
                        definition.value += `<br><strong class="ms-3">Antonyms: </strong>${meaning.antonyms}`;
                    }
                    definition.value += "<br>";
                }

                // Hiển thị nghĩa và ví dụ cuối cùng
                lastSearchedWord.value = inputWord.value;
                let audioSrc = "";

                // Duyệt qua mảng phonetics để tìm âm thanh hợp lệ
                for (const phonetic of selectedWordData.phonetics) {
                    if (phonetic.audio) {
                        audioSrc = phonetic.audio;
                        break; // Kết thúc vòng lặp khi đã tìm thấy âm thanh hợp lệ
                    }
                }
                sound.src = audioSrc;
            } catch (error) {
                console.error(error);
                partOfSpeech.value = "";
                phonetic.value = "";
                definition.value = "Couldn't Find The Word";
                example.value = "";
                sound.src = "";
                lastSearchedWord.value = "Couldn't Find The Word";
            }
        };

        const playSound = () => {
            if (sound.src) {
                sound.play();
            }
        };
        const getAudioSrc = ref("");
        if (sound.src) {
            getAudioSrc.value = sound.src;
        }

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
            inputWord,
            lastSearchedWord,
            partOfSpeech,
            phonetic,
            definition,
            example,
            synonyms,
            antonyms,
            sound,
            searchWord,
            playSound,
            getAudioSrc,
        };
    },
});
</script>

<style scoped>
@import "@/assets/navtab.css";

.container-dictionary {
    background-color: #ffffff;
    width: 80%;
    min-height: 80%;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    padding: 80px 50px;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(38, 33, 61, 0.2);
}

.search-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.search-box input {
    padding: 5px;
    width: 70%;
    border: none;
    outline: none;
    border-bottom: 3px solid purple;
    font-size: 16px;
}

.search-box button {
    padding: 15px 0;
    width: 25%;
    background-color: purple;
    border: none;
    outline: none;
    color: #ffffff;
    border-radius: 5px;
}

.result {
    position: relative;
}

.result h3 {
    font-size: 30px;
    color: #1f194c;
}

.result .word {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
}

.result button {
    background-color: transparent;
    color: #ae9cff;
    border: none;
    outline: none;
    font-size: 18px;
}

.result .details {
    display: flex;
    gap: 10px;
    color: #000;
    margin: 5px 0 20px 0;
    font-size: 14px;
}

.word-meaning {
    color: #000;
}

.word-example {
    color: #000;
    font-style: italic;
    border-left: 5px solid #ae9cff;
    padding-left: 20px;
    margin-top: 30px;
}</style>
