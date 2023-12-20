<template>
    <!-- Sidebar-->
    <div class="border-end bg-white p-2" id="sidebar-wrapper" :class="{ 'active': isSidebarOpen }">

        <div class="d-flex justify-content-center align-items-center mb-4 border rounded-5" style="background-color: #052649">
            <img class="rounded-circle my-2"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDNyuiMJ6J8xSC9p1IFDsx2wRx_NjZungu60-TxzSuexdWyicQoWyGQqYySflUYtMgJ6c&usqp=CAU"
                alt="TOEIC Image" width="100" height="100">
        </div>
        
        <div class="list-group list-group-flush">
            <button class="custom-list-item rounded-5" @click="goToDashboard"
                :class="{ active: currentRoute.name === 'admin.dashboard.show' }" type="button">
                <div class="row">
                    <div class="col-10 d-flex justify-content-start align-items-center">
                        <i class="fas fa-tachometer-alt me-2"></i><span>Dashboard</span> 
                    </div>
                    <div class="col text-end" v-show="currentRoute.name === 'admin.dashboard.show'">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </button>

            <button class="custom-list-item rounded-5" @click="goToSection"
                :class="{ active: currentRoute.name === 'admin.section.all' }" type="button">
                <div class="row">
                    <div class="col-10 d-flex justify-content-start align-items-center">
                        <i class="fa-solid fa-section me-2"></i> Quản lý Section
                    </div>
                    <div class="col text-end" v-show="currentRoute.name === 'admin.section.all'">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </button>
            
            <button class="custom-list-item rounded-5" @click="goToTopic" :class="{ active: currentRoute.name === 'admin.topic.all' }"
                type="button">
                <div class="row">
                    <div class="col-10 d-flex justify-content-start align-items-center">
                        <i class="fas fa-file-alt me-2"></i> Quản lý Topic
                    </div>
                    <div class="col text-end" v-show="currentRoute.name === 'admin.topic.all'">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </button>

            <button class="custom-list-item rounded-5" @click="goToGrammar"
                :class="{ active: currentRoute.name === 'admin.grammar.all' }" type="button">
                <div>
                    
                </div>
                <div class="row">
                    <div class="col-10 d-flex justify-content-start align-items-center">
                        <i class="fa-solid fa-spell-check me-2"></i> Quản lý Grammar
                    </div>
                    <div class="col text-end" v-show="currentRoute.name === 'admin.grammar.all'">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </button>

            <button class="custom-list-item rounded-5" @click="goToLearner"
                :class="{ active: currentRoute.name === 'admin.learner.all' }" type="button">
                <div class="row">
                    <div class="col-10 d-flex justify-content-start align-items-center">
                        <i class="fas fa-users me-2"></i> Quản lý Learner
                    </div>
                    <div class="col text-end" v-show="currentRoute.name === 'admin.learner.all'">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </button>

            <button class="custom-list-item rounded-5" @click="goToExam"
                :class="{ active: currentRoute.name === 'admin.exam.all' }" type="button">
                <div class="row">
                    <div class="col-10 d-flex justify-content-start align-items-center">
                        <i class="fa-solid fa-file me-2"></i> Quản lý Exam
                    </div>
                    <div class="col text-end" v-show="currentRoute.name === 'admin.exam.all'">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </button>

            <button class="custom-list-item rounded-5" @click="goToFeedback" :class="{ active: currentRoute.name === 'admin.feedback.all' }"
                type="button">
                <div class="row">
                    <div class="col-10 d-flex justify-content-start align-items-center">
                        <i class="fa-solid fa-comment me-2"></i> Quản lý Feedback
                    </div>
                    <div class="col text-end" v-show="currentRoute.name === 'admin.feedback.all'">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </button>

            <button class="custom-list-item rounded-5" @click="goToFreeMaterial" :class="{ active: currentRoute.name === 'admin.free-material.all' }"
                type="button">
                <div class="row">
                    <div class="col-10 d-flex justify-content-start align-items-center">
                        <i class="fa-solid fa-layer-group me-2"></i> Free Materials
                    </div>
                    <div class="col text-end" v-show="currentRoute.name === 'admin.free-material.all'">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </button>


        </div>
    </div>
</template>
  
<script>
import { defineComponent, inject, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Sidebar",
    setup() {
        const isSidebarOpen = inject("isSidebarOpen");
        const router = useRouter();
        const currentRoute = router.currentRoute;

        const goToDashboard = () => {
            router.push({ name: "admin.dashboard.show" });
        };

        const goToSection = () => {
            router.push({ name: "admin.section.all" });
        };

        const goToTopic = () => {
            router.push({ name: "admin.topic.all" });
        };

        const goToGrammar = () => {
            router.push({ name: "admin.grammar.all" });
        };

        const goToLearner = () => {
            router.push({ name: "admin.learner.all" });
        };

        const goToExam = () => {
            router.push({ name: "admin.exam.all" });
        };

        const goToFeedback = () => {
            router.push({ name: "admin.feedback.all" });
        };

        const goToFreeMaterial = () => {
            router.push({ name: "admin.free-material.all" });
        };

        return {
            isSidebarOpen,
            goToDashboard,
            goToSection,
            goToTopic,
            goToGrammar,
            goToFeedback,
            goToLearner,
            goToExam,
            currentRoute,
            goToFreeMaterial,
        };
    },
});
</script>
  
<style scoped>
@import "@/assets/styles.css";
.custom-list-item.active {
    background-color: #052649;
    color: white;
    border-left: 5px solid blue;
}	
.custom-list-item {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: #333;
    background-color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px 0;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}
.custom-list-item:hover {
    background-color: #052649;
    color: white;
}
.custom-icon {
    margin-right: 10px;
}
</style>
  