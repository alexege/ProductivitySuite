<template>
  <div class="container" style="border: 2px solid black;">
    <div class="sideNav">
      <div class="add-notebook">
        <input type="text" v-model="newNotebook.title" />
        <!-- <input type="text" v-model="newNotebook.description"> -->
        <button @click="addNotebook">Add Notebook</button>
      </div>

      <div class="notebook">
        <div v-for="notebook in allNotebooks" :key="notebook._id">
        <div class="title">{{ notebook.title }}</div>

          <!-- Subject Start -->
          <div class="subject">
            <div v-for="subject in notebook.subjects" :key="subject._id">
              <div class="title">{{ subject.title }}</div>

              <!-- Category Start -->
              <div class="category">
                <div v-for="category in subject.categories" :key="category._id">
                <div class="title">{{ category.title }}</div>

                  <!-- <div class="note">
                    <div v-for="note in category.notes" :key="note._id">
                      <div class="title">{{ note.title }}</div>

                      <div class="comment">
                        <div v-for="comment in note.comments" :key="comment._id">
                        <div class="title">{{ comment.title }}</div>

                          <div class="update-comment">
                            <button @click="updateComment(comment)">update</button>
                            <input type="text" v-model="comment.title" />
                            <input type="checkbox" v-model="comment.isPublic" />
                          </div>

                          <div class="comment-actions">
                            <button @click="editComment(comment)">*</button>
                            <button @click="deleteComment(comment._id)">x</button>
                          </div>
                        </div>

                        <div class="add-comment">
                          <input type="text" v-model="newComment.title" placeholder="Add Comment"/>
                          <button @click="addComment(note._id)">+</button>
                        </div>
                      </div>

                      <div class="update-note">
                        <button @click="updateNote(note)">update</button>
                        <input type="text" v-model="note.title" />
                        <input type="checkbox" v-model="note.isPublic" />
                      </div>

                      <div class="note-actions">
                        <button @click="editNote(note)">*</button>
                        <button @click="deleteNote(note._id)">x</button>
                      </div>
                    </div>

                    <div class="add-note">
                      <input type="text" v-model="newNote.title" placeholder="Add Note"/>
                      <button @click="addNote(category._id)">+</button>
                    </div>
                  </div> -->


                  <div class="update-category">
                    <button @click="updateCategory(category)">update</button>
                    <input type="text" v-model="category.title" />
                    <input type="checkbox" v-model="category.isPublic" />
                  </div>

                  <div class="category-actions">
                    <button @click="editCategory(category)">*</button>
                    <button @click="deleteCategory(category._id)">x</button>
                  </div>
                </div>

                <div class="add-category">
                  <input type="text" v-model="newCategory.title" placeholder="Add Category"/>
                  <button @click="addCategory(subject._id)">+</button>
                </div>
              </div>
              <!-- Category End       -->

              <div class="update-subject">
                <input type="text" v-model="subject.title" />
                <input type="checkbox" v-model="subject.isPublic" />
                <button @click="updateSubject(subject)">update</button>
              </div>

              <div class="subject-actions">
                <button @click="editSubject(subject)">*</button>
                <button @click="deleteSubject(subject._id)">x</button>
              </div>
            </div>

            <div class="add-subject">
              <input type="text" v-model="newSubject.title" placeholder="Add Subject"/>
              <button @click="addSubject(notebook._id)">+</button>
            </div>
          </div>
          <!-- Subject End -->


        <div class="update-notebook">
          <input type="text" v-model="notebook.title" />
          <!-- <input type="text" v-model="notebook.description" /> -->
          <input type="checkbox" v-model="notebook.isPublic" />
          <button @click="updateNotebook(notebook)">update</button>
        </div>
        <div class="notebook-actions">
          <button @click="editNotebook(notebook)">*</button>
          <button @click="deleteNotebook(notebook._id)">x</button>
        </div>

        </div>
      </div>
      <!-- Notebook End -->

    </div>
    <div class="main">
      <div v-for="notebook in allNotebooks" :key="notebook._id">
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
                  <button @click="show = note._id">edit</button>
                  <!-- <button @click="editNote(note)">update</button> -->
                  <button @click="deleteNote(note._id)">delete</button>
                </div>
              </div>

            </div>

            <div class="note-body" v-show="show === note._id">
              <div class="note-title">
                <textarea name="" id="" cols="60" v-model="note.title"></textarea>
              </div>

                <div class="note-actions-container">
                  <div class="note-actions">
                    <input type="checkbox" v-model="note.isPublic" />
                    <button @click="updateNote(note)">update</button>
                    <button @click="cancelUpdate()">cancel</button>
  
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
              <button @click="updateNote(note)">update</button>
            </div> -->

          <!-- </div> -->

        </div>

            <div class="add-note">
              <textarea name="addNote" id="addNote" cols="30" rows="10" v-model="newNote.title">Add Note</textarea>
              <!-- <input type="text" v-model="newNote.title" placeholder="Add Note Title"> -->
              <button @click="addNote(category._id)">Add</button>
            </div>

            <!-- <div class="update-note">
                        <button @click="updateNote(note)">update</button>
                        <input type="text" v-model="note.title" />
                        <input type="checkbox" v-model="note.isPublic" />
                      </div>

                      <div class="note-actions">
                        <button @click="editNote(note)">*</button>
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

      show: null
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
      this.notebookToEdit.title = notebook.title;
      this.notebookToEdit.description = notebook.description;
    },

    updateNotebook(notebook) {
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
  height: 100vh;
  display: flex;
}

.sideNav {
  width: 200px;
  height: 100%;
  /* outline: 2px solid red; */
}

.main {
  outline: 1px solid lime;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
}

.notebook {
 /* outline: 2px solid black; */
  flex: 1;
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
  /* display: none; */
}

.notebook-actions {
  display: flex;
}

.subject {
 /* outline: 2px solid red; */
  width: 100%;
}

.subject-title {
  margin-left: 1em;
  font-weight: bold;
}

.category {
 /* outline: 2px solid lime; */
  width: 100%;
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
}
</style>
