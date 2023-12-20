<template>
    <div class="bg-test">
        <div class="container-fluid">
            <div class="row mt-3">
                <TestPart1 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :getImageUrl="getImageUrl" :getAudioUrl="getAudioUrl"
                    :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                    :clearSelection="clearSelection" :checkAnswer="checkAnswer" v-if="sectionId === '1'"></TestPart1>

                <TestPart2 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :getAudioUrl="getAudioUrl" :translateText="translateText"
                    :getOptions="getOptions" :getOptionClass="getOptionClass" :clearSelection="clearSelection"
                    :checkAnswer="checkAnswer" v-if="sectionId === '2'"></TestPart2>

                <TestPart3 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :getImageUrl="getImageUrl" :getAudioUrl="getAudioUrl"
                    :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                    :clearSelection="clearSelection" :checkAnswer="checkAnswer" v-if="sectionId === '3'"></TestPart3>

                <TestPart4 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :getImageUrl="getImageUrl" :getAudioUrl="getAudioUrl"
                    :translateText="translateText" :getOptions="getOptions" :getOptionClass="getOptionClass"
                    :clearSelection="clearSelection" :checkAnswer="checkAnswer" v-if="sectionId === '4'"></TestPart4>

                <TestPart5 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :translateText="translateText" :getOptions="getOptions"
                    :getOptionClass="getOptionClass" :clearSelection="clearSelection" :checkAnswer="checkAnswer"
                    v-if="sectionId === '5'"></TestPart5>

                <TestPart6 :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :translateText="translateText" :getOptions="getOptions"
                    :getOptionClass="getOptionClass" :clearSelection="clearSelection" :checkAnswer="checkAnswer"
                    v-if="sectionId === '6'"></TestPart6>

                <TestPart7Single :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :getImageUrl="getImageUrl" :translateText="translateText"
                    :getOptions="getOptions" :getOptionClass="getOptionClass" :clearSelection="clearSelection"
                    :checkAnswer="checkAnswer" v-if="sectionId === '7'"></TestPart7Single>

                <TestPart7Double :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :getImageUrl="getImageUrl" :translateText="translateText"
                    :getOptions="getOptions" :getOptionClass="getOptionClass" :clearSelection="clearSelection"
                    :checkAnswer="checkAnswer" v-if="sectionId === '12'"></TestPart7Double>

                <TestPart7Triple :questions="questions" :submitAnswers="submitAnswers" :refreshPage="refreshPage"
                    :isSubmited="isSubmited" :getImageUrl="getImageUrl" :translateText="translateText"
                    :getOptions="getOptions" :getOptionClass="getOptionClass" :clearSelection="clearSelection"
                    :checkAnswer="checkAnswer" v-if="sectionId === '13'"></TestPart7Triple>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import TestService from "@/services/test.service";

import TestPart1 from "@/components/TestPart1.vue";
import TestPart2 from "@/components/TestPart2.vue";
import TestPart3 from "@/components/TestPart3.vue";
import TestPart4 from "@/components/TestPart4.vue";
import TestPart5 from "@/components/TestPart5.vue";
import TestPart6 from "@/components/TestPart6.vue";
import TestPart7Single from "@/components/TestPart7Single.vue";
import TestPart7Double from "@/components/TestPart7Double.vue";
import TestPart7Triple from "@/components/TestPart7Triple.vue";

import Swal from 'sweetalert2';

export default defineComponent({
    components: {
        TestPart1,
        TestPart2,
        TestPart3,
        TestPart4,
        TestPart5,
        TestPart6,
        TestPart7Single,
        TestPart7Double,
        TestPart7Triple
    },
    props: {
        sectionId: { type: String, required: true },
        testId: { type: String, required: true },
    },
    setup(props) {

        const questions = ref([]);
        const retrieveQuestions = async () => {
            try {
                questions.value = await TestService.getQuestionsByTestId(props.testId);
                console.log(questions.value)
            } catch (error) {
                console.log(error);
            }
        };

        const submitAnswers = async () => {
            // Đã trả lời ít nhất 1 câu
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

        const isSubmited = ref(false)
        const continueSubmit = () => {
            questions.value.forEach((question) => {
                if (question.selectedOption) {
                    question.answered = true;
                }
                question.isGraded = true;
                isSubmited.value = true;
            });
            // Tính điểm 
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

        // Làm lại
        const refreshPage = () => {
            questions.value.forEach((question) => {
                question.selectedOption = null;
                question.answered = false;
                question.isGraded = false;
            });
            isSubmited.value = false;
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
            if (props.sectionId == 2) {
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
            retrieveQuestions();
        });

        return {
            questions,
            retrieveQuestions,
            isSubmited,
            submitAnswers,
            refreshPage,

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
  
  