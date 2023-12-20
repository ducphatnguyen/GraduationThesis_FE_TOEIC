<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li>
                    <i class="fa-solid fa-house"></i>
                    <router-link :to="{name: 'admin.section.all'}">
                        <button class="btn btn-link text-decoration-none fw-bolder">Section</button>
                    </router-link>
                </li>
                <li>
                    <i class="fa-solid fa-person-chalkboard"></i>
                    <router-link :to="{name: 'admin.lesson.all'}">
                        <button class="btn btn-link text-decoration-none fw-bolder">Lesson</button>
                    </router-link>
                </li>
                <li class="current">
                    <i class="fa-solid fa-book"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Lesson Content</button>
                </li>
            </ol>

        </nav>
    </div>
    <LessonContentList :lessonContents="lessonContents" :sectionId="sectionId" :lessonId="lessonId"
        :retrieveLessonContents="retrieveLessonContents" />
</template>
  
<script>
import { defineComponent, ref } from "vue";

import LessonContentService from "@/services/lesson_content.service";
import LessonContentList from "@/components/lesson_content/LessonContentList.vue";

export default defineComponent({
    components: {
        LessonContentList,
    },
    props: {
        sectionId: { type: String, required: true },
        lessonId: { type: String, required: true },
    },
    setup(props) {
        const lessonContents = ref([]);
        const retrieveLessonContents = async () => {
            try {
                console.log(props.lessonId)
                console.log(props.sectionId)
                lessonContents.value = await LessonContentService.getLessonContentsByLesson(props.lessonId);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveLessonContents();
        return {
            lessonContents,
            retrieveLessonContents,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>