<template>
    <div class="bg-test">
        <div class="container-fluid">
            <div class="row mt-3">
                <!-- Speaking -->
                <No1To2 v-if="sectionId === '104'" :testId="testId"></No1To2>
                <No3To4 v-if="sectionId === '105'" :testId="testId"></No3To4>
                <No5To7 v-if="sectionId === '106'" :testId="testId"></No5To7>
                <No8To10 v-if="sectionId === '107'" :testId="testId"></No8To10>
                <No11 v-if="sectionId === '108'" :testId="testId"></No11>
                <!-- Writing -->
                <No1To5 v-if="sectionId === '109'" :testId="testId"></No1To5>
                <No6To7 v-if="sectionId === '110'" :testId="testId"></No6To7>
                <No8 v-if="sectionId === '111'" :testId="testId"></No8>
            </div>

        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
// Speaking
import No1To2 from "@/components/No1To2.vue";
import No3To4 from "@/components/No3To4.vue";
import No5To7 from "@/components/No5To7.vue";
import No8To10 from "@/components/No8To10.vue";
import No11 from "@/components/No11.vue";
// Writing
import No1To5 from "@/components/No1To5.vue";
import No6To7 from "@/components/No6To7.vue";
import No8 from "@/components/No8.vue";

export default defineComponent({
    components: {
        No1To2,
        No3To4,
        No5To7,
        No8To10,
        No11,
        No1To5,
        No6To7,
        No8
    },
    props: {
        sectionId: { type: String, required: true },
        testId: { type: String, required: true },
    },
    setup(props) {
        return {

        };
    },
});
</script>
  
  