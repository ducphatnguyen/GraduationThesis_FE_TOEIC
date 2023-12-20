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
                <li class="current">
                    <i class="fa-solid fa-person-chalkboard"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Lesson</button>
                </li>
            </ol>
        </nav>
    </div>
    <LessonList :lessons="lessons" :sectionId="sectionId" :retrieveLessons="retrieveLessons" />
</template>
  
<script>
import { defineComponent, ref } from 'vue';

import LessonService from "@/services/lesson.service";
import LessonList from "@/components/lessonbysection/LessonList.vue";

export default defineComponent({
    components: {
        LessonList,
    },
    props: {
        sectionId: { type: String, required: true }
    },
    setup(props, context) {
        console.log(props.sectionId)
        const lessons = ref([]);
        const activeIndex = ref(-1);

        const retrieveLessons = async () => {
            try {
                console.log()
                lessons.value = await LessonService.getLessonsBySection(props.sectionId);
                console.log(lessons.value)
            } catch (error) {
                console.log(error);
            }
        };
        retrieveLessons();
        return {
            lessons,
            activeIndex,
            retrieveLessons,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>