<template>
    <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        <Slider></Slider>
        <div class="container">
            <div id="test">
                <h1 class="text-center mt-5"><span>Luyện thi thử TOEIC online 2023</span></h1>
                <p>
                    Chào mừng đến với
                    <span class="fst-italic fw-bolder" style="color: rgb(72, 20, 131)">TOEIC 2023</span>
                    , trang web TOEIC cung cấp cho người học các bài luyện tập
                    theo từng part, đề thi thử cũng như các bài tập về từ vựng và ngữ pháp.
                    Bắt đầu hành trình chinh phục chứng chỉ TOEIC với các bài luyện tập trên
                    trang web của chúng tôi ngay hôm nay!
                </p>
            </div>

            <!-- Sliver Nghe & Đọc -->
            <div class="button-container mt-5">
                <button :class="{ active: showListeningReading }" @click="showListeningReading = true">
                    Nghe & Đọc
                </button>
                <button :class="{ active: !showListeningReading }" @click="showListeningReading = false">
                    Nói & Viết
                </button>
            </div>
            <div v-show="showListeningReading" class="mb-5">
                <LR></LR>
            </div>
            <div v-show="!showListeningReading" class="mb-5">
                <SW></SW>
            </div>

            <!-- <h1 class="mt-4">Mô phỏng bài thi Toeic</h1> -->
            <!-- <div class="row mb-5">
                <div class="col-sm-6 mb-3 mb-sm-0">
                    <div class="card card-background-1">
                        <div class="card-body">
                            <h5 class="card-title row-title">MINI TEST</h5>
                            <p class="card-text row-text fw-semibold">
                                Làm bài mini test với số lượng câu hỏi và thời gian giảm phân nửa
                                so với bài thi thật
                            </p>
                            <div class="d-flex justify-content-end">
                                <a href="#" class="btn btn-primary row-text mt-5">LUYỆN TẬP</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card card-background-2">
                        <div class="card-body">
                            <h5 class="card-title row-title">FULL TEST</h5>
                            <p class="card-text row-text fw-semibold">
                                Làm bài full test với số lượng câu hỏi và thời gian giống như bài
                                thi thật
                            </p>
                            <div class="d-flex justify-content-end">
                                <a href="#" class="btn btn-primary row-text mt-5">LUYỆN TẬP</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- <h1 class="my-5">Chức năng Website</h1> -->
            <div class="d-flex justify-content-center"><button class="button mt-2 ">Học ngay thôi nào</button></div>
            <div
            
                class="mt-4 row row-cols-1 row-cols-md-2 align-items-md-center g-5 mb-5 bg-primary-subtle border rounded-4 pb-5">
                <div class="col d-flex flex-column align-items-start gap-2">
                    <img src="https://www.dungplus.com/wp-content/uploads/2019/07/4-ki-nang.jpg" alt="" loading="lazy"
                        width="100%" />
                    <!-- <button class="button mt-3 ">Học ngay</button> -->
                </div>

                <div class="col">
                    <div class="row row-cols-1 row-cols-sm-2 g-4">

                        <div class="col d-flex flex-column gap-2">
                            <div id="card1" class="card">
                                <div class="card-body text-center">
                                    <i class="fa-solid fa-circle-question fa-2x mb-4"></i>
                                    <h5 class="card-title">Ngân hàng đề thi</h5>
                                    <p class="card-text">
                                        Ngân hàng đề thi đa dạng với nhiều chủ đề khác nhau sẽ giúp
                                        bạn chuẩn bị tốt nhất cho kỳ thi của mình
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col d-flex flex-column gap-2">
                            <div id="card2" class="card">
                                <div class="card-body text-center">
                                    <i class="fa-brands fa-algolia fa-2x mb-4"></i>
                                    <h5 class="card-title">Mô phỏng bài thi thật</h5>
                                    <p class="card-text">
                                        Các bài thi thử có cấu trúc giống như bài thi thật sẽ giúp bạn
                                        vượt qua kỳ thi một cách thành công
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col d-flex flex-column gap-2">
                            <div id="card3" class="card">
                                <div class="card-body text-center">
                                    <i class="fa-solid fa-anchor fa-2x mb-4"></i>
                                    <h5 class="card-title">Không cần đăng nhập hoặc đăng ký</h5>
                                    <p class="card-text">
                                        Không cần đăng nhập hoặc đăng ký, tiến trình học tập của bạn
                                        vẫn sẽ được lưu lại. Bạn có thể tự do luyện tập các câu hỏi
                                        với các mức độ khác nhau
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col d-flex flex-column gap-2">
                            <div id="card4" class="card">
                                <div class="card-body text-center">
                                    <i class="fa-solid fa-chart-simple fa-2x mb-4"></i>
                                    <h5 class="card-title">Thống kê kết quả chi tiết</h5>
                                    <p class="card-text">
                                        Sau khi hoàn thành mỗi bài luyện tập, bạn có thể xem thống kê
                                        chi tiết kết quả bài làm của mình
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row mb-3">
                <div class="col-4" v-for="fivestar in fivestars" :key="fivestar.feedbackId">
                    <div class="card d-flex justify-content-center">
                        <img src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg"
                            class="card-img-top ms-3" style="width: 100px; height: 100px; border-radius: 100%;" alt="...">
                        <div class="card-body ">
                            <h5 class="card-title ms-5">{{ fivestar.name }}</h5>
                            <p class="card-text ms-5">{{ fivestar.review }}</p>
                            <p class="card-text ms-5">{{ fivestar.rate }}</p>
                            <span class="ms-5"></span><i class="fa-solid fa-star text-warning"
                                v-for="rate in fivestar.rating"></i>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, defineComponent, onMounted } from "vue";
import Slider from "@/components/layouts/Slider.vue";
import LR from "@/components/L&R.vue";
import SW from "@/components/S&W.vue";
import FeedbackService from "@/services/feedback.service";

export default defineComponent({
    components: {
        Slider,
        LR,
        SW
    },
    setup() {
        const showListeningReading = ref(true);

        const fivestars = ref([]);
        const fetchGrammars = async () => {
            try {
                fivestars.value = await FeedbackService.getFiveStarFeedbacks();
                console.log(fivestars.value);
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(() => {
            fetchGrammars();
        });

        return {
            showListeningReading,
            fivestars
        };
    },
});
</script>

<style scoped>
.button {
    padding: 15px 25px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
    outline: none;
    color: #fff;
    background-color: #04AA6D;
    border: none;
    border-radius: 15px;
    box-shadow: 0 9px #999;
}

.button:hover {
    background-color: #3e8e41
}

.button:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
}

.button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 60px;
}

.button-container button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fff;
    border: 1px #fff;
    border-radius: 20px;
    cursor: pointer;
    margin: 0 10px;
    transition: background-color 0.3s ease;
}

.button-container button.active {
    background-color: #ccc;
    font-weight: bold;
}

.card {
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(7, 6, 6, 0.1);
    cursor: pointer;
    border-color: rgb(255, 255, 255, 0);
}

.card-body {
    padding: 20px;
    background-color: #fff;
    height: 200px;
}

.card-text {
    font-size: 14px;
    color: #555;
}

h1 {
    font-weight: 700;
    color: #34447c;
}

#test p {
    font-size: 16px;
    color: #8293d0;
    text-align: center;
    line-height: 1.5;
    margin: 20px 100px;
    font-weight: 700;
}

.card-background-1 .card-body {
    background-image: url("../assets/img/full-test.png");
    background-size: cover;
    background-position: center;
    border-radius: 30px;
}

.card-background-2 .card-body {
    background-image: url("../assets/img/mini-test.png");
    background-size: cover;
    background-position: center;
    border-radius: 30px;
}

.row-title {
    color: white;
    font-weight: bold;
    font-size: 40px;
}

.row-text {
    color: white;
}

#card1,
#card2,
#card3,
#card4 {
    transition: transform 0.3s ease;
    height: 250px;
}

#card1:hover,
#card2:hover,
#card3:hover,
#card4:hover {
    transform: translateY(-5px);
}

.card-body a.btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #34447c;
    color: #fff;
    border: none;
    border-radius: 20px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.card-body a.btn:hover {
    background-color: #2c3e6e;
}
</style>