<template>
    <div class="container-fluid">

        <div class="card border-0 rounded-5 mt-4 mb-5" style=" min-height: 600px;" v-if="showImproveTest === false">
            <div class="row g-0 mt-5">
                <!-- Sau khi đổ câu hỏi thì bỏ phần này -->
                <div class="col-sm-5 my-4 d-flex align-items-center justify-content-center ">
                    <img src="https://i0.wp.com/www.shoutmeloud.com/wp-content/uploads/2019/09/how-to-improve-english-writing-skills.jpg?resize=1024%2C968&ssl=1"
                        alt="" loading="lazy" style="width: 600px; height: 400px;" class="rounded-5">
                </div>
                <div class="col-sm-7 ">
                    <div class="card-body">
                        <div class="row d-flex justify-content-center align-items-center" style="height:500px">
                            <div class="col-sm-12 mb-3 mt-5">
                                <h2>BÀI KIỂM TRA CẢI THIỆN TỪNG PHẦN</h2>
                                <p>Dưới đây là một số quy định bạn cần lưu ý: </p>
                                <p>Bài kiểm tra bao gồm những câu hỏi chia làm <strong>7 Part (1, 2, 3, 4, 5, 6,
                                        7)</strong></p>
                                <p>Hướng dẫn: Chọn phần, sau đó chọn phân loại câu hỏi của phần đó và bắt đầu luyện tập ngay
                                </p>
                                <div class="row mt-3">
                                    <div class="col">
                                        <select class="form-select border-secondary mt-2" aria-label="Select a section"
                                            v-model="selectedSection">
                                            <option value="" disabled selected>Vui lòng chọn phần</option>
                                            <option v-for="section in docngheSections" :value="section.id"
                                                :key="section.id">{{
                                                    section.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <select class="form-select border-secondary mt-2" aria-label="Select a question type"
                                            v-model="selectedQuestionType">
                                            <option v-for="(option, index) in questionTypeOptions" :value="option.value"
                                                :key="index">{{ option.text
                                                }}</option>
                                        </select>
                                    </div>
                                    <div class="col">
                                        <div class="d-flex justify-content-center">
                                            <button type="button" class="button my-2 w-75" style="width:100%"
                                                @click="startPractice">
                                                BẮT ĐẦU NGAY
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3" v-else>

            <div class="d-flex justify-content-start align-items-center my-2 ">
                <button type="button" class="button" style="width:200px" @click="goBack">Quay lại</button>
            </div>

            <ImproveTestPart1 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 1 && selectedQuestionType !== null && showImproveTest" :getImageUrl="getImageUrl"
                :getAudioUrl="getAudioUrl" :translateText="translateText" :getOptions="getOptions"
                :getOptionClass="getOptionClass" :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart1>

            <ImproveTestPart2 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 2 && selectedQuestionType !== null && showImproveTest" :getAudioUrl="getAudioUrl"
                :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart2>

            <ImproveTestPart3 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 3 && selectedQuestionType !== null && showImproveTest" :getImageUrl="getImageUrl"
                :getAudioUrl="getAudioUrl" :translateText="translateText" :getOptions="getOptions"
                :getOptionClass="getOptionClass" :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart3>

            <ImproveTestPart4 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 4 && selectedQuestionType !== null && showImproveTest" :getImageUrl="getImageUrl"
                :getAudioUrl="getAudioUrl" :translateText="translateText" :getOptions="getOptions"
                :getOptionClass="getOptionClass" :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart4>

            <ImproveTestPart5 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 5 && selectedQuestionType !== null && showImproveTest"
                :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart5>

            <ImproveTestPart6 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 6 && selectedQuestionType !== null && showImproveTest"
                :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart6>

            <ImproveTestPart7Single :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 7 && selectedQuestionType !== null && showImproveTest" :getImageUrl="getImageUrl"
                :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart7Single>

            <ImproveTestPart7Double :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 12 && selectedQuestionType !== null && showImproveTest" :getImageUrl="getImageUrl"
                :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart7Double>

            <ImproveTestPart7Triple :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                v-if="selectedSection == 13 && selectedQuestionType !== null && showImproveTest" :getImageUrl="getImageUrl"
                :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                :clearSelection="clearSelection" :checkAnswer="checkAnswer">
            </ImproveTestPart7Triple>

        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted, watch, computed } from "vue";
import SectionService from "@/services/section.service";
import QuestionService from "@/services/question.service";
import ImproveTestPart1 from "@/components/TestPart1.vue";
import ImproveTestPart2 from "@/components/TestPart2.vue";
import ImproveTestPart3 from "@/components/TestPart3.vue";
import ImproveTestPart4 from "@/components/TestPart4.vue";
import ImproveTestPart5 from "@/components/TestPart5.vue";
import ImproveTestPart6 from "@/components/TestPart6.vue";
import ImproveTestPart7Single from "@/components/TestPart7Single.vue";
import ImproveTestPart7Double from "@/components/TestPart7Double.vue";
import ImproveTestPart7Triple from "@/components/TestPart7Triple.vue";

import Swal from 'sweetalert2';

export default defineComponent({
    components: {
        ImproveTestPart1,
        ImproveTestPart2,
        ImproveTestPart3,
        ImproveTestPart4,
        ImproveTestPart5,
        ImproveTestPart6,
        ImproveTestPart7Single,
        ImproveTestPart7Double,
        ImproveTestPart7Triple,
    },
    setup() {
        const sections = ref([]);
        const retrieveSections = async () => {
            try {
                sections.value = await SectionService.allEnable();
            } catch (error) {
                console.log(error);
            }
        };
        const docngheSections = computed(() => {
            return sections.value.filter((section) => section.type === 1 || section.type === 2);
        });

        const selectedSection = ref(null);
        const selectedQuestionType = ref(null);
        const showImproveTest = ref(false);
        const questions = ref([]);
        const startPractice = async () => {
            if (selectedSection.value && selectedQuestionType.value) {
                const requestData = {
                    sectionId: selectedSection.value,
                    questionType: selectedQuestionType.value,
                };
                try {
                    questions.value = await QuestionService.getQuestionsBySectionIdAndType(requestData);
                    console.log(questions.value);
                    // Xử lý các câu hỏi lấy được theo cách cần thiết
                    showImproveTest.value = true;
                } catch (error) {
                    console.error("Lỗi khi tải câu hỏi:", error);
                }
            } else {
                console.error("Vui lòng chọn cả một phần và loại câu hỏi trước khi bắt đầu.");
            }
        };

        const goBack = () => {
            showImproveTest.value = false;
        };

        // Cập nhật khi có sự thay đổi options
        const questionTypeOptions = ref([]);
        watch(selectedSection, (newSectionId) => {
            console.log(selectedSection.value)
            switch (newSectionId) {
                case 1:
                    questionTypeOptions.value = [
                        { value: "[Part 1] Tranh tả cả người và vật", text: "[Part 1] Tranh tả cả người và vật" },
                        { value: "[Part 1] Tranh tả người", text: "[Part 1] Tranh tả người" },
                        { value: "[Part 1] Tranh tả vật", text: "[Part 1] Tranh tả vật" },
                    ];
                    break;
                case 2:
                    questionTypeOptions.value = [
                        { value: "[Part 2] Câu hỏi đuôi", text: "[Part 2] Câu hỏi đuôi" },
                        { value: "[Part 2] Câu hỏi HOW", text: "[Part 2] Câu hỏi HOW" },
                        { value: "[Part 2] Câu hỏi lựa chọn", text: "[Part 2] Câu hỏi lựa chọn" },
                        { value: "[Part 2] Câu hỏi WHAT", text: "[Part 2] Câu hỏi WHAT" },
                        { value: "[Part 2] Câu hỏi WHEN", text: "[Part 2] Câu hỏi WHEN" },
                        { value: "[Part 2] Câu hỏi WHERE", text: "[Part 2] Câu hỏi WHERE" },
                        { value: "[Part 2] Câu hỏi WHO", text: "[Part 2] Câu hỏi WHO" },
                        { value: "[Part 2] Câu hỏi WHY", text: "[Part 2] Câu hỏi WHY" },
                        { value: "[Part 2] Câu hỏi YES/NO", text: "[Part 2] Câu hỏi YES/NO" },
                        { value: "[Part 2] Câu yêu cầu, đề nghị", text: "[Part 2] Câu yêu cầu, đề nghị" },
                    ];
                    break;
                case 3:
                    questionTypeOptions.value = [
                        { value: "[Part 3] Câu hỏi kết hợp bảng biểu", text: "[Part 3] Câu hỏi kết hợp bảng biểu" },
                        { value: "[Part 3] Câu hỏi về chi tiết cuộc hội thoại", text: "[Part 3] Câu hỏi về chi tiết cuộc hội thoại" },
                        { value: "[Part 3] Câu hỏi về chủ đề, mục đích", text: "[Part 3] Câu hỏi về chủ đề, mục đích" },
                        { value: "[Part 3] Câu hỏi về danh tính người nói", text: "[Part 3] Câu hỏi về danh tính người nói" },
                        { value: "[Part 3] Câu hỏi về địa điểm hội thoại", text: "[Part 3] Câu hỏi về địa điểm hội thoại" },
                        { value: "[Part 3] Câu hỏi về hàm ý câu nói", text: "[Part 3] Câu hỏi về hàm ý câu nói" },
                        { value: "[Part 3] Câu hỏi về hành động tương lai", text: "[Part 3] Câu hỏi về hành động tương lai" },
                        { value: "[Part 3] Câu hỏi về yêu cầu, gợi ý", text: "[Part 3] Câu hỏi về yêu cầu, gợi ý" },
                    ];
                    break;
                case 4:
                    questionTypeOptions.value = [
                        { value: "[Part 4] Câu hỏi kết hợp bảng biểu", text: "[Part 4] Câu hỏi kết hợp bảng biểu" },
                        { value: "[Part 4] Câu hỏi về chi tiết", text: "[Part 4] Câu hỏi về chi tiết" },
                        { value: "[Part 4] Câu hỏi về chủ đề, mục đích", text: "[Part 4] Câu hỏi về chủ đề, mục đích" },
                        { value: "[Part 4] Câu hỏi về danh tính, địa điểm", text: "[Part 4] Câu hỏi về danh tính, địa điểm" },
                        { value: "[Part 4] Câu hỏi về hàm ý câu nói", text: "[Part 4] Câu hỏi về hàm ý câu nói" },
                        { value: "[Part 4] Câu hỏi về hành động tương lai", text: "[Part 4] Câu hỏi về hành động tương lai" },
                        { value: "[Part 4] Câu hỏi yêu cầu, gợi ý", text: "[Part 4] Câu hỏi yêu cầu, gợi ý" },
                    ];
                    break;
                case 5:
                    questionTypeOptions.value = [
                        { value: "[Part 5] Câu hỏi ngữ pháp", text: "[Part 5] Câu hỏi ngữ pháp" },
                        { value: "[Part 5] Câu hỏi từ vựng", text: "[Part 5] Câu hỏi từ vựng" },
                        { value: "[Part 5] Câu hỏi từ loại", text: "[Part 5] Câu hỏi từ loại" },
                    ];
                    break;
                case 6:
                    questionTypeOptions.value = [
                        { value: "[Part 6] Câu hỏi ngữ pháp", text: "[Part 6] Câu hỏi ngữ pháp" },
                        { value: "[Part 6] Câu hỏi từ vựng", text: "[Part 6] Câu hỏi từ vựng" },
                        { value: "[Part 6] Câu hỏi từ loại", text: "[Part 6] Câu hỏi từ loại" },
                        { value: "[Part 6] Câu hỏi điền câu", text: "[Part 6] Câu hỏi điền câu" },
                    ];
                    break;
                case 7:
                case 12:
                case 13:
                    questionTypeOptions.value = [
                        { value: "[Part 7] Câu hỏi điền câu", text: "[Part 7] Câu hỏi điền câu" },
                        { value: "[Part 7] Câu hỏi suy luận", text: "[Part 7] Câu hỏi suy luận" },
                        { value: "[Part 7] Câu hỏi tìm thông tin", text: "[Part 7] Câu hỏi tìm thông tin" },
                        { value: "[Part 7] Câu hỏi tìm chi tiết sai", text: "[Part 7] Câu hỏi tìm chi tiết sai" },
                        { value: "[Part 7] Câu hỏi tìm từ đồng nghĩa", text: "[Part 7] Câu hỏi tìm từ đồng nghĩa" },
                        { value: "[Part 7] Câu hỏi về chủ đề, mục đích", text: "[Part 7] Câu hỏi về chủ đề, mục đích" },
                        { value: "[Part 7] Câu hỏi về hàm ý câu nói", text: "[Part 7] Câu hỏi về hàm ý câu nói" },
                    ];
                    break;
                default:
                    questionTypeOptions.value = [];
            }
        });

        const submitAnswers = async () => {
            // Kiểm tra xem người dùng đã trả lời ít nhất một câu hỏi chưa
            const answeredQuestions = questions.value.filter(question => question.selectedOption);
            if (answeredQuestions.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Bạn chưa trả lời bất kỳ câu nào. Vui lòng chọn đáp án!',
                });
            } else if (answeredQuestions.length < questions.value.length) {
                const result = await Swal.fire({
                    icon: 'question',
                    title: 'Bạn chưa hoàn thành tất cả câu hỏi',
                    text: 'Bạn thực sự muốn nộp?',
                    showCancelButton: true,
                    confirmButtonText: 'Nộp',
                    cancelButtonText: 'Quay lại',
                });
                if (result.isConfirmed) {
                    continueSubmit();
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
                    continueSubmit();
                }
            }
        };

        const continueSubmit = () => {
            questions.value.forEach((question) => {
                if (question.selectedOption) {
                    question.answered = true;
                }
                // Đánh dấu câu hỏi đã được chấm điểm
                question.isGraded = true;
            });
            // Tính điểm ở đây
            const correctCount = questions.value.filter(
                (question) => question.answered && question.selectedOption === question.correctOption
            ).length;
            const incorrectCount = questions.value.filter(
                (question) => question.answered && question.selectedOption !== question.correctOption
            ).length;

            // Hiển thị kết quả
            Swal.fire({
                icon: 'info',
                title: 'Kết quả',
                html: `Số câu đúng: <strong>${correctCount}</strong><br>Số câu sai: <strong>${incorrectCount}</strong>`,
            });
        };

        const refreshPage = () => {
            // Đặt lại tất cả câu hỏi về trạng thái ban đầu
            questions.value.forEach((question) => {
                question.selectedOption = null;
                question.answered = false;
                question.isGraded = false; // Đặt lại câu hỏi về trạng thái chưa chấm điểm
            });
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

        const getOptions = (question) => {
            if (selectedSection == 2) {
                return [question.optionA, question.optionB, question.optionC];
            }
            else {
                return [question.optionA, question.optionB, question.optionC, question.optionD];
            }
        };
        const getOptionClass = (question, option) => {
            return {
                'highlight-row': option === question.selectedOption,
            };
        };
        const clearSelection = (question) => {
            question.selectedOption = null;
        };
        const checkAnswer = (question) => {
            console.log(question.selectedOption)
            if (question.selectedOption) {
                question.answered = true;
            }
        };

        const translateText = async (text, targetLanguage) => {
            const apiKey = "AIzaSyD-7uWTjTodZba7ky7mgfSgnVxAX_opoh8";
            const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
            const sourceLang = 'en'; // Ngôn ngữ là tiếng Anh (Anh -> Việt)
            const data = {
                q: text,
                source: sourceLang,
                target: targetLanguage,
            };
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                return result.data.translations[0].translatedText;
            } catch (error) {
                throw error;
            }
        };

        onMounted(() => {
            retrieveSections();
        });

        return {
            sections,
            selectedSection,
            selectedQuestionType,
            questionTypeOptions,
            startPractice,
            questions,
            refreshPage,
            submitAnswers,
            showImproveTest,
            goBack,
            docngheSections,

            getImageUrl,
            getAudioUrl,
            getOptions,
            getOptionClass,
            clearSelection,
            checkAnswer,

            translateText
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

h1,
h5 {
    font-weight: 700;
    color: #34447c;
    font-size: 23px;
}

body {
    font-size: 20px;
    color: #555;
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
}</style>
  