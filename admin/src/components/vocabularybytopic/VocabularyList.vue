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
                    <div class="col-4 mt-4 d-flex justify-content-end">
                        <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal"
                            data-bs-target="#addVocabularyModal">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <div class="modal zoom" id="addVocabularyModal" tabindex="-1" aria-labelledby="addVocabularyModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="addVocabularyModalLabel"><i class="fa-solid fa-circle-plus text-success"></i> Add Vocabulary
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <VocabularyAdd :topicId="topicId" :retrieveVocabularies="retrieveVocabularies" :vocabularies="vocabularies" />
                                </div>
                            </div>
                        </div>


                        <label for="fileInput" class="btn btn-success mb-3 ms-2">
                            <i class="fas fa-file-import"></i> Import
                        </label>
                        <input id="fileInput" type="file" ref="fileInput" style="display: none;" @change="handleFileChange"
                            accept=".xlsx, .xls" />
                        <button type="button" class="btn btn-success mb-3 ms-2 me-3" @click="downloadTemplate">
                            <i class="fas fa-file-download"></i> Export
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th><button class="btn btn-success rounded-5 disabled">No.</button></th>
                                <th>VOCAB</th>
                                <th>IPA</th>
                                <th>MEANING</th>
                                <th>EXAMPLE</th>
                                <th>IMAGE</th>
                                <th>STATUS</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(vocabulary, index) in paginatedVocabularies" :key="vocabulary.vocabularyId" 
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>{{ vocabulary.word }}</td>
                                <td>{{ vocabulary.ipa }}</td>
                                <td>{{ vocabulary.meaning }}</td>
                                <td>{{ vocabulary.exampleSentence }}</td>
                                <td>
                                    <img :src="getImageUrl(vocabulary.image)" alt="Vocabulary Image" class="topic-image rounded-5" />
                                </td>
                                <td>
                                    <span v-if="vocabulary.vocabularyStatus === 1"
                                        @click="toggleStatus(vocabulary.vocabularyId, 0)" class="btn badge text-bg-success">
                                        Enable
                                    </span>
                                    <span v-else-if="vocabulary.vocabularyStatus === 0"
                                        @click="toggleStatus(vocabulary.vocabularyId, 1)" class="btn badge text-bg-danger">
                                        Disable
                                    </span>
                                </td>
                                <td>{{ formatDate(vocabulary.createdAt) }}</td>
                                <td>{{ formatDate(vocabulary.updatedAt) }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                         <!-- Mở modal chỉnh sửa Vocabulary -->
                                         <button type="button" class="btn btn-white border-0" data-bs-toggle="modal" :title="`Chỉnh sửa [${vocabulary.word}]`"
                                            :data-bs-target="'#editVocabularyModal-' + vocabulary.vocabularyId">
                                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                        </button>
                                        <!-- Modal chỉnh sửa Vocabulary -->
                                        <div :id="'editVocabularyModal-' + vocabulary.vocabularyId" class="modal zoom" tabindex="-1"
                                            :aria-labelledby="'editVocabularyModalLabel-' + vocabulary.vocabularyId" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5"
                                                            :id="'editVocabularyModalLabel-' + vocabulary.vocabularyId"><i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i> Edit Vocabulary</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" 
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <VocabularyEdit :vocabularyId="vocabulary.vocabularyId" :topicId="topicId"
                                                        :retrieveVocabularies="retrieveVocabularies" :vocabularies="vocabularies" />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" @click="deleteVocabulary(vocabulary.vocabularyId)" :title="`Xóa [${vocabulary.word}]`"
                                            class="btn btn-white border-0">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedVocabularies.length === 0">
                                <td colspan="9">No data available</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredVocabularies.length > 0">
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
                        v-if="filteredVocabularies.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredVocabularies.length)
                            }}
                            trên {{ filteredVocabularies.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";

import VocabularyService from "@/services/vocabulary.service";
import VocabularyAdd from "@/views/vocabularybytopic/VocabularyAdd.vue";
import VocabularyEdit from "@/views/vocabularybytopic/VocabularyEdit.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    components: {
        VocabularyAdd,
        VocabularyEdit
    },
    props: {
        vocabularies: { type: Array, default: [] },
        topicId: { type: String, required: true },
        retrieveVocabularies: { type: Function, required: true },
    },
    setup(props) {
        const vocabularies = reactive(props.vocabularies);
        console.log(vocabularies);
        const searchText = ref("");
        const filteredVocabularies = computed(() => {
            if (!searchText.value) {
                return reactive(props.vocabularies);
            }
            return props.vocabularies.filter((vocabulary) =>
                Object.values(vocabulary).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        console.log(filteredVocabularies);

        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100];
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const totalPageCount = computed(() => Math.ceil(filteredVocabularies.value.length / ITEMS_PER_PAGE.value));

        const paginatedVocabularies = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredVocabularies.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.vocabularies, () => {
            currentPage.value = 1;
        });

        // Add computed properties for first row number, last row number, and total number of rows
        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() => Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredTopics.length));

        // Xóa từ vựng
        const deleteVocabulary = async (vocabularyId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa từ vựng này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await VocabularyService.delete(vocabularyId);
                    props.retrieveVocabularies();
                    Swal.fire({
                        title: 'Xóa từ vựng thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa từ vựng',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };

        const downloadTemplate = async () => {
            try {
                await VocabularyService.exportTemplate();
            } catch (error) {
                console.log(error);
            }
        };

        const fileInput = ref(null);
        const handleFileChange = async () => {
            try {
                // Lấy giá trị của input file từ ref
                const file = fileInput.value.files[0];
                if (!file) return;
                await VocabularyService.importTemplate(file,props.topicId);
                props.retrieveVocabularies();
                // Reset the file input value to clear the selected file
                fileInput.value.value = '';
                toast.success('Import Vocabulary Data thành công ', {
                    autoClose: 1000
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi Import Vocabulary Data', {
                    autoClose: 100
                });
            }
        };

        const toggleStatus = async (vocabularyId, newStatus) => {
            try {
                console.log(vocabularyId);
                console.log(newStatus);
                await VocabularyService.updateStatus(vocabularyId, newStatus);
                props.retrieveVocabularies();
            } catch (error) {
                console.error(error);
            }
        };

        const formatDate = (dateTimeString) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const date = new Date(dateTimeString);
            return date.toLocaleDateString('en-GB', options);
        };

        const getImageUrl = (imageName) => {
            if (imageName) {
                // Tạo URL cho ảnh bằng cách kết hợp đường dẫn cơ sở và tên ảnh
                return `http://localhost:9004/images/vocabulary/${imageName}`;
            }
            return "http://localhost:9004/images/default-image.png";
        };

        return {
            searchText,
            filteredVocabularies,
            deleteVocabulary,
            downloadTemplate,
            handleFileChange,
            fileInput,
            paginatedVocabularies,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
            toggleStatus,
            formatDate,
            getImageUrl
        };
    },
});

</script>

<style scoped>
.topic-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
}
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