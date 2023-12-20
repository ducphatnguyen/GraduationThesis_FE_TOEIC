import { createWebHistory, createRouter } from "vue-router";
import NProgress from 'nprogress';

const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFoundPage.vue"),
    },
    //LEARNER
    {
        path: "/signin",
        name: "signin",
        component: () => import("@/views/SignIn.vue"),
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/SignUp.vue"),
    },
    {
        path: "/verification",
        name: "verification",
        component: () => import("@/views/Verification.vue"),
    },
    {
        path: "/",
        component: () => import("@/views/LearnerLayout.vue"),
        children: [
            //Trang chủ 
            {
                path: "/",
                name: "home",
                component: () => import("@/views/Home.vue"),
            },
            
            //Luyện L&R
            {
                path: "/practice-listening-reading",
                name: "practice.all",
                component: () => import("@/views/PracticeLR.vue"),
            },
            //Hiển thị ra Lessons và Tests
            {
                path: "/practice-listening-reading/:sectionId",
                name: "practice.show",
                component: () => import("@/views/Section.vue"),
                props: true
            },
            // Học các bài Lessons
            {
                path: "/practice-listening-reading/:sectionId/lesson/:lessonId",
                name: "lesson.show",
                component: () => import("@/views/Lesson.vue"),
                props: true
            },
            //Thi Listening và Reading
            {
                path: "/study/practice-listening-reading/:sectionId/test/:testId",
                name: "study.show",
                component: () => import("@/views/Study.vue"),
                // beforeEnter: (to, from, next) => {
                //     const learnerToken = localStorage.getItem("learnerToken");
                //     const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                //     if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        
                //         // // Thêm sự kiện beforeunload để ngăn người dùng rời khỏi trang mà không thông báo
                //         window.addEventListener("beforeunload", function (e) {
                //             e.preventDefault();
                //             e.returnValue = "Bạn có chắc chắn muốn rời khỏi trang này?";
                //         });
                        
                //         next();
                //     } else {
                //         next({ name: 'home' });
                //     }
                // },
                props: true,
            },


            {
                path: "/practice-speaking-writing",
                name: "practice-speaking-writing",
                component: () => import("@/views/PracticeSW.vue"),
            },
            //Hiển thị ra Tests của Speaking Writing (No Lessons)
            {
                path: "/practice-speaking-writing/:sectionId",
                name: "practice-speaking-writing.show",
                component: () => import("@/views/SectionSW.vue"),
                props: true
            },
            //Thi Speaking và Writing
            {
                path: "/study/practice-speaking-writing/:sectionId/test/:testId",
                name: "studySW.show",
                component: () => import("@/views/StudySW.vue"),
                // beforeEnter: (to, from, next) => {
                //     const learnerToken = localStorage.getItem("learnerToken");
                //     const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                //     if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        
                //         // // Thêm sự kiện beforeunload để ngăn người dùng rời khỏi trang mà không thông báo
                //         // window.addEventListener("beforeunload", function (e) {
                //         //     e.preventDefault();
                //         //     e.returnValue = "Bạn có chắc chắn muốn rời khỏi trang này?";
                //         // });
                        
                //         next();
                //     } else {
                //         next({ name: 'home' });
                //     }
                // },
                props: true,
            },
            //Exam
            {
                path: "/exam",
                name: "exam",
                component: () => import("@/views/Exam.vue"),
            },
            //Exam Full Test
            {
                path: "/exam-fulltest",
                name: "exam-fulltest",
                component: () => import("@/views/ExamFullTest.vue"),
            },

            {
                path: "/exam-fulltest/:examId",
                name: "exam-question-fulltest",
                component: () => import("@/views/ExamQuestion.vue"),
                beforeEnter: (to, from, next) => {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                    if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        next();
                    } else {
                        next({ name: 'home' });
                    }
                },
                props: true
            },

            {
                path: "/exam-fulltest/:examId/preparation",
                name: "exam-question-fulltest-preparation",
                component: () => import("@/views/Preparation.vue"),
                beforeEnter: (to, from, next) => {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                    if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        next();
                    } else {
                        next({ name: 'signin' });
                    }
                },
                props: true
            },

            //Exam Mini Test
            {
                path: "/exam-minitest",
                name: "exam-minitest",
                component: () => import("@/views/ExamMiniTest.vue"),
            },

            //Exam PK (Player-Kill)
            {
                path: "/player-kill",
                name: "player-kill",
                component: () => import("@/views/PlayerKill.vue"),
            },

            //Exam Result
            {
                path: "/exam-result/:userExamId",
                name: "exam-result",
                component: () => import("@/views/ExamResult.vue"),
                beforeEnter: (to, from, next) => {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                    if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        next();
                    } else {
                        next({ name: 'home' });
                    }
                },
                props: true
            },

            // {
            //     path: "/exam-result-detail/:userExamId",
            //     name: "exam-result-detail",
            //     component: () => import("@/views/ExamResultDetails.vue"),
            //     beforeEnter: (to, from, next) => {
            //         const learnerToken = localStorage.getItem("learnerToken");
            //         const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
            //         if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
            //             next();
            //         } else {
            //             next({ name: 'signin' });
            //         }
            //     },
            //     props: true
            // },
            
            //Học Grammar
            {
                path: "/grammar",
                name: "grammar.all",
                component: () => import("@/views/Grammar.vue"),
            },
            {
                path: "/grammar/:grammarId",
                name: "grammar.show",
                component: () => import("@/views/GrammarRule.vue"),
                props: true
            },
            // Học Từ vựng theo chủ đề
            {
                path: "/topic",
                name: "topic.all",
                component: () => import("@/views/Topic.vue"),

            },
            {
                path: "/topic/:topicId",
                name: "topic.show",
                component: () => import("@/views/Vocabulary.vue"),
                props: true
            },

            // Dictionary
            {
                path: "/dictionary",
                name: "dictionary.all",
                component: () => import("@/views/Dictionary.vue"),
            },


            // Hồ sơ Learner
            {
                path: "/profile",
                name: "profile",
                component: () => import("@/views/Profile.vue"),
                beforeEnter: (to, from, next) => {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                    if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        next();
                    } else {
                        next({ name: 'home' });
                    }
                },
            },

            // Hồ sơ Learner
            {
                path: "/notification",
                name: "notification",
                component: () => import("@/views/Notification.vue"),
                beforeEnter: (to, from, next) => {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                    if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        next();
                    } else {
                        next({ name: 'home' });
                    }
                },
            },

            // Hồ sơ Learner
            {
                path: "/note",
                name: "note",
                component: () => import("@/views/Note.vue"),
                beforeEnter: (to, from, next) => {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                    if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        next();
                    } else {
                        next({ name: 'home' });
                    }
                },
            },


            //Lộ trình học 
            {
                path: "/learningroute",
                name: "learningroute",
                component: () => import("@/views/LearningRoute.vue"),
                beforeEnter: (to, from, next) => {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                    if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        next();
                    } else {
                        next({ name: 'signin' });
                    }
                },
            },

            // Học Từ vựng theo chủ đề
            {
                path: "/toeic-tips",
                name: "toeic-tips.all",
                component: () => import("@/views/ToeicTip.vue"),

            },
            {
                path: "/listening-tips",
                name: "listening-tips.all",
                component: () => import("@/views/ListeningTip.vue"),

            },
            {
                path: "/reading-tips",
                name: "reading-tips.all",
                component: () => import("@/views/ReadingTip.vue"),
            },
            {
                path: "/feedback",
                name: "feedback.all",
                component: () => import("@/views/Feedback.vue"),
            },
            {
                path: "/improve",
                name: "improve.show",
                component: () => import("@/views/ImproveStudy.vue"),
            },
            {
                path: "/free-materials",
                name: "free-materials.show",
                component: () => import("@/views/FreeMaterials.vue"),
            },
            {
                path: "/learn-by-video",
                name: "learn-by-video.show",
                component: () => import("@/views/LearnByVideo.vue"),
            },


            {
                path: "/user-vocabularies",
                name: "user-vocabularies.all",
                component: () => import("@/views/UserVocabulary.vue"),
                beforeEnter: (to, from, next) => {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const isAuthenticatedLearner = JSON.parse(localStorage.getItem("LearnerAuthenticated"));
                    if (isAuthenticatedLearner && isAuthenticatedLearner.isAuthenticatedLearner === true && learnerToken) {
                        next();
                    } else {
                        next({ name: 'home' });
                    }
                },
            },
            {
                path: "/blog",
                name: "blog.show",
                component: () => import("@/views/Blog.vue"),
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
    window.scrollTo(0, 0);
    next();
});

router.afterEach(() => {
    NProgress.done(); // Kết thúc tiến trình NProgress khi chuyển trang hoàn tất
});


export default router;