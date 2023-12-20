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
                <div class="card-body">
                    <table class="table text-center table-hover shadow">
                        <thead class="shadow">
                            <tr class="align-middle">
                                <th>
                                    <button class="btn btn-success rounded-5 disabled">No.</button>
                                </th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>REVIEW</th>
                                <th>STAR</th>
                                <th>CREATED_AT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(feedback, index) in paginatedFeedbacks" :key="feedback.id" class="table-row shadow-on-hover align-middle">
                                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                                <td>{{ feedback.name }}</td>
                                <td>{{ feedback.email }}</td>
                                <td>{{ feedback.review }}</td>
                                <td>{{ feedback.rating }}<i class="fa-solid fa-star text-warning ms-2"></i></td>
                                <td>{{ formatDate(feedback.createdAt) }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <button type="button" @click="deleteFeedback(feedback.id)" title="Xóa" class="btn btn-white border-0">
                                            <i class="fas fa-trash text-danger"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="paginatedFeedbacks.length === 0">
                                <td colspan="6">Không có dữ liệu</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Pagination controls -->
                    <nav aria-label="Page navigation" v-if="filteredFeedbacks.length > 0">
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

                    <div class="d-flex justify-content-center mt-3 fw-lighter fst-italic" v-if="filteredFeedbacks.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredFeedbacks.length)
                            }}
                            trong {{ filteredFeedbacks.length }} kết quả
                        </p>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import FeedbackService from "@/services/feedback.service";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    props: {
        feedbacks: { type: Array, default: [] },
    },
    setup(props) {
        const searchText = ref("");
        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100];
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const filteredFeedbacks = computed(() => {
            if (!searchText.value) {
                return props.feedbacks.slice();
            }
            return props.feedbacks.filter((feedback) =>
                Object.values(feedback).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const totalPageCount = computed(() => Math.ceil(filteredFeedbacks.value.length / ITEMS_PER_PAGE.value));
        const paginatedFeedbacks = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredFeedbacks.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.feedbacks, () => {
            currentPage.value = 1;
        });

        const deleteFeedback = async (feedbackId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa đánh giá này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await FeedbackService.delete(feedbackId);
                    Swal.fire({
                        title: 'Xóa đánh giá thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa đánh giá',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };

        const formatDate = (dateTimeString) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const date = new Date(dateTimeString);
            return date.toLocaleDateString('en-GB', options);
        };

        return {
            searchText,
            filteredFeedbacks,
            deleteFeedback,
            paginatedFeedbacks,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
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
}
</style>
