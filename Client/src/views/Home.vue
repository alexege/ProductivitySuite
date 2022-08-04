<template>
  <div class="container">
    <header class="jumbotron">

      <input type="text" v-model="newNotebook.title">
      <input type="text" v-model="newNotebook.description">
      <button @click="addNotebook">Add Notebook</button>
      <pre>{{ notebookToEdit }}</pre>

      <div v-for="notebook in allNotebooks" :key="notebook._id">
        <pre>{{ notebook }}</pre>
      <button @click="editNotebook(notebook)">edit</button>

        <input type="text" v-model="notebookToEdit.title">
        <input type="text" v-model="notebookToEdit.description">
        <input type="checkbox" v-model="notebookToEdit.isPublic">
        <button @click="updateNotebook(notebook._id)">update</button>
        <button @click="deleteNotebook(notebook._id)">delete</button>
      </div>

      <!-- <pre>{{content}}</pre> -->
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: '',
      allNotebooks: null,

      newNotebook: {
        title: null,
        description: null,
      },

      notebookToEdit: {
        title: null,
        description: null,
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

    updateNotebook(id) {
      console.log("updating wtih id: ", id);
      let notebook = {
        title: this.notebookToEdit.title,
        description: this.notebookToEdit.description,
        isPublic: this.notebookToEdit.isPublic
      }

      //Toggle editMode if using a modal
      return this.$store.dispatch('notebook/updateNotebook' , { id:id, notebook: notebook })
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
    }


  },

  mounted() {
    this.getAllNotebooks();

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
