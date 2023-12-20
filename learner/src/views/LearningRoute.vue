<template>
    <!-- Modal image -->
    <div class="container">

        <div class="row mt-5 d-flex justify-content-center">
            <div class="col-lg-3 col-md col-sm ">
                <div class="card mb-2 border-0 shadow rounded-5">
                    <router-link class="card-body text-decoration-none custom-card d-flex justify-content-center rounded-5"
                        style="background-color: green; color:white" :to="{}">
                        📝 Full Test
                    </router-link>
                </div>
            </div>
            <div class="col-lg-3 col-md col-sm ">
                <div class="card mb-2 border-0 shadow rounded-5">
                    <router-link class="card-body text-decoration-none custom-card d-flex justify-content-center rounded-5"
                        :to="{}">
                        📝 Mini Test
                    </router-link>
                </div>
            </div>
        </div>

        <div class="col-lg-12 col-md-9 col-sm-9 text-decoration-none">
            <div class="card mb-5 border-0 shadow-lg">
                <div class="card-body lesson-content"
                    style="background-image: url('https://anhdepfree.com/wp-content/uploads/2019/05/hinh-nen-background-dep-14.jpg'); background-repeat: no-repeat; background-size: cover;">
                    <div class="row">

                        <div class="col-10">
                            <div class="card border-0 shadow-lg mb-5">
                                <div class="card-body lesson-content">
                                    <h4 class="card-title text-center lesson-title">
                                        TỔNG QUAN CÁC BÀI THI
                                    </h4>
                                    <div class="row justify-content-md-center mt-4">
                                        <div class="col-sm-1 border rounded-circle text-center text-success p-1"
                                            style="height:50px">
                                            <div style="margin-top: 11px" class="fw-bolder">{{ percent }}%</div>
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="progress mt-3 " role="progressbar" aria-label="Info example"
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                <div class="progress-bar bg-info " :style="{ width: percent + '%' }"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-2">
                            <div class="card border-0 shadow mb-5 p-2 h-75">
                                <div class="card-body lesson-content d-flex justify-content-center">

                                    <!-- Chưa xét điểm -->
                                    <div v-if="userGoalSearchResult.hasUserGoal === false">
                                        <button type="button" class="btn btn-link text-decoration-none"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <span style="font-size: 35px">🎯</span>
                                            <br>
                                            Set Goal
                                        </button>
                                        <div class="modal zoom" id="exampleModal" tabindex="-1"
                                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header text-center">
                                                        <i class="fa-solid fa-bullseye me-2 text-success"></i>SET GOAL
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <Form @submit="createUserGoal" enctype="multipart/form-data">
                                                        <div class="modal-body text-start">
                                                            <div class="form-group mb-3">
                                                                <label for="goalScore" class="form-label">Goal Score<span
                                                                        class="required-field">*</span></label>
                                                                <input name="goalScore" id="goalScore" type="range" min="1"
                                                                    max="990" step="1"
                                                                    class="form-range border-secondary custom-font"
                                                                    v-model="userGoalLocal.goalScore" />
                                                                <div class="text-center">
                                                                    {{ userGoalLocal.goalScore }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                data-bs-dismiss="modal">Đóng</button>
                                                            <button class="btn btn-primary">Lưu</button>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Đã xét điểm -->
                                    <div v-else>
                                        <button type="button" class="btn btn-link text-decoration-none"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                            <span style="font-size: 30px">🎯</span>
                                            <br>
                                            My goal
                                        </button>

                                        <div class="modal zoom" id="exampleModal1" tabindex="-1"
                                            aria-labelledby="exampleModalLabel1" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">

                                                    <div class="modal-header text-center">
                                                        <i class="fa-solid fa-bullseye me-2 text-success"></i>SET GOAL
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <Form @submit="updateUserGoalByUserId" enctype="multipart/form-data">
                                                        <div class="modal-body text-start">
                                                            <div class="form-group mb-3">
                                                                <label for="goalScore" class="form-label">Goal Score<span
                                                                        class="required-field">*</span></label>
                                                                <input name="goalScore" id="goalScore" type="range" min="1"
                                                                    max="990" step="1"
                                                                    class="form-range border-secondary custom-font"
                                                                    v-model="userGoalLocal.goalScore" />
                                                                <div class="text-center">
                                                                    {{ userGoalLocal.goalScore }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                data-bs-dismiss="modal">Đóng</button>
                                                            <button class="btn btn-primary">Lưu</button>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row d-flex justify-content-start">

                        <h1 class="text-center fs-3">
                            <span style='font-size:25px;' class="ms-2">&#9200;THỜI GIAN LUYỆN THI: {{
                                formatTime(totalCompletionTime)
                            }}</span>
                        </h1>

                        <div class="col-4" v-for="(exam) in exams" :key="exam.examId">

                            <!-- Button Modal -->
                            <button type="button" class="btn btn-link text-decoration-none" data-bs-toggle="modal"
                                :data-bs-target="'#exampleModal' + exam.examId" @click="selectExam(exam)"
                                style="width:100%">

                                <div class="card text-start border-0 shadow-lg">
                                    <div class="card-body row" >
                                        <div class="col-9">
                                            <i class="fa-solid fa-folder-open me-3" style="color: brown"></i>
                                            <span class="text-dark" style="font-weight: 600;">{{exam.examName }}</span>
                                        </div>
                                        <div class="col d-flex justify-content-center bg-light">
                                            <i v-if="exam.hasUserExams"
                                                class="fa-solid fa-circle-check text-success ms-4 mt-1"></i>
                                        </div>
                                    </div>
                                </div>

                            </button>
                            <div class="modal zoom" :id="'exampleModal' + exam.examId" tabindex="-1"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content" style=" max-height: 750px;overflow: auto;">
                                        <div class="modal-header">

                                            <button type="button" class="button text-uppercase">
                                                {{ exam.examName }}<span
                                                    class="badge text-bg-danger border rounded-5 ms-3">Attempt: {{
                                                        userExams.length }}</span>
                                            </button>

                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body d-flex justify-content-center">
                                            <!-- Hiển thị danh sách user exams của selectedExam -->
                                            <table class="table table-striped text-center rounded">
                                                <thead>
                                                    <tr class="align-middle">
                                                        <th class="align-middle">Ngày nộp</th>
                                                        <th class="align-middle">Điểm nghe</th>
                                                        <th class="align-middle">Điểm đọc</th>
                                                        <th class="align-middle">Tổng điểm</th>
                                                        <th class="align-middle">Mục tiêu</th>
                                                        <th class="align-middle">Thời gian làm bài</th>
                                                        <th class="align-middle">Chi tiết</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="text-secondary">
                                                    <tr v-for="userExam in userExams" :key="userExam.userExamId">
                                                        <td class="align-middle">{{ formatDate(userExam.createdAt) }}
                                                        </td>

                                                        <td class="align-middle">{{ userExam.listeningScore }}</td>
                                                        <td class="align-middle">{{ userExam.readingScore }}</td>
                                                        <td class="align-middle">{{ userExam.totalScore }}</td>
                                                        <td class="align-middle">{{ userExam.goalScore }}</td>
                                                        <td class="align-middle">{{ formatTime(userExam.completionTime)
                                                        }}</td>
                                                        <td class="align-middle">
                                                            <router-link
                                                                :to="{ name: 'exam-result', params: { userExamId: userExam.userExamId } }">
                                                                <button class="button shadow p-2 ms-2"
                                                                    data-bs-dismiss="modal"><i
                                                                        class="fa-solid fa-circle-info"
                                                                        data-bs-dismiss="modal"></i></button>
                                                            </router-link>
                                                        </td>
                                                    </tr>
                                                    <tr v-if="userExams.length === 0">
                                                        <td colspan="7">Thiệt là trống trãi quá đi 😥</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <h1 class="ms-2"><span style='font-size:20px;'>⚡LƯỢT THI: {{ totalCompletionUserExam }}</span></h1>

                <div class="d-flex justify-content-center">
                    <select v-model="selectedPart" @change="getAccuracyByQuestionTypeForUser"
                        class="form-select border-secondary w-50" aria-label="Default select example">
                        <option selected disabled>Chọn phần thống kê</option>
                        <option value="1">Phần 1</option>
                        <option value="2">Phần 2</option>
                        <option value="3">Phần 3</option>
                        <option value="4">Phần 4</option>
                        <option value="5">Phần 5</option>
                        <option value="6">Phần 6</option>
                        <option value="7">Phần 7</option>
                    </select>
                    <router-link :to="{ name: 'improve.show' }">
                        <button class="glowing-button ms-2">CẢI THIỆN NGAY</button>
                    </router-link>
                </div>

                <div class="col">
                    <div class="card border-0 shadow">
                        <div class="card-body lesson-content">
                            <div id="columnChartContainer"></div>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card border-0 shadow ">
                        <div class="card-body lesson-content">
                            <div id="columnChartContainer2"></div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="row">

                <div class="col">
                    <div class="card border-0 shadow mb-5">
                        <div class="card-body lesson-content">
                            <div id="lineChartContainer"></div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted, reactive } from "vue";

import UserExamQuestionService from "@/services/user_exam_question.service";
import UserExamService from "@/services/user_exam.service";
import ExamService from "@/services/exam.service";
import UserGoalService from "@/services/user_goal.service";

import VueJwtDecode from "vue-jwt-decode";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import AccessibilityModule from 'highcharts/modules/accessibility';
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {

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

        const userGoalFormSchema = yup.object().shape({
            goalScore: yup
                .string()
                .required("goalScore phải có giá trị.")
        });
        const userGoalLocal = reactive({
            goalScore: 1
        });

        const totalCompletionTime = ref(0);
        const totalCompletionUserExam = ref(0);
        const getTotalCompletionTimeByUserId = async () => {
            try {
                totalCompletionTime.value = await UserExamService.getTotalCompletionTimeByUserId(userId.value);
                console.log(totalCompletionTime.value)
                totalCompletionUserExam.value = await UserExamService.getUserExamsLengthByUserId(userId.value);
                console.log(totalCompletionUserExam.value)
            } catch (error) {
                console.log(error);
            }
        };

        const percent = ref(0);
        const exams = ref([]);
        const retrieveExams = async () => {
            try {
                exams.value = await ExamService.getEnableFullTest();
                console.log(exams.value);

                let trueCount = 0;
                // Duyệt qua danh sách exams và kiểm tra từng examId
                for (const exam of exams.value) {
                    const result = await UserExamService.hasUserExamsWithExamId(exam.examId, userId.value);
                    // Cập nhật thuộc tính hasUserExams cho từng phần tử trong mảng exams
                    exam.hasUserExams = result.hasUserExams;
                    if (result.hasUserExams) {
                        trueCount++; // Tăng biến đếm = true
                    }
                }
                percent.value = (trueCount * 100 / exams.value.length).toFixed(2);
                console.log(`Số lượng true: ${trueCount}`);
                console.log(percent.value);
            } catch (error) {
                console.log(error);
            }
        };

        // Xem lại
        const selectedExamId = ref(null);
        const selectExam = (exam) => {
            selectedExamId.value = exam.examId;
            console.log(selectedExamId.value)
            retrieveUserExams();
        };
        const userExams = ref([]);
        const userExamsLength = ref(0);
        const retrieveUserExams = async () => {
            try {
                userExams.value = await UserExamService.getUserExamsByExamIdAndUserId(selectedExamId.value, userId.value);
                console.log(userExams.value);
                userExamsLength.value = userExams.value.length;
            } catch (error) {
                console.log(error);
            }
        };

        // Thống kê điểm cao nhất từng bài thi FULL TEST
        const maxScoreExams = ref([]);
        const columnChartData = ref([]);
        const getAllMaxScoresByExamId = async () => {
            try {
                maxScoreExams.value = await UserExamService.getAllMaxScoresByExamId(userId.value);
                console.log(maxScoreExams.value);

                // Mảng maxScoreExams
                columnChartData.value = Object.values(maxScoreExams.value).map((exam) => {
                    return {
                        name: exam.exam.examName || 'N/A',
                        y: exam.totalScore || 0,
                    };
                });

                const columnChartContainer = document.querySelector("#columnChartContainer");
                AccessibilityModule(Highcharts);
                Highcharts.chart(columnChartContainer, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Thống kê điểm cao nhất từng bài thi FULL TEST'
                    },
                    xAxis: {
                        categories: columnChartData.value.map((item) => item.name)
                    },
                    yAxis: {
                        title: {
                            text: 'Total Score'
                        }
                    },
                    series: [{
                        name: 'Total Score',
                        data: columnChartData.value.map((item) => item.y),
                        color: '#17a2b8'
                    }],
                    accessibility: {}
                });
            } catch (error) {
                console.log(error);
            }
        };

        // Thống kê sự tiến bộ làm bài theo ngày
        const maxScoreByDate = ref([]);
        const lineChartData = ref([]);
        const getMaxScoresByDate = async () => {
            try {
                maxScoreByDate.value = await UserExamService.getMaxScoresByDate(userId.value);
                console.log(maxScoreByDate.value);
                lineChartData.value = Object.values(maxScoreByDate.value).map((date) => {
                    const formattedDate = date.createdAt ? new Date(date.createdAt).toLocaleDateString() : 'N/A';
                    return {
                        date: formattedDate,
                        totalScore: date.totalScore || 0,
                        goalScore: date.goalScore, // Điểm mục tiêu
                    };
                });
                // Tạo biểu đồ đường
                const lineChartContainer = document.querySelector("#lineChartContainer");
                AccessibilityModule(Highcharts);
                Highcharts.chart(lineChartContainer, {
                    chart: {
                        type: 'line',
                    },
                    title: {
                        text: 'Thống kê sự tiến bộ làm bài theo ngày',
                    },
                    xAxis: {
                        categories: lineChartData.value.map((item) => item.date),
                    },
                    yAxis: {
                        title: {
                            text: 'Scores',
                        },
                    },
                    series: [
                        {
                            name: 'Total Score',
                            data: lineChartData.value.map((item) => item.totalScore),
                            color: '#ff6347',
                        },
                        {
                            name: 'Goal Score',
                            data: lineChartData.value.map((item) => item.goalScore),
                            color: 'blue', // Màu của đường điểm mục tiêu
                        },
                    ],
                });
            } catch (error) {
                console.log(error);
            }
        };

        const selectedPart = ref(1);
        // Thống kê sự tiến bộ làm bài theo ngày
        const accuracyByPart = ref([]);
        const columnChartData2 = ref([]);
        const getAccuracyByQuestionTypeForUser = async () => {
            try {
                console.log(selectedPart.value)
                accuracyByPart.value = await UserExamQuestionService.getAccuracyByQuestionTypeForUser(selectedPart.value, userId.value);
                console.log(accuracyByPart.value);

                // Kiểm tra và cập nhật dữ liệu cho biểu đồ
                columnChartData2.value = Object.keys(accuracyByPart.value).map((questionType) => {
                    const accuracy = accuracyByPart.value[questionType];
                    console.log(questionType)
                    console.log(accuracy)
                    return {
                        name: questionType || 'N/A',
                        y: accuracy || 0,
                    };
                });

                const columnChartContainer2 = document.querySelector("#columnChartContainer2");
                AccessibilityModule(Highcharts);
                Highcharts.chart('columnChartContainer2', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Thống kê tỷ lệ trung bình độ chính xác từng phần (Đúng / Tổng Đ+S)'
                    },
                    xAxis: {
                        categories: columnChartData2.value.map((item) => item.name)
                    },
                    yAxis: {
                        min: 0,
                        max: 100,
                        title: {
                            text: 'Tỷ lệ (%)'
                        }
                    },
                    series: [{
                        name: 'Độ Chính Xác (%)',
                        data: columnChartData2.value.map((item) => ({
                            y: item.y,
                            color: getColorBasedOnPercentage(item.y)
                        }))
                    }],
                    plotOptions: {
                        column: {
                            colorByPoint: false, // Cho phép sử dụng màu sắc được xác định bởi người dùng
                            colors: [
                                'rgba(255, 0, 0, 0.6)',    // 0-25%
                                'rgba(255, 165, 0, 0.6)',  // 25-50%
                                'rgba(255, 255, 0, 0.6)',  // 50-75%
                                'rgba(0, 255, 0, 0.6)'     // 75-100%
                            ]
                        }
                    },
                    accessibility: {}
                });
                function getColorBasedOnPercentage(percentage) {
                    if (percentage <= 25) {
                        return 'rgba(255, 0, 0, 0.6)';
                    } else if (percentage <= 50) {
                        return 'rgba(255, 165, 0, 0.6)';
                    } else if (percentage <= 75) {
                        return 'rgba(255, 255, 0, 0.6)';
                    } else {
                        return 'rgba(0, 255, 0, 0.6)';
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };


        const createUserGoal = async () => {
            try {
                userGoalLocal.userId = userId.value;
                await UserGoalService.createUserGoal(userGoalLocal);
                toast.success('Thêm mục tiêu thành công ', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm mục tiêu', {
                    autoClose: 1000,
                });
            }
        };
        const updateUserGoalByUserId = async () => {
            try {
                await UserGoalService.updateUserGoalByUserId(userId.value, userGoalLocal);
                toast.success('Chỉnh sửa mục tiêu thành công ', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi chỉnh sửa mục tiêu', {
                    autoClose: 1000,
                });
            }
        };

        const userGoal = ref([]);
        const userGoalSearchResult = ref(false);
        const getUserGoalByUserId = async () => {
            try {
                console.log(userId.value)
                // Kiểm tra người dùng đã tham gia bài thi này hay chưa
                userGoalSearchResult.value = await UserGoalService.hasUserGoalWithUserId(userId.value);
                console.log(userGoalSearchResult.value.hasUserGoal)
                // Lấy điểm mục tiêu để hiển thị
                if (userGoalSearchResult.value.hasUserGoal === true) {
                    userGoal.value = await UserGoalService.getUserGoalByUserId(userId.value);
                    // userGoalLocal.value = userGoal.value.goalScore
                    userGoalLocal.goalScore = userGoal.value.goalScore;
                    console.log(userGoalLocal.goalScore)
                    console.log(userGoal.value)
                }
                console.log(userGoal.value)
            } catch (error) {
                console.log(error);
            }
        };

        const formatDate = (dateTimeString) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const date = new Date(dateTimeString);
            return date.toLocaleDateString('en-GB', options);
        };
        const formatTime = (time) => {
            let formattedTime = "";
            if (time >= 3600) {
                const hours = Math.floor(time / 3600);
                formattedTime += `${padZero(hours)}:${padZero(Math.floor((time % 3600) / 60))}:${padZero(time % 60)}`;
            } else if (time >= 60) {
                formattedTime += `${padZero(Math.floor(time / 60))}:${padZero(time % 60)}`;
            } else {
                formattedTime += `00:00:${padZero(time)}`;
            }
            return formattedTime;
        };
        const padZero = (number) => {
            return number.toString().padStart(2, "0");
        };

        onMounted(async () => {
            await getUserId();
            getUserGoalByUserId();
            retrieveExams();
            getAllMaxScoresByExamId();
            getMaxScoresByDate();
            getTotalCompletionTimeByUserId();
            getAccuracyByQuestionTypeForUser();

        });


        return {
            formatDate,
            formatTime,

            userId,
            userGoalLocal,
            userGoalFormSchema,
            createUserGoal,
            updateUserGoalByUserId,

            exams,
            userExams,
            selectExam,
            percent,
            maxScoreExams,
            userGoal,
            userGoalSearchResult,
            totalCompletionTime,
            totalCompletionUserExam,

            selectedPart,
            getAccuracyByQuestionTypeForUser
        }
    },
});
</script>
  
<style scoped>
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

label {
    font-weight: 600;
    font-size: 14px;
    color: rgb(44, 44, 44);
}

.required-field {
    color: red;
    font-size: 14px;
    margin-left: 4px;
}

.button {
    display: inline-block;
    padding: 10px;
    background-color: #052649;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 20px;
    transition: background-color 0.3s, color 0.3s;
}

.button:hover {
    background-color: #fff;
    color: #052649;
}

.table-striped tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table tbody tr:hover {
    background-color: #e0e0e0;
}

.modal.zoom .modal-dialog {
    transition: transform 0.2s ease-out;
    transform: scale(0.4);
}

.modal.zoom.show .modal-dialog {
    transform: scale(1);
}

h1,
h2,
h3,
h4 {
    font-weight: 700;
    color: #34447c;
}

.custom-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    transition: color 0.3s;
}

.custom-card:hover {
    color: #007aff;
    transform: none;
}

.card {
    position: relative;
    transition: transform 0.3s;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(11, 21, 114, 0.1);
}

.card.specific-card:hover .text-body-secondary {
    color: #666;
}
.card:hover {
    color: #007aff;
    transform: none;
}

.lesson-title {
    font-weight: bold;
    font-size: 24px;
    color: #34447c;
    margin-bottom: 10px;
}

/* .lesson-content {
    max-height: 1000px;
    overflow: auto;
} */

/* .lesson-content p {
    font-size: 14px;
    color: #333;
} */

.card.specific-card:hover {
    transform: none;
    box-shadow: 0 4px 8px rgba(72, 87, 219, 0.1);
    border-color: #041930;
}
</style>
  