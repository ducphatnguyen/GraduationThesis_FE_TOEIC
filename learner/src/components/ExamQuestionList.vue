<template>
    <!-- Modal hướng dẫn -->
    <div class="modal zoom" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-regular fa-lightbulb"></i> Hướng dẫn
                        làm Part {{ selectedPart }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body d-flex justify-content-center">
                    <p v-if="selectedPart == 1">
                        Look at the picture and listen to the sentences. Choose the sentence that best describes the picture
                    </p>
                    <p v-if="selectedPart == 2">
                        Listen to the question and the three responses. Choose the response that best answers the question
                    </p>
                    <p v-if="selectedPart == 3">
                        Listen to the dialogue. Then read each question and choose the best answer
                    </p>
                    <p v-if="selectedPart == 4">
                        Listen to the talk. Then read each question and choose the best answer
                    </p>
                    <p v-if="selectedPart == 5">
                        Choose the word that best completes the sentence
                    </p>
                    <p v-if="selectedPart == 6">
                        Choose the word or phrase that best completes the blanks
                        <br> Topic: Announcement, notice, letter, e-mail, advertisement
                    </p>
                    <p v-if="selectedPart == 7">
                        Read the passage and choose the correct answer
                    </p>
                </div>

            </div>
        </div>
    </div>
    <div class="col-lg col-md col-sm">
        <div class="card specific-card border-0 shadow-lg mb-4">
            <div class="card-body">

                <div class="mb-3 d-flex justify-content-center">
                    <button v-for="part in allParts" :key="part" type="button" class="button ms-4" @click="selectPart(part)"
                        :class="{ 'active-part': selectedPart === part }">
                        Phần {{ part }}
                    </button>
                </div>

                <div class="alert alert-primary alert-dismissible fade show " role="alert" style="font-size: 16px;">
                    <p class="text-warning"><i class="fa-solid fa-triangle-exclamation"></i> Lưu ý: </p>
                    <p>Phần nghe bạn chỉ nghe 1 lần duy nhất, vui lòng không xả để tránh mất phần nghe</p>
                    <p>Làm tuần tự các câu, câu nào không làm được xin hãy bỏ trống để đánh giá đúng năng lực</p>
                    <p>Không xem trước phần đọc vì khi thi chính thức sẽ bị thu bài</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                <!-- Nút kích hoạt modal hướng dẫn làm các phần -->
                <div class="d-flex justify-content-end fst-italic"><button type="button" class="btn btn-link link-offset-3"
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i style="font-size:30px" class="fa-regular fa-circle-question mx-2"></i>
                    </button>
                </div>

                <div class="row">
                    <div class="col-sm-12" v-for="(groupQuestions, groupId) in groupedQuestions" :key="groupId">

                        <div class="audio-container mt-5 mb-2"
                            v-if="shouldDisplayAudio(groupQuestions[0]) && !groupQuestions[0].hasListened">
                            <audio controls style="width:400px" @ended="markAsListened(groupQuestions[0])">
                                <source :src="getAudioUrl(groupQuestions[0].questionAudio)" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>

                        <div class="row">

                            <div :class="{
                                'col-md-6': shouldDisplayImage(groupQuestions[0]) || shouldDisplayPassage(groupQuestions[0]) && groupQuestions.length >= 2,
                                'col-md-12': shouldDisplayImage(groupQuestions[0]) && groupQuestions.length === 1,
                                'bg-light rounded': shouldDisplayImage(groupQuestions[0]) || shouldDisplayPassage(groupQuestions[0]) && groupQuestions.length >= 2,
                                'scrollable-container': shouldDisplayPassage(groupQuestions[0]) && groupQuestions.length >= 4 
                            }">
                                <div class="audio-image-container mt-3">
                                    <div class="image-container" v-if="shouldDisplayImage(groupQuestions[0])">
                                        <img :src="getImageUrl(groupQuestions[0].questionImage)" style="width: 400px"
                                            alt="Luyện thi Listening TOEIC" class="question-image" loading="lazy" />
                                    </div>
                                </div>

                                <div class="audio-image-container mt-5">
                                    <div class="audio-container mb-2" v-if="shouldDisplayPassage(groupQuestions[0])">
                                        <p v-html="groupQuestions[0].questionPassage"></p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md">
                                <div :class="{ 'scrollable-container': shouldDisplayPassage(groupQuestions[0]) && groupQuestions.length >= 4}">
                                <div v-for="(examQuestion, index) in groupQuestions" :key="index" class="ms-3" >
                                    <div :id="'examQuestion-part-' + selectedPart + '-' + (examQuestion.orderNumber)" class="question">
                                        <div class="row">

                                            <div class="text-end mt-2" v-if="!examQuestion.isGraded">
                                                <a @click="toggleFlag(examQuestion)" class="btn border border-primary">
                                                    <i class="fa-solid fa-flag text-danger me-2"></i>{{
                                                        isFlagged(examQuestion) ? 'Gỡ cờ' : 'Cắm cờ' }}
                                                </a>
                                            </div>

                                            <ul>
                                                <button class="btn button5 my-2"
                                                    style="background-color: #e8f2ff; color: #35509a; width: 60px;">{{
                                                        examQuestion.orderNumber }}</button>

                                                <span class="ms-1">{{ examQuestion.questionContent }}</span>
                                                <li v-for="(option, optionIndex) in getOptions(examQuestion)"
                                                    :key="optionIndex" :class="getOptionClass(examQuestion, option)">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" type="radio" :value="option"
                                                            v-model="examQuestion.selectedOption"
                                                            :disabled="examQuestion.isGraded"
                                                            :name="'flexRadioDefault-' + examQuestion.examQuestionId" />
                                                        {{ option }}

                                                        <div v-if="examQuestion.isGraded && option === examQuestion.correctOption"
                                                            class="result-icon">
                                                            <i class="fas fa-check" style="color: green"></i>
                                                        </div>
                                                        <div v-if="examQuestion.isGraded && option === examQuestion.selectedOption && option !== examQuestion.correctOption"
                                                            class="result-icon">
                                                            <i class="fas fa-times" style="color: red"></i>
                                                        </div>

                                                    </label>
                                                </li>
                                                <div v-if="examQuestion.isGraded && examQuestion.questionExplanation"
                                                    class="feedback-section">
                                                    <button @click="toggleExplanation(index)"
                                                        class="btn btn-link btn-sm mt-2 link-offset-3">
                                                        {{ showExplanation[index] ?
                                                            'Hide Explanation' : 'Show Explanation' }}
                                                    </button>
                                                    <div v-if="showExplanation[index]" class="explanation"
                                                        v-html="examQuestion.questionExplanation"></div>
                                                </div>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <!-- Show TranScript -->
                        <button v-if="isGroupAnswered(groupQuestions) && groupQuestions[0].questionScript"
                            @click="toggleGroupScript(groupId)" class="btn btn-link btn-sm link-offset-3">
                            {{ showGroupScript[groupId] ? 'Hide TranScript' : 'Show TranScript' }}
                        </button>
                        <div v-if="isGroupAnswered(groupQuestions) && showGroupScript[groupId]" class="transcript mb-2"
                            v-html="groupQuestions[0].questionScript">
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none border-0">
        <div class="card specific-card border-0 shadow" style="position: sticky; top: 95px; z-index: 1;">
            <div class="card-body border-0">
                <div class="countdown-section mb-2">
                    <p>
                        <span style="font-size:22px;">&#9200;</span>
                        <span style="color: green; font-size: 24px">{{ formatTime(countdown) }}</span>
                    </p>
                </div>
                <h5 class="fw-normal fs-6 text-center bg-info text-white p-2 border rounded-4">Question Palette</h5>
                <div class="question-list-section lesson-content">
                    <div v-for="(part, partIndex) in parts" :key="partIndex">
                        <h6 class="fw-normal fs-6 ms-3 text-start mt-2" @click="selectPart(part)"> <i
                                class="fa-solid fa-chevron-right me-2" v-show="selectedPart === part"></i>Part {{ part }}
                        </h6>

                        <!-- Question Palette -->
                        <div class="question-buttons mb-2 mx-2 " style="display: flex; flex-wrap: wrap;">
                            <!-- Tính toán STT -->
                            <div v-for="(examQuestion) in groupedQuestionsByPart[part]" :key="examQuestion.id">
                                <button @click="scrollToQuestion(part, examQuestion.orderNumber)" :class="{
                                    correct: examQuestion.answered && examQuestion.selectedOption === examQuestion.correctOption,
                                    incorrect: examQuestion.answered && examQuestion.selectedOption !== examQuestion.correctOption,
                                    selected: examQuestion.selectedOption !== null,
                                    graded: examQuestion.isGraded,
                                }" :style="{
                                    backgroundColor: examQuestion.selectedOption
                                        ? examQuestion.isGraded
                                            ? examQuestion.selectedOption === examQuestion.correctOption
                                                ? 'green'
                                                : 'red'
                                            : 'orange'
                                        : '',
                                    color: examQuestion.selectedOption ? 'white' : 'black',
                                    }" class="equal-size-button">
                                    <i class="fa-solid fa-flag flag-icon text-danger" v-if="isFlagged(examQuestion)"
                                        v-show="!examQuestion.isGraded"></i>
                                    <span class="order-number">
                                        {{ examQuestion.orderNumber }}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="d-flex justify-content-center">
                    <div class="score" v-if="hasSubmitted">
                        <i class="fas fa-square" style="color: green"></i> {{ getCorrectCount }}/{{examQuestions.length }}
                        <i class="fas fa-square ms-2" style="color: red"></i> {{ getIncorrectCount }}/{{examQuestions.length }}
                    </div>
                    <button v-else class="button" @click="submitAnswers">
                        Nộp bài
                    </button>
                </div>
            </div>
            <router-link v-if="hasSubmitted" :to="{ name: 'exam-result', params: { userExamId: userExamId } }"
                class="fw-normal fs-6 text-center bg-info text-white p-2 border text-decoration-none">
                Đi tới trang đánh giá kết quả <i class="fa-solid fa-right-from-bracket ms-2"></i>
            </router-link>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
    props: {
        examQuestions: Array,
        submitAnswers: Function,
        parts: Array,
        groupedQuestionsByPart: Object,
        hasSubmitted: Boolean,
        formatTime: Function,
        countdown: Number,
        userExamId: Number,
        goalScore: Number
    },

    setup(props) {

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

        const showGroupScript = ref({});
        const toggleGroupScript = (groupId) => {
            showGroupScript.value[groupId] = !showGroupScript.value[groupId];
            console.log(showGroupScript.value[groupId])
        };

        const showExplanation = ref({});
        const toggleExplanation = (index) => {
            showExplanation.value[index] = !showExplanation.value[index];
        };

        const allParts = [1, 2, 3, 4, 5, 6, 7]; // Danh sách 7 các phần
        const selectedPart = ref(1);
        const selectPart = (part) => {
            selectedPart.value = part;
            console.log(part)
            window.scrollTo(0, 0);
        };

        const filteredQuestionsByPart = computed(() => {
            return props.examQuestions.filter((examQuestion) => {
                return examQuestion.questionPart === selectedPart.value;
            });
        });
        const groupQuestionsByAudioOrPassage = (examQuestions) => {
            const grouped = {};
            for (const examQuestion of examQuestions) {
                const groupKey = examQuestion.questionAudio || examQuestion.questionPassage || 'default';
                if (!grouped[groupKey]) {
                    grouped[groupKey] = [];
                }
                grouped[groupKey].push(examQuestion);
            }
            console.log(grouped)
            return grouped;
        };
        // Tính toán thay đổi part
        const groupedQuestions = computed(() => groupQuestionsByAudioOrPassage(filteredQuestionsByPart.value));
        console.log(groupedQuestions.value)


        const isGroupAnswered = (groupQuestions) => {
            return groupQuestions.every((examQuestion) => examQuestion.isGraded);
        };

        const getOptions = (examQuestion) => {
            // Phần 2
            if (examQuestion.orderNumber >= 7 && examQuestion.orderNumber <= 31) {
                return [examQuestion.optionA, examQuestion.optionB, examQuestion.optionC];
            }
            return [examQuestion.optionA, examQuestion.optionB, examQuestion.optionC, examQuestion.optionD];
        };

        const shouldDisplayAudio = (examQuestion) => {
            return examQuestion.questionAudio !== null && examQuestion.questionAudio !== '';
        };
        const shouldDisplayImage = (examQuestion) => {
            return examQuestion.questionImage !== null && examQuestion.questionImage !== '';
        };
        const shouldDisplayPassage = (examQuestion) => {
            return examQuestion.questionPassage !== null && examQuestion.questionPassage !== '';
        };
        const getOptionClass = (examQuestion, option) => {
            return {
                'highlight-row': option === examQuestion.selectedOption,
            };
        };

        const getCorrectCount = computed(() => {
            return props.examQuestions.filter((q) => q.answered && q.selectedOption === q.correctOption).length;
        });
        const getIncorrectCount = computed(() => {
            return props.examQuestions.filter((q) => q.answered && q.selectedOption !== q.correctOption).length;
        });

        const scrollToQuestion = (part, index) => {
            const examQuestionElement = document.getElementById(`examQuestion-part-${part}-${index}`);
            if (examQuestionElement) {
                examQuestionElement.scrollIntoView({ behavior: "smooth" });
            }
        };

        const flaggedQuestions = ref([]); // Danh sách các câu hỏi đã được cắm cờ
        const isFlagged = (examQuestion) => {
            return flaggedQuestions.value.includes(examQuestion);
        };
        const toggleFlag = (examQuestion) => {
            if (isFlagged(examQuestion)) {
                // Cắm cờ => Gỡ cờ 
                flaggedQuestions.value = flaggedQuestions.value.filter(
                    (question) => question !== examQuestion
                );
            } else {
                // Gỡ cờ => Cắm cờ  (thêm vào danh sách)
                flaggedQuestions.value.push(examQuestion);
            }
        };
        const markAsListened = (question) => {
            question.hasListened = true;
        };

        return {
            showGroupScript,
            toggleGroupScript,
            showExplanation,
            toggleExplanation,
            groupedQuestions,
            isGroupAnswered,
            getImageUrl,
            getAudioUrl,
            getOptions,
            getOptionClass,
            scrollToQuestion,
            getCorrectCount,
            getIncorrectCount,
            shouldDisplayImage,
            shouldDisplayPassage,
            shouldDisplayAudio,
            selectedPart,
            selectPart,
            allParts,
            isFlagged,
            toggleFlag,
            markAsListened,

        };
    },
});
</script>

<style scoped>
@import "@/assets/test.css";
.modal.zoom .modal-dialog {
    transition: transform 0.2s ease-out;
    transform: scale(0.4);
}
.modal.zoom.show .modal-dialog {
    transform: scale(1);
}
.flag-icon {
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 10000;
    font-size: 20px;
    color: #000;
}
</style>