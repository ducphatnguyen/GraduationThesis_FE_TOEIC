<template>
    <div class="mt-2 bg-white shadow-lg rounded-1">
        <nav>
            <ol class="cd-breadcrumb custom-separator">
                <li class="current">
                    <i class="fa-solid fa-section"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Section</button>
                </li>
            </ol>
        </nav>
    </div>
    <SectionList :sections="sections" :retrieveSections="retrieveSections"></SectionList>       
</template>
  
<script>
import { defineComponent, ref } from 'vue';

import SectionService from "@/services/section.service";
import SectionList from "@/components/section/SectionList.vue";

export default defineComponent({
    components: {
        SectionList,
    },
    setup() {

        const sections = ref([]);
        const retrieveSections = async () => {
            try {
                sections.value = await SectionService.all();
                console.log(sections.value)
            } catch (error) {
                console.log(error);
            }
        };
        retrieveSections();
        return {
            sections,
            retrieveSections,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>
  