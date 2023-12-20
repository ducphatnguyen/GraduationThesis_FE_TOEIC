<template>
    <div class="page-heading">
        <div class="section">
            <div class="card border-0">
                <div class="row">

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
                            data-bs-target="#addExamModal">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <div class="modal zoom" id="addExamModal" tabindex="-1" aria-labelledby="addExamModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="addExamModalLabel"><i
                                                class="fa-solid fa-circle-plus text-success"></i> Add Exam
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <ExamAdd :retrieveExams="retrieveExams" :exams="exams" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body ">
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th>
                                    <button class="btn btn-success rounded-5 disabled">No.</button>
                                </th>
                                <th>EXAM</th>
                                <th>EXAM TYPE</th>
                                <th>DURATION</th>
                                <th>STATUS</th>
                                <th>CREATED_AT</th>
                                <th>UPDATED_AT</th>
                                <th>ACTION</th>
                                <th>MANAGE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(exam, index) in paginatedExams" :key="exam.examId"
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>{{ exam.examName }}</td>
                                <td>
                                    {{ getExamType(exam.examType) }}
                                </td>
                                <td>{{ exam.examDuration / 60 }} phút</td>
                                <td>
                                    <span v-if="exam.examStatus === 1" @click="toggleStatus(exam.examId, 0)"
                                        class="btn badge text-bg-success">
                                        Enable
                                    </span>
                                    <span v-else-if="exam.examStatus === 0" @click="toggleStatus(exam.examId, 1)"
                                        class="btn badge text-bg-danger">
                                        Disable
                                    </span>
                                </td>
                                <td>{{ formatDate(exam.createdAt) }}</td>
                                <td>{{ formatDate(exam.updatedAt) }}</td>

                                <td>
                                    <div class="d-flex justify-content-center">
                                        <!-- Mở modal chỉnh sửa Exam -->
                                        <button type="button" class="btn btn-white border-0" data-bs-toggle="modal"
                                            :title="`Chỉnh sửa [${exam.examName}]`"
                                            :data-bs-target="'#editExamModal-' + exam.examId">
                                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                                        </button>
                                        <!-- Modal chỉnh sửa Exam -->
                                        <div :id="'editExamModal-' + exam.examId" class="modal zoom" tabindex="-1"
                                            :aria-labelledby="'editExamModalLabel-' + exam.examId" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5"
                                                            :id="'editExamModalLabel-' + exam.examId"><i class="fas fa-edit"
                                                                style="color: rgb(192, 129, 13)"></i> Edit Exam</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <ExamEdit :examId="exam.examId" :retrieveExams="retrieveExams"
                                                        :exams="exams" />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" @click="deleteExam(exam.examId)"
                                            :title="`Xóa [${exam.examName}]`" class="btn btn-white border-0">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>

                                    </div>
                                </td>
                                <td class="align-middle">
                                    <div class="d-flex justify-content-center">

                                        <router-link
                                            :to="{ name: 'admin.exam-question.all', params: { examId: exam.examId } }">
                                            <button class="glowing-button ms-2">Exam Questions Details</button>
                                        </router-link>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedExams.length === 0">
                                <td colspan="8">No data available</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredExams.length > 0">
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

                    <div class="d-flex justify-content-center mt-3 fw-lighter fst-italic" v-if="filteredExams.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredExams.length)
                            }}
                            trên {{ filteredExams.length }} kết quả
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, computed, watch } from "vue";

import ExamService from "@/services/exam.service";
import ExamAdd from "@/views/exam/ExamAdd.vue";
import ExamEdit from "@/views/exam/ExamEdit.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    components: {
        ExamAdd,
        ExamEdit
    },
    props: {
        exams: { type: Array, default: [] },
        retrieveExams: { type: Function, required: true },
    },
    setup(props) {
        const searchText = ref("");
        //Thêm phân trang
        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100];
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);
        const filteredExams = computed(() => {
            if (!searchText.value) {
                return props.exams.slice();
            }
            return props.exams.filter((exam) =>
                Object.values(exam).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const totalPageCount = computed(() => Math.ceil(filteredExams.value.length / ITEMS_PER_PAGE.value));
        const paginatedExams = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredExams.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });
        watch(() => props.exams, () => {
            currentPage.value = 1;
        });

        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() =>
            Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredExams.length)
        );

        const deleteExam = async (examId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa Exam này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    console.log(examId);
                    await ExamService.delete(examId);
                    props.retrieveExams();
                    Swal.fire({
                        title: 'Xóa bài thi thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa bài thi',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };

        const toggleStatus = async (examId, newStatus) => {
            try {
                console.log(examId);
                console.log(newStatus);
                await ExamService.updateStatus(examId, newStatus);
                props.retrieveExams();
            } catch (error) {
                console.error(error);
            }
        };

        const getExamType = (type) => {
            switch (type) {
                case 0:
                    return "Mini Test";
                case 1:
                    return "Full Test";
            }
        };

        const formatDate = (dateTimeString) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const date = new Date(dateTimeString);
            return date.toLocaleDateString('en-GB', options);
        };

        return {
            searchText,
            filteredExams,
            deleteExam,
            paginatedExams,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
            toggleStatus,
            getExamType,
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

.glowing-button {
    padding: 10px 20px;
    font-size: 13px;
    background: linear-gradient(45deg, rgb(59, 99, 126), #0b3142);
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    transform-origin: center;
}

.glowing-button:hover {
    animation: glowing 1.5s infinite;
}

@keyframes glowing {
    0% {
        box-shadow: 0 0 5px #2d97df, 0 0 20px #309ae0;
    }

    50% {
        box-shadow: 0 0 20px #2f94d8, 0 0 40px #3098dd;
    }

    100% {
        box-shadow: 0 0 5px #319ae0, 0 0 20px #2f98dd;
    }
}

.exam-image {
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
  