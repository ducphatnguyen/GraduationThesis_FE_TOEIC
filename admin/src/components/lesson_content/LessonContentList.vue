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
                        <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                            data-bs-target="#addLessonContentModal">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <div class="modal zoom" id="addLessonContentModal" tabindex="-1"
                            aria-labelledby="addLessonContentModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="addLessonContentModalLabel"><i
                                                class="fa-solid fa-circle-plus text-success"></i> Add Lesson Content
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <LessonContentAdd :lessonId="lessonId" :retrieveLessonContents="retrieveLessonContents"
                                        :lessonContents="lessonContents" />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="card-body">
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th><button class="btn btn-success rounded-5 disabled">No.</button></th>
                                <th>TITLE</th>
                                <th>CONTENT</th>
                                <th>STATUS</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lessonContent, index) in paginatedLessonContents" :key="lessonContent.contentId" 
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>{{ lessonContent.title }}</td>
                                <!-- <td>{{ lessonContent.content }}</td> -->
                                <td v-html="lessonContent.content"></td>
                                <td>
                                    <span v-if="lessonContent.lessonContentStatus === 1"
                                        @click="toggleStatus(lessonContent.contentId, 0)" class="btn badge text-bg-success">
                                        Enable
                                    </span>
                                    <span v-else-if="lessonContent.lessonContentStatus === 0"
                                        @click="toggleStatus(lessonContent.contentId, 1)" class="btn badge text-bg-danger">
                                        Disable
                                    </span>
                                </td>
                                <td>{{ formatDate(lessonContent.createdAt) }}</td>
                                <td>{{ formatDate(lessonContent.updatedAt) }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- Mở modal chỉnh sửa LessonContent -->
                                        <button type="button" class="btn btn-white border-0" data-bs-toggle="modal" :title="`Chỉnh sửa [${lessonContent.title}]`"
                                            :data-bs-target="'#editLessonContentModal-' + lessonContent.contentId">
                                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                        </button>
                                        <!-- Modal chỉnh sửa LessonContent -->
                                        <div :id="'editLessonContentModal-' + lessonContent.contentId" class="modal zoom" tabindex="-1"
                                            :aria-labelledby="'editLessonContentModalLabel-' + lessonContent.contentId" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5"
                                                            :id="'editLessonContentModalLabel-' + lessonContent.contentId"><i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i> Edit Lesson Content</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" 
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <LessonContentEdit :lessonContentId="lessonContent.contentId" :lessonId="lessonId"
                                                        :retrieveLessonContents="retrieveLessonContents" :lessonContents="lessonContents" />
                                                </div>
                                            </div>
                                        </div>

                                        <button type="button" @click="deleteLessonContent(lessonContent.contentId)" :title="`Xóa [${lessonContent.title}]`"
                                            class="btn btn-white border-0">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedLessonContents.length === 0">
                                <td colspan="8">No data available</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredLessonContents.length > 0">
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
                        v-if="filteredLessonContents.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredLessonContents.length)
                            }}
                            trên {{ filteredLessonContents.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";
import LessonContentService from "@/services/lesson_content.service";
import LessonContentAdd from "@/views/lesson_content/LessonContentAdd.vue";
import LessonContentEdit from "@/views/lesson_content/LessonContentEdit.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    emits: ['rerender:lessonContents'],
    components: {
        LessonContentAdd,
        LessonContentEdit,
    },
    props: {
        lessonContents: { type: Array, default: [] },
        sectionId: { type: String, required: true },
        lessonId: { type: String, required: true },
        retrieveLessonContents: { type: Function, required: true }, // Nhận prop retrieveLessons
    },
    setup(props) {
        const searchText = ref("");

        const filteredLessonContents = computed(() => {
            if (!searchText.value) {
                return reactive(props.lessonContents);
            }
            return props.lessonContents.filter((lessonContent) =>
                Object.values(lessonContent).some((value) => String(value).toLowerCase().includes(searchText.value.toLowerCase()))
            );
        });

        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100]; 
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const totalPageCount = computed(() => Math.ceil(filteredLessonContents.value.length / ITEMS_PER_PAGE.value));
        const paginatedLessonContents = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredLessonContents.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.lessonContents, () => {
            currentPage.value = 1; 
        });

        // Add computed properties for first row number, last row number, and total number of rows
        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() => Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredLessonContents.length));

        const deleteLessonContent = async (lessonContentId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa nội dung bài học này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await LessonContentService.delete(lessonContentId);
                    props.retrieveLessonContents();
                    Swal.fire({
                        title: 'Xóa nội dung bài học thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa nội dung bài học',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };

        const toggleStatus = async (lessonContentId, newStatus) => {
            try {
                console.log(lessonContentId);
                console.log(newStatus);
                await LessonContentService.updateStatus(lessonContentId, newStatus);
                props.retrieveLessonContents();
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
            filteredLessonContents,
            deleteLessonContent,
            paginatedLessonContents,
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