<template>
    <div id="app">
        <router-view />

        <button class="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample" id="bottom-left-button">
            <i class="fa-solid fa-user-pen"></i> GHI CHÚ
        </button>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel"><i class="fa-solid fa-user-pen text-warning"></i> Tạo Ghi Chú</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    Bạn có thể tạo ghi chú đối với những phần quan trọng trong lúc học và luyện thi TOEIC.
                </div>
                <Form @submit="createNote" :validation-schema="noteFormSchema" enctype="multipart/form-data">
                        <div class="form-group mb-3">
                            <label for="title" class="form-label">Title<span class="required-field">*</span></label>
                            <Field name="title" id="title" type="text" class="form-control border-secondary custom-font"
                                v-model="noteLocal.title" />
                            <ErrorMessage name="title" class="error-feedback" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="content" class="form-label">Content<span class="required-field">*</span></label>
                            <Field name="content" id="content" as="textarea" class="form-control border-secondary custom-font"
                                v-model="noteLocal.content" style="resize: none; height: 100px; width: 100%;"/>
                            <ErrorMessage name="content" class="error-feedback" />
                        </div>
                        <button class="btn btn-primary">Lưu</button>
                 
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from "vue";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs';
const socket = new SockJS('http://localhost:9004/ws');
const stompClient = Stomp.over(socket);
import VueJwtDecode from "vue-jwt-decode";
import NoteService from "@/services/note.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const userId = ref(null);
        const getUserId = async () => {
            try {
                const learnerToken = localStorage.getItem("learnerToken");
                const decoded = VueJwtDecode.decode(learnerToken);
                userId.value = decoded.id;
                console.log(userId.value)
            } catch (error) {
                console.log(error);
            }
        };

        const noteFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tiêu đề phải có giá trị."),
            content: yup
                .string()
                .required("Nội dung phải có giá trị.")
        });

        const noteLocal = reactive({});
        const createNote = async () => {
            try {
                noteLocal.userId = userId.value;
                await NoteService.createNote(noteLocal);
                toast.success('Thêm ghi chú thành công ', {
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi thêm ghi chú', {
                    autoClose: 1000,
                });
            }
        };

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            // Subscribe to a topic (comments / replies)
            stompClient.subscribe('/topic/newComment', (notification) => {
                console.log('New Comment Notification: ', notification);
                const notificationData = JSON.parse(notification.body);
                console.log(notificationData)
                console.log(userId.value)
                if (notificationData.replies[0].user.id !== userId.value && notificationData.user.id === userId.value) {
                    // Thông báo
                    toast.success("Có người vừa trả lời bình luận của bạn");
                }
            });
        }, (error) => {
            console.error('WebSocket Error: ', error);
        });

        onMounted(() => {
            getUserId();
        });

        return {
            noteLocal,
            noteFormSchema,
            createNote
        }
    }
});
</script>

<style>
/* label {
    font-weight: 600;
    font-size: 14px;
    color: rgb(44, 44, 44);
} */

.error-feedback {
    color: red;
    font-size: 13px;
}

.required-field {
    color: red;
    font-size: 14px;
    margin-left: 4px;
}

#bottom-left-button {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 10px;
}

* {
    font-family: "Poppins", sans-serif;
    scrollbar-color: #888 #f1f1f1;
    scrollbar-width: thin;
}

body {
    margin: 0;
}

/* --------------------------Scroll bar----------------------- */
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}
</style>