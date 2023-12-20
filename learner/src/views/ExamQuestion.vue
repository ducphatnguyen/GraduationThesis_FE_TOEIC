<template>
    <div class="bg-test">
        <div class="container-fluid">
            <div class="row mt-3" v-if="examQuestions.length > 0">
                <ExamQuestionList :examQuestions="examQuestions" :submitAnswers="submitAnswers" :parts="parts"
                    :groupedQuestionsByPart="groupedQuestionsByPart" :hasSubmitted="hasSubmitted" :formatTime="formatTime"
                    :countdown="countdown" :userExamId="userExamId" :goalScore="goalScore">
                </ExamQuestionList>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

import ExamQuestionService from "@/services/exam_question.service";
import UserExamQuestionService from "@/services/user_exam_question.service";
import UserExamService from "@/services/user_exam.service";
import UserGoalService from "@/services/user_goal.service";
import ExamService from "@/services/exam.service";
import UserService from "@/services/user.service";
import ScoreTableService from "@/services/score_table.service";
import ExamQuestionList from "@/components/ExamQuestionList.vue";

import VueJwtDecode from "vue-jwt-decode";
import { useLoading } from 'vue-loading-overlay'
import Swal from 'sweetalert2';

export default defineComponent({
    components: {
        ExamQuestionList,
    },
    props: {
        examId: { type: String, required: true },
    },

    setup(props) {
        
        const userId = ref(null);
        const getUserId = async () => {
            try {
                const learnerToken = localStorage.getItem("learnerToken");
                const decoded = VueJwtDecode.decode(learnerToken);
                userId.value = decoded.id;
            } catch (error) {
                console.log(error);
            }
        };

        // console.log(props.examId)
        const examQuestions = ref([]);
        const parts = [];
        const groupedQuestionsByPart = {};
        const retrieveExamQuestions = async () => {
            try {
                const loader = $loading.show({
                    color: 'red',
                    loader: 'spinner',
                    width: 64,
                    height: 64,
                    backgroundColor: '#ffffff',
                    opacity: 1,
                    zIndex: 999,
                });

                examQuestions.value = await ExamQuestionService.getQuestionsByExamId(props.examId);
                for (const examQuestion of examQuestions.value) {

                    const part = examQuestion.questionPart;
                    if (!groupedQuestionsByPart[part]) {
                        groupedQuestionsByPart[part] = [];
                        // Gom nhóm
                        parts.push(part);
                        console.log(part)
                    }
                    groupedQuestionsByPart[part].push(examQuestion);
                    console.log(groupedQuestionsByPart)

                }
                loader.hide()
            } catch (error) {
                console.log(error);
            }
        };

        const $loading = useLoading({
            // options
        });

        const submitAnswers = async () => {
            const answeredQuestions = examQuestions.value.filter(examQuestion => examQuestion.selectedOption);
            if (answeredQuestions.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Bạn chưa trả lời bất kỳ câu nào. Vui lòng chọn đáp án!',
                });
            } else if (answeredQuestions.length < examQuestions.value.length) {
                const result = await Swal.fire({
                    icon: 'question',
                    title: 'Bạn chưa hoàn thành tất cả câu hỏi',
                    text: 'Bạn thực sự muốn nộp?',
                    showCancelButton: true,
                    confirmButtonText: 'Nộp',
                    cancelButtonText: 'Quay lại',
                });
                if (result.isConfirmed) {
                    submitAllUserExamQuestions();
                }
            } else {
                const result = await Swal.fire({
                    icon: 'question',
                    title: 'Bạn có chắc chắn muốn nộp?',
                    showCancelButton: true,
                    confirmButtonText: 'Nộp',
                    cancelButtonText: 'Quay lại',
                });
                if (result.isConfirmed) {
                    submitAllUserExamQuestions();
                }
            }
        };

        const tableListeningScores = ref()
        const getTableListeningScores = async () => {
            try {
                tableListeningScores.value = await ScoreTableService.getListeningScores();
                console.log(tableListeningScores.value);
            } catch (error) {
                console.log(error);
            }
        };
        const tableReadingScores = ref()
        const getTableReadingScores = async () => {
            try {
                tableReadingScores.value = await ScoreTableService.getReadingScores();
                console.log(tableReadingScores.value);
            } catch (error) {
                console.log(error);
            }
        };
        const calculateToeicScore = (numCorrectAnswers, tableScores) => {
            // Tìm kiếm trong mảng số câu đúng => điểm số
            const score = tableScores.find(item => item.numCorrectAnswers === numCorrectAnswers);
            return score ? score.score : null;
        };

        const goalScore = ref();
        const hasSubmitted = ref(false);
        const userExamId = ref(null);
        const submitAllUserExamQuestions = async () => {
            const loader = $loading.show({
                color: 'blue',
                loader: 'dots',
                width: 64,
                height: 64,
                backgroundColor: '#ffffff',
                opacity: 1,
                zIndex: 999,
            });

            const response = await UserGoalService.getUserGoalByUserId(userId.value);
            console.log(response.goalScore)
            goalScore.value = response.goalScore

            clearInterval(timer.value);
            const completionTime = exam.value.examDuration - localStorage.getItem("countdown");

            examQuestions.value.forEach((examQuestion) => {
                if (examQuestion.selectedOption) {
                    examQuestion.answered = true;
                }
                // Đánh dấu câu hỏi đã được chấm điểm
                examQuestion.isGraded = true;
            });

            // Tính điểm cho phần nghe (questionPart từ 1 đến 4)
            const numListeningCorrectAnswers = examQuestions.value
                .filter((examQuestion) => examQuestion.questionPart >= 1 && examQuestion.questionPart <= 4)
                .filter((examQuestion) => examQuestion.answered && examQuestion.selectedOption === examQuestion.correctOption)
                .length;
            const listeningScore = calculateToeicScore(numListeningCorrectAnswers, tableListeningScores.value);
            console.log(listeningScore);

            // Tính điểm cho phần đọc (questionPart từ 5 đến 7)
            const numReadingCorrectAnswers = examQuestions.value
                .filter((examQuestion) => examQuestion.questionPart >= 5 && examQuestion.questionPart <= 7)
                .filter((examQuestion) => examQuestion.answered && examQuestion.selectedOption === examQuestion.correctOption)
                .length;
            const readingScore = calculateToeicScore(numReadingCorrectAnswers, tableReadingScores.value);
            console.log(readingScore);

            // Tổng điểm
            const totalScore = listeningScore + readingScore;
            console.log(totalScore)

            // Số câu đúng
            const numCorrectAnswers = examQuestions.value.filter(
                (examQuestion) => examQuestion.answered && examQuestion.selectedOption === examQuestion.correctOption
            ).length;
            console.log(numCorrectAnswers)

            // Số câu sai
            const numWrongAnswers = examQuestions.value.filter(
                (examQuestion) => examQuestion.answered && examQuestion.selectedOption !== examQuestion.correctOption
            ).length;
            console.log(numWrongAnswers)

            // Số câu bỏ qua
            const numSkippedQuestions = examQuestions.value.length - numCorrectAnswers - numWrongAnswers;
            // alert(`Số câu đúng: ${numCorrectAnswers}, Số câu sai: ${numWrongAnswers}, Số câu bỏ qua: ${numSkippedQuestions} `);

            // Dữ liệu user_exam
            const userExamData = {
                userId: userId.value,
                examId: props.examId,
                completionTime: completionTime,
                numListeningCorrectAnswers: numListeningCorrectAnswers,
                listeningScore: listeningScore,
                readingScore: readingScore,
                numReadingCorrectAnswers: numReadingCorrectAnswers,
                totalScore: totalScore,
                numCorrectAnswers: numCorrectAnswers,
                numWrongAnswers: numWrongAnswers,
                numSkippedQuestions: numSkippedQuestions,
                goalScore: goalScore.value
            };

            try {
                const userExamResponse = await UserExamService.createUserExam(userExamData);
                userExamId.value = userExamResponse.userExamId;
                // Kết quả 200 câu hỏiiii
                const examResults = examQuestions.value.map((examQuestion) => {
                    let isCorrect;
                    if (examQuestion.selectedOption !== undefined && (examQuestion.selectedOption === examQuestion.correctOption)) {
                        isCorrect = 1;
                    } else if (examQuestion.selectedOption !== undefined && (examQuestion.selectedOption !== examQuestion.correctOption)) {
                        isCorrect = 0;
                    }
                    return {
                        userExamId: userExamId.value,
                        examQuestionId: examQuestion.examQuestionId,
                        selectedOption: examQuestion.selectedOption,
                        isCorrect: isCorrect,
                    };
                });

                // Gửi mảng kết quả câu hỏi cho server
                const response = await UserExamQuestionService.submitAllUserExamQuestions(examResults);
                console.log("Response:", response);
                hasSubmitted.value = true;
                loader.hide()
            } catch (error) {
                console.error(error);
            }
        };

        const countdown = ref(0);
        const exam = ref();
        const timer = ref(null);
        const startCountdown = async () => {
            exam.value = await ExamService.getExamById(props.examId);
            countdown.value = exam.value.examDuration;
            const savedCountdown = localStorage.getItem("countdown");
            if (savedCountdown) {
                countdown.value = parseInt(savedCountdown);
            }
            timer.value = setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--;
                    localStorage.setItem("countdown", countdown.value.toString());
                } else {
                    clearInterval(timer.value);
                    localStorage.removeItem("countdown");
                    alert("Hết giờ!");
                    submitAllUserExamQuestions();
                }
            }, 1000);
        };

        const formatTime = (time) => {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = time % 60;
            if (hours > 0) {
                return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
            } else if (minutes > 0) {
                return `${padZero(minutes)}:${padZero(seconds)}`;
            } else {
                return `${padZero(seconds)}`;
            }
        };
        const padZero = (number) => {
            return number.toString().padStart(2, "0");
        };

        // Ngăn người dùng tải lại trang hoặc tắt trang
        const beforeUnloadHandler = (e) => {
            e.preventDefault();
            e.returnValue = "Bạn có chắc chắn muốn rời khỏi trang này?";
        };
        onBeforeUnmount(() => {
            // Loại bỏ sự kiện beforeunload khi component bị hủy
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            clearInterval(timer.value);
            localStorage.removeItem("countdown"); 
        });
        onMounted(() => {
            getTableListeningScores();
            getTableReadingScores();
            retrieveExamQuestions();
            getUserId();
            localStorage.removeItem("countdown"); // Xóa countdown khi trang được tải
            startCountdown();
            window.addEventListener("beforeunload", beforeUnloadHandler);
        });

        return {
            examQuestions,
            retrieveExamQuestions,
            parts,
            groupedQuestionsByPart,

            hasSubmitted,
            submitAnswers,
            userExamId,
            submitAllUserExamQuestions,
            
            formatTime,
            countdown,
            goalScore
        };

    },
});
</script>
  
  