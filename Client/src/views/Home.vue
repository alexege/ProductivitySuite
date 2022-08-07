<template>
  <div class="container">
    <header class="jumbotron">

<div class="notebook">
  <input type="text" v-model="newNotebook.title">
  <input type="text" v-model="newNotebook.description">
  <button @click="addNotebook">Add Notebook</button>

  <div v-for="notebook in allNotebooks" :key="notebook._id">
    <pre>{{ notebook }}</pre>


    <!-- Subject Start -->
    <div class="subject">
      <input type="text" v-model="newSubject.title">
      <button @click="addSubject(notebook._id)">Add Subject</button>

      <div v-for="subject in allSubjects" :key="subject._id">
        <pre>{{ subject }}</pre>
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
        this.getAllSubjects();
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

    
    addCategory(notebookId) {
      return this.$store.dispatch(
        "category/addCategory", { category: this.newCategory, notebookId }
      )
      .then(() => {
        this.newCategory.title = '',
        this.getAllCategorys();
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
        this.getAllCategorys();
      });
    },

    deleteCategory(id) {
      return this.$store.dispatch('category/deleteCategory', id)
      .then(() => {
        this.getAllCategorys();
      })
      .catch((err) => {
        console.log(err);
      })
    },

    getAllCategorys() {
      return this.$store.dispatch(
        "category/allCategorys"
      )
      .then((res) => {
        this.allCategorys = res.data.categorys;
      })
    }




  },

  mounted() {
    this.getAllNotebooks();
    this.getAllSubjects();

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
