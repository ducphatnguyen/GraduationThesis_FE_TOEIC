<template>
    <div class="container">

        <h1 class="text-center mt-5">
            <span>Luyện thi TOEIC LISTENING READING online 2023</span>
            <h4>{{ sectionName }}</h4>
        </h1>

        <div class="row mt-5">
            <div class="col-lg-8 col-md-8 col-sm-8">
                <h5 class="fw-bold">LESSON:</h5>
                <div class="card " v-for="lesson in lessons" :key="lesson.lessonId">
                    <router-link
                        :to="{ name: 'lesson.show', params: { sectionId: lesson.section.id, lessonId: lesson.lessonId } }"
                        class="card-body custom-card text-decoration-none">
                        <span class="card-text">{{ lesson.lessonName }}</span>
                        <i class="fa-solid fa-circle-arrow-right arrow-icon"></i>
                    </router-link>
                </div>

                <div class="row my-3 d-flex justify-content-start">
                    <div class="col-lg-2 col-md-2 col-sm-2 " v-for="test in tests" :key="test.testId">
                        <div class="card mt-3">
                            <div class="card-body">
                                <div class="test-name">{{ test.testName }}</div>
                                <div class="test-info">Tiến độ: 20%</div>
                                <div class="test-info">Tham gia: {{ test.testParticipants }}</div>
                                <router-link
                                    :to="{ name: 'study.show', params: { sectionId: test.section.id, testId: test.testId } }"
                                    class="btn btn-primary mt-2 custom-button">Study
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
                        <span class="card-text overflow-ellipsis" :title="section.name">{{ section.name }}</span>
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted, watch, computed } from "vue";

import SectionService from "@/services/section.service";
import LessonService from "@/services/lesson.service";
import TestService from "@/services/test.service";

export default defineComponent({
    props: {
        sectionId: { type: String, required: true }
    },
    setup(props) {
        
        const sections = ref([]);
        const retrieveSections = async () => {
            try {
                sections.value = await SectionService.allEnable();
            } catch (error) {
                console.log(error);
            }
        };
        const docngheSections = computed(() => {
            return sections.value.filter(
                (section) => section.type === 1 || section.type === 2
            );
        });

        const lessons = ref([]);
        const retrieveLessons = async () => {
            try {
                console.log(props.sectionId);
                lessons.value = await LessonService.getEnableLessonsBySection(props.sectionId);
                console.log(lessons.value);
            } catch (error) {
                console.log(error);
            }
        };

        const tests = ref([]);
        const sectionName = ref("");
        const retrieveTests = async () => {
            try {
                console.log(props.sectionId);
                // Gọi API để lấy danh sách từ vựng dựa trên sectionId
                tests.value = await TestService.getEnableTestsBySection(props.sectionId);
                sectionName.value = tests.value[0].section.name;
                console.log(tests.value);
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            retrieveSections();
            retrieveLessons();
            retrieveTests();
        });

        watch(() => props.sectionId, () => {
            retrieveSections();
            retrieveLessons();
            retrieveTests();
        });

        return {
            tests,
            lessons,
            sections,
            docngheSections,
            sectionName,
        };
    }
});
</script>

  
<style scoped>
.overflow-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* Số dòng hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
h1,h5 {
    font-weight: 700;
    color: #34447c;
}
.custom-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #052649;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}
.custom-button:hover {
    background-color: #fff;
    color: #052649;
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
}
.custom-card:hover {
    color: #007aff;
}
.card {
    position: relative;
    transition: transform 0.3s;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(72, 87, 219, 0.1);
    border-radius: 10px;
}
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(26, 25, 128, 0.2);
}
.test-name {
    font-size: 18px;
    font-weight: bold;
    color: #34447c;
}
.test-info {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
}
.col-lg-2 {
    flex: 0 0 20%;
    max-width: 20%;
}
</style>
  