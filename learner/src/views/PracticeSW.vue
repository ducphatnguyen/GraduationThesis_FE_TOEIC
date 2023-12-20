<template>
    <div data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
        <div class="container">
            <div id="test">
                <h1 class="text-center mt-5">
                    <span>Luyện thi Toeic Speaking Writing 2023 Online</span>
                </h1>
            </div>
            <!-- Sliver Nói & Viết -->
            <div class="mb-5">
                <SW></SW>
            </div>

            <div class="row mb-5">
                <div class="d-flex justify-content-center mb-5">
                    <img class="my-3" src="https://academic-englishuk.com/wp-content/uploads/2017/08/IPA-Chart-AEUK.png" alt="" loading="lazy" width="100%"
                        height="100%">
                </div>
                <div class="col-sm-6 mb-3 mb-sm-0">
                    <div class="card card-background-1">
                        <div class="card-body">
                            <h5 class="card-title row-title">VOCABULARY</h5>
                            <p class="card-text row-text fw-semibold">
                                Việc thực hành từ vựng của chúng tôi được chia thành nhiều chủ đề và phần khác nhau sẽ hỗ
                                trợ bạn nâng cao vốn từ vựng
                            </p>
                            <a href="#" class="btn btn-primary row-text">LUYỆN TẬP</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card card-background-2">
                        <div class="card-body">
                            <h5 class="card-title row-title">GRAMMAR</h5>
                            <p class="card-text row-text fw-semibold">
                                Các bài tập ngữ pháp của chúng tôi bao gồm hơn 30 chủ đề ngữ pháp chắc chắn sẽ giúp bạn nâng
                                cao nền tảng tiếng Anh của mình
                            </p>
                            <a href="#" class="btn btn-primary row-text">LUYỆN TẬP</a>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import SW from "@/components/S&W.vue";

export default defineComponent({
    components: {
        SW,
    },
    setup() {
    },
});

</script>

<style scoped>
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
    background-image: url("../assets/img/vocabulary.png");
    background-size: cover;
    background-position: center;
    border-radius: 30px;
}
.card-background-2 .card-body {
    background-image: url("../assets/img/grammar.png");
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
  