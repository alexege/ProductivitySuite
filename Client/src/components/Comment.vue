<template>
    <div class="comment" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
        <div class="comment-body" v-if="!showComment">
            {{ comment.title }}
        </div>

        <div class="comment-actions" v-if="!showComment" v-show="isHovering">
            <button v-if="comment.isPublic">
                <font-awesome-icon icon="unlock" @click="toggleCommentPrivacy(comment._id)"/>
            </button>
            <button v-else>
                <font-awesome-icon icon="lock" @click="toggleCommentPrivacy(comment._id)"/>
            </button>

            <button @click="showComment = comment._id">
                <font-awesome-icon icon="pen" />
            </button>
            <button @click="onDelete()">
                <font-awesome-icon icon="trash" />
            </button>
        </div>

        <div class="update-comment" v-show="showComment == comment._id">
          <input type="text" v-model="newComment.title" />
          <button @click="updateComment(comment)">
            <font-awesome-icon icon="upload" />
          </button>
          <button>
            <font-awesome-icon icon="minus" @click="showComment = null"/>
          </button>
        </div>
    </div>

</template>
<script>
import { mapActions } from 'vuex'
    export default {
        name: 'Comment',
        props: ['comment'],
        data () {
            return {
                newComment: {
                    title: this.comment.title
                },
                showComment: null,
                isHovering: false
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('comment', ["deleteComment"]),
            onDelete() {
                this.deleteComment(this.comment._id);

                setTimeout(() => this.fetchNotebooks(), 10);
            },

            toggleCommentPrivacy(id) {
                console.log("toggling comment privacy");
                return this.$store
                .dispatch("comment/toggleCommentPrivacy", id)
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                })
            },

            updateComment(comment) {
                console.log("Updating comment: ", comment);
                this.showComment = null;

                let updateComment = {
                    title: this.newComment.title,
                    isPublic: comment.isPublic,
                };
                //Toggle editMode if using a modal
                return this.$store
                    .dispatch("comment/updateComment", {
                    id: comment._id,
                    comment: updateComment,
                })
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                });
            }

        }
    }
</script>
<style scoped>
    div {
        padding: .25em;
    }

    .comment {
        display: flex;
        outline: 1px solid black;
    }

    .comment-body {
        flex: 2;
        min-height: 40px;
    }

    .update-comment {
        display: flex;
        flex: 1;
    }

    .update-comment input {
        flex: 1;
    }
</style>