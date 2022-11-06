<template>
    <div class="notebook">
        <div class="notebook-container">
            <div class="notebook-body" v-if="!showNotebook">
                <h2 v-if="notebook && notebook.title">{{ notebook.title }}</h2>
            </div>

            <div class="notebook-actions" v-if="!showNotebook">
            <button v-if="notebook.isPublic">
                <font-awesome-icon icon="unlock" @click="toggleNotebookPrivacy(notebook._id)"/>
            </button>
            <button v-else>
                <font-awesome-icon icon="lock" @click="toggleNotebookPrivacy(notebook._id)"/>
            </button>

            <button @click="showNotebook = notebook._id">
                <font-awesome-icon icon="pen" />
            </button>
            <button @click="onDelete()">
                <font-awesome-icon icon="trash" />
            </button>
        </div>

        <div class="update-notebook" v-show="showNotebook == notebook._id">
          <input type="text" v-model="newNotebook.title" />
          <button @click="updateNotebook(notebook)">
            <font-awesome-icon icon="upload" />
          </button>
          <button>
            <font-awesome-icon icon="minus" @click="showNotebook = null"/>
          </button>
        </div>

        </div>

        <div v-for="subject in notebook.subjects" :key="subject._id">
            <Subject :categories="subject.categories" :subject="subject"/>
        </div>

        <!-- Add Subject -->
        <form @submit.prevent="onSubmit" class="add-subject-container">
            <input type="text" v-model="newSubject.title" placeholder="Add Subject" @keyup.enter="addSubject" />
            <button>
                <font-awesome-icon icon="check" />
            </button>
        </form>

    </div>
</template>
<script>
import { mapActions } from 'vuex';
    import Subject from "../components/Subject.vue";
    export default {
        name: 'Notebook',
        components: {Subject},
        props: ['notebook'],
        data () {
            return {
                newSubject: {
                    title: null
                },
                newNotebook: {
                    title: this.notebook.title
                },
                showNotebook: null
            }
        },

        methods: {
            ...mapActions('notebook', ["fetchNotebooks", "deleteNotebook"]),
            ...mapActions('subject', ["addSubject"]),
            onSubmit() {
                this.addSubject({
                    notebookId: this.notebook._id,
                    title: this.newSubject.title
                });
                
                this.newSubject.title = '';

                setTimeout(() => this.fetchNotebooks(), 10);
            },

            onDelete() {
                this.deleteNotebook(this.notebook._id);

                setTimeout(() => this.fetchNotebooks(), 10);
            },
            
            toggleNotebookPrivacy(id) {
                console.log("toggling notebook privacy");
                return this.$store
                .dispatch("notebook/toggleNotebookPrivacy", id)
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                })
            },

            updateNotebook(notebook) {
                console.log("Updating notebook: ", notebook);
                this.showNotebook = null;

                let updateNotebook = {
                    title: this.newNotebook.title,
                    isPublic: notebook.isPublic,
                };
                //Toggle editMode if using a modal
                return this.$store
                    .dispatch("notebook/updateNotebook", {
                    id: notebook._id,
                    notebook: updateNotebook,
                })
                .then(() => {
                    setTimeout(() => this.fetchNotebooks(), 10);
                });
            }
        },

        created() {
            this.fetchNotebooks();
        }
    }
</script>
<style scoped>

    .notebook {
        position: relative;
    }

    .notebook-actions {
        position: absolute;
        top: 0;
        right: 0;
    }

    .update-notebook {
        display: flex;
    }

    .update-notebook input {
        flex: 1;
    }

    h2 {
        text-align: center;
        padding: .25em;
    }

    div {
        padding: .25em;
    }

    .add-subject-container {
        display: flex;
    }

    .add-subject-container input {
        width: 100%;
    }
</style>