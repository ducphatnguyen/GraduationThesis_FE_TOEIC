<template>
    <div class="card card-body mt-3">
        <div><i class="fa-solid fa-lightbulb" style="color:orange"></i>{{ hintRefContent }}</div>
        <div>
            <span v-for="(char, index) in displayedWord" :key="index">
                {{ char }}&nbsp;
            </span>
            <div id="message" class="mt-2"
                :class="{ correct: messageText === 'Correct Letter', incorrect: messageText === 'Incorrect Letter' }">{{
                    messageText
                }}</div>
            <div id="chanceCount">Chances Left: {{ lossCount }}</div>
        </div>

        <div id="letter-container" class="mt-5">
            <button v-for="letter in alphabet" :key="letter" class="letters"
                :class="{ correct: correctLetters.includes(letter), incorrect: incorrectLetters.includes(letter) }"
                @click="checkLetter(letter)" :disabled="gameOver" :data-letter="letter">
                {{ letter }}
            </button>
        </div>
        <!-- <div id="word">{{ wordText }}</div> -->
        <div class="row mt-3">
            <div class="col d-flex justify-content-center">
                <div class="button mt-3" style="width:20%" id="start" @click="startGame">
                    <div>{{ startButtonText }}</div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-2">{{ resultText }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";
export default defineComponent({
    setup() {

        const options = {
            aroma: "Pleasing smell",
            pepper: "Salt's partner",
            halt: "put a stop to",
            jump: "Rise suddenly ",
            shuffle: "Mix cards up ",
            combine: "Add; Mix",
            chaos: "Total disorder",
            labyrinth: "Maze",
            disturb: "Interrupt; upset ",
            shift: "Move; Period of word",
            machine: "Device or appliance",
        };

        const words = Object.keys(options);

        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const correctLetters = ref([]);
        const incorrectLetters = ref([]);
        const gameOver = ref(false);
        const messageText = ref("");
        const resultText = ref("");
        const wordText = ref("");
        const hintRefContent = ref("");
        const startButtonText = ref("RESTART");
        const winCount = ref(0);
        const lossCount = ref(0);
        const randomWord = ref("");
        const randomHint = ref("");

        const generateRandomValue = (array) => {
            return Math.floor(Math.random() * array.length);
        };

        const startGame = () => {
            gameOver.value = false;
            init();
        };

        const stopGame = () => {
            gameOver.value = true;
        };

        const init = () => {
            // Reset các giá trị khi bắt đầu ván chơi mới
            correctLetters.value = [];
            incorrectLetters.value = [];
            winCount.value = 0;
            lossCount.value = 5;
            randomWord.value = "";
            randomHint.value = "";
            messageText.value = "";
            wordText.value = "";
            hintRefContent.value = "";
            resultText.value = "";
            generateWord();
        };

        const generateWord = () => {
            randomWord.value = words[generateRandomValue(words)];
            randomHint.value = options[randomWord.value];
            hintRefContent.value = ` ${randomHint.value}`;
            wordText.value = randomWord.value;
        };

        const checkLetter = (letter) => {
            const charArray = randomWord.value.toUpperCase().split("");

            if (charArray.includes(letter)) {
                charArray.forEach((char, index) => {
                    if (char === letter) {
                        correctLetters.value.push(char);
                        messageText.value = "Correct Letter";
                        winCount.value += 1;
                        if (winCount.value === charArray.length) {
                            resultText.value = "You Won";
                            startButtonText.value = "PLAY AGAIN";
                            stopGame();
                        }
                    }
                });
            } else {
                incorrectLetters.value.push(letter);
                lossCount.value -= 1;
                messageText.value = `Incorrect Letter`;
                if (lossCount.value === 0) {
                    wordText.value = `The word was: ${randomWord.value}`;
                    resultText.value = "You lose. Game Over :((";
                    stopGame();
                }
            }
        };

        const displayedWord = computed(() => {
            return randomWord.value
                .split('')
                .map((char) => (correctLetters.value.includes(char.toUpperCase()) ? char : '_'));
        });

        return {
            hintRefContent,
            displayedWord,
            messageText,
            lossCount,
            alphabet,
            correctLetters,
            incorrectLetters,
            gameOver,
            resultText,
            wordText,
            startButtonText,
            startGame,
            generateRandomValue,
            init,
            generateWord,
            checkLetter,
        };
    },
    mounted() {
        this.init();
    },
});
</script>

<style scoped>
#message {
    font-weight: bold;
    font-size: 18px;
    font-family: 'Times New Roman', Times, serif;
}

#message.correct {
    color: #008000;
    /* Green color for correct messages */
}

#message.incorrect {
    color: red;
    /* Red color for incorrect messages */
}

#letter-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8em 0.4em;
    justify-content: center;
}

#letter-container button {
    background-color: #ffffff;
    border: 2px solid #7786f5;
    color: #7786f5;
    outline: none;
    border-radius: 0.3em;
    cursor: pointer;
    height: 3em;
    width: 3em;
}

#letter-container .correct {
    background-color: #008000;
    color: #ffffff;
    border: 2px solid #008000;
}

#letter-container .incorrect {
    background-color: red;
    color: #ffffff;
    border: 2px solid red;
}

#chanceCount {
    margin: 1em 0;
    position: absolute;
    top: 0;
    right: 1em;
}

.button {
    position: relative;
    display: inline-block;
    margin-bottom: 15px;
}

.button div {
    color: white;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    text-decoration: none;
    background-color: #FFA12B;
    display: block;
    position: relative;
    padding: 10px 20px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-shadow: 0px 1px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=1px);

    -webkit-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    -moz-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.button div:active {
    top: 10px;
    background-color: #F78900;

    -webkit-box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
    -moz-box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3pxpx 0 #915100;
    box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
}

.button:after {
    content: "";
    height: 100%;
    width: 100%;
    padding: 4px;
    position: absolute;
    bottom: -15px;
    left: -4px;
    z-index: -1;
    background-color: #2B1800;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
</style>