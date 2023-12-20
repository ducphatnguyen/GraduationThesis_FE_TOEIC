<template>
    <div class="container">

        <h1 class="text-center mt-5">
            <span>LUYỆN NGỮ PHÁP TOEIC</span>
        </h1>

        <div class="row mt-5">
        
            <div class="col-lg col-md col-sm">

                <div class="d-flex justify-content-center mb-3">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="transcript" placeholder="Tìm kiếm" />
                        <div class="input-group-append">
                            <button class="btn btn-light-emphasis" @click="startSpeechRecognition">
                                <i class="fas fa-microphone" :class="{ active: isSpeaking }"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="card specific-card">
                    <div class="card-body lesson-content">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6" v-for="grammar in filteredGrammars" :key="grammar.grammarId">
                                <router-link :to="{ name: 'grammar.show', params: { grammarId: grammar.grammarId } }"
                                    class="card mb-2 text-decoration-none">
                                    <div class="card-body test">
                                        <span class="icon-container">
                                            <i class="fa-solid fa-book-open-reader text-white"></i>
                                        </span>
                                        <span class="grammar-name">{{ grammar.grammarName }}</span>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none">
                <h5 class="fw-bold"><i class="fa-solid fa-bolt text-warning me-2"></i>OTHER PRACTICES:</h5>
                <div class="card mb-2" v-for="section in docngheSections" :key="section.id">
                    <router-link class="card-body text-decoration-none custom-card"
                        :to="{ name: 'practice.show', params: { sectionId: section.id } }">
                        {{ section.name }}
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";

import GrammarService from "@/services/grammar.service";
import SectionService from "@/services/section.service";

export default defineComponent({
    setup() {
        
        const sections = ref([]);
        const retrieveSections = async () => {
            try {
                sections.value = await SectionService.allEnable();
                console.log(sections.value)
            } catch (error) {
                console.log(error);
            }
        };
        const docngheSections = computed(() => {
            return sections.value.filter((section) => section.type === 1 || section.type === 2);
        });

        const grammars = ref([]);
        const fetchGrammars = async () => {
            try {
                grammars.value = await GrammarService.allEnable();
                console.log(grammars.value);
            } catch (error) {
                console.log(error);
            }
        };

        const filteredGrammars = computed(() => {
            if (!transcript.value) {
                return grammars.value.slice();
            }
            return grammars.value.filter((grammar) =>
                Object.values(grammar).some((value) =>
                    String(value).toLowerCase().includes(transcript.value.toLowerCase())
                )
            );
        });

        const isSpeaking = ref(false);
        const recognition = ref(null);
        const transcript = ref("");
        const startSpeechRecognition = () => {
            recognition.value = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.value.lang = "en-US";
            recognition.value.interimResults = true; // Kết quả tạm thời
            // Bắt đầu nói
            isSpeaking.value = true;

            recognition.value.addEventListener("result", (event) => {
                const lastResultIndex = event.results.length - 1;
                transcript.value = event.results[lastResultIndex][0].transcript;
            });
            recognition.value.addEventListener("end", () => {
                recognition.value.stop();
                isSpeaking.value = false;
            });
            recognition.value.start();
        };
        
        const stopSpeechRecognition = () => {
            recognition.value.stop();
            isSpeaking.value = false;
        };

        onMounted(() => {
            retrieveSections();
            fetchGrammars();
        });

        return {
            sections,
            retrieveSections,
            docngheSections,
            grammars,
            filteredGrammars,

            transcript,
            isSpeaking,
            startSpeechRecognition,
            stopSpeechRecognition,

        };
    },
});
</script>
  
<style scoped>
@import "@/assets/grammar.css";
</style>