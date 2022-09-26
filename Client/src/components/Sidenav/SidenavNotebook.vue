<template>
    <div @mouseenter="isHovering = true" @mouseleave="isHovering = false">
        <div v-if="notebook && notebook.title" class="title">
            {{ notebook.title }}
        
        <div class="notebook-actions" v-show="isHovering">
            <button v-if="notebook.isPublic">
                <font-awesome-icon icon="unlock" @click="toggleNotebookPrivacy(notebook._id)"/>
            </button>
            <button v-else>
                <font-awesome-icon icon="lock" @click="toggleNotebookPrivacy(notebook._id)"/>
            </button>

            <button @click="showNotebook = notebook._id">
                <font-awesome-icon icon="pen" />
            </button>
            <button @click="deleteNotebook(notebook._id)">
                <font-awesome-icon icon="trash" />
            </button>
        </div>
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

        <div v-for="subject in subjects" :key="subject._id">
            <SidenavSubject :categories=subject.categories :subject="subject"/>
        </div>

        <!-- Add Subject -->
        <div class="add-comment-container">
            <input type="text" v-model="newSubject.title" placeholder="Add Subject" @keyup.enter="addSubject(notebook._id)" />
            <button @click="addSubject(notebook._id)">
                <font-awesome-icon icon="check" />
            </button>
        </div>

    </div>
</template>
<script>
    import SidenavSubject from "../Sidenav/SidenavSubject.vue";
    export default {
        name: 'SidenavNotebook',
        components: {SidenavSubject},
        props: ['subjects', 'notebook'],
        data () {
            return {
                newSubject: {
                    title: null
                },
                newNotebook: {
                    title: this.notebook.title
                },
                showNotebook: null,
                isHovering: false
            }
        },

        methods: {
            addSubject(notebookId) {
                return this.$store
                    .dispatch("subject/addSubject", {
                    subject: this.newSubject,
                    notebookId,
                })
                    .then(() => {(this.newSubject.title = "")})
                    .catch((err) => {
                    console.log("Error adding subject: ", err);
                });
            },

            deleteNotebook(id) {
            return this.$store
                .dispatch("notebook/deleteNotebook", id)
                .then(() => {
                this.getAllNotebooks();
            })
                .catch((err) => {
                console.log(err);
            });
            },

            toggleNotebookPrivacy(id) {
            return this.$store
                .dispatch("notebook/toggleNotebookPrivacy", id)
                .then(() => {
            })
                .catch((err) => {
                console.log(err);
            });
            },

            updateNotebook(notebook) {
            this.showNotebook = null;
            let updateNotebook = {
                title: this.newNotebook.title,
                description: notebook.description,
                isPublic: notebook.isPublic,
            };
            //Toggle editMode if using a modal
            return this.$store
                .dispatch("notebook/updateNotebook", {
                id: notebook._id,
                notebook: updateNotebook,
            })
                .then(() => {
                this.getAllNotebooks();
            });
            },

            getAllNotebooks() {
            return this.$store.dispatch("notebook/allNotebooks").then((res) => {
                this.allNotebooks = res.data.notebooks;
            });
        },
        }
    }
</script>
<style scoped>
    button {
        font-size: 0.8em;
    }
    .title {
        position: relative;
    }
    .notebook-actions {
        display: flex;
        justify-content: end;
        position: absolute;
        top: 0;
        right: 0;
    }

    .update-notebook input{
        display: flex;
        flex: 2;
    }

    .update-notebook {
        display: flex;
        flex: 1;
    }

    .add-comment-container {
        display: flex;
    }

    .add-comment-container input {
        width: 100%;
    }
</style>