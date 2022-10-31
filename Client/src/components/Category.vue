<template>
    <div style="outline: 1px solid lime;">
        <h4 v-if="category && category.title">{{ category.title }}</h4>

        <div v-for="note in notes" :key="note._id">
            <Note :comments="note.comments" :note="note"/>
        </div>

        <!-- Add Note -->
        <div class="add-note-container">
            <input type="text" v-model="newNote.title" placeholder="Add Note" @keyup.enter="onSubmit" />
            <button @click.prevent="onSubmit">
                <font-awesome-icon icon="check" />
            </button>
        </div>

    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import Note from '../components/Note.vue'
    export default {
        name: 'Category',
        components: { Note },
        props: ['notes', 'category'],
        data () {
            return {
                newNote: {
                    title: null
                }
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks"]),
            ...mapActions('note', ["addNote"]),
            onSubmit() {
                this.addNote({
                    note: this.newNote,
                    categoryId: this.category._id
                });

                this.newNote.title = '';

                setTimeout(() => this.fetchNotebooks(), 10);
            }

            // addNote(categoryId) {
            //     return this.$store
            //         .dispatch("note/addNote", { note: this.newNote, categoryId })
            //         .then(() => {
            //         this.newNote.title = "";
            //     })
            //         .catch((err) => {
            //         console.log("Error adding note: ", err);
            //     });
            // },
        }

    }
</script>
<style scoped>
   .add-note-container {
    display: flex;
   }

   .add-note-container input {
    width: 100%;
   }
</style>