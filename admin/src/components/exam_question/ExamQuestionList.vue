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
                        <div class="modal zoom" id="addExamQuestionModal" tabindex="-1"
                            aria-labelledby="addExamQuestionModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="addExamQuestionModalLabel"><i
                                                class="fa-solid fa-circle-plus text-success"></i> Add ExamQuestion
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <ExamQuestionAdd :examId="examId" :retrieveExamQuestions="retrieveExamQuestions" />
                                </div>
                            </div>
                        </div>

                        <div v-if="showImportButton">
                            <button type="button" class="btn btn-success mb-3 me-3" data-bs-toggle="modal"
                                data-bs-target="#addExamQuestionModal">
                                <i class="fa-solid fa-circle-plus"></i>
                            </button>
                        </div>
                        <button v-else class="btn btn-danger mb-3 ms-2" @click="deleteAllQuestions">
                            <i class="fas fa-trash"></i> Delete All
                        </button>

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
                                <th>CONTENT</th>
                                <th>OPT A</th>
                                <th>OPT B</th>
                                <th>OPT C</th>
                                <th>OPT D</th>
                                <th>CORRECT_OPT</th>
                                <th>IMG</th>
                                <th>AUDIO</th>
                                <th>SCRIPT</th>
                                <th>PASSAGE</th>
                                <th>EXPLANATION</th>
                                <th>PART</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(examQuestion) in paginatedExamQuestions" :key="examQuestion.examQuestionId"
                                class="table-row shadow-on-hover align-middle">
                                <td>{{ examQuestion.orderNumber }}</td>
                                <td>{{ examQuestion.questionContent }}</td>
                                <td>{{ examQuestion.optionA }}</td>
                                <td>{{ examQuestion.optionB }}</td>
                                <td>{{ examQuestion.optionC }}</td>
                                <td>{{ examQuestion.optionD }}</td>
                                <td>{{ examQuestion.correctOption }}</td>
                                <td>
                                    <img v-if="examQuestion.questionImage !== ''"
                                        :src="getImageUrl(examQuestion.questionImage)" alt="" class="question-image" />
                                </td>
                                <td>
                                    <audio controls v-if="examQuestion.questionAudio !== ''"
                                        :src="getAudioUrl(examQuestion.questionAudio)">
                                        Your browser does not support the audio element.
                                    </audio>
                                </td>
                                <td>
                                    <div :title="examQuestion.questionScript"
                                        v-html="getLimitedScript(examQuestion.questionScript)"></div>
                                </td>
                                <td>
                                    <div :title="examQuestion.questionPassage"
                                        v-html="getLimitedPassage(examQuestion.questionPassage)"></div>
                                </td>
                                <td>
                                    <div :title="examQuestion.questionExplanation"
                                        v-html="getLimitedExplanation(examQuestion.questionExplanation)"></div>
                                </td>
                                <td>{{ examQuestion.questionPart }}</td>
                            </tr>

                            <tr v-if="paginatedExamQuestions.length === 0">
                                <td colspan="13">No data available</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Phân trang -->
                    <nav aria-label="Page navigation" v-if="filteredExamQuestions.length > 0">
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
                        v-if="filteredExamQuestions.length > 0">
                        <p>
                            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }} -
                            {{
                                Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredExamQuestions.length)
                            }}
                            trên {{ filteredExamQuestions.length }} kết quả
                        </p>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import { defineComponent, reactive, ref, computed, watch } from "vue";

import ExamQuestionService from "@/services/exam_question.service";
import ExamQuestionAdd from "@/views/exam_question/ExamQuestionAdd.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    components: {
        ExamQuestionAdd
    },
    props: {
        examQuestions: { type: Array, default: [] },
        examId: { type: String, required: true },
        retrieveExamQuestions: { type: Function, required: true },
    },
    setup(props) {

        const examQuestions = reactive(props.examQuestions);
        console.log(examQuestions);

        const searchText = ref("");
        const filteredExamQuestions = computed(() => {
            if (!searchText.value) {
                return reactive(props.examQuestions);
            }
            return props.examQuestions.filter((vocabulary) =>
                Object.values(vocabulary).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const ITEMS_PER_PAGE_OPTIONS = [25, 50, 75, 100]; // Add more options if needed
        const ITEMS_PER_PAGE = ref(ITEMS_PER_PAGE_OPTIONS[0]);
        const currentPage = ref(1);

        const totalPageCount = computed(() => Math.ceil(filteredExamQuestions.value.length / ITEMS_PER_PAGE.value));
        const paginatedExamQuestions = computed(() => {
            const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE.value;
            const endIndex = startIndex + ITEMS_PER_PAGE.value;
            return filteredExamQuestions.value.slice(startIndex, endIndex);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPageCount.value) {
                currentPage.value = page;
            }
        };

        const perPageOptions = computed(() => {
            return ITEMS_PER_PAGE_OPTIONS;
        });

        watch(() => props.examQuestions, () => {
            currentPage.value = 1;
        });

        // Add computed properties for first row number, last row number, and total number of rows
        const firstRowNumber = computed(() => (currentPage - 1) * ITEMS_PER_PAGE + 1);
        const lastRowNumber = computed(() => Math.min((currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE, filteredTopics.length));

        const downloadTemplate = async () => {
            try {
                await VocabularyService.exportTemplate();
            } catch (error) {
                console.log(error);
            }
        };
        const toggleStatus = async (examQuestionId, newStatus) => {
            try {
                console.log(examQuestionId);
                console.log(newStatus);
                await ExamQuestionService.updateStatus(examQuestionId, newStatus);
                props.retrieveExamQuestions();
            } catch (error) {
                console.error(error);
            }
        };
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

        const getLimitedPassage = (passage) => {
            const MAX_SCRIPT_LENGTH = 200;
            if (passage.length > MAX_SCRIPT_LENGTH) {
                return passage.slice(0, MAX_SCRIPT_LENGTH) + '...';
            } else {
                return passage;
            }
        };
        const getLimitedScript = (script) => {
            const MAX_SCRIPT_LENGTH = 100;
            if (script.length > MAX_SCRIPT_LENGTH) {
                return script.slice(0, MAX_SCRIPT_LENGTH) + '...';
            } else {
                return script;
            }
        };
        const getLimitedExplanation = (explanation) => {
            const MAX_EXPLANATION_LENGTH = 50;
            if (explanation.length > MAX_EXPLANATION_LENGTH) {
                return explanation.slice(0, MAX_EXPLANATION_LENGTH) + '...';
            } else {
                return explanation;
            }
        };

        const showImportButton = computed(() => {
            return props.examQuestions.length === 0;
        });

        const deleteAllQuestions = async () => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa Exam 200 câu hỏi này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    console.log(props.examId);
                    await ExamQuestionService.deleteExamQuestionsByExamId(props.examId);
                    props.retrieveExamQuestions();
                    Swal.fire({
                        title: 'Xóa 200 câu hỏi thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa 200 câu hỏi',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };
        
        return {
            searchText,
            filteredExamQuestions,
            downloadTemplate,
            paginatedExamQuestions,
            currentPage,
            totalPageCount,
            changePage,
            ITEMS_PER_PAGE,
            ITEMS_PER_PAGE_OPTIONS,
            perPageOptions,
            firstRowNumber,
            lastRowNumber,
            toggleStatus,
            getImageUrl,
            getAudioUrl,
            getLimitedPassage,
            getLimitedScript,
            getLimitedExplanation,
            showImportButton,
            deleteAllQuestions
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

.question-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
}

audio {
    width: 100%;
    max-width: 300px;
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