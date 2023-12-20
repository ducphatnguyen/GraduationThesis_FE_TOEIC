<template>
    <div class="container">
        <h1 class="text-center mt-5">
            <span>{{ sectionName }}</span>
        </h1>
        <div class="row mt-5">
            <div class="col-lg col-md col-sm">

                <div class="card specific-card">
                    <div class="card-body lesson-content" style="min-height: 500px;">
                        <h4 class="card-title text-center lesson-title mb-3">
                            <span>{{ lessonName }}</span>
                        </h4>
                        <div v-for="lessonContent in lessonContents" :key="lessonContent.contentId" class="mb-2">
                            <h4 class="card-subtitle mb-2 text-body-secondary lesson-subtitle">
                                <span class="highlight">{{ lessonContent.title }}</span>
                            </h4>
                            <p class="card-text" v-html="lessonContent.content"></p>
                        </div>
                        <div class="warning" style=" margin-bottom: 15px; padding: 4px 12px;">
                            <p class="d-flex align-items-center justify-content=center"><strong>Note!</strong>Remember to learn vocabulary before taking a test</p>
                        </div>
                        <i class="fa-solid fa-book book-icon"></i>
                    </div>
                </div>

                <div class="row d-flex justify-content-start">
                    <div class="col-lg-2 col-md-2 col-sm-2" v-for="test in tests" :key="test.testId">
                        <div class="card my-3">
                            <div class="card-body">
                                <div class="test-name">{{ test.testName }}</div>
                                <div class="test-info">Tiến độ: 20%</div>
                                <div class="test-info">
                                    Tham gia: {{ test.testParticipants }}
                                </div>
                                <router-link
                                    :to="{ name: 'study.show', params: { sectionId: test.section.id, testId: test.testId } }"
                                    class="btn btn-primary mt-2 custom-button">
                                    Study</router-link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none">
                <div class="card mb-2" v-for="lesson in lessons" :key="lesson.lessonId">
                    <router-link
                        :to="{ name: 'lesson.show', params: { sectionId: lesson.section.id, lessonId: lesson.lessonId } }"
                        class="card-body custom-card text-decoration-none">
                        <span class="card-text overflow-ellipsis"  :title="lesson.lessonName">{{ lesson.lessonName }}</span>
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import LessonService from "@/services/lesson.service";
import TestService from "@/services/test.service";
import LessonContentService from "@/services/lesson_content.service";

export default defineComponent({
    props: {
        sectionId: { type: String, required: true },
        lessonId: { type: String, required: true }
    },
    setup(props) {
        
        const lessonContents = ref([]);
        const lessonName = ref("");
        const retrieveLessonContents = async () => {
            try {
                console.log(props.lessonId);
                lessonContents.value = await LessonContentService.getEnableLessonContentsByLesson(props.lessonId);
                console.log(lessonContents.value);
                lessonName.value = lessonContents.value[0].lesson.lessonName;
            } catch (error) {
                console.log(error);
            }
        };

        const lessons = ref([]);
        const sectionName = ref("");
        const retrieveLessons = async () => {
            try {
                console.log(props.sectionId);
                lessons.value = await LessonService.getEnableLessonsBySection(props.sectionId);
                sectionName.value = lessons.value[0].section.name;
            } catch (error) {
                console.log(error);
            }
        };

        const tests = ref([]);
        const retrieveTests = async () => {
            try {
                console.log(props.sectionId);
                tests.value = await TestService.getEnableTestsBySection(props.sectionId);
                console.log(tests.value);
            } catch (error) {
                console.log(error);
            }
        };
    
        onMounted(() => {
            retrieveLessonContents();
            retrieveLessons();
            retrieveTests();
        });

        watch(() => props.lessonId, () => {
            retrieveLessonContents();
            retrieveLessons();
            retrieveTests();
        });

        return {
            sectionName,
            lessonName,
            lessonContents,
            lessons,
            tests,
        };
    },
});
</script>
  
<style scoped>
.warning {
  background-color: #ffffcc;
  border-left: 6px solid #ffeb3b;
}
h1 {
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
    font-size: 15px;
}
.custom-card:hover {
    color: #007aff;
    transform: none;
}
.card {
    position: relative;
    transition: transform 0.3s;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(11, 21, 114, 0.1);
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
.card.specific-card:hover {
    transform: none;
    box-shadow: 0 4px 8px rgba(72, 87, 219, 0.1);
}
.card.specific-card:hover .text-body-secondary {
    color: #666;
}
.lesson-title {
    font-weight: bold;
    font-size: 24px;
    color: #34447c;
    margin-bottom: 10px;
}
.lesson-subtitle {
    font-weight: bold;
    font-size: 18px;
    color: #666;
    margin-bottom: 5px;
}
.lesson-content {
    max-height: 700px;
    overflow: auto;
}
.lesson-content p {
    font-size: 14px;
    color: #333;
}
.card.specific-card {
    border: 2px solid #052649;
}
.card.specific-card:hover {
    transform: none;
    box-shadow: 0 4px 8px rgba(72, 87, 219, 0.1);
    border-color: #041930;
}
.book-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: #052649;
}
.highlight {
    background-color: #bfedd2;
}
.overflow-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 1 ;
    /* Số dòng hiển thị */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
  