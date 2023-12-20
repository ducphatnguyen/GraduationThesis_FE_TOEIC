<template>
    <table class="table text-center table-bordered shadow">
        <thead class="shadow">
            <tr class="align-middle">
                <th><button class="btn btn-success rounded-5 disabled">No.</button></th>
                <th>CONTENT</th>
                <th>OPT A</th>
                <th>OPT B</th>
                <th>OPT C</th>
                <th>OPT D</th>
                <th>CORRECT OPT</th>
                <th>TYPE</th>
                <th>EXPLANATION</th>
                <th>PASSAGE</th>
                <th>STATUS</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(groupedQuestions, groupId, groupIndex) in groupedQuestionMap" :key="groupId">
                <tr v-for="(question, index) in groupedQuestions" :key="question.Id"
                    class="table-row shadow-on-hover align-middle">
                    <td v-if="index === 0" :rowspan="groupedQuestions.length">
                        {{ groupIndex + 1 }}
                    </td>
                    <td>{{ question.questionContent }}</td>
                    <td>{{ question.optionA }}</td>
                    <td>{{ question.optionB }}</td>
                    <td>{{ question.optionC }}</td>
                    <td>{{ question.optionD }}</td>
                    <td>{{ question.correctOption }}</td>
                    <td>{{ question.questionType }}</td>
                    <td>{{ question.questionExplanation }}</td>
                    <td v-if="index === 0" :rowspan="groupedQuestions.length">
                        <div :title="question.questionGroup.groupPassage" v-html="getLimitedPassage(question.questionGroup.groupPassage)"></div>
                    </td>
                    <td v-if="index === 0" :rowspan="groupedQuestions.length">
                        <span v-if="question.questionStatus === 1" @click="toggleStatus(groupedQuestions.map(q => q.questionId), 0)"
                            class="btn badge text-bg-success">
                            Enable
                        </span>
                        <span v-else-if="question.questionStatus === 0" @click="toggleStatus(groupedQuestions.map(q => q.questionId), 1)"
                            class="btn badge text-bg-danger">
                            Disable
                        </span>
                    </td>
                    <!-- <td v-if="index === 0" :rowspan="groupedQuestions.length"> -->
                    <td v-if="index === 0" :rowspan="groupedQuestions.length">
                        <div class="d-flex justify-content-center">
                            <!-- Mở modal chỉnh sửa Question -->
                            <button type="button" class="btn btn-white border-0" data-bs-toggle="modal"
                                :data-bs-target="'#editQuestionModal-' + question.questionGroup.groupId">
                                <i class="fas fa-edit" style="color: rgb(192, 129, 13)"></i>
                            </button>
                            <!-- Modal chỉnh sửa Question -->
                            <div :id="'editQuestionModal-' + question.questionGroup.groupId" class="modal zoom" tabindex="-1"
                                :aria-labelledby="'editQuestionModalLabel-' + question.questionGroup.groupId" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5"
                                                :id="'editQuestionModalLabel-' + question.questionGroup.groupId"><i class="fas fa-edit"
                                                    style="color: rgb(192, 129, 13)"></i> Edit Question Section 6</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <QuestionEditSection6 :groupId="question.questionGroup.groupId" :sectionId="sectionId"
                                            :retrieveQuestions="retrieveQuestions" />
                                    </div>
                                </div>
                            </div>

                            <button type="button" @click="deleteQuestions(groupedQuestions.map(q => q.questionId))"
                                class="btn btn-white border-0">
                                <i class="fas fa-trash text-danger"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </template>
            <tr v-if="paginatedQuestions.length === 0">
                <td colspan="12">No data available</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
import { defineComponent, computed } from "vue";

import QuestionService from "@/services/question.service";
import QuestionEditSection6 from "@/views/questionbysection/QuestionEditSection6.vue";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
    components: {
        QuestionEditSection6
    },
    props: {
        paginatedQuestions: { type: Array, required: true },
        currentPage: { type: Number, required: true },
        ITEMS_PER_PAGE: { type: Number, required: true },
        // getImageUrl: { type: Function, required: true },
        sectionId: { type: String, required: true },
        retrieveQuestions: { type: Function, required: true },
    },

    setup(props) {
        const getLimitedPassage = (groupPassage) => {
            const MAX_PASSAGE_LENGTH = 200; 
            if (groupPassage.length > MAX_PASSAGE_LENGTH) {
                return groupPassage.slice(0, MAX_PASSAGE_LENGTH) + '...';
            } else {
                return groupPassage;
            }
        };

        // Group questions by groupId
        const groupedQuestionMap = computed(() => {
            const groups = {};
            for (const question of props.paginatedQuestions) {
                const groupId = question.questionGroup.groupId;
                if (!groups[groupId]) {
                    groups[groupId] = [question];
                } else {
                    groups[groupId].push(question);
                }
            }
            return groups;
        });

        const deleteQuestions = async (questionIds) => {
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
                    for (const questionId of questionIds) {
                        await QuestionService.delete(questionId);
                    }
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

        const toggleStatus = async (questionIds, newStatus) => {
            try {
                for (const questionId of questionIds) {
                    await QuestionService.updateStatus(questionId, newStatus);
                    }
                props.retrieveQuestions();
            } catch (error) {
                console.error(error);
            }
        };

        return {
            getLimitedPassage,
            groupedQuestionMap,
            deleteQuestions,
            toggleStatus
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
.modal.zoom .modal-dialog {
  transition: transform 0.2s ease-out;
  transform: scale(0.4);
}

.modal.zoom.show .modal-dialog {
  transform: scale(1);
}
.question-image {
    width: 50px;
}
.table {
    font-size: 13px;
}
audio {
    width: 100%;
    max-width: 300px;
}
</style>
  