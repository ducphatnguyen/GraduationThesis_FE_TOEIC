<template>
    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        <div class="mt-2 bg-white shadow-lg rounded-1">
            <nav>
                <ol class="cd-breadcrumb custom-separator">
                    <li class="current">
                        <i class="fa-solid fa-house"></i>
                        <button class="btn btn-link text-decoration-none fw-bolder">Dash Board</button>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mt-3">
            <div class="row">
                <!-- Card 1 -->
                <div class="col-md-3">
                    <div class="card radius-10 border-start border-0 border-3 border-info card-with-effect"
                        @click="toggleEffect">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div>
                                    <p class="mb-0 text-secondary">Tổng số học viên</p>
                                    <h4 class="my-1 text-info">{{ countLearners }}</h4>
                                    <p class="mb-0 font-13">+2 từ tuần trước</p>
                                </div>
                                <div class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                                    <i class="fa fa-users"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="col-md-3">
                    <div class="card radius-10 border-start border-0 border-3 border-success card-with-effect">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div>
                                    <p class="mb-0 text-secondary">Tổng số bài thi</p>
                                    <h4 class="my-1 text-success">{{ countExams }}</h4>
                                    <p class="mb-0 font-13">+2 từ tuần trước</p>
                                </div>
                                <div class="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto"><i
                                        class="fa-solid fa-folder-open"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="col-md-3">
                    <div class="card radius-10 border-start border-0 border-3 border-danger card-with-effect">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div>
                                    <p class="mb-0 text-secondary">Tổng số đánh giá</p>
                                    <h4 class="my-1 text-danger">{{ countFeedbacks }}</h4>
                                    <p class="mb-0 font-13">+5 từ tuần trước</p>
                                </div>
                                <div class="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto"><i
                                        class="fa-solid fa-comments"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="col-md-3">
                    <div class="card radius-10 border-start border-0 border-3 border-warning card-with-effect">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div>
                                    <p class="mb-0 text-secondary">Tổng số tài liệu</p>
                                    <h4 class="my-1 text-warning">{{ countFreeMaterials }}</h4>
                                    <p class="mb-0 font-13">+2 từ tuần trước</p>
                                </div>
                                <div class="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto"><i
                                        class="fa-solid fa-file"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Column 1 - Bar Chart -->
                <div class="col-md-6">
                    <div class="card mb-4 custom-card border border-0">
                        <div class="card-body custom-card-body-special">
                            <div id="columnChartContainer"></div>
                        </div>
                    </div>
                </div>
                <!-- Column 2 - Pie Chart -->
                <div class="col-md-6">
                    <div class="card mb-4 custom-card border border-0">
                        <div class="card-body custom-card-body-special">
                            <div id="pieChartContainer"></div>
                        </div>
                    </div>
                </div>
                <!-- Column 3 - Line Chart -->
                <div class="col-md-12">
                    <div class="card mb-4 custom-card border border-0">
                        <div class="card-body custom-card-body-special">
                            <div id="lineChartContainer"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';

import UserService from "@/services/user.service";
import ExamService from "@/services/exam.service";
import FeedbackService from "@/services/feedback.service";
import FreeMaterialService from "@/services/free_material.service";
import UserExamService from "@/services/user_exam.service";

import Highcharts from 'highcharts';
import AccessibilityModule from 'highcharts/modules/accessibility';

export default defineComponent({
    setup() {

        // 1
        const countLearners = ref([]);
        const countAllLearners = async () => {
            try {
                countLearners.value = await UserService.countLearners();
                console.log(countLearners.value);
            } catch (error) {
                console.log(error);
            }
        };

        // 2
        const countExams = ref([]);
        const countTotalExams = async () => {
            try {
                countExams.value = await ExamService.countTotalExams();
                console.log(countExams.value);
            } catch (error) {
                console.log(error);
            }
        };

        // 3
        const countFeedbacks = ref([]);
        const countTotalFeedbacks = async () => {
            try {
                countFeedbacks.value = await FeedbackService.countTotalFeedbacks();
                console.log(countFeedbacks.value);
            } catch (error) {
                console.log(error);
            }
        };

        // 4
        const countFreeMaterials = ref([]);
        const countTotalFreeMaterials = async () => {
            try {
                countFreeMaterials.value = await FreeMaterialService.countTotalFreeMaterials();
                console.log(countFreeMaterials.value);
            } catch (error) {
                console.log(error);
            }
        };

        const statisticExamByExamName = ref([]);
        const columnChartData = ref([]); // Add a ref for the chart data
        const getTotalExamCountsByExamNameAndType = async () => {
            try {
                statisticExamByExamName.value = await UserExamService.getTotalExamCountsByExamNameAndType();
                console.log(statisticExamByExamName.value);
                // Kiểm tra và cập nhật dữ liệu cho biểu đồ
                columnChartData.value = Object.keys(statisticExamByExamName.value).map((examName) => {
                    const statistic = statisticExamByExamName.value[examName];
                    console.log(examName)
                    console.log(statistic)
                    return {
                        name: examName || 'N/A',
                        y: statistic || 0,
                    };
                });
                const columnChartContainer = document.querySelector("#columnChartContainer");
                AccessibilityModule(Highcharts);
                Highcharts.chart(columnChartContainer, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Thống kê tổng số lượt tham gia từng bài thi FULL TEST'
                    },
                    xAxis: {
                        categories: columnChartData.value.map((item) => item.name)
                    },
                    yAxis: {
                        title: {
                            text: 'Participants'
                        }
                    },
                    series: [{
                        name: 'Participants',
                        data: columnChartData.value.map((item) => item.y),
                        color: '#17a2b8'
                    }],
                    accessibility: {
                        // Configure accessibility options for the chart
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };

        const statisticExamByDate = ref([]);
        const lineChartData = ref([]); // Add a ref for the chart data
        const getDailyExamCounts = async () => {
            try {
                statisticExamByDate.value = await UserExamService.getDailyExamCounts();
                console.log(statisticExamByDate.value);
                // Kiểm tra và cập nhật dữ liệu cho biểu đồ
                lineChartData.value = Object.keys(statisticExamByDate.value).map((date) => {
                    const statistic = statisticExamByDate.value[date];
                    console.log(date)
                    console.log(statistic)

                    return {
                        date: date || 'N/A',
                        y: statistic || 0,
                    };
                });
                const lineChartContainer = document.querySelector("#lineChartContainer");
                AccessibilityModule(Highcharts);
                Highcharts.chart(lineChartContainer, {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Thống kê tổng số lượt thi hằng ngày'
                    },
                    xAxis: {
                        categories: lineChartData.value.map((item) => item.date)
                    },
                    yAxis: {
                        title: {
                            text: 'Participants'
                        }
                    },
                    series: [{
                        name: 'Participants',
                        data: lineChartData.value.map((item) => item.y),
                        color: '#17a2b8'
                    }],
                    accessibility: {

                    }
                });
            } catch (error) {
                console.log(error);
            }
        };


        const statisticRatePercentages = ref([]);
        const pieChartData = ref([]);
        const getFeedbackPercentagesByRating = async () => {
            try {
                statisticRatePercentages.value = await FeedbackService.getFeedbackPercentagesByRating();
                console.log(statisticRatePercentages.value);

                // Kiểm tra và cập nhật dữ liệu cho biểu đồ
                pieChartData.value = Object.keys(statisticRatePercentages.value).map((rate) => {
                    const percentage = statisticRatePercentages.value[rate];

                    return {
                        name: `Đánh giá ${rate} ⭐`,
                        y: percentage || 0,
                    };
                });

                const pieChartContainer = document.querySelector("#pieChartContainer");
                AccessibilityModule(Highcharts);
                Highcharts.chart(pieChartContainer, {
                    chart: {
                        type: 'pie',
                    },
                    title: {
                        text: 'Thống kê tỉ lệ đánh giá hệ thống',
                    },
                    series: [{
                        name: 'Tỉ lệ %',
                        data: pieChartData.value,
                        color: '#17a2b8',
                    }],
                    accessibility: {},
                });
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            countAllLearners();
            countTotalExams();
            countTotalFeedbacks();
            countTotalFreeMaterials();

            getTotalExamCountsByExamNameAndType();
            getDailyExamCounts();
            getFeedbackPercentagesByRating();

        });

        return {
            countLearners,
            countExams,
            countFeedbacks,
            countFreeMaterials

        };
    },
});
</script>



<style scoped>
@import "@/assets/breadcrumb.css";
.card-with-effect {
    transition: transform 0.3s;
}

.card-with-effect:hover {
    transform: scale(1.04);
}

body {
    margin-top: 20px;
    background-color: #f7f7ff;
}

.radius-10 {
    border-radius: 10px !important;
}

.border-info {
    border-left: 5px solid #0dcaf0 !important;
}

.border-danger {
    border-left: 5px solid #fd3550 !important;
}

.border-success {
    border-left: 5px solid #15ca20 !important;
}

.border-warning {
    border-left: 5px solid #ffc107 !important;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0px solid rgba(0, 0, 0, 0);
    border-radius: .25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}



.widgets-icons-2 {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ededed;
    font-size: 27px;
    border-radius: 10px;
}

.rounded-circle {
    border-radius: 50% !important;
}

.text-white {
    color: #fff !important;
}

.ms-auto {
    margin-left: auto !important;
}

.bg-gradient-scooter {
    background: #17ead9;
    background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
    background: linear-gradient(45deg, #17ead9, #6078ea) !important;
}

.bg-gradient-bloody {
    background: #f54ea2;
    background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
    background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
}

.bg-gradient-ohhappiness {
    background: #00b09b;
    background: -webkit-linear-gradient(45deg, #00b09b, #96c93d) !important;
    background: linear-gradient(45deg, #00b09b, #96c93d) !important;
}

.bg-gradient-blooker {
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}
</style>
  