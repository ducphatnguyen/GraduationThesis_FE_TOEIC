<template>
    <div class="page">
        <SignUpForm @submit:signup="submitSignUp" />
    </div>
</template>

<script>
import { defineComponent } from "vue";

import userService from "@/services/user.service";
import SignUpForm from "@/components/SignUpForm.vue";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
    components: {
        SignUpForm,
    },
    setup(context) {
        const submitSignUp = async (data) => {
            try {
                await userService.signUp(data);
                toast.success('Đăng ký thành công', {
                    autoClose: 2000,
                    position: 'top-center',
                });

            } catch (error) {
                console.log(error);
                const jsonResponse = JSON.parse(error.request.response);
                toast.error(jsonResponse.message, {
                    autoClose: 2000,
                    position: 'top-center',
                });

            }
        };
        return {
            submitSignUp,
        }
    },
});
</script>