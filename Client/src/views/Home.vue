<template>
  <div class="container">
    <header class="jumbotron">

      <div class="sideNav">
        <div v-for="notebook in allNotebooks" :key="notebook._id">
          <div class="notebook">
            {{ notebook.title }}
            <div v-for="subject in notebook.subjects" :key="subject._id">
              <div class="subject">
                {{ subject.title }}
                <div v-for="category in subject.categories" :key="category._id">
                  <div class="category">
                    {{ category.title }}
                      <div v-for="note in category.notes" :key="note._id">
                        <div class="note">
                          {{ note.title }}
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  <input type="text" v-model="newNotebook.title">
  <input type="text" v-model="newNotebook.description">
  <button @click="addNotebook">Add Notebook</button>

<div class="notebook">

  <div v-for="notebook in allNotebooks" :key="notebook._id">
    <pre>{{ notebook.title }}</pre>

    <!-- Subject Start -->
    <div class="subject">
      <input type="text" v-model="newSubject.title">
      <button @click="addSubject(notebook._id)">Add Subject</button>

      <div v-for="subject in notebook.subjects" :key="subject._id">
      {{ subject.title }}

      <!-- Category Start -->
        <div class="category">
        <input type="text" v-model="newCategory.title">
        <button @click="addCategory(subject._id)">Add Category</button>

        <div v-for="category in subject.categories" :key="category._id">
          {{ category.title }}
          <pre>{{ category.title }}</pre>


            <!-- Note Start -->
            <div class="note">
              <input type="text" v-model="newNote.title">
              <button @click="addNote(category._id)">Add Note</button>

              <div v-for="note in category.notes" :key="note._id">
                {{ note.title }}


                  <!-- Comment Start -->
                  <div class="comment">
                    <input type="text" v-model="newComment.title">
                    <button @click="addComment(note._id)">Add Comment</button>

                    <div v-for="comment in note.comments" :key="comment._id">
                      {{ comment.title }}

                      <button @click="editComment(comment)">edit</button>

                      <input type="text" v-model="comment.title">
                      <input type="checkbox" v-model="comment.isPublic">
                      <button @click="updateComment(comment)">update</button>
                      <button @click="deleteComment(comment._id)">delete</button>
                    </div>
                  </div>
                  <!-- Comment End       -->


                <button @click="editNote(note)">edit</button>

                <input type="text" v-model="note.title">
                <input type="checkbox" v-model="note.isPublic">
                <button @click="updateNote(note)">update</button>
                <button @click="deleteNote(note._id)">delete</button>
              </div>
            </div>
            <!-- Note End       -->


          <button @click="editCategory(category)">edit</button>

          <input type="text" v-model="category.title">
          <input type="checkbox" v-model="category.isPublic">
          <button @click="updateCategory(category)">update</button>
          <button @click="deleteCategory(category._id)">delete</button>
        </div>
      </div>
      <!-- Category End       -->


        <button @click="editSubject(subject)">edit</button>

        <input type="text" v-model="subject.title">
        <input type="checkbox" v-model="subject.isPublic">
        <button @click="updateSubject(subject)">update</button>
        <button @click="deleteSubject(subject._id)">delete</button>
      </div>
    </div>
    <!-- Subject End -->  


    <button @click="editNotebook(notebook)">edit</button>

    <input type="text" v-model="notebook.title">
    <input type="text" v-model="notebook.description">
    <input type="checkbox" v-model="notebook.isPublic">
    <button @click="updateNotebook(notebook)">update</button>
    <button @click="deleteNotebook(notebook._id)">delete</button>
  </div>
</div>


    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
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
      }
    };
  },

  methods: {
    addNotebook() {
      return this.$store.dispatch(
        "notebook/addNotebook", this.newNotebook
      )
      .then(() => {
        this.newNotebook.title = '',
        this.newNotebook.description = '',
        this.getAllNotebooks();
        this.getAllSubjects();
        this.getAllCategories();
        this.getAllComments();
      })
      .catch((err) => {
        console.log("Error adding notebook: ", err);
      })
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
        isPublic: notebook.isPublic
      }

      //Toggle editMode if using a modal
      return this.$store.dispatch('notebook/updateNotebook' , { id:notebook._id, notebook: updateNotebook })
      .then(() => {
        this.getAllNotebooks();
      });
    },

    deleteNotebook(id) {
      return this.$store.dispatch('notebook/deleteNotebook', id)
      .then(() => {
        this.getAllNotebooks();
      })
      .catch((err) => {
        console.log(err);
      })
    },

    getAllNotebooks() {
      return this.$store.dispatch(
        "notebook/allNotebooks"
      )
      .then((res) => {
        this.allNotebooks = res.data.notebooks;
      })
    },


    addSubject(notebookId) {
      return this.$store.dispatch(
        "subject/addSubject", { subject: this.newSubject, notebookId }
      )
      .then(() => {
        this.newSubject.title = '',
        this.getAllNotebooks();
      })
      .catch((err) => {
        console.log("Error adding subject: ", err);
      })
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
        isPublic: subject.isPublic
      }

      //Toggle editMode if using a modal
      return this.$store.dispatch('subject/updateSubject' , { id:subject._id, subject: updateSubject })
      .then(() => {
        this.getAllSubjects();
      });
    },

    deleteSubject(id) {
      return this.$store.dispatch('subject/deleteSubject', id)
      .then(() => {
        this.getAllSubjects();
      })
      .catch((err) => {
        console.log(err);
      })
    },

    getAllSubjects() {
      return this.$store.dispatch(
        "subject/allSubjects"
      )
      .then((res) => {
        this.allSubjects = res.data.subjects;
      })
    },

    
    addCategory(subjectId) {
      return this.$store.dispatch(
        "category/addCategory", { category: this.newCategory, subjectId }
      )
      .then(() => {
        this.newCategory.title = ''
        // this.getAllCategories();
        this.getAllNotebooks();
      })
      .catch((err) => {
        console.log("Error adding category: ", err);
      })
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
        isPublic: category.isPublic
      }

      //Toggle editMode if using a modal
      return this.$store.dispatch('category/updateCategory' , { id:category._id, category: updateCategory })
      .then(() => {
        this.getAllCategories();
      });
    },

    deleteCategory(id) {
      return this.$store.dispatch('category/deleteCategory', id)
      .then(() => {
        this.getAllCategories();
      })
      .catch((err) => {
        console.log(err);
      })
    },

    getAllCategories() {
      return this.$store.dispatch(
        "category/allCategories"
      )
      .then((res) => {
        this.allCategories = res.data.categories;
      })
    },


    addNote(categoryId) {
      return this.$store.dispatch(
        "note/addNote", { note: this.newNote, categoryId }
      )
      .then(() => {
        this.newNote.title = '';
      })
      .catch((err) => {
        console.log("Error adding note: ", err);
      })
    },

    editNote(note) {
      this.noteToEdit.title = note.title;
      this.noteToEdit.description = note.description;
    },

    updateNote(note) {
      // console.log("updating wtih id: ", id);
      let updateNote = {
        title: note.title,
        body: note.body,
        isPublic: note.isPublic
      }

      //Toggle editMode if using a modal
      return this.$store.dispatch('note/updateNote' , { id:note._id, note: updateNote })
      .then(() => {
        // this.getAllNotes();
      });
    },

    deleteNote(id) {
      return this.$store.dispatch('note/deleteNote', id)
      .then(() => {
        // this.getAllNotes();
      })
      .catch((err) => {
        console.log(err);
      })
    },

    getAllNotes() {
      return this.$store.dispatch(
        "note/allNotes"
      )
      .then((res) => {
        this.allNotes = res.data.categories;
      })
    },


    addComment(noteId) {
      console.log("noteId:", noteId);
      return this.$store.dispatch(
        "comment/addComment", { comment: this.newComment, noteId }
      )
      .then(() => {
        this.newComment.title = '';
      })
      .catch((err) => {
        console.log("Error adding comment: ", err);
      })
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
        isPublic: comment.isPublic
      }

      //Toggle editMode if using a modal
      return this.$store.dispatch('comment/updateComment' , { id:comment._id, comment: updateComment })
      .then(() => {
        // this.getAllComments();
      });
    },

    deleteComment(id) {
      return this.$store.dispatch('comment/deleteComment', id)
      .then(() => {
        // this.getAllComments();
      })
      .catch((err) => {
        console.log(err);
      })
    },

    getAllComments() {
      return this.$store.dispatch(
        "comment/allComments"
      )
      .then((res) => {
        this.allComments = res.data.comments;
      })
    }



  },

  mounted() {
    this.getAllNotebooks();
    this.getAllSubjects();
    this.getAllCategories();
    this.getAllNotes();
    this.getAllComments();

    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
<style scoped>
  .notebook {
    border: 2px solid black;
    padding: 5px;
    width: 100%;
  }

  .subject {
    border: 2px solid red;
    padding: 5px;
    width: 100%;
  }

.category {
    border: 2px solid lime;
    padding: 5px;
    width: 100%;
  }

.note {
    border: 2px solid yellow;
    padding: 5px;
    width: 100%;
  }

.comment {
  border: 2px solid cyan;
  padding: 5px;
  width: 100%;
}
</style>