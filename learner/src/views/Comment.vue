<template>
    <div class="card my-3 bg-light">
        <comments-list></comments-list>
    </div>
</template>
  
<script>
import CommentsList from './CommentsList.vue';

export default {
    components: {
        CommentsList,
    },
};
</script>
  