<template>
    <div class="page-heading">
        <div class="section">
            <div class="card border-0">
                <div class="row">
                    <!-- Tạo các điều kiện tìm kiếm và số mục hiển thị trên trang -->
                    <div class="col-2 mt-4">
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
                    <div class="col-3 mt-4 d-flex justify-content-end">
                        <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                            data-bs-target="#addFreeMaterialModal">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <div class="modal zoom" id="addFreeMaterialModal" tabindex="-1"
                            aria-labelledby="addFreeMaterialModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="addFreeMaterialModalLabel"><i
                                                class="fa-solid fa-circle-plus text-success"></i> Add Free Material</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <FreeMaterialAdd :retrieveFreeMaterials="retrieveFreeMaterials"
                                        :freeMaterials="freeMaterials" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <!-- Tạo bảng hiển thị danh sách Free Material -->
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th>
                                    <button class="btn btn-success rounded-5 disabled">No.</button>
                                </th>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                                <th>FILE</th>
                                <th>STATUS</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(freeMaterial, index) in paginatedFreeMaterials" :key="freeMaterial.materialId"
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>{{ freeMaterial.title }}</td>
                                <td>{{ freeMaterial.description }}</td>
                                <td>
                                    <span>
                                        <i class="far fa-file"></i>
                                        <p v-if="freeMaterial.filePdf" >
                                            <a class="text-decoration-none" :href="getFilePdfUrl(freeMaterial.filePdf)" target="_blank">View PDF</a>
                                        </p>
                                        <p v-else>No Data</p>
                                    </span>
                                </td>
                                <td>
                                    <span v-if="freeMaterial.materialStatus === 1"
                                        @click="toggleStatus(freeMaterial.materialId, 0)" class="btn badge text-bg-success">
                                        Enable
                                    </span>
                                    <span v-else-if="freeMaterial.materialStatus === 0"
                                        @click="toggleStatus(freeMaterial.materialId, 1)" class="btn badge text-bg-danger">
                                        Disable
                                    </span>
                                </td>
                                <td>{{ formatDate(freeMaterial.createdAt) }}</td>
                                <td>{{ formatDate(freeMaterial.updatedAt) }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- Mở modal chỉnh sửa Free Material -->
                                        <button type="button" class="btn btn-white border-0" data-bs-toggle="modal"
                                            :title="`Chỉnh sửa [${freeMaterial.title}]`"
                                            :data-bs-target="'#editFreeMaterialModal-' + freeMaterial.materialId">
                                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                        </button>
                                        <!-- Modal chỉnh sửa Free Material -->
                                        <div :id="'editFreeMaterialModal-' + freeMaterial.materialId" class="modal zoom"
                                            tabindex="-1"
                                            :aria-labelledby="'editFreeMaterialModalLabel-' + freeMaterial.materialId"
                                            aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5"
                                                            :id="'editFreeMaterialModalLabel-' + freeMaterial.materialId"><i
                                                                class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                                            Edit Free Material</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <FreeMaterialEdit :freeMaterialId="freeMaterial.materialId"
                                                        :retrieveFreeMaterials="retrieveFreeMaterials"
                                                        :freeMaterials="freeMaterials" />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" @click="deleteFreeMaterial(freeMaterial.materialId)"
                                            :title="`Xóa [${freeMaterial.title}]`" class="btn btn-white border-0">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedFreeMaterials.length === 0">
                                <td colspan="8">No data available</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredFreeMaterials.length > 0">
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
                    <div class="d-flex justify-content-center mt-3 fst-italic" v-if="filteredFreeMaterials.length > 0">
                        <p>
                            {{ firstRowNumber }} - {{ lastRowNumber }}
                            trên {{ filteredFreeMaterials.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";

import FreeMaterialService from "@/services/free_material.service";
import FreeMaterialAdd from "@/views/free_material/FreeMaterialAdd.vue";
import FreeMaterialEdit from "@/views/free_material/FreeMaterialEdit.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export default defineComponent({
    components: {
        FreeMaterialAdd,
        FreeMaterialEdit
    },
    props: {
        freeMaterials: { type: Array, default: [] },
        retrieveFreeMaterials: { type: Function, required: true },
    },
    setup(props) {
        const searchText = ref("");
        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100];
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const filteredFreeMaterials = computed(() => {
            if (!searchText.value) {
                return props.freeMaterials.slice();
            }
            return props.freeMaterials.filter((freeMaterial) =>
                Object.values(freeMaterial).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const totalPageCount = computed(() => Math.ceil(filteredFreeMaterials.value.length / ITEMS_PER_PAGE.value));
        const paginatedFreeMaterials = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredFreeMaterials.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.freeMaterials, () => {
            currentPage.value = 1; 
        });

        const firstRowNumber = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE.value + 1);
        const lastRowNumber = computed(() =>
            Math.min((currentPage.value - 1) * ITEMS_PER_PAGE.value + ITEMS_PER_PAGE.value, filteredFreeMaterials.value.length)
        );

        const deleteFreeMaterial = async (freeMaterialId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa tài liệu này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await FreeMaterialService.delete(freeMaterialId);
                    props.retrieveFreeMaterials();
                    Swal.fire({
                        title: 'Xóa tài liệu thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa tài liệu',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };

        const getFilePdfUrl = (filePdf) => {
            if (filePdf) {
                return `http://localhost:9004/pdfs/${filePdf}`;
            }
        };

        const toggleStatus = async (freeMaterialId, newStatus) => {
            try {
                await FreeMaterialService.updateStatus(freeMaterialId, newStatus);
                props.retrieveFreeMaterials();
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
            filteredFreeMaterials,
            deleteFreeMaterial,
            getFilePdfUrl,
            paginatedFreeMaterials,
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

.file-thumbnail {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
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
