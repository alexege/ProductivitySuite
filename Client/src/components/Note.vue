<template>
    <div style="outline: 1px solid orange;">
        <h5 v-if="note && note.title">{{ note.title }}</h5>

        <div v-for="comment in comments" :key="comment._id">
            <Comment :comment="comment"/>
        </div>

        <!-- Add Comment -->
        <form @submit.prevent="onSubmit" class="add-comment-container">
            <input type="text" v-model="newComment.title" placeholder="Add Comment" @keyup.enter="addComment" />
            <button>
                <font-awesome-icon icon="check" />
            </button>
        </form>

    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import Comment from '../components/Comment.vue'
    export default {
        name: 'Note',
        components: {Comment},
        props: ['comments','note'],
        data () {
            return {
                newComment: {
                    title: null
                }
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('comment', ["addComment"]),
            onSubmit() {
                this.addComment({
                    comment: this.newComment,
                    noteId: this.note._id //This comes from the props
                });

                this.newComment.title = '';

                setTimeout(() => this.fetchNotebooks(), 10);
            }
            
            // addComment(noteId) {
            // console.log("noteId:", noteId);
            // return this.$store
            //     .dispatch("comment/addComment", { comment: this.newComment, noteId })
            //     .then(() => {
            //     this.newComment.title = "";
            // })
            //     .catch((err) => {
            //     console.log("Error adding comment: ", err);
            // });
            // }
        }
    }
</script>
<style scoped>
    div {
        padding: .25em;
    }

    input {
        width: 80%;
    }

    .add-comment-container {
        display: flex;
    }

    .add-comment-container input, textarea {
        width: 100%;
    }
</style>