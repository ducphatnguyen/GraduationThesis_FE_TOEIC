<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <div class="navbar-logo">
                <router-link :to="{ name: 'home' }" class="navbar-brand">
                    <img src="../../assets/img/logo.png" class="logo" loading="lazy" />
                </router-link>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link"
                            :class="{ active: currentRoute.name === 'home' }">Trang
                            chủ</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link class="nav-link" :class="{ active: currentRoute.name === 'practice.all' || currentRoute.name === 'practice.show' }"
                            :to="{ name: 'practice.all' }" role="button" aria-haspopup="true" aria-expanded="false">
                            Luyện L&R
                            <i class="fas fa-caret-down"></i>
                        </router-link>
                        <ul class="dropdown-menu dropdown-menu-custom">
                            <li v-for="section in docngheSections" :key="section.id">
                                <router-link class="dropdown-item"
                                    :to="{ name: 'practice.show', params: { sectionId: section.id } }">
                                    <!-- <i class="fa-solid fa-square me-2"></i> -->
                                    {{ section.name }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'practice-speaking-writing' }" class="nav-link"
                            :class="{ active: currentRoute.name === 'practice-speaking-writing' }">Luyện S&W</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link class="nav-link" :class="{ active: currentRoute.name === 'exam' || currentRoute.name === 'exam-fulltest' || currentRoute.name === 'exam-minitest' }"
                            :to="{ name: 'exam' }" role="button" aria-haspopup="true" aria-expanded="false">
                            Đề thi thử
                            <i class="fas fa-caret-down"></i>
                        </router-link>
                        <ul class="dropdown-menu dropdown-menu-custom">
                            <li><router-link class="dropdown-item" :to="{ name: 'exam-fulltest' }">
                                    Full Test</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'exam-minitest' }">
                                    Mini Test (Rút gọn)</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'player-kill' }">
                                    Thi đấu</router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <router-link class="nav-link" :class="{ active: currentRoute.name === 'grammar.all' || currentRoute.name === 'topic.all' || currentRoute.name === 'dictionary.all' }"
                        :to="{}" role="button" aria-haspopup="true" aria-expanded="false">
                            Kỹ năng
                            <i class="fas fa-caret-down"></i>
                        </router-link>
                        <ul class="dropdown-menu dropdown-menu-custom">
                            <li><router-link class="dropdown-item" :to="{ name: 'grammar.all' }">
                                Ngữ Pháp</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'topic.all' }">
                                    Từ
                            Vựng</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'dictionary.all' }">
                                    Tra cứu từ điển</router-link>
                            </li>
                        </ul>
                    </li>


                    <li class="nav-item dropdown">
                        <router-link class="nav-link" :class="{ active: currentRoute.name === 'improve.show' || currentRoute.name === 'free-materials.show' }"
                        :to="{}" role="button" aria-haspopup="true" aria-expanded="false">
                            Học tùy chọn
                            <i class="fas fa-caret-down"></i>
                        </router-link>
                        <ul class="dropdown-menu dropdown-menu-custom">
                            <li><router-link class="dropdown-item" :to="{ name: 'improve.show' }">
                                Học cải thiện</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'free-materials.show' }">
                                Tài liệu miễn phí</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'learn-by-video.show' }">
                                Học thông qua bài giảng</router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{ name: 'feedback.all' }" class="nav-link"
                            :class="{ active: currentRoute.name === 'feedback.all' }">Góp ý</router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <router-link class="nav-link" :class="{ active: currentRoute.name === 'toeic-tips.all' || currentRoute.name === 'listening-tips.all' || currentRoute.name === 'reading-tips.all' || currentRoute.name === 'blog.show' }"
                            :to="{ name: 'toeic-tips.all' }" role="button" aria-haspopup="true" aria-expanded="false">
                            TOEIC Tips
                            <i class="fas fa-caret-down"></i>
                        </router-link>
                        <ul class="dropdown-menu dropdown-menu-custom">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'listening-tips.all' }">
                                    TOEIC Listening Tips</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'reading-tips.all' }">
                                    TOEIC Reading Tips</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'blog.show' }">
                                    Blog</router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item" v-if="learnerStore.isAuthenticatedLearner == false">
                        <router-link :to="{ name: 'signin' }" class="nav-link">Đăng Nhập</router-link>
                    </li>

                    <li class="nav-item dropdown" v-else>
                        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                            style="margin-top: 4px;" data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="getImageUrl(profileImage)" alt="mdo" width="32" height="32" class="rounded-circle"
                                loading="lazy">
                        </a>

                        <ul class="dropdown-menu dropdown-menu-custom">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'note' }">
                                    <i class="fa-solid fa-pen"></i> Ghi chú của bạn
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'notification' }">
                                    <i class="fa-solid fa-bell"></i> Thông báo mới
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'profile' }">
                                    <i class="fa-solid fa-user"></i> Hồ sơ cá nhân
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'learningroute' }">
                                    <i class="fa-solid fa-chalkboard-user"></i> Lộ trình học
                                </router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'user-vocabularies.all' }">
                                    <i class="fa-regular fa-bookmark bookmark-icon"></i> Từ vựng cá nhân
                                </router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <div class="dropdown-item" style="cursor: pointer;" href="#" @click="signOut">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    Đăng xuất
                                </div>
                            </li>
                        </ul>

                    </li>
                    <span
                        class="badge d-flex align-items-center ms-5 p-1 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
                        <img class="rounded-circle me-1" width="24" height="24"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg/230px-Flag_of_North_Vietnam_%281955%E2%80%931976%29.svg.png"
                            alt="" loading="lazy" />
                        <i class="fas fa-caret-down"></i>
                    </span>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
<script>
import { useLearnerStore } from "@/stores/useLearnerStore";
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import userService from "@/services/user.service";
import SectionService from "@/services/section.service";
import VueJwtDecode from "vue-jwt-decode";

export default defineComponent({
    setup() {
        const learnerStore = useLearnerStore();
        const router = useRouter();
        const currentRoute = router.currentRoute;
        const sections = ref([]);
        const retrieveSections = async () => {
            try {
                sections.value = await SectionService.allEnable();
                console.log(sections.value)
            } catch (error) {
                console.log(error);
            }
        };
        const getImageUrl = (imageName) => {
            if (imageName) {
                // Tạo URL cho ảnh bằng cách kết hợp đường dẫn cơ sở và tên ảnh
                return `http://localhost:9004/images/${imageName}`;
            }
            return "http://localhost:9004/images/anhdaidienmacdinh.jpg";
        };
        const signOut = async () => {
            try {
                await userService.signOut();
                localStorage.removeItem('learnerRefreshToken');
                localStorage.removeItem("learnerToken");
                localStorage.removeItem("learnerAccessTokenExpirationTime");
                localStorage.removeItem("learnerRefreshTokenExpirationTime");
                learnerStore.setIsAuthenticatedLearner(false);
                router.push({ name: "signin" });
            } catch (error) {
                console.log(error);
            }
        };
        const docngheSections = computed(() => {
            return sections.value.filter((section) => section.type === 1 || section.type === 2);
        });

        const userId = ref();
        const profileImage = ref();
        const getUserById = async () => {
            try {
                const learnerToken = localStorage.getItem("learnerToken");
                const decoded = VueJwtDecode.decode(learnerToken);
                userId.value = decoded.id;

                const data = await userService.getUserById(userId.value);
                console.log(data)
                profileImage.value = data.image;
                console.log(profileImage.value)

            } catch (error) {
                console.log(error);
            }
        };
        onMounted(() => {
            getUserById();
            retrieveSections();
        });
        return {
            learnerStore,
            signOut,
            currentRoute,
            sections,
            retrieveSections,
            getImageUrl,
            docngheSections,
            profileImage
        };
    },
});
</script>
  
<style scoped>
.navbar {
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #052649;
}

.navbar-logo {
    transition: all 0.3s;
}

.logo {
    width: 60px;
    border-radius: 50%;
}

.navbar .navbar-nav .nav-link {
    position: relative;
    color: #fff;
    transition: color 0.3s;
    font-weight: 500;
}

.navbar .navbar-nav .nav-link:hover,
.navbar .navbar-nav .nav-link.active {
    color: #fff;
}

.navbar .navbar-nav .nav-link::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #fff;
    transition: width 0.3s;
}
.navbar .navbar-nav .nav-link:hover::after,
.navbar .navbar-nav .nav-link.active::after {
    width: 90%;
}
.navbar .navbar-nav .dropdown .dropdown-menu {
    display: none;
    position: absolute;
    top: 90%;
    left: 0;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    margin-top: 5px;
    transition: opacity 0.3s;
    opacity: 0;
}

.navbar .navbar-nav .dropdown:hover .dropdown-menu {
    display: block;
    opacity: 1;
}

.navbar .navbar-nav .dropdown .dropdown-menu .dropdown-item {
    padding: 0.5rem 1rem;
    color: #212529;
    font-size: 14px;
    line-height: 1.5;
    white-space: nowrap;
    transition: background-color 0.3s, color 0.3s;
}

.navbar .navbar-nav .dropdown .dropdown-menu .dropdown-item:hover {
    background-color: #083361;
    color: #fff;
}

.navbar .navbar-nav .dropdown:last-child .dropdown-menu .dropdown-item {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
}

.navbar .navbar-nav .nav-item.dropdown .dropdown-menu.dropdown-menu-custom {
    min-width: 10rem;
}

.navbar .navbar-nav .nav-item.dropdown .dropdown-menu.dropdown-menu-custom .dropdown-item {
    padding: 0.5rem 1rem;
}

.dropdown-toggle::after {
    display: none;
}

@media (max-width: 768px) {
    .logo {
        width: 80px;
    }
}</style>
  