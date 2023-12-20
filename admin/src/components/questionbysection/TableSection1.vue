<template>
    <table class="table text-center table-hover shadow">

        <thead class="shadow">
            <tr class="align-middle">
                <th><button class="btn btn-success rounded-5 disabled">No.</button></th>
                <th>OPT A</th>
                <th>OPT B</th>
                <th>OPT C</th>
                <th>OPT D</th>
                <th>CORRECT OPT</th>
                <th>TYPE</th>
                <th>IMAGE</th>
                <th>AUDIO</th>
                <th>SCRIPT</th>
                <th>STATUS</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(question, index) in paginatedQuestions" :key="question.questionId" class="table-row shadow-on-hover align-middle">
                <td>{{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}</td>
                <td>{{ question.optionA }}</td>
                <td>{{ question.optionB }}</td>
                <td>{{ question.optionC }}</td>
                <td>{{ question.optionD }}</td>
                <td>{{ question.correctOption }}</td>
                <td>{{ question.questionType }}</td>
                <td>
                    <img :src="getImageUrl(question.questionImage)" alt="Topic Image" class="question-image" />
                </td>
                <td>
                    <audio controls :src="getAudioUrl(question.questionAudio)">
                        Your browser does not support the audio element.
                    </audio>
                </td>
                <td v-html="question.questionScript"></td>
                <td>
                    <span v-if="question.questionStatus === 1" @click="toggleStatus(question.questionId, 0)"
                        class="btn badge text-bg-success">
                        Enable
                    </span>
                    <span v-else-if="question.questionStatus === 0" @click="toggleStatus(question.questionId, 1)"
                        class="btn badge text-bg-danger">
                        Disable
                    </span>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <!-- Mở modal chỉnh sửa Question -->
                        <button type="button" class="btn btn-white border-0" data-bs-toggle="modal"
                            :data-bs-target="'#editQuestionModal-' + question.questionId">
                            <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                        </button>
                        <!-- Modal chỉnh sửa Question -->
                        <div :id="'editQuestionModal-' + question.questionId" class="modal zoom" tabindex="-1"
                            :aria-labelledby="'editQuestionModalLabel-' + question.questionId" aria-hidden="true">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" :id="'editQuestionModalLabel-' + question.questionId"><i
                                                class="fas fa-edit" style="color: rgb(192, 129, 13)"></i> Edit Question Section 1</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <QuestionEditSection1 :questionId="question.questionId" :sectionId="sectionId"
                                        :retrieveQuestions="retrieveQuestions" />
                                </div>
                            </div>
                        </div>
                        
                        <button type="button" @click="deleteQuestion(question.questionId)" class="btn btn-white border-0">
                            <i class="fas fa-trash text-danger"></i>
                        </button>
                    </div>
                </td>
            </tr>
            <tr v-if="paginatedQuestions.length === 0">
                <td colspan="12">No data available</td>
            </tr>
            
        </tbody>
    </table>
</template>
  
<script>
import { defineComponent, ref } from "vue";

import QuestionService from "@/services/question.service";
import QuestionEditSection1 from "@/views/questionbysection/QuestionEditSection1.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    components: {
        QuestionEditSection1
    },
    props: {
        paginatedQuestions: { type: Array, required: true },
        currentPage: { type: Number, required: true },
        ITEMS_PER_PAGE: { type: Number, required: true },
        getImageUrl: { type: Function, required: true },
        getAudioUrl: { type: Function, required: true },
        sectionId: { type: String, required: true },
        retrieveQuestions: { type: Function, required: true },
    },
    setup(props, context) {

        const deleteQuestion = async (questionId) => {
            const result = await Swal.fire({
                title: 'Bạn muốn xóa câu hỏi này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });
            if (result.isConfirmed) {
                try {
                    await QuestionService.delete(questionId);
                    props.retrieveQuestions();
                    Swal.fire({
                        title: 'Xóa câu hỏi thành công!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lỗi khi xóa câu hỏi',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            }
        };
        
        const toggleStatus = async (questionId, newStatus) => {
            try {
                console.log(questionId);
                console.log(newStatus);
                await QuestionService.updateStatus(questionId, newStatus);
                props.retrieveQuestions();
            } catch (error) {
                console.error(error);
            }
        };

        const showTranscript = ref({});
        const toggleTranscript = (index) => {
            showTranscript.value[index] = !showTranscript.value[index];
        };

        return {
            deleteQuestion,
            toggleStatus,
            showTranscript,
            toggleTranscript
        };
    },
});
</script>
  
<style scoped>
th {
   color: #052649; 
   font-weight: bold;
}
td {
   color: #052649; 
   font-weight: normal;
}
.table-row.shadow-on-hover:hover {
   box-shadow: 0 2px 3px rgba(196, 181, 181, 0.9); 
}
.modal.zoom .modal-dialog {
  transition: transform 0.2s ease-out;
  transform: scale(0.4);
}
.modal.zoom.show .modal-dialog {
  transform: scale(1);
}
.question-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 10px;
}
.table {
    font-size: 13px;
}
audio {
    width: 100%;
    max-width: 300px;
}
</style>