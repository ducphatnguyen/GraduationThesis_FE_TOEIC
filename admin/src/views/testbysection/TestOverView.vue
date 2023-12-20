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
                    <i class="fa-solid fa-folder"></i>
                    <button class="btn btn-link text-decoration-none fw-bolder">Test</button>
                </li>
                
            </ol>
        </nav>
    </div>
    <div>
        <TestList :tests="tests" :sectionId="sectionId" :retrieveTests="retrieveTests" />
    </div>

</template>
  
<script>
import TestList from "@/components/testbysection/TestList.vue";
import TestService from "@/services/test.service";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        TestList,
    },
    props: {
        sectionId: { type: String, required: true }
    },
    setup(props) {
        console.log(props.sectionId)
        const tests = ref([]);
        const activeIndex = ref(-1);

        const retrieveTests = async () => {
            try {
                tests.value = await TestService.getTestsBySection(props.sectionId);
                console.log(tests.value)
            } catch (error) {
                console.log(error);
            }
        };
        retrieveTests();
        return {
            tests,
            activeIndex,
            retrieveTests,
        };
    },
});
</script>
<style scoped>
@import "@/assets/breadcrumb.css";
</style>