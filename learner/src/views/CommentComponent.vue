<template>
    <div class="comment rounded-0 ms-3 my-3 border-0">

        <div class="card-body p-0">
            <img src="https://github.com/mdo.png" alt="User Avatar" class="rounded-5" style="width: 35px"><br>
            <span class="card-text"><strong>{{ comment.user.username }}</strong>, {{ formatDate(comment.date) }}</span><br>
            <span class="card-text">{{ comment.text }}</span><br>
            <button @click="startReplying" class="btn btn-link text-decoration-none fw-bold">Trả lời</button>
        </div>

        <div class="replies card-body p-0 ms-3">

            <comment-component v-for="reply in comment.replies" :comment="reply" :parentId="reply.commentId"
                :retrieveComments="retrieveComments">
            </comment-component>

            <div class="reply-form input-group" v-if="isReplying">
                <input v-model="newReplyText" class="form-control" placeholder="Viết câu trả lời">
                <button @click="addReply" class="btn btn-success"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import VueJwtDecode from "vue-jwt-decode";

import UserService from "@/services/user.service";
import CommentService from "@/services/comment.service";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    props: {
        comment: Object,
        parentId: Number,
        retrieveComments: Function
    },

    setup(props) {
        console.log(props.comment.replies)

        const isReplying = ref(false);
        const startReplying = () => {
            isReplying.value = true;
        };
        const userId = ref();
        const newReplyText = ref('');
        const addReply = async () => {
            if (newReplyText.value) {
                try {
                    console.log(props.parentId)
                    const learnerToken = localStorage.getItem("learnerToken");
                    const decoded = VueJwtDecode.decode(learnerToken);
                    userId.value = decoded.id;
                    const data = {
                        text: newReplyText.value,
                        userId: userId.value,
                        parentId: props.parentId,
                    };
                    console.log(data)
                    const response = await CommentService.createComment(data);
                    console.log(response)

                    newReplyText.value = '';
                    isReplying.value = false;
                    props.retrieveComments();
                } catch (error) {
                    console.log(error);
                    toast.error('Lỗi khi bình luận', {
                        autoClose: 1000
                    });
                }
            }
        };

        const formatDate = (dateTimeString) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const date = new Date(dateTimeString);
            return date.toLocaleDateString('en-GB', options);
        };

        return {
            isReplying,
            newReplyText,
            startReplying,
            addReply,
            formatDate
        };
    },
};
</script>
  
<style scoped>
.comment {
    margin-left: 20px;
    border-left: 1px solid #ccc;
    padding-left: 10px;
}
</style>
  