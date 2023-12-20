import { createWebHistory, createRouter } from "vue-router";
import NProgress from 'nprogress';

const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFoundPage.vue"),
    },
    {
        path: "/admin/signin",
        name: "admin.signin",
        component: () => import("@/views/SignIn.vue"),
    },
    //ADMIN
    {
        path: "/admin",
        component: () => import("@/views/AdminLayout.vue"),
        beforeEnter: (to, from, next) => {
                const adminToken = localStorage.getItem("adminToken");
                const isAuthenticatedAdmin = JSON.parse(localStorage.getItem("AdminAuthenticated"));
            if (isAuthenticatedAdmin && isAuthenticatedAdmin.isAuthenticatedAdmin === true && adminToken) {
                next();
            } else {
                next({ name: 'admin.signin' });
            }
        },
        children: [
            {
                path: "/admin/dashboard",
                name: "admin.dashboard.show",
                component: () => import("@/views/DashBoardOverView.vue"),
            },
            {
                path: "/admin/profile",
                name: "admin.profile.show",
                component: () => import("@/views/AdminProfileOverView.vue"),
            },
            {
                path: "/admin/setting",
                name: "admin.setting.show",
                component: () => import("@/views/Setting.vue"),
            },

            // Section
            {
                path: "/admin/section",
                name: "admin.section.all",
                component: () => import("@/views/section/SectionOverView.vue"),
            },
            // Lesson by Section
            {
                path: "/admin/section/:sectionId/lesson/",
                name: "admin.lesson.all",
                component: () => import("@/views/lessonbysection/LessonOverView.vue"),
                props: true,
            },
            // Lesson Content 
            {
                path: "/admin/section/:sectionId/lesson/:lessonId/lesson-content",
                name: "admin.lesson-content.all",
                component: () => import("@/views/lesson_content/LessonContentOverView.vue"),
                props: true,
            },
            //Question by Section
             {
                path: "/admin/section/:sectionId/question",
                name: "admin.question.all",
                component: () => import("@/views/questionbysection/QuestionOverView.vue"),
                props: true,
            },
            // Test by Section
            {
                path: "/admin/section/:sectionId/test/",
                name: "admin.test.all",
                component: () => import("@/views/testbysection/TestOverView.vue"),
                props: true,
            },
            // Indicate Question
            {
                path: "/admin/section/:sectionId/test/:testId/question",
                name: "admin.indicate-question.all",
                component: () => import("@/views/indicatequestion/IndicateQuestionOverView.vue"),
                props: true,
            },

            // Topic (all)
            {
                path: "/admin/topic/",
                name: "admin.topic.all",
                component: () => import("@/views/topic/TopicOverView.vue"),
            },
            // Vocabulary by topic
            {
                path: "/admin/topic/:topicId/vocabulary/",
                name: "admin.vocabulary.all",
                component: () => import("@/views/vocabularybytopic/VocabularyOverView.vue"),
                props: true,
            },
            // Vocabulary Question by topic
            {
                path: "/admin/topic/:topicId/vocabulary-question/",
                name: "admin.vocabulary-question.all",
                component: () => import("@/views/vocabulary_question/VocabularyQuestionOverView.vue"),
                props: true,
            },



            // Grammar (all)
            {
                path: "/admin/grammar/",
                name: "admin.grammar.all",
                component: () => import("@/views/grammar/GrammarOverView.vue"),
            },
            // Grammar content
            {
                path: "/admin/grammar/:grammarId/grammar-content/",
                name: "admin.grammar-content.all",
                component: () => import("@/views/grammar_content/GrammarContentOverView.vue"),
                props: true,
            },
            // Grammar question
            {
                path: "/admin/grammar/:grammarId/grammar-question/",
                name: "admin.grammar-question.all",
                component: () => import("@/views/grammar_question/GrammarQuestionOverView.vue"),
                props: true,
            },



            // Learner
            {
                path: "/admin/learner",
                name: "admin.learner.all",
                component: () => import("@/views/learner/LearnerOverView.vue"),
            },

            // Exam (all)
            {
                path: "/admin/exam/",
                name: "admin.exam.all",
                component: () => import("@/views/exam/ExamOverView.vue"),
            },
            // Exam Question (all)
            {
                path: "/admin/exam/:examId/exam-question/",
                name: "admin.exam-question.all",
                component: () => import("@/views/exam_question/ExamQuestionOverView.vue"),
                props: true,
            },
            
            // Feedback (all)
            {
                path: "/admin/feedback/",
                name: "admin.feedback.all",
                component: () => import("@/views/feedback/FeedbackOverView.vue"),
            },

            // Free Material (all)
            {
                path: "/admin/free-material/",
                name: "admin.free-material.all",
                component: () => import("@/views/free_material/FreeMaterialOverView.vue"),
            },

             // Score Table (all)
             {
                path: "/admin/score-table/",
                name: "admin.score-table.all",
                component: () => import("@/views/score_table/ScoreTableOverView.vue"),
            },

            



        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    NProgress.start(); // Bắt đầu tiến trình NProgress khi chuyển trang
    next();
});

router.afterEach(() => {
    NProgress.done(); // Kết thúc tiến trình NProgress khi chuyển trang hoàn tất
});
// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem("token");
//     //Nếu cố gắng ra khỏi trang signin,signup, notfound thì quay về signin
//     if (to.name !== "admin.signin" && to.name !== "admin.signup" && to.name !== "notfound" && !token)
//         next({ name: "admin.signin" });
//     else
//         next();
// });

export default router;