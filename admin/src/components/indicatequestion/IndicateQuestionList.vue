<template>
    <div class="page-heading">
        <section class="section">
            <div class="card border-0">

                <div class="row">
                    <div class="col-2 mt-4">
                        <select class="form-select ms-3 w-50" v-model="ITEMS_PER_PAGE">
                            <option v-for="perPageOption in perPageOptions" :key="perPageOption" :value="perPageOption">
                                {{ perPageOption }}
                            </option>
                        </select>
                    </div>
                    <div class="col-4 mt-4 "></div>
                    <div class="col-6 mt-4 d-flex justify-content-end">
                        <div class="input-group me-3">
                            <input type="text" class="form-control" v-model="searchText" placeholder="Tìm kiếm" />
                            <div class="input-group-append">
                                <button class="btn btn-light-emphasis">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <!-- Phần 1: Mô tả tranh -->
                    <TableSection1 v-if="sectionId === '1'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :getImageUrl="getImageUrl"
                        :getAudioUrl="getAudioUrl" :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Phần 2: Hỏi - Đáp -->
                    <TableSection2 v-if="sectionId === '2'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :getAudioUrl="getAudioUrl"
                        :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Phần 3: Đoạn hội thoại -->
                    <TableSection3 v-if="sectionId === '3'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :getImageUrl="getImageUrl"
                        :getAudioUrl="getAudioUrl" :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Phần 4: Bài nói ngắn -->
                    <TableSection4 v-if="sectionId === '4'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :getImageUrl="getImageUrl"
                        :getAudioUrl="getAudioUrl" :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Phần 5: Hoàn thành câu -->
                    <TableSection5 v-if="sectionId === '5'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Phần 6: Hoàn thành đoạn văn -->
                    <TableSection6 v-if="sectionId === '6'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Phần 7: Đọc hiểu - Đoạn đơn -->
                    <TableSection7Single v-if="sectionId === '7'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Phần 7: Đọc hiểu - Đoạn kép -->
                    <TableSection7Double v-if="sectionId === '12'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Phần 7: Đọc hiểu - Đoạn ba -->
                    <TableSection7Triple v-if="sectionId === '13'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- SPEAKING: No 1-2 -->
                    <TableSectionNo1To2 v-if="sectionId === '104'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- SPEAKING: No 3-4 -->
                    <TableSectionNo3To4 v-if="sectionId === '105'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- SPEAKING: No 5-7 -->
                    <TableSectionNo5To7 v-if="sectionId === '106'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- SPEAKING: No 8-10 -->
                    <TableSectionNo8To10 v-if="sectionId === '107'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- SPEAKING: No 11 -->
                    <TableSectionNo11 v-if="sectionId === '108'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- WRITING: No 1-5 -->
                    <TableSectionNo1To5 v-if="sectionId === '109'" :paginatedQuestions="paginatedQuestions"
                        :getImageUrl="getImageUrl" :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE"
                        :sectionId="sectionId" :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- WRITING: No 6-7 -->
                    <TableSectionNo6To7 v-if="sectionId === '110'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- WRITING: No 8 -->
                    <TableSectionNo8 v-if="sectionId === '111'" :paginatedQuestions="paginatedQuestions"
                        :currentPage="currentPage" :ITEMS_PER_PAGE="ITEMS_PER_PAGE" :sectionId="sectionId"
                        :testId="testId" :retrieveQuestions="retrieveQuestions"/>

                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredQuestions.length > 0">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                                <a class="page-link" href="#" @click="changePage(currentPage - 1)">&laquo;</a>
                            </li>
                            <li v-for="pageNumber in totalPageCount" :key="pageNumber" class="page-item"
                                :class="{ 'active': currentPage === pageNumber }">
                                <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                            </li>
                            <li class="page-item" :class="{ 'disabled': currentPage === totalPageCount }">
                                <a class="page-link" href="#" @click="changePage(currentPage + 1)">&raquo;</a>
                            </li>
                        </ul>
                    </nav>
                    <div class="d-flex justify-content-center mt-3 fw-lighter fst-italic"
                        v-if="filteredQuestions.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredQuestions.length)
                            }}
                            trên {{ filteredQuestions.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";

import TableSection1 from "@/components/indicatequestion/TableSection1.vue";
import TableSection2 from "@/components/indicatequestion/TableSection2.vue";
import TableSection3 from "@/components/indicatequestion/TableSection3.vue";
import TableSection4 from "@/components/indicatequestion/TableSection4.vue";
import TableSection5 from "@/components/indicatequestion/TableSection5.vue";
import TableSection6 from "@/components/indicatequestion/TableSection6.vue";
import TableSection7Single from "@/components/indicatequestion/TableSection7Single.vue";
import TableSection7Double from "@/components/indicatequestion/TableSection7Double.vue";
import TableSection7Triple from "@/components/indicatequestion/TableSection7Triple.vue";

import TableSectionNo1To2 from "@/components/indicatequestion/TableSectionNo1To2.vue";
import TableSectionNo3To4 from "@/components/indicatequestion/TableSectionNo3To4.vue";
import TableSectionNo5To7 from "@/components/indicatequestion/TableSectionNo5To7.vue";
import TableSectionNo8To10 from "@/components/indicatequestion/TableSectionNo8To10.vue";
import TableSectionNo11 from "@/components/indicatequestion/TableSectionNo11.vue";
import TableSectionNo1To5 from "@/components/indicatequestion/TableSectionNo1To5.vue";
import TableSectionNo6To7 from "@/components/indicatequestion/TableSectionNo6To7.vue";
import TableSectionNo8 from "@/components/indicatequestion/TableSectionNo8.vue";

export default defineComponent({
    components: {
        TableSection1,
        TableSection2,
        TableSection3,
        TableSection4,
        TableSection5,
        TableSection6,
        TableSection7Single,
        TableSection7Double,
        TableSection7Triple,

        TableSectionNo1To2,
        TableSectionNo3To4,
        TableSectionNo5To7,
        TableSectionNo8To10,
        TableSectionNo11,
        TableSectionNo1To5,
        TableSectionNo6To7,
        TableSectionNo8,
    },
    props: {
        questions: { type: Array, default: [] },
        sectionId: { type: String, required: true },
        testId: { type: String, required: true },
        retrieveQuestions: Function,
    },
    setup(props, context) {

        console.log(props.sectionId)
        const searchText = ref("");

        const filteredQuestions = computed(() => {
            if (!searchText.value) {
                return reactive(props.questions);
            }
            return props.questions.filter((question) =>
                Object.values(question).some((value) => String(value).toLowerCase().includes(searchText.value.toLowerCase()))
            );
        });

        // const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100];
        const ITEMS_PER_PAGE_OPTIONS = [60, 120, 180, 600]; 
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const totalPageCount = computed(() => Math.ceil(filteredQuestions.value.length / ITEMS_PER_PAGE.value));
        const paginatedQuestions = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredQuestions.value.slice(startIndex, endIndex);

        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };
        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.questions, () => {
            currentPage.value = 1; // Reset current page when the topics prop changes
        });

        // Add computed properties for first row number, last row number, and total number of rows
        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() => Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredQuestions.length));

        const getImageUrl = (imageName) => {
            if (imageName) {
                return `http://localhost:9004/images/${imageName}`;
            }
            return "";
        };
        const getAudioUrl = (audioName) => {
            if (audioName) {
                return `http://localhost:9004/audios/${audioName}`;
            }
            return "";
        };
        return {
            searchText,
            filteredQuestions,
            paginatedQuestions,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
            getImageUrl,
            getAudioUrl
        };
    },
});
</script>

<style scoped>
.input-group {
    border: 1px solid #6694c2;
    border-radius: 10px;
    overflow: hidden;
    width: 80%;
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
.form-select,
.form-control {
    font-size: 14px;
}

.page-item .page-link {
    font-size: 13px;
}
</style>