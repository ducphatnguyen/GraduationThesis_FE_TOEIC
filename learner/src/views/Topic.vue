<template>
    <div class="container">
        <h1 class="text-center mt-5">
            <span>HỌC TỪ VỰNG TOEIC THEO CHỦ ĐỀ</span>
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

                <div class="card specific-card border-0">
                    <div class="card-body lesson-content">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6" v-for="topic in filteredTopics" :key="topic.topicId">
                                <router-link :to="{ name: 'topic.show', params: { topicId: topic.topicId } }"
                                    class="card mb-2 text-decoration-none border-0 shadow-lg">
                                    <div class="card-body test row">
                                        <div class="col-lg-3">
                                            <img :src="getImageUrl(topic.image)" class="card-img-top" alt="Topic Image"
                                                loading="lazy">
                                        </div>
                                        <div class="col-lg-9">
                                            <span class="grammar-name ms-2 text-uppercase">{{ topic.topicName }}</span>
                                        </div>

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
import { defineComponent, ref, onMounted, computed } from "vue";

import TopicService from "@/services/topic.service";
import SectionService from "@/services/section.service";

export default defineComponent({
    setup() {
        const getImageUrl = (imageName) => {
            if (imageName) {
                // Tạo URL cho ảnh bằng cách kết hợp đường dẫn cơ sở và tên ảnh
                return `http://localhost:9004/images/${imageName}`;
            }
            return 'http://localhost:9004/images/default-image.png';
        };

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


        const topics = ref([]);
        const retrieveTopics = async () => {
            try {
                topics.value = await TopicService.allEnable();
                console.log(topics.value)
            } catch (error) {
                console.log(error);
            }
        };
        const filteredTopics = computed(() => {
            if (!transcript.value) {
                return topics.value.slice();
            }
            return topics.value.filter((topic) =>
                Object.values(topic).some((value) =>
                    String(value).toLowerCase().includes(transcript.value.toLowerCase())
                )
            );
        });
        
        const transcript = ref('');
        const recognition = ref(null);
        const isSpeaking = ref(false);
        const startSpeechRecognition = () => {
            recognition.value = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.value.lang = 'en-US';
            recognition.value.interimResults = true; // Kết quả tạm thời

            isSpeaking.value = true;

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
            isSpeaking.value = false;
        };

        onMounted(() => {
            retrieveTopics();
            retrieveSections();
        });

        return {
            getImageUrl,
            sections,
            docngheSections,
            topics,
            filteredTopics,

            transcript,
            isSpeaking,
            startSpeechRecognition,
            stopSpeechRecognition,

        };
    },
});
</script>
  
<style scoped>
.grammar-name {
    font-size: 14px;
    font-weight: bold;
}

.test {
    display: flex;
    align-items: center;
    border-radius: 10px;
}

h1,
h2,
h3,
h4,
h5 {
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

.custom-card:hover {
    color: #007aff;
    transform: none;
}

.card {
    position: relative;
    transition: transform 0.3s;
    cursor: pointer;
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

.lesson-content {
    overflow: auto;
}

.lesson-content p {
    font-size: 14px;
    color: #333;
}

.card.specific-card {
    border: 2px solid #eeeff1;
}

.card.specific-card:hover {
    transform: none;
    box-shadow: 0 4px 8px rgba(72, 87, 219, 0.1);
    border-color: #f6f9fc;
}

.card-img-top {
    height: 50px;
    object-fit: cover;
    border-radius: 10%;
}

.card:hover .card-title {
    color: rgb(22, 4, 100);
}

.input-group {
    border: 1px solid #6694c2;
    border-radius: 10px;
    overflow: hidden;
    width: 50%;
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

button i {
    font-size: 20px;
    color: #000;
}

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
}</style>
  