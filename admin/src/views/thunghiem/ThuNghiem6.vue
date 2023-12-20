<template>
    <div class="container mt-5">
        <div class="text-center">
            <h1>TOEIC Preparation Test</h1>
            <button class="btn btn-primary" @click="startTest">Bắt đầu bài kiểm tra</button>
        </div>
        <div class="mt-4" v-if="showQuestion">
            <div class="alert alert-primary" role="alert">
                <p>{{ question }}</p>
            </div>
            <input class="form-control" v-model="userAnswer" />
            <button class="btn btn-primary mt-2" @click="checkAnswer">Kiểm tra</button>
        </div>

        <div class="mt-4" v-if="showAnswer">
            <div class="alert alert-success" role="alert">
                <p>Câu trả lời: {{ answer }}</p>
                <p>Giải thích: {{ explanation }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

const apiKey = "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";
axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
export default {
    data() {
        return {
            showQuestion: false,
            showAnswer: false,
            question: "",
            userAnswer: "",
            answer: "",
            explanation: "",
            testStarted: false,
        };
    },
    methods: {
        startTest() {
            this.testStarted = true;
            this.askQuestion();
        },
        askQuestion() {
            axios
                .post("https://api.openai.com/v1/engines/davinci/completions", {
                    prompt: "Please test me on the TOEIC preparation exam with the following format: 1. I will choose from 4 multiple-choice answers to the questions you ask 2. You will wait for me to choose my answer. 3. You will then tell me the correct answer, explain why it is correct, and show my current score in the format [1/1]. 4. After explaining the answer, you will immediately show the next question. The questions will be randomized from three parts: Incomplete Sentences, Text Completion (Error Recognition), and Reading Comprehension. In each Reading Comprehension question, please provide a full article. Let's begin with the first question now.",
                    max_tokens: 300,
                })
                .then((response) => {
                    this.question = response.data.choices[0].text;
                    this.showQuestion = true;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        checkAnswer() {
            axios
                .post("https://api.openai.com/v1/engines/davinci/completions", {
                    prompt: `The answer is: ${this.userAnswer}`,
                })
                .then((response) => {
                    this.answer = response.data.choices[0].text;
                    this.showAnswer = true;
                    // Tính điểm và giải thích ở đây
                    // Sau đó, gọi askQuestion() để tiếp tục với câu hỏi tiếp theo
                    this.askQuestion();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
  
  
  
  
  
  
  
  
  