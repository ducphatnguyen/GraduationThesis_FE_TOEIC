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

                    <div class="col-6 mt-4">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="searchText" placeholder="Tìm kiếm" />
                            <div class="input-group-append">
                                <button class="btn btn-light-emphasis">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 mt-4  d-flex justify-content-end">
                        <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                            data-bs-target="#addGrammarContentModal">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <div class="modal zoom" id="addGrammarContentModal" tabindex="-1" aria-labelledby="addGrammarContentModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="addGrammarContentModalLabel"><i class="fa-solid fa-circle-plus text-success"></i> Add GrammarContent
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <GrammarContentAdd :grammarId="grammarId" :retrieveGrammarContents="retrieveGrammarContents" :grammarContents="grammarContents" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="card-body">
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th>
                                    <button class="btn btn-success rounded-5 disabled">No.</button>
                                </th>
                                <th>TITLE</th>
                                <th>CONTENT</th>
                                <th>STATUS</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(grammarContent, index) in paginatedGrammarContents" :key="grammarContent.contentId" 
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>{{ grammarContent.title }}</td>
                                <td v-html="grammarContent.content"></td>
                                <td>
                                    <span v-if="grammarContent.grammarContentStatus === 1"
                                        @click="toggleStatus(grammarContent.contentId, 0)"
                                        class="btn badge text-bg-success">
                                        Enable
                                    </span>
                                    <span v-else-if="grammarContent.grammarContentStatus === 0"
                                        @click="toggleStatus(grammarContent.contentId, 1)" class="btn badge text-bg-danger">
                                        Disable
                                    </span>
                                </td>
                                <td>{{ formatDate(grammarContent.createdAt) }}</td>
                                <td>{{ formatDate(grammarContent.updatedAt) }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- Mở modal chỉnh sửa GrammarContent -->
                                        <button type="button" class="btn btn-white border-0" data-bs-toggle="modal" :title="`Chỉnh sửa [${grammarContent.title}]`"
                                            :data-bs-target="'#editGrammarContentModal-' + grammarContent.contentId">
                                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                        </button>
                                        <!-- Modal chỉnh sửa GrammarContent -->
                                        <div :id="'editGrammarContentModal-' + grammarContent.contentId" class="modal zoom" tabindex="-1"
                                            :aria-labelledby="'editGrammarContentModalLabel-' + grammarContent.contentId" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5"
                                                            :id="'editGrammarContentModalLabel-' + grammarContent.contentId"><i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i> Edit Grammar Content</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" 
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <GrammarContentEdit :grammarContentId="grammarContent.contentId" :grammarId="grammarId"
                                                        :retrieveGrammarContents="retrieveGrammarContents" :grammarContents="grammarContents" />
                                                </div>
                                            </div>
                                        </div>

                                        <button type="button" @click="deleteGrammarContent(grammarContent.contentId)" :title="`Xóa [${grammarContent.title}]`"
                                            class="btn btn-white border-0">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedGrammarContents.length === 0">
                                <td colspan="8">No data available</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredGrammarContents.length > 0">
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
                        v-if="filteredGrammarContents.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredGrammarContents.length)
                            }}
                            trên {{ filteredGrammarContents.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";
import GrammarContentService from "@/services/grammar_content.service";
import GrammarContentAdd from "@/views/grammar_content/GrammarContentAdd.vue";
import GrammarContentEdit from "@/views/grammar_content/GrammarContentEdit.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    components: {
        GrammarContentAdd,
        GrammarContentEdit
    },
    props: {
        grammarContents: { type: Array, default: [] },
        grammarId: { type: String, required: true },
        retrieveGrammarContents: { type: Function, required: true },
    },
    setup(props, context) {

        console.log(props.grammarId)
        const searchText = ref("");

        const filteredGrammarContents = computed(() => {
            if (!searchText.value) {
                return reactive(props.grammarContents);
            }
            return props.grammarContents.filter((grammarContent) =>
                Object.values(grammarContent).some((value) => String(value).toLowerCase().includes(searchText.value.toLowerCase()))
            );
        });

        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100]; 
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const totalPageCount = computed(() => Math.ceil(filteredGrammarContents.value.length / ITEMS_PER_PAGE.value));
        const paginatedGrammarContents = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredGrammarContents.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.grammarContents, () => {
            currentPage.value = 1; // Reset current page when the topics prop changes
        });

        // Add computed properties for first row number, last row number, and total number of rows
        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() => Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredGrammarContents.length));

        const deleteGrammarContent = async (grammarContentId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa nội dung ngữ pháp này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await GrammarContentService.delete(grammarContentId);
                    props.retrieveGrammarContents();
                    Swal.fire({
                        title: 'Xóa nội dung ngữ pháp thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa nội dung ngữ pháp',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };

        const toggleStatus = async (grammarContentId, newStatus) => {
            try {
                console.log(grammarContentId);
                console.log(newStatus);
                await GrammarContentService.updateStatus(grammarContentId, newStatus);
                props.retrieveGrammarContents();
            } catch (error) {
                console.error(error);
            }
        };

        const formatDate = (dateTimeString) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const date = new Date(dateTimeString);
            return date.toLocaleDateString('en-GB', options);
        };

        return {
            searchText,
            filteredGrammarContents,
            deleteGrammarContent,
            paginatedGrammarContents,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
            toggleStatus,
            formatDate
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
.table {
    font-size: 13px;

}
.page-item .page-link {
    font-size: 13px;
}
</style>