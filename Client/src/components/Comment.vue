<template>
    <div class="comment" style="outline: 1px solid red;">
        <div class="comment-body">
            {{ comment.title }}
        <!-- </div> -->

        <!-- <div class="comment-actions">
          <button @click="updateComment(comment)">
            <font-awesome-icon icon="upload" />
          </button>
          <button>
            <font-awesome-icon icon="minus" @click="showComment = null"/>
          </button>
        </div> -->
    </div>

        <div class="comment-actions" >
            <button v-if="comment.isPublic">
                <font-awesome-icon icon="unlock" @click="toggleCommentPrivacy(comment._id)"/>
            </button>
            <button v-else>
                <font-awesome-icon icon="lock" @click="toggleCommentPrivacy(comment._id)"/>
            </button>

            <button @click="showComment = comment._id">
                <font-awesome-icon icon="pen" />
            </button>
            <button @click="deleteComment(comment._id)">
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
                    title: null
                },
                showComment: null,
                // isHovering: false
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('comment', ["deleteComment"]),
            // onDelete() {
            //     this.deleteComment();

            //     setTimeout(() => this.fetchNotebooks(), 10);
            // }

        }
    }
</script>
<style scoped>
    div {
        padding: .25em;
    }

    .comment {
        display: flex;
    }

    .comment-body {
        flex: 2;
    }

    .comment-actions {
        outline: 1px solid red;
    }
</style>