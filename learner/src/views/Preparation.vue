<template>
    <div class="container">
        <div class="card rounded-5  mt-4 mb-5 border-0 shadow-lg" style="width: 100%;">
            <div class="row">
                <div class="col-3">
                    <img src="https://th.bing.com/th/id/OIP.JMSnfXY_MiOgvfxTHHTJngHaE8?rs=1&pid=ImgDetMain" alt=""
                        loading="lazy">
                </div>
                <div class="col-8">
                    <div class="card-body rounded-5">
                        <div class="row d-flex justify-content-center align-items-center" style="height:550px">
                            <h5>FULL TEST</h5>
                            <h2>BÀI KIỂM TRA TOÀN PHẦN</h2>
                            <p><i class="fa-solid fa-triangle-exclamation text-warning"></i> Dưới đây là một số quy định bạn
                                cần lưu ý: </p>
                            <p><i class="fa-solid fa-circle-info text-primary"></i> Bài kiểm tra có tất cả 200 câu hỏi, chia
                                làm <strong>7</strong> Part (1, 2, 3, 4, 5, 6,
                                7)</p>
                            <p><i class="fa-solid fa-circle-info text-primary"></i> Bạn sẽ có <strong>120 phút</strong> để
                                hoàn thành tất cả các câu hỏi trong bài kiểm tra.
                            </p>
                            <!-- <p><i class="fa-solid fa-circle-info text-primary"></i> Phần nghe bạn chỉ nghe <strong>1 lần duy nhất</strong>, vui lòng không xả để tránh mất
                                    phần nghe</p> -->
                            <p><i class="fa-solid fa-circle-info text-primary"></i> Làm tuần tự các câu, <strong>câu nào
                                    không làm được xin hãy bỏ trống</strong> để đánh giá
                                đúng năng lực</p>
                            <p><i class="fa-solid fa-circle-info text-primary"></i> <strong>Không nên xem trước phần
                                    đọc</strong> vì khi thi chính thức sẽ bị thu bài</p>

                            <p v-if="userGoalSearchResult.hasUserGoal === true">Mục tiêu của bạn đang là <strong
                                    style="font-size: 30px; color:rgb(193, 8, 8)">
                                    {{ userGoal.goalScore }}</strong>
                                <router-link class="link-offset-3" :to="{ name: 'learningroute' }">
                                    <i class="fa-solid fa-chalkboard-user"></i> [Điều chỉnh ngay]
                                </router-link>
                            </p>
                        </div>

                        <router-link v-if="userGoalSearchResult.hasUserGoal === true"
                            :to="{ name: 'exam-question-fulltest', params: { examId: examId } }"
                            class="text-decoration-none">
                            <div class="d-flex justify-content-center mt-3">
                                <button type="button" class="button w-25" style="width:100%">
                                    BẮT ĐẦU NGAY
                                </button>
                            </div>
                        </router-link>

                        <div class="d-flex justify-content-center mt-3" v-else>
                            <button type="button" class="button w-25" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                BẮT ĐẦU NGAY
                            </button>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel"><i
                                                class="fa-solid fa-triangle-exclamation me-2"></i>Lưu ý:</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>
                                        <h2 class="text-center">VUI LÒNG XÉT ĐIỂM MỤC TIÊU TRƯỚC KHI THI THỬ</h2>
                                        </p>
                                        <div class="d-flex justify-content-center">
                                            <router-link :to="{ name: 'learningroute' }" class="text-decoration-none">
                                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                                                    <i class="fa-solid fa-chalkboard-user"></i> [Xét điểm ngay]
                                                </button>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted, reactive } from "vue";
import UserGoalService from "@/services/user_goal.service";
import UserService from "@/services/user.service";
import VueJwtDecode from "vue-jwt-decode";

export default defineComponent({
    props: {
        examId: { type: String, required: true },
    },
    setup(props) {

        const userId = ref(null);
        const getUserId = async () => {
            try {
                const learnerToken = localStorage.getItem("learnerToken");
                const decoded = VueJwtDecode.decode(learnerToken);
                console.log(decoded)
                userId.value = decoded.id;
            } catch (error) {
                console.log(error);
            }
        };

        const userGoal = ref([]);
        const userGoalSearchResult = ref(false);
        const getUserGoalByUserId = async () => {
            try {
                userGoalSearchResult.value = await UserGoalService.hasUserGoalWithUserId(userId.value);
                console.log(userGoalSearchResult.value.hasUserGoal)
                // Kiểm tra đã xét điểm mục tiêu
                if (userGoalSearchResult.value.hasUserGoal === true) {
                    userGoal.value = await UserGoalService.getUserGoalByUserId(userId.value);
                    console.log(userGoal.value)
                }
                console.log(userGoal.value)
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(async () => {
            await getUserId();
            getUserGoalByUserId();
        });

        return {
            userGoal,
            userGoalSearchResult
        };
    },
});
</script>
  
<style scoped>
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
button i {
    font-size: 20px;
    color: #000;
}
body {
    font-size: 20px;
    color: #555;
}
h1,h5 {
    font-weight: 700;
    color: #34447c;
    font-size: 23px;
}
h2 {
    font-size: 24px;
    color: #FF5733;
    font-weight: bolder;
}
h3 {
    font-size: 20px;
    color: #009688;
    font-weight: bolder;

}
p {
    font-size: 23px;
    margin-bottom: 15px;
    font-weight: 500;
    color: #333;
}
#test p {
    font-size: 16px;
    color: #8293d0;
    text-align: center;
    line-height: 1.5;
    margin: 20px 100px;
    font-weight: 700;
}
</style>
  