<template>
    <div>
        <div class="d-flex justify-content-end my-3 me-3">
            <select v-model="filter" @change="retrieveComments" class="form-select border-secondary w-25 mb-3"
                aria-label="Default select example">
                <option selected disabled>LỌC BÌNH LUẬN</option>
                <option value="user">Bình luận của bạn</option>
                <option value="all">Tất cả bình luận</option>
            </select>
        </div>

        <div class="d-flex justify-content-center">
            <div class="comment-form mt-2 input-group w-75">
                <input v-model="newCommentText" type="text" class="form-control border-secondary"
                    placeholder="Add a comment">
                <button @click="addComment" class="btn btn-secondary"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>

        <comment-component v-for="comment in visibleComments" :key="comment.commentId" :comment="comment"
            :parentId="comment.commentId" :retrieveComments="retrieveComments" class="comment">
        </comment-component>

        <div v-if="visibleComments.length < comments.length">
            <button @click="loadMore" class="btn btn-link link-offset-3 ms-3 mb-3">Xem thêm</button>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import VueJwtDecode from "vue-jwt-decode";

import CommentService from "@/services/comment.service";
import UserService from "@/services/user.service";
import CommentComponent from './CommentComponent.vue';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    components: {
        CommentComponent,
    },
    setup() {

        const filter = ref("all");
        const comments = ref([]);
        const showLoadMoreButton = ref(true);
        const retrieveComments = async () => {
            try {
                let fetchedComments;
                if (filter.value === "user") {
                    const learnerToken = localStorage.getItem("learnerToken");
                    const decoded = VueJwtDecode.decode(learnerToken);
                    userId.value = decoded.id;
                    fetchedComments = await CommentService.getUserComments(userId.value);
                } else {
                    fetchedComments = await CommentService.getAllComments();
                }
                console.log(fetchedComments)
                if (fetchedComments.length > 0) {
                    comments.value = fetchedComments;
                    showLoadMoreButton.value = fetchedComments.length > loadMoreComments;
                    visibleComments.value = fetchedComments.slice(0, loadMoreComments);
                }
            } catch (error) {
                console.log(error);

            }
        };

        const userId = ref();
        const newCommentText = ref("");
        const addComment = async () => {
            if (newCommentText.value) {
                try {
                    // UserID
                    const learnerToken = localStorage.getItem("learnerToken");
                    const decoded = VueJwtDecode.decode(learnerToken);
                    userId.value = decoded.id;

                    const data = {
                        text: newCommentText.value,
                        userId: userId.value
                    };
                    const response = await CommentService.createComment(data);
                    console.log(response)

                    newCommentText.value = "";
                    retrieveComments();
                } catch (error) {
                    console.log(error);
                    toast.error('Lỗi khi bình luận', {
                        autoClose: 1000
                    });
                }
            }
        };

        const visibleComments = ref([]);
        const loadMoreComments = 10;
        const loadMore = () => {
            if (visibleComments.value.length + loadMoreComments >= comments.value.length) {
                showLoadMoreButton.value = false;
            }
            visibleComments.value = comments.value.slice(0, visibleComments.value.length + loadMoreComments);
        };

        onMounted(() => {
            retrieveComments();
        });

        return {
            comments,
            newCommentText,
            visibleComments,
            addComment,
            loadMore,
            showLoadMoreButton,
            retrieveComments,
            filter,
        };
        
    },
};
</script>

  