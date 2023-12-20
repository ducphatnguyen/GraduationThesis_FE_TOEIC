<template>
    <div>
        <div class="mt-2 bg-white shadow-lg rounded-1">
            <nav>
                <ol class="cd-breadcrumb custom-separator">
                    <li class="current">
                        <i class="fa-solid fa-marker"></i>
                        <button class="btn btn-link text-decoration-none fw-bolder">Score Table</button>
                    </li>
                </ol>
            </nav>
        </div>

        <div class="row d-flex justify-content-center mx-2"
            style="background-image: url('https://anhdepfree.com/wp-content/uploads/2019/05/hinh-nen-background-dep-14.jpg');">
            <div class="button-container mt-3">
                <button type="button" :class="{ active: showListeningScore }" @click="switchToListeningScore">
                    LISTENING SCORE
                </button>
                <button type="button" :class="{ active: !showListeningScore }" @click="switchToReadingScore">
                    READING SCORE
                </button>
            </div>
            <div class="w-75">
                <ScoreTableList :tableScores="tableScores" :getTableScores="getTableScores"></ScoreTableList>
            </div>
        </div>

    </div>
</template>
  
<script>
import { defineComponent, ref } from "vue";

import ScoreTableService from "@/services/score_table.service";
import ScoreTableList from "@/components/score_table/ScoreTableList.vue";

export default defineComponent({
    components: {
        ScoreTableList,
    },
    setup() {
        const tableScores = ref([]);
        const showListeningScore = ref(true);
        const getTableScores = async () => {
            try {
                if (showListeningScore.value == true) {
                    tableScores.value = await ScoreTableService.getListeningScores();
                    console.log(tableScores.value);
                } else {
                    tableScores.value = await ScoreTableService.getReadingScores();
                    console.log(tableScores.value);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const switchToListeningScore = () => {
            if (!showListeningScore.value) {
                showListeningScore.value = true;
                getTableScores();
            }
        };
        const switchToReadingScore = () => {
            if (showListeningScore.value) {
                showListeningScore.value = false;
                getTableScores();
            }
        };

        getTableScores();

        return {
            tableScores,
            getTableScores,
            showListeningScore,
            switchToListeningScore,
            switchToReadingScore,

        };
    },
});
</script>
  
<style scoped>
@import "@/assets/breadcrumb.css";

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
    background-color: rgb(28, 22, 90);
    font-weight: bold;
    color: white;
}
</style>