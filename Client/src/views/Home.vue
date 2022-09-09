<template>
  <div class="container">
    <div class="sideNav">
      
      <div v-if="!allNotebooks.length > 0">
        Add a notebook to get started
      </div>
      <div class="notebook">
        <div v-for="(notebook, note_idx) in allNotebooks" :key="notebook._id">

        <div class="title" @mouseover="showNotebookIndex = note_idx" @mouseout="showNotebookIndex = null" v-show="showNotebook != notebook._id">
          {{ notebook.title }}
          <div class="notebook-actions" v-show="showNotebookIndex === note_idx">
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
          <input type="text" v-model="notebook.title" />
          <button @click="updateNotebook(notebook)">
            <font-awesome-icon icon="upload" />
          </button>
          <button>
            <font-awesome-icon icon="minus" @click="showNotebook = null"/>
          </button>
        </div>

          <!-- Subject Start -->
          <div class="subject">
            <div v-for="(subject, subject_idx) in notebook.subjects" :key="subject._id">
              <div class="title" @mouseover="showSubjectIndex = subject_idx" @mouseout="showSubjectIndex = null" v-show="showSubject != subject._id">
              <ul>
                <li style="list-style-type:square">{{ subject.title }}</li>
              </ul>
                <div class="subject-actions" v-show="showSubjectIndex === subject_idx">
                  <button v-if="subject.isPublic">
                    <font-awesome-icon icon="unlock" @click="toggleSubjectPrivacy(subject._id)"/>
                  </button>
                  <button v-else>
                    <font-awesome-icon icon="lock" @click="toggleSubjectPrivacy(subject._id)"/>
                  </button>
                <button @click="showSubject = subject._id">
                  <font-awesome-icon icon="pen" />
                </button>
                <button @click="deleteSubject(subject._id)">
                    <font-awesome-icon icon="trash" />
                </button>
              </div>
            </div>

            <div class="update-subject" v-show="showSubject == subject._id">
                <input type="text" v-model="subject.title" />
                <button @click="updateSubject(subject)">
                  <font-awesome-icon icon="upload" />
                </button>
                <button>
                  <font-awesome-icon icon="minus" @click="showSubject = null"/>
                </button>
              </div>

              <!-- Category Start -->
              <div class="category">
                <div v-for="(category, category_idx) in subject.categories" :key="category._id">
                  <div class="title" @mouseover="showCategoryIndex = category_idx" @mouseout="showCategoryIndex = null" v-show="showCategory != category._id">
                    <ul>
                      <li style="list-style-type: square">{{ category.title }}</li>
                    </ul>
                    <div class="category-actions" v-show="showCategoryIndex === category_idx">
                    <button v-if="category.isPublic">
                      <font-awesome-icon icon="unlock" @click="toggleCategoryPrivacy(category._id)"/>
                    </button>
                    <button v-else>
                      <font-awesome-icon icon="lock" @click="toggleCategoryPrivacy(category._id)"/>
                    </button>
                    <button @click="showCategory = category._id">
                      <font-awesome-icon icon="pen" />
                    </button>
                    <button @click="deleteCategory(category._id)">
                      <font-awesome-icon icon="trash" />
                    </button>
                  </div>
              </div>

              <div class="update-category" v-show="showCategory == category._id">
                    <input type="text" v-model="category.title" />
                    <button @click="updateCategory(category)">
                      <font-awesome-icon icon="upload" />
                    </button>
                    <button>
                      <font-awesome-icon icon="minus" @click="showCategory = null"/>
                    </button>
                  </div>
                  
                </div>

                <div class="add-category">
                  <input type="text" v-model="newCategory.title" placeholder="Add Category" @keyup.enter="addCategory(subject._id)"/>
                  <button @click="addCategory(subject._id)"><font-awesome-icon icon="check" /></button>
                </div>
              </div>
              <!-- Category End       -->

            </div>

            <div class="add-subject">
              <input type="text" v-model="newSubject.title" placeholder="Add Subject" @keyup.enter="addSubject(notebook._id)" />
              <button @click="addSubject(notebook._id)"><font-awesome-icon icon="check" /></button>
            </div>
          </div>
          <!-- Subject End -->

        </div>
      </div>
      <!-- Notebook End -->

      <div class="add-notebook">
        <input type="text" v-model="newNotebook.title" placeholder="Add Notebook" @keyup.enter="addNotebook" />
        <button @click="addNotebook"><font-awesome-icon icon="check" /></button>
      </div>

    </div>
    <div class="main">
      <div v-if="!allNotebooks.length > 0">
        <p style="text-align: center;">No notebooks found.</p>
      </div>
      <div v-for="notebook in allNotebooks" :key="notebook._id" class="notebook-body">
        <div class="notebook-title">
          <pre>{{ notebook.title }}</pre>
        </div>
        <div v-for="subject in notebook.subjects" :key="subject._id">
        <div class="subject-title">
          <pre>{{ subject.title }}</pre>
        </div>
          <div v-for="category in subject.categories" :key="category._id">
          <div class="category-title">
            <pre>{{ category.title }}</pre>
          </div>
            <div v-for="note in category.notes" :key="note._id">
            
            <div class="note-body" v-if="show != note._id">
            
              <div class="note-title">
                <pre>{{ note.title }}</pre>
              </div>

              <div class="note-actions-container" >
                <div class="note-actions">
                  <button @click="show = note._id">
                    <font-awesome-icon icon="pen" />
                  </button>
                  <!-- <button @click="editNote(note)">
            <font-awesome-icon icon="upload" />

                  </button> -->
                  <button @click="deleteNote(note._id)">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </div>

            </div>

            <div class="note-body" v-show="show === note._id">
              <div class="note-title">
                <textarea name="" id="" cols="60" v-model="note.title"></textarea>
              </div>

                <div class="note-actions-container">
                  <div class="note-actions">
                    <!-- <input type="checkbox" v-model="note.isPublic" /> -->
                    <button v-if="notebook.isPublic">
                      <font-awesome-icon icon="unlock" @click="toggleNotebookPrivacy(notebook._id)"/>
                    </button>
                    <button v-else>
                      <font-awesome-icon icon="lock" @click="toggleNotebookPrivacy(notebook._id)"/>
                    </button>
                    <button @click="updateNote(note)">
                      <font-awesome-icon icon="upload" />
                    </button>
                    <button @click="cancelUpdate()">
                      <font-awesome-icon icon="minus" />
                    </button>
  
                  </div>
                </div>

              <!-- <div class="update-note" v-show="show === note._id" style="outline: 1px solid orange; width: 100%;">
              <textarea name="noteTitle" id="noteTitle" cols="30" rows="10" v-model="note.title"></textarea>
              </div> -->
            </div>

            <div>

            </div>


            <!-- <div class="update-note" v-show="show === note._id">
              <div>
              <textarea name="noteTitle" id="noteTitle" cols="30" rows="10" v-model="note.title"></textarea>
              <input type="checkbox" v-model="note.isPublic" />
              <button @click="updateNote(note)">
            <font-awesome-icon icon="upload" />

              </button>
            </div> -->

          <!-- </div> -->

        </div>

            <div class="add-note">
              <textarea name="addNote" id="addNote" cols="30" rows="10" v-model="newNote.title" :placeholder="`Add Note to${category.title}`" @keyup.enter="addNote(category._id)">Add note</textarea>
              <!-- <input type="text" v-model="newNote.title" placeholder="Add Note Title"> -->
              <button @click="addNote(category._id)">Add</button>
            </div>

            <!-- <div class="update-note">
                        <button @click="updateNote(note)">
            <font-awesome-icon icon="upload" />

                        </button>
                        <input type="text" v-model="note.title" />
                        <input type="checkbox" v-model="note.isPublic" />
                      </div>

                      <div class="note-actions">
                        <button @click="editNote(note)">
                      <font-awesome-icon icon="pen" />

                        </button>
                        <button @click="deleteNote(note._id)">x</button>
            </div> -->




          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      allNotebooks: null,

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
      showCategoryIndex: null
    };
  },

  methods: {
    addNotebook() {
      return this.$store
        .dispatch("notebook/addNotebook", this.newNotebook)
        .then(() => {
          (this.newNotebook.title = ""),
            // this.newNotebook.description = '',
            this.getAll();
        })
        .catch((err) => {
          console.log("Error adding notebook: ", err);
        });
    },

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
          this.getAll();
        })
        .catch((err) => {
          console.log(err);
        })
    },

    getAllNotebooks() {
      return this.$store.dispatch("notebook/allNotebooks").then((res) => {
        this.allNotebooks = res.data.notebooks;
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
      // console.log("updating wtih id: ", id);
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
        })
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
        })
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

    getAllComments() {
      return this.$store.dispatch("comment/allComments").then((res) => {
        this.allComments = res.data.comments;
      });
    },

    getAll() {
      this.getAllNotebooks();
      this.getAllSubjects();
      this.getAllCategories();
      this.getAllNotes();
      this.getAllComments();
    },
  },

  mounted() {
    this.getAll();

    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
<style scoped>

.visible {
  display: block;
}

.container {
  display: flex;
  min-height: calc(100vh - 56px);
}

.sideNav {
  width: 300px;
  height: 100%;
  /* outline: 2px solid red; */
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

.notebook {
 /* outline: 2px solid yellow; */
  flex: 1;
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
  height: 25px;
  font-size: .65em;
  font-weight: bold;
  width: 100%;
  /* outline: 2px solid yellow; */
}

.add-notebook input, .add-category input, .add-subject input, .add-comment input, .add-note input, .add-comment input{
  flex: 1;
}
.add-notebook button {
  font-size: .75em;
}

.add-notebook input {
  flex: 1;
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

.subject {
 /* outline: 2px solid red; */
  width: 100%;
}

.subject .title {
  margin-left: 1em;
}

.subject-title {
  margin-left: 1em;
  font-weight: bold;
}

.category {
 /* outline: 2px solid lime; */
  width: 100%;
}

.category .title {
  margin-left:2em;
}

.category-title {
  margin-left: 2em;
}

.note {
 /* outline: 2px solid yellow; */
  width: 100%;
}

.note-title {
  max-width: 500px;
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

.update-note {
}

.comment {
 /* outline: 2px solid cyan; */
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

.hidden { display: none; }
.trigger:hover + .hidden { display: inline; }

</style>
