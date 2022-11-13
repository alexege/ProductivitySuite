<template>
    <div class="note" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
        <div class="note-container">
        <div class="note-body" v-if="!showNote">
            {{ note.title }}
        </div>

        <div class="note-actions" v-if="!showNote" v-show="isHovering">
            <button v-if="note.isPublic">
                <font-awesome-icon icon="unlock" @click="toggleNotePrivacy(note._id)"/>
            </button>
            <button v-else>
                <font-awesome-icon icon="lock" @click="toggleNotePrivacy(note._id)"/>
            </button>

            <button @click="showNote = note._id">
                <font-awesome-icon icon="pen" />
            </button>
            <button @click="onDelete()">
                <font-awesome-icon icon="trash" />
            </button>
        </div>

        <div class="update-note" v-show="showNote == note._id">
          <input type="text" v-model="newNote.title" />
          <button @click="updateNote(note)">
            <font-awesome-icon icon="upload" />
          </button>
          <button>
            <font-awesome-icon icon="minus" @click="showNote = null"/>
          </button>
        </div>

    </div>

        
        <div v-for="comment in comments" :key="comment._id">
            <Comment :comment="comment"/>
        </div>

        <!-- Add Comment -->
        <div class="add-comment-container">
            <input type="text" v-model="newComment.title" placeholder="Add Comment" @keyup.enter="onSubmit" />
            <button @click.prevent="onSubmit">
                <font-awesome-icon icon="check" />
            </button>
        </div>

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
                },
                newNote:{
                    title: this.note.title
                },
                showNote: null,
                isHovering: false
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('note', ["deleteNote"]),
            ...mapActions('comment', ["addComment"]),
            onSubmit() {
                this.addComment({
                    comment: this.newComment,
                    noteId: this.note._id //This comes from the props
                });

                this.newComment.title = '';

                setTimeout(() => this.fetchNotebooks(), 10);
            },

            onDelete() {
                this.deleteNote(this.note._id);

                setTimeout(() => this.fetchNotebooks(), 10);
            },
            
            toggleNotePrivacy(id) {
                console.log("toggling note privacy");
                return this.$store
                .dispatch("note/toggleNotePrivacy", id)
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                })
            },

            updateNote(note) {
                console.log("Updating note: ", note);
                this.showNote = null;

                let updateNote = {
                    title: this.newNote.title,
                    isPublic: note.isPublic,
                };
                //Toggle editMode if using a modal
                return this.$store
                    .dispatch("note/updateNote", {
                    id: note._id,
                    note: updateNote,
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

    input {
        width: 80%;
    }

    .add-comment-container {
        display: flex;
    }

    .add-comment-container input, textarea {
        width: 100%;
    }

    .note {
        display: flex;
        flex-direction: column;
        box-shadow: 2px 2px 5px black;
        margin: 10px;
    }
    
    .note-body {
        flex: 2;
        min-height: 40px;
    }

    .note-container {
       display: flex;
    }

    .update-note {
        display: flex;
        flex: 1;
    }

    .update-note input {
        flex: 1;
    }
</style>