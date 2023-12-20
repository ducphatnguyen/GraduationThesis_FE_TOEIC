<template>
    <div class="vh-100 d-flex justify-content-center align-items-center" style="background-image: url('https://th.bing.com/th/id/OIP.TeqIZlxmGZCfpLBrFkgurwHaE7?w=2000&h=1333&rs=1&pid=ImgDetMain'); background-repeat: no-repeat; background-size: cover;">
        <div>
            <div class="mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-success bi bi-check-circle-fill" width="200" height="200"
                    fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
            </div>
            <div class="text-center">
                <h1>Success !</h1>
                <p>Bạn đã thành công trong việc xác thực tài khoản của mình</p>
                <router-link :to="{ name: 'home' }" class="btn btn-primary">
                    Trở về trang chủ
                </router-link>
            </div>
        </div>
    </div>
</template>
<style scoped></style>