<template>
    <div class="container">
        <div class="sideNav">

            <div v-for="notebook in allNotebooks" :key="notebook._id">
                <SidenavNotebook :subjects=notebook.subjects :notebook="notebook"/>
            </div>
            
            <div v-if="allNotebooks && !allNotebooks.length > 0" >
                Add a notebook to get started
            </div>
            
            <div class="add-notebook">
                <input type="text" v-model="newNotebook.title" placeholder="Add Notebook" @keyup.enter="addNotebook" />
                <button @click="addNotebook"><font-awesome-icon icon="check" /></button>
            </div>
        
        </div>
    
    <div class="main" id="main">
      
    <input type="text" id="myInput" @keyup="searchNotebooks()" placeholder="Search ...">

    <!-- Start of Dynamic Setup -->
    <div>

        <!-- AddNotebook -->
        <AddNotebook />

      <div v-for="notebook in allNotebooks" :key="notebook._id" style="flex-direction: column;" id="notes_container">
        <Notebook :notebook="notebook" />
      </div>

    </div>
  
    </div>

  </div>
</template>

<script>
import UserService from "../services/user.service";
import Notebook from "../components/Notebook.vue";
import AddNotebook from "../components/AddNotebook.vue"
import SidenavNotebook from "../components/Sidenav/SidenavNotebook.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Notebook,
    AddNotebook,
    SidenavNotebook
  },
    name: "Home",
    data() {
        return {
            newNotebook: {
                title: null,
                description: null,
            },
            allSubjects: null,
            newSubject: {
                title: null,
            },
            allCategories: null,
            newCategory: {
                title: null,
            },
            allNotes: null,
            newNote: {
                title: null,
                body: null,
            },
            allComments: null,
            newComment: {
                title: null,
            },
            show: null,
            showNotebook: null,
            showSubject: null,
            showCategory: null,
            showNotebookIndex: null,
            showSubjectIndex: null,
            showCategoryIndex: null,
            expandNotebook: null,
            expandSubject: null,
            expandCategory: null
        };
    },
    methods: {
        ...mapActions('notebook', ["fetchNotebooks", "addNotebook"]),

        onSubmit() {
            this.addNotebook(this.newNotebook);
            this.newNotebook.title = '';
        },
        
        // addNotebook() {
        //     console.log("Sending notebook: ", this.newNotebook);
        //     return this.$store
        //         // .dispatch("notebook/addNotebook", this.newNotebook)
        //         .dispatch("notebook/addNotebook", this.newNotebook)
        //         .then(() => {
        //         // (this.newNotebook.title = ""),
        //             // this.newNotebook.description = '',
        //             // this.getAll();
        //     })
        //         .catch((err) => {
        //         console.log("Error adding notebook: ", err);
        //     });
        // },
        editNotebook(notebook) {
            console.log("notebook:", notebook.title);
            this.showNotebook = notebook._id;
            this.notebookToEdit.title = notebook.title;
            this.notebookToEdit.description = notebook.description;
        },
        updateNotebook(notebook) {
            this.showNotebook = null;
            // console.log("updating wtih id: ", id);
            let updateNotebook = {
                title: notebook.title,
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
        // deleteNotebook(id) {
        //     return this.$store
        //         .dispatch("notebook/deleteNotebook", id)
        //         .then(() => {
        //         // this.getAllNotebooks();
        //     })
        //         .catch((err) => {
        //         console.log(err);
        //     });
        // },
        toggleNotebookPrivacy(id) {
            return this.$store
                .dispatch("notebook/toggleNotebookPrivacy", id)
                .then(() => {
                this.getAll();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        
        addSubject(notebookId) {
            return this.$store
                .dispatch("subject/addSubject", {
                subject: this.newSubject,
                notebookId,
            })
                .then(() => {
                (this.newSubject.title = ""), this.getAll();
            })
                .catch((err) => {
                console.log("Error adding subject: ", err);
            });
        },
        editSubject(subject) {
            this.showSubject = subject._id;
            this.subjectToEdit.title = subject.title;
            this.subjectToEdit.description = subject.description;
        },
        updateSubject(subject) {
            this.showSubject = null;
            let updateSubject = {
                title: subject.title,
                description: subject.description,
                isPublic: subject.isPublic,
            };
            //Toggle editMode if using a modal
            return this.$store
                .dispatch("subject/updateSubject", {
                id: subject._id,
                subject: updateSubject,
            })
                .then(() => {
                this.getAllSubjects();
            });
        },
        deleteSubject(id) {
            return this.$store
                .dispatch("subject/deleteSubject", id)
                .then(() => {
                this.getAll();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        toggleSubjectPrivacy(id) {
            return this.$store
                .dispatch("subject/toggleSubjectPrivacy", id)
                .then(() => {
                this.getAll();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        getAllSubjects() {
            return this.$store.dispatch("subject/allSubjects").then((res) => {
                this.allSubjects = res.data.subjects;
            });
        },
        addCategory(subjectId) {
            return this.$store
                .dispatch("category/addCategory", {
                category: this.newCategory,
                subjectId,
            })
                .then(() => {
                this.newCategory.title = "";
                this.getAll();
            })
                .catch((err) => {
                console.log("Error adding category: ", err);
            });
        },
        editCategory(category) {
            this.categoryToEdit.title = category.title;
            this.categoryToEdit.description = category.description;
        },
        updateCategory(category) {
            this.showCategory = null;
            // console.log("updating wtih id: ", id);
            let updateCategory = {
                title: category.title,
                description: category.description,
                isPublic: category.isPublic,
            };
            //Toggle editMode if using a modal
            return this.$store
                .dispatch("category/updateCategory", {
                id: category._id,
                category: updateCategory,
            })
                .then(() => {
                this.getAllCategories();
            });
        },
        deleteCategory(id) {
            return this.$store
                .dispatch("category/deleteCategory", id)
                .then(() => {
                this.getAll();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        toggleCategoryPrivacy(id) {
            return this.$store
                .dispatch("category/toggleCategoryPrivacy", id)
                .then(() => {
                this.getAll();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        getAllCategories() {
            return this.$store.dispatch("category/allCategories").then((res) => {
                this.allCategories = res.data.categories;
            });
        },
        addNote(categoryId) {
            return this.$store
                .dispatch("note/addNote", { note: this.newNote, categoryId })
                .then(() => {
                this.newNote.title = "";
                this.getAll();
            })
                .catch((err) => {
                console.log("Error adding note: ", err);
            });
        },
        editNote(note) {
            this.noteToEdit.title = note.title;
            this.noteToEdit.description = note.description;
        },
        cancelUpdate() {
            this.show = null;
        },
        updateNote(note) {
            this.show = null;
            // console.log("updating wtih id: ", id);
            let updateNote = {
                title: note.title,
                body: note.body,
                isPublic: note.isPublic,
            };
            //Toggle editMode if using a modal
            return this.$store
                .dispatch("note/updateNote", { id: note._id, note: updateNote })
                .then(() => {
                // this.getAllNotes();
            });
        },
        deleteNote(id) {
            return this.$store
                .dispatch("note/deleteNote", id)
                .then(() => {
                this.getAll();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        getAllNotes() {
            return this.$store.dispatch("note/allNotes").then((res) => {
                this.allNotes = res.data.categories;
            });
        },
        addComment(noteId) {
            console.log("noteId:", noteId);
            return this.$store
                .dispatch("comment/addComment", { comment: this.newComment, noteId })
                .then(() => {
                this.newComment.title = "";
                this.getAllNotebooks();
            })
                .catch((err) => {
                console.log("Error adding comment: ", err);
            });
        },
        editComment(comment) {
            this.commentToEdit.title = comment.title;
            this.commentToEdit.description = comment.description;
        },
        updateComment(comment) {
            // console.log("updating wtih id: ", id);
            let updateComment = {
                title: comment.title,
                body: comment.body,
                isPublic: comment.isPublic,
            };
            //Toggle editMode if using a modal
            return this.$store
                .dispatch("comment/updateComment", {
                id: comment._id,
                comment: updateComment,
            })
                .then(() => {
                // this.getAllComments();
            });
        },
        deleteComment(id) {
            return this.$store
                .dispatch("comment/deleteComment", id)
                .then(() => {
                this.getAll();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        // getAllComments() {
        //     return this.$store.dispatch("comment/allComments").then((res) => {
        //         this.allComments = res.data.comments;
        //     });
        // },
        getAll() {
            // this.getAllNotebooks();
            // this.getAllSubjects();
            // this.getAllCategories();
            // this.getAllNotes();
            // this.getAllComments();
        },
        gettingAllNotes() {
            this.$store.dispatch("notebook/allNotebooks")
            .then(res => {
                console.log("got all: ", res.data.notebooks);
                console.log("notebooks:", this.$store);
                this.$store.notebook = res.data.notebooks;
            })
                .catch((err) => {
                console.log("Error adding notebook: ", err);
            });
        },
        searchNotebooks() {

            var searchbox = document.getElementById("myInput");
            var filter = searchbox.value.toUpperCase();
            var list = document.getElementById("main");
            var items = list.getElementsByClassName("notebook");
            var txtValue = '';

            for (let i = 0; i < items.length; i++) {
                // var a = items[i].getElementsByClassName("notebook")[0];
                var a = items[i];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    items[i].style.display = "";
                } else {
                    items[i].style.display = "none";
                }
            }
        }
    },
    mounted() {
        // this.getAll();
        UserService.getPublicContent().then((response) => {
            this.content = response.data;
        }, (error) => {
            this.content =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
        });
    },
    computed: {
       ...mapGetters('notebook', ["allNotebooks"]),
    },

    created() {
        this.fetchNotebooks();
    }
}
</script>
<style scoped>
.sideNav {
  width: 300px;
  height: 100%;
  max-height: calc(100vh - 56px);
  z-index: 2;
  overflow: auto;
}
.container {
  display: flex;
  min-height: calc(100vh - 56px);
}
.main {
  outline: 1px solid lime;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
  max-height: calc(100vh - 56px);
  overflow: auto;
}
.visible {
  display: block;
}

.notebook {
  flex: 1;
  padding-left: 1em;
}

.notebook_container {
  margin: 0.5em 0;
}

.notebook .title {
  padding: 0.5em;
}

.notebook-body {
  border: 2px solid black;
  margin: .25em;
}

.notebook-title {
  text-align: center;
}

.add-notebook, .add-category, .add-subject, .add-comment, .add-note, .add-comment{
  display: flex;
  font-weight: bold;
  width: 100%;
}

.add-notebook input, .add-category input, .add-subject input, .add-comment input, .add-note input, .add-comment input{
  /* flex: 1; */
  flex-grow: 2;
}

.update-notebook, .update-subject, .update-category, .update-note, .update-comment {
  display: flex;
}

.update-notebook input[type="text"], .update-subject input[type="text"], .update-category input[type="text"], .update-note input[type="text"], .update-comment input[type="text"] {
  width: 100%;
  display: block;
}

.notebook-actions {
  display: flex;
}

.subject-actions {
  display: flex;
}

.category-actions {
  height: 100%;
}

.subject {
  width: 100%;
  padding: 0.5em 1em;
  padding-right: 0;
}

.subject-title {
  margin-left: 1em;
  font-weight: bold;
}

.category {
  width: 100%;
  padding-left: 1em;
}

.category-title {
  margin-left: 2em;
}

.note {
  width: 100%;
}

.note-title {
  /* max-width: 500px; */
  max-height: 500px;
  overflow: auto;
}

.note-actions {
  display: flex;
}

.note-actions-container {
  display: flex;
  flex-direction: column;
}

.note-body {
  padding: 0.5em;
  margin: 0.75em;
  box-shadow: 2px 2px 5px;
  display: flex; 
  justify-content: space-between;
}

#addNote {
  flex: 1;
}

.comment {
  width: 100%;
}

.title {
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vt-c-text-1);
  transition: color .5s;

  display: flex; justify-content: space-between;
}

.title:hover {
  cursor: pointer;  
}

</style>
