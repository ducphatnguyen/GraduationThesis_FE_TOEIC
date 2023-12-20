<template>
    <div class="page-heading">
        <div class="section">
            <div class="card border-0">
                <div class="row">
                    <div class="col-3 mt-4">
                        <select class="form-select ms-3 w-50" v-model="ITEMS_PER_PAGE">
                            <option v-for="perPageOption in perPageOptions" :key="perPageOption" :value="perPageOption">
                                {{ perPageOption }}
                            </option>
                        </select>
                    </div>
                    <div class="col-7 mt-4">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="searchText" placeholder="Tìm kiếm" />
                            <div class="input-group-append">
                                <button class="btn btn-light-emphasis">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="card-body ">
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th>
                                    <button class="btn btn-success rounded-5 disabled">NUM CORRECT</button>
                                </th>
                                <th>SCORE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tableScores, index) in paginatedTableScores" :key="tableScores.scoreTableId"
                                class="table-row shadow-on-hover align-middle">
                                <td> {{ tableScores.numCorrectAnswers }}</td>
                                <td> {{ tableScores.score }}<i class="fa-solid fa-bolt text-warning ms-2"></i></td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- Mở modal chỉnh sửa Exam -->
                                        <button type="button" class="btn btn-white border-0" data-bs-toggle="modal"
                                            :data-bs-target="'#editExamModal-' + tableScores.scoreTableId">
                                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                        </button>
                                        <!-- Modal chỉnh sửa Exam -->
                                        <div :id="'editExamModal-' + tableScores.scoreTableId" class="modal zoom" tabindex="-1"
                                            :aria-labelledby="'editExamModalLabel-' + tableScores.scoreTableId" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5"
                                                            :id="'editExamModalLabel-' + tableScores.scoreTableId"><i class="fas fa-edit"
                                                                style="color: rgb(192, 129, 13)"></i> Edit Exam</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <ScoreTableEdit :scoreTableId="tableScores.scoreTableId" :getTableScores="getTableScores"
                                                        :tableScores="tableScores" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedTableScores.length === 0">
                                <td colspan="8">No data available</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredTableScores.length > 0">
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

                    <div class="d-flex justify-content-center mt-3 fw-lighter fst-italic" v-if="filteredTableScores.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredTableScores.length)
                            }}
                            trên {{ filteredTableScores.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, computed, watch } from "vue";

import ScoreTableEdit from "@/views/score_table/ScoreTableEdit.vue";

export default defineComponent({
    components: {
        ScoreTableEdit
    },
    props: {
        tableScores: { type: Array, default: [] },
        getTableScores: { type: Function, required: true },
    },
    setup(props) {
        const searchText = ref("");
        //Thêm phân trang
        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100];
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);
        const filteredTableScores = computed(() => {
            if (!searchText.value) {
                return props.tableScores.slice();
            }
            return props.tableScores.filter((tableScores) =>
                Object.values(tableScores).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const totalPageCount = computed(() => Math.ceil(filteredTableScores.value.length / ITEMS_PER_PAGE.value));
        const paginatedTableScores = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredTableScores.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });
        watch(() => props.tableScores, () => {
            currentPage.value = 1;
        });

        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() =>
            Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredTableScores.length)
        );

        return {
            searchText,
            filteredTableScores,
            paginatedTableScores,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
        };
    },
});
</script>

  
<style scoped>
.table-row.shadow-on-hover:hover {
    box-shadow: 0 2px 3px rgba(196, 181, 181, 0.9);
}

th {
    color: #052649;
    font-weight: bold;
}

td {
    color: #052649;
    font-weight: normal;
}

.modal.zoom .modal-dialog {
    transition: transform 0.2s ease-out;
    transform: scale(0.4);
}

.modal.zoom.show .modal-dialog {
    transform: scale(1);
}

h1 {
    font-weight: 600;
    color: #34447c;
}

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

.page-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    padding: 10px;
}

.form-select,
.form-control {
    font-size: 14px;
}

.table {
    font-size: 13px;

}

.page-item .page-link {
    font-size: 13px;
}</style>
  