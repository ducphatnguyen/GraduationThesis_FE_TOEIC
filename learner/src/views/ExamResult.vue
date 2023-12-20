<template>
    <!-- Bảng điểm TOEIC 2023 -->
    <div class="modal zoom" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Bảng điểm thi TOEIC 2023</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row ">
                    <div class="col-6">
                        <img class="my-3" src="../assets/bang-diem-toeic-1.jpg" alt="" loading="lazy" width="100%"
                            height="100%">
                    </div>
                    <div class="col-6">
                        <img class="my-3" src="../assets/bang-diem-toeic-2.jpg" alt="" loading="lazy" width="100%"
                            height="100%">
                    </div>
                </div>
                <p class="text-center"><i class="fa-solid fa-square text-warning me-2"></i> Nguồn: Anh ngữ Mshoa Toeic</p>
            </div>
        </div>
    </div>

    <!-- Modal từ điển -->
    <div class="modal zoom" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel2">Tra cứu từ điển</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex justify-content-center">
                    <div id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <span class="accordion-button-text"></span>
                                    <i class="fa-solid fa-book-open"></i>
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show"
                                data-bs-parent="#accordionExample">
                                <div class="accordion-body mb-2">
                                    <div class="card specific-card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div>
                                                    <select class="form-select" v-model="translationMode"
                                                        @change="setTranslationMode">
                                                        <option value="en-vi">Dịch tiếng Anh sang tiếng Việt
                                                        </option>
                                                        <option value="vi-en">Dịch tiếng Việt sang tiếng Anh
                                                        </option>
                                                    </select>
                                                </div>

                                                <div class="col-md-6">
                                                    <h3 class="text-center">Dịch thuật</h3>
                                                    <div class="form-group">
                                                        <div class="position-relative">
                                                            <textarea rows="7" cols="33" class="form-control"
                                                                v-model="textToTranslate"
                                                                placeholder="Nhập văn bản cần dịch"
                                                                :maxlength="5000"></textarea>
                                                            <small
                                                                class="position-absolute bottom-0 end-0 text-danger me-2 mb-2">
                                                                {{ characterCount }} / 5000
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button class="btn btn-primary mt-2" id="translate-button"
                                                            @click="isTranslating ? stopTranslationSpeechRecognition() : startTranslationSpeechRecognition()">
                                                            <i v-if="!isTranslating"
                                                                class="fas fa-microphone text-white"></i>
                                                            <i v-else class="fas fa-stop text-danger"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <h3 class="text-center">Bản dịch</h3>
                                                    <div class="form-group">
                                                        <textarea rows="7" cols="33" class="form-control"
                                                            v-model="translatedTextTemp" placeholder="Bản dịch"
                                                            readonly></textarea>
                                                    </div>
                                                    <div>
                                                        <button class="btn btn-primary mt-2" id="translate-button"
                                                            @click="isPlaying ? stopConvertedTextSpeech() : convertTranslatedTextToSpeech()">
                                                            <i v-if="!isPlaying" class="fas fa-headphones text-white"></i>
                                                            <i v-else class="fas fa-stop text-danger"></i>
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
                </div>
            </div>
        </div>
    </div>

    <!-- Phân tích chi tiết điểm số -->
    <div class="bg-test">
        <div class="container-fluid">
            <div class="row mt-3">
                <div class="col-lg col-md col-sm">
                    <div class="alert alert-primary" role="alert">
                        <i class="fa-solid fa-circle-exclamation me-3"></i>Đánh giá điểm chỉ dành riêng cho Full Test 200
                        câu.
                    </div>

                    <div class="card specific-card border-0 shadow-lg mb-4">
                        <div class="card-body">

                            <div class="row">

                                <!-- Card 1 -->
                                <div class="col-md-3">
                                    <div class="card specific-card radius-10 border-start border-0 border-3 border-success card-with-effect"
                                        @click="toggleEffect">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <p class="mb-0 text-secondary">Trả lời đúng</p>
                                                    <h4 class="my-1 text-success">{{ userExamById.numCorrectAnswers }}/{{
                                                        userExamById.numCorrectAnswers + userExamById.numWrongAnswers +
                                                        userExamById.numSkippedQuestions }}</h4>

                                                </div>
                                                <div
                                                    class="widgets-icons-2 rounded-circle bg-gradient-scooter text-white ms-auto">
                                                    <i class="fa-solid fa-circle-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card 2 -->
                                <div class="col-md-3">
                                    <div
                                        class="card specific-card radius-10 border-start border-0 border-3 border-danger card-with-effect">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <p class="mb-0 text-secondary">Trả lời sai</p>
                                                    <h4 class="my-1 text-danger">{{ userExamById.numWrongAnswers }}/{{
                                                        userExamById.numCorrectAnswers + userExamById.numWrongAnswers +
                                                        userExamById.numSkippedQuestions }}</h4>

                                                </div>
                                                <div
                                                    class="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                                                    <i class="fa-solid fa-circle-xmark"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card 3 -->
                                <div class="col-md-3">
                                    <div
                                        class="card specific-card radius-10 border-start border-0 border-3 border-secondary card-with-effect">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <p class="mb-0 text-secondary">Bỏ qua</p>
                                                    <h4 class="my-1 text-secondary">{{ userExamById.numSkippedQuestions
                                                    }}/{{
                                                    userExamById.numCorrectAnswers + userExamById.numWrongAnswers +
                                                    userExamById.numSkippedQuestions }}</h4>
                                                </div>
                                                <div
                                                    class="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                                                    <i class="fa-solid fa-minus"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card 4 -->
                                <div class="col-md-3">
                                    <div
                                        class="card specific-card radius-10 border-start border-0 border-3 border-warning card-with-effect">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <p class="mb-0 text-secondary">Hoàn thành trong</p>
                                                    <h4 class="my-1 text-warning">{{
                                                        userExamById.completionTime
                                                    }}</h4>
                                                </div>
                                                <div
                                                    class="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto">
                                                    <i class="fa-solid fa-clock"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Bảng điểm -->
                            <div class="card specific-card border-0">
                                <div class="row g-0">
                                    <div class="col-4 d-flex justify-content-center align-items-center"
                                        style="background-image: url('https://media1.giphy.com/media/EoMXPKIN8b5jkYgT5e/giphy.gif?cid=6c09b952yv36lu2ev6randx9grip9luwzjty5ahdgt21vk5p&ep=v1_stickers_related&rid=giphy.gif&ct=s');  background-size: 200px 150px; background-repeat: no-repeat;">
                                        <CircleProgress :percent="percent" :viewport="true" :is-gradient="true" />
                                        <p class="score-value">{{ userExamById.totalScore }}/{{ maxScore }}</p>
                                        <p class="total-score">TOTAL SCORE</p>
                                    </div>

                                    <div class="col-8" v-if="userExamById">
                                        <div class="card-footer border-0 d-flex justify-content-center">
                                            <a href="#" class="btn btn-light"> <span style="font-size:20px">🎯 Mục tiêu: {{
                                                userExamById.goalScore }}</span></a>
                                        </div>

                                        <div class="card-body border mt-3 me-3">
                                            <h5 class="card-title"><i class="fa-solid fa-headphones mb-5"></i> LISTENING:
                                                {{ userExamById.numListeningCorrectAnswers }}/100
                                            </h5>

                                            <div class="barWrapper">
                                                <!-- Progress tooltip phải nằm phía trên đây -->
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar"
                                                        :aria-valuenow="(userExamById.listeningScore * 100 / maxListeningScore)"
                                                        aria-valuemin="0" aria-valuemax="100"
                                                        :style="{ width: (userExamById.listeningScore * 100 / maxListeningScore) + '%' }">
                                                    </div>
                                                </div>
                                                <div class="custom-tooltip px-2"
                                                    :style="{ left: (userExamById.listeningScore * 100 / maxListeningScore) + '%' }">
                                                    {{
                                                        (userExamById.listeningScore) }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col d-flex justify-content-start">
                                                    <span>0</span>
                                                </div>
                                                <div class="col d-flex justify-content-end">
                                                    <span>495</span>
                                                </div>
                                            </div>


                                        </div>
                                        <div class="card-body border me-3">
                                            <h5 class="card-title"><i class="fa-solid fa-book-open-reader mb-5"></i>
                                                READING:
                                                {{ userExamById.numReadingCorrectAnswers }}/100</h5>

                                            <div class="barWrapper">
                                                <!-- Progress tooltip phải nằm phía trên đây -->
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar"
                                                        :aria-valuenow="(userExamById.readingScore * 100 / maxReadingScore)"
                                                        aria-valuemin="0" aria-valuemax="100"
                                                        :style="{ width: (userExamById.readingScore * 100 / maxReadingScore) + '%' }">
                                                    </div>
                                                </div>
                                                <div class="custom-tooltip px-2"
                                                    :style="{ left: (userExamById.readingScore * 100 / maxReadingScore) + '%' }">
                                                    {{
                                                        (userExamById.readingScore) }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col d-flex justify-content-start">
                                                    <span>0</span>
                                                </div>
                                                <div class="col d-flex justify-content-end">
                                                    <span>495</span>
                                                </div>
                                            </div>

                                        </div>

                                        <div>
                                            <!-- Button trigger modal -->
                                            <button type="button" class="btn btn-link link-offset-2" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal">
                                                Xem chi tiết
                                                cách tính
                                                điểm 2023
                                            </button>
                                        </div>
                                        <p class=""><i class="fa-solid fa-square text-warning me-2"></i> Lưu ý: Bảng điểm
                                            Toeic 2023 chỉ mang tính chất tham khảo, điểm số khi thi chính thức có thể chênh
                                            lệch 5-20 điểm</p>

                                        <p v-if="userExamById.totalScore < userExamById.goalScore"><i
                                                class="fa-solid fa-square text-success me-2"></i> Nhận xét: Bạn chưa
                                            vượt qua mục tiêu, cố gắng thêm nhé !!!</p>
                                        <p v-else><i class="fa-solid fa-square text-success me-2"></i> Nhận xét: Chúc mừng
                                            bạn, bạn có thể đặt mục tiêu mới cho bản thân để rèn luyện thêm nữa nhé !!!</p>

                                    </div>
                                </div>
                            </div>

                            <!-- Phân tích chi tiết câu hỏi từng phần -->
                            <div class="row my-3">
                                <div class="row">
                                    <div class="col">
                                        <h2>Phân tích chi tiết</h2>
                                    </div>
                                    <div class="col d-flex justify-content-end" >
                                        <router-link :to="{ name: 'improve.show' }">
                                            <button class="glowing-button ms-2">CẢI THIỆN NGAY</button>
                                        </router-link>
                                    </div>

                                </div>

                                <div class="col-lg col-md col-sm">
                                    <div class="card specific-card border-0 shadow-lg mb-4">
                                        <div class="card-body">
                                            <div class="row">

                                                <div class="col">
                                                    <table class="table text-center table-hover shadow">

                                                        <thead class="text-center shadow">
                                                            <tr class="align-middle">
                                                                <th
                                                                    style="background-color: white; color: #052649; text-align:center;">
                                                                    <button class="btn btn-success rounded-5 disabled">Phân loại câu hỏi</button>
                                                                </th>
                                                                <th
                                                                    style="background-color: white; color: #052649; text-align:center;">
                                                                    <i class="fa-solid fa-circle-check text-success"></i>
                                                                </th>
                                                                <th
                                                                    style="background-color: white; color: #052649; text-align:center;">
                                                                    <i class="fa-solid fa-circle-xmark text-danger"></i>
                                                                </th>
                                                                <th
                                                                    style="background-color: white; color: #052649; text-align:center;">
                                                                    <i class="fa-solid fa-minus text-secondary"></i>
                                                                </th>
                                                                <th
                                                                    style="background-color: white; color: #052649; text-align:center;">
                                                                    <i class="fa-solid fa-bullseye"></i>
                                                                </th>
                                                                <th
                                                                    style="background-color: white; color: #052649; text-align:center;">
                                                                    Danh sách câu hỏi</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            <tr class="table-row shadow-on-hover"
                                                                v-for="(questionGroup, index) in questionGroups"
                                                                :key="index">
                                                                <td class="align-middle">{{ index }}</td>
                                                                <td class="align-middle">{{
                                                                    calculateCorrectCount(questionGroup) }}</td>
                                                                <td class="align-middle">{{
                                                                    calculateIncorrectCount(questionGroup) }}</td>
                                                                <td class="align-middle">{{
                                                                    calculateUnansweredCount(questionGroup) }}</td>
                                                                <td class="align-middle">{{
                                                                    calculatePercentage(questionGroup) }}%</td>

                                                                <td class="align-middle text-start">
                                                                    <button class="btn button5 my-2 ms-2"
                                                                        v-for="(question, qIndex) in questionGroup"
                                                                        :key="qIndex"
                                                                        :style="{ backgroundColor: question.isCorrect === 1 ? '#70FF85' : (question.isCorrect === 0 ? '#FF7070' : '#e8f2ff'), color: '#35509a', width: '50px', fontSize: '13px', fontWeight: 'bold' }">
                                                                        {{ question.examQuestion.orderNumber }}
                                                                    </button>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Đáp án và giải thích chi tiết -->
                            <div class="row my-3" id="reviewAnswers" >
                                <h2>Đáp án chi tiết</h2>
                                <div class="col-lg col-md col-sm">
                                    <div class="card specific-card border-0 shadow-lg mb-4">
                                        <div class="card-body">
                                            <div class="mb-3 d-flex justify-content-center">
                                                <button v-for="part in allParts" :key="part" type="button"
                                                    class="button ms-4" @click="selectPart(part)"
                                                    :class="{ 'active-part': selectedPart === part }">
                                                    Phần {{ part }}
                                                </button>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12" v-for="(groupQuestions, groupId) in groupedQuestions"
                                                    :key="groupId">

                                                    <div class="audio-container mt-5 mb-2"
                                                        v-if="shouldDisplayAudio(groupQuestions[0])">
                                                        <audio controls style="width:400px">
                                                            <source
                                                                :src="getAudioUrl(groupQuestions[0].examQuestion.questionAudio)"
                                                                type="audio/mpeg" />
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
                                                                <div class="image-container"
                                                                    v-if="shouldDisplayImage(groupQuestions[0])">
                                                                    <img :src="getImageUrl(groupQuestions[0].examQuestion.questionImage)"
                                                                        style="width: 400px" alt="Luyện thi Listening TOEIC"
                                                                        class="question-image" loading="lazy" />
                                                                </div>
                                                            </div>

                                                            <div class="audio-image-container mt-5">
                                                                <div class="audio-container mb-2"
                                                                    v-if="shouldDisplayPassage(groupQuestions[0])">
                                                                    <p
                                                                        v-html="groupQuestions[0].examQuestion.questionPassage">
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div class="col-md">
                                                            <!-- <div :class="{ 'scrollable-container': groupQuestions.length >= 5 }"> -->
                                                            <div :class="{ 'scrollable-container': shouldDisplayPassage(groupQuestions[0]) && groupQuestions.length >= 4}">
                                                                <div v-for="(question, index) in groupQuestions"
                                                                    :key="index" class="ms-3">
                                                                    <div class="question">
                                                                        <span class="badge text-bg-secondary my-2"
                                                                            style="font-size:14px">{{
                                                                                question.examQuestion.questionType }}</span>
                                                                        <div class="row">
                                                                            <ul class="">
                                                                                <button class="btn button5 my-2"
                                                                                    style="background-color: #e8f2ff; color: #35509a; width: 60px;">{{
                                                                                        question.examQuestion.orderNumber
                                                                                    }}</button>

                                                                                <span class="ms-1">{{
                                                                                    question.examQuestion.questionContent
                                                                                }}</span>

                                                                                <li v-for="(option, optionIndex) in getOptions(question)"
                                                                                    style="list-style-type:none"
                                                                                    :key="optionIndex"
                                                                                    :class="getOptionClass(question, option)">
                                                                                    <label class="form-check-label">
                                                                                        <input class="form-check-input"
                                                                                            type="radio" :value="option"
                                                                                            v-model="question.selectedOption"
                                                                                            disabled
                                                                                            :name="'flexRadioDefault-' + question.examQuestion.examQuestionId" />
                                                                                        {{ option }}
                                                                                        <div v-if="option === question.examQuestion.correctOption"
                                                                                            class="result-icon">
                                                                                            <i class="fas fa-check"
                                                                                                style="color: green"></i>
                                                                                        </div>
                                                                                        <div v-if="option === question.selectedOption && option !== question.examQuestion.correctOption"
                                                                                            class="result-icon">
                                                                                            <i class="fas fa-times"
                                                                                                style="color: red"></i>
                                                                                        </div>

                                                                                    </label>
                                                                                </li>

                                                                                <div v-if="question.examQuestion.questionExplanation"
                                                                                    class="feedback-section">
                                                                                    <button
                                                                                        @click="toggleExplanation(index)"
                                                                                        class="btn btn-link btn-sm mt-2 link-offset-3">
                                                                                        {{ showExplanation[index] ?
                                                                                            'Hide Explanation' :
                                                                                            'Show Explanation' }}
                                                                                    </button>
                                                                                    <div v-if="showExplanation[index]"
                                                                                        class="explanation"
                                                                                        v-html="question.examQuestion.questionExplanation">
                                                                                    </div>
                                                                                </div>

                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Show groupScript if all questions in the group are answered -->
                                                    <button v-if="groupQuestions[0].examQuestion.questionScript"
                                                        @click="toggleGroupScript(groupId)"
                                                        class="btn btn-link btn-sm link-offset-3">
                                                        {{ showGroupScript[groupId] ?
                                                            'Hide TranScript' :
                                                            'ShowTranScript' }}
                                                    </button>
                                                    <div v-if="showGroupScript[groupId]" class="transcript mb-2"
                                                        v-html="groupQuestions[0].examQuestion.questionScript">
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

                <div class="col-lg-4 col-md-4 col-sm-4 text-decoration-none border-0">
                    <div class="card specific-card border-0 shadow" style="position: sticky; top: 95px; z-index: 1;">
                        <router-link :to="{ name: 'learningroute' }"
                            class="button d-flex justify-content-center mb-3 border rounded-4">
                            Quay lại kết quả luyện thi
                        </router-link>
                        <div class="card-header border-0 text-center">
                            Thông tin kỳ thi
                        </div>
                        <div class="card-body border-0">
                            <p>+ Bộ đề thi: ETS 2023</p>
                            <p v-if="userExamById.exam">+ {{ userExamById.exam.examName }}</p>
                            <p v-if="userExamById.exam">+ {{ userExamById.exam.examDuration / 60 }} phút</p>
                        </div>
                        <div class="row">
                            <div class="col d-flex justify-content-center">
                                <div class="button border rounded-4" @click="scrollToReviewQuestion()">
                                    Xem đáp án
                                </div>
                            </div>
                            <div class="col d-flex justify-content-center">
                                <router-link :to="{ name: 'exam-fulltest' }">
                                    <div class="button border rounded-4">
                                        Tiếp tục thi
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div class="card-footer border-0">
                            <button type="button" class="btn btn-link link-offset-2" data-bs-toggle="modal"
                                data-bs-target="#exampleModal2">
                                <i class="fa-solid fa-chevron-right me-2"></i> Tra cứu từ điển
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted, computed, watch } from 'vue';

import UserExamService from "@/services/user_exam.service";
import UserExamQuestionService from "@/services/user_exam_question.service";

import CircleProgress from 'vue3-circle-progress';
import "vue3-circle-progress/dist/circle-progress.css";

export default defineComponent({
    props: {
        userExamId: { type: String, required: true }
    },
    components: {
        CircleProgress,
    },
    setup(props) {
        
        // console.log(props.examQuestions)
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

        // Từ điển dịch thuật
        const translationMode = ref("en-vi");
        const translatedSpeechSynthesis = window.speechSynthesis;
        const translatedSpeechUtterance = new SpeechSynthesisUtterance();

        const textToTranslate = ref("");
        const characterCount = computed(() => {
            return textToTranslate.value.length;
        });

        const translatedTextTemp = ref("");
        const translatedText = ref("");
        const setTranslationMode = () => {
            translateText();
            translatedText.value = translatedTextTemp.value;
        };

        const translateText = () => {
            const apiKey = "AIzaSyD-7uWTjTodZba7ky7mgfSgnVxAX_opoh8";
            const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

            if (textToTranslate.value.trim() !== "") {
                const sourceLang = translationMode.value.split("-")[0];
                const targetLang = translationMode.value.split("-")[1];
                const data = {
                    q: textToTranslate.value,
                    source: sourceLang,
                    target: targetLang,
                };

                fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((result) => {
                        const translatedResult = result.data.translations[0].translatedText;
                        translatedTextTemp.value = translatedResult;
                        console.log(translatedTextTemp.value);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            } else {
                translatedTextTemp.value = "";
            }
        };

        const isPlaying = ref(false);
        const convertTranslatedTextToSpeech = () => {
            if (translatedTextTemp.value.trim() !== "") {
                translatedSpeechUtterance.text = translatedTextTemp.value;
                translatedSpeechSynthesis.speak(translatedSpeechUtterance);
                isPlaying.value = true;
            } else {
                alert("Không có văn bản để đọc phiên dịch.");
            }
        };
        const stopConvertedTextSpeech = () => {
            if (translatedSpeechSynthesis.speaking) {
                translatedSpeechSynthesis.cancel();
                isPlaying.value = false;
            }
        };
        const stopTranslatedSpeech = () => {
            if (translatedSpeechSynthesis.speaking) {
                translatedSpeechSynthesis.cancel();
            }
            isPlaying.value = false;
        };

        const translationRecognition = ref(null);
        const isTranslating = ref(false);
        const startTranslationSpeechRecognition = () => {
            translationRecognition.value = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            translationRecognition.value.lang = "en-US";
            translationRecognition.value.interimResults = true;

            isTranslating.value = true;

            translationRecognition.value.addEventListener("result", (event) => {
                const lastResultIndex = event.results.length - 1;
                const transcript = event.results[lastResultIndex][0].transcript;
                textToTranslate.value = transcript;
            });
            translationRecognition.value.addEventListener("end", () => {
                translationRecognition.value.stop();
                isTranslating.value = false;
            });
            translationRecognition.value.start();
        };

        const stopTranslationSpeechRecognition = () => {
            translationRecognition.value.stop();
            isTranslating.value = false;
        };

        onMounted(() => {
            translateText();
            translatedSpeechSynthesis;
            translatedSpeechUtterance;
        });
        watch(textToTranslate, () => {
            translateText();
        });

        // Kết quả thi
        const percent = ref(0);
        const maxScore = ref(990);
        const maxListeningScore = ref(495);
        const maxReadingScore = ref(495);
        const userExamById = ref([]);
        const retrieveUserExamById = async () => {
            try {
                console.log(props.userExamId)
                userExamById.value = await UserExamService.getUserExamById(props.userExamId);
                console.log(userExamById.value)
                userExamById.value.completionTime = formatTime(userExamById.value.completionTime); // Định dạng thời gian
                console.log(userExamById.value.completionTime)
                percent.value = (userExamById.value.totalScore / maxScore.value) * 100;
                // totalScore.value = userExamById.value.totalScore;
            } catch (error) {
                console.log(error);
            }
        };

        // Phân tích chi tiết từng phần
        const questionGroups = ref([]);
        const getQuestionsByUserExamIdGroupedByType = async () => {
            try {
                console.log(props.userExamId);
                questionGroups.value = await UserExamQuestionService.getQuestionsByUserExamIdGroupedByType(props.userExamId);
                console.log(questionGroups.value)

            } catch (error) {
                console.log(error);
            }
        };
        const calculateCorrectCount = (questions) => {
            return questions.filter((question) => question.isCorrect === 1).length;
        };
        const calculateIncorrectCount = (questions) => {
            return questions.filter((question) => question.isCorrect === 0).length;
        };
        const calculateUnansweredCount = (questions) => {
            return questions.filter((question) => question.isCorrect === null).length;
        };
        const calculatePercentage = (questions) => {
            const correctCount = calculateCorrectCount(questions);
            const inCorrectCount = calculateIncorrectCount(questions);
            const totalCount = correctCount + inCorrectCount;
            if (totalCount === 0) {
                return 0;
            }
            return ((correctCount / totalCount) * 100).toFixed(2);
        };

        // Cuộn xuống chi tiết đáp án
        const scrollToReviewQuestion = () => {
            const examQuestionElement = document.getElementById(`reviewAnswers`);
            if (examQuestionElement) {
                examQuestionElement.scrollIntoView({ behavior: "smooth" });
            }
        };
        // Đáp án chi tiết
        const questions = ref([]);
        const retrieveQuestionsByUserExamId = async () => {
            try {
                console.log(props.userExamId);
                questions.value = await UserExamQuestionService.getQuestionsByUserExamId(props.userExamId);
                console.log(questions.value)
            } catch (error) {
                console.log(error);
            }
        };
        const showGroupScript = ref({});
        const toggleGroupScript = (groupId) => {
            showGroupScript.value[groupId] = !showGroupScript.value[groupId];
        };
        const showExplanation = ref({});
        const toggleExplanation = (index) => {
            showExplanation.value[index] = !showExplanation.value[index];
        };

        const allParts = [1, 2, 3, 4, 5, 6, 7];
        const selectedPart = ref(1);
        const selectPart = (part) => {
            selectedPart.value = part;
        };
        const filteredQuestionsByPart = computed(() => {
            console.log(questions.value);
            return questions.value.filter((question) => {
                return question.examQuestion.questionPart === selectedPart.value;
            });
        });
        const groupedQuestions = computed(() => groupQuestionsByAudioOrPassage(filteredQuestionsByPart.value));
        const groupQuestionsByAudioOrPassage = (questions) => {
            const grouped = {};
            for (const question of questions) {
                const groupKey = question.examQuestion.questionAudio || question.examQuestion.questionPassage || 'default';
                if (!grouped[groupKey]) {
                    grouped[groupKey] = [];
                }
                grouped[groupKey].push(question);
            }
            console.log(grouped)
            return grouped;
        };


        const getOptions = (question) => {
            if (question.examQuestion.orderNumber >= 7 && question.examQuestion.orderNumber <= 31) {
                return [question.examQuestion.optionA, question.examQuestion.optionB, question.examQuestion.optionC];
            }
            return [question.examQuestion.optionA, question.examQuestion.optionB, question.examQuestion.optionC, question.examQuestion.optionD];
        };
        const getOptionClass = (question, option) => {
            return {
                'highlight-row': option === question.examQuestion.selectedOption,
            };
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
        const shouldDisplayAudio = (question) => {
            console.log(question)
            return question.examQuestion.questionAudio !== null && question.examQuestion.questionAudio !== '';
        };
        const shouldDisplayImage = (question) => {
            return question.examQuestion.questionImage !== null && question.examQuestion.questionImage !== '';
        };
        const shouldDisplayPassage = (question) => {
            return question.examQuestion.questionPassage !== null && question.examQuestion.questionPassage !== '';
        };
        onMounted(() => {
            retrieveUserExamById();
            retrieveQuestionsByUserExamId();
            getQuestionsByUserExamIdGroupedByType();
        });


        return {
            textToTranslate,
            translatedText,
            translatedTextTemp,
            characterCount,
            setTranslationMode,
            translateText,
            convertTranslatedTextToSpeech,
            stopConvertedTextSpeech,
            stopTranslatedSpeech,
            startTranslationSpeechRecognition,
            stopTranslationSpeechRecognition,
            isTranslating,
            isPlaying,
            translationMode,

            maxScore,
            percent,
            userExamById,
            maxListeningScore,
            maxReadingScore,
            formatTime,
            calculateCorrectCount,
            calculateIncorrectCount,
            calculateUnansweredCount,
            calculatePercentage,

            scrollToReviewQuestion,
            questions,
            questionGroups,
            showGroupScript,
            toggleGroupScript,
            showExplanation,
            toggleExplanation,
            groupedQuestions,
            getImageUrl,
            getAudioUrl,
            getOptions,
            getOptionClass,
            shouldDisplayImage,
            shouldDisplayPassage,
            shouldDisplayAudio,
            selectedPart,
            selectPart,
            allParts,

        };
    },
});
</script>
  
<style scoped>
@import "@/assets/test.css";
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

#translate-button {
    background-color: #052649;
}
.progress {
    border-radius: 0;
    overflow: visible;
}

.barWrapper {
    position: relative;
}

.progress-bar {
    background: rgb(23, 44, 60);
    -webkit-transition: width 1.5s ease-in-out;
    transition: width 1.5s ease-in-out;
    position: relative;
}

.custom-tooltip {
    position: absolute;
    bottom: 25px;
    /* Điều chỉnh vị trí tooltip*/
    transform: translateX(-50%);
    text-align: center;
    background-color: #eebf3f;
    color: rgb(23, 44, 66);
    font-weight: bold;
    font-size: 13px;
    padding: 5px;
    border-radius: 5px;
    display: block;
    /* Hiển thị tooltip luôn */
}
.custom-tooltip::before {
    content: '';
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #eebf3f transparent;
}

.row {
    margin-bottom: 20px;
}

h1 {
    font-weight: 700;
    color: #34447c;
}

.card {
    position: relative;
    transition: transform 0.3s;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(11, 21, 114, 0.1);
    border-radius: 10px;
}

.card.specific-card:hover .text-body-secondary {
    color: #666;
}

.card:hover .card-title {
    color: rgb(22, 4, 100);
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

button i {
    font-size: 20px;
    color: #000;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.bg-test {
    height: 100%;
    background-color: #f8f8fa;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.audio-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.feedback-section {
    margin-top: 10px;
}

.result-icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}

.button5 {
    border-radius: 50%;
    padding: 5px;
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

.modal.zoom .modal-dialog {
    transition: transform 0.2s ease-out;
    transform: scale(0.4);
}

.modal.zoom.show .modal-dialog {
    transform: scale(1);
}

.score-value {
    position: absolute;
    top: 47%;
    left: 17%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.total-score {
    position: absolute;
    top: 53%;
    left: 17%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
    color: rgb(177, 25, 25);
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
.bg-gradient-scooter {
    background: #17ead9;
    background: -webkit-linear-gradient(45deg, #17ead9, #0f6c3a) !important;
    background: linear-gradient(45deg, #07bb13, #076933) !important;
}

.bg-gradient-ohhappiness {
    background: #00b09b;
    background: -webkit-linear-gradient(45deg, #800909, #5f0f13) !important;
    background: linear-gradient(45deg, #ed1123, #e51f36) !important;
}
.bg-gradient-bloody {
    background: #f54ea2;
    background: -webkit-linear-gradient(45deg, #0d0417, #08031d) !important;
    background: linear-gradient(45deg, #8b8990, #7e7a7a) !important;
}
.bg-gradient-blooker {
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}
.active-part {
    background-color: yellow;
    color: black;
    font-weight: bold;
}
</style>