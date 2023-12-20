<template>
    <!-- Top navigation-->
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-lg mt-2 rounded-1" >
        <div class="container-fluid">
            <button class="btn btn-white border-0" id="sidebarToggle" @click="toggleSidebar">
                <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                    <!-- Mục menu Home -->
                    <li class="nav-item active">
                        <a class="nav-link" href="#!"><i class="fas fa-home"></i></a>
                    </li>
                    <!-- Mục menu với biểu tượng chuông -->
                    <li class="nav-item me-2 " style="font-size: 18px">
                        <a class="nav-link" href="#!"><i class="fas fa-bell"></i></a>
                    </li>

                    <li class="nav-item dropdown">
                        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                            style="margin-top: 4px;" data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="getImageUrl(profileImage)" alt="mdo" width="32" height="32" class="rounded-circle">
                        </a>
                        <ul class="dropdown-menu text-small custom-dropdown">
                            <li>
                                <router-link :to="{ name: 'admin.score-table.all'}" class="text-decoration-none text-dark">
                                    <div class="dropdown-item" href="#"><i class="fa-solid fa-gear"></i> Thiết lập điểm số</div>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'admin.profile.show'}" class="text-decoration-none text-dark">
                                    <div class="dropdown-item" href="#"><i class="fa-solid fa-user"></i> Hồ sơ cá nhân</div>
                                </router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <div class="dropdown-item" href="#" @click="signOut"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
<script>
import { useRouter } from "vue-router"
import { useAdminStore } from '@/stores/useAdminStore';
import { defineComponent, inject, onMounted, ref } from "vue";
import userService from "@/services/user.service";
import VueJwtDecode from "vue-jwt-decode";

export default defineComponent({
    name: "HeaderComponent",
    setup() {
        const toggleSidebar = inject("toggleSidebar");
        const adminStore = useAdminStore();
        const router = useRouter();
        const signOut = async () => {
            try {
                // Remove the headers parameter as it's not needed for signOut
                await userService.signOut();
                localStorage.removeItem('adminRefreshToken');
                localStorage.removeItem('adminToken');
                localStorage.removeItem("adminAccessTokenExpirationTime");
                localStorage.removeItem("adminRefreshTokenExpirationTime");
                adminStore.setIsAuthenticatedAdmin(false);
                router.push({ name: 'admin.signin' });
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

        const userId = ref();
        const profileImage = ref();
        const getUserById = async () => {
            try {
                const adminToken = localStorage.getItem("adminToken");
                const decoded = VueJwtDecode.decode(adminToken);
                const username = decoded.sub;
                userId.value = await userService.getUserIdByUsername(username);

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
        });

        return {
            toggleSidebar,
            adminStore,
            signOut,
            profileImage,
            getImageUrl
        };
    },
});
</script>
  
<style scoped>
.custom-dropdown {
    position: absolute;
    left: -100px;
    top: 50px;
}
.dropdown-menu {
    cursor: pointer;
}
.navbar .navbar-nav .dropdown .dropdown-menu {
    display: none;
    position: absolute;
    top: 90%;
    left: -120px;
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
}
</style>
  