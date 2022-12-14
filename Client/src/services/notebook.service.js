import axios from "axios";

const API_URL = "http://localhost:8080/api/notebook/";

class NotebookService {
  getAllNotebooks() {
    return axios
      .get(API_URL + "allNotebooks")
      .then((res) => {

        console.log("response.data:", res.data.notebooks);

        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  addNotebook(notebook) {
    console.log("Adding a notebook [services]: ", notebook);

    return axios
      .post(API_URL + "addNotebook", {
        title: notebook.title,
        author: user.id,
        isPublic: true,
      })
      .then((res) => {
        console.log("res.data", res);
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  updateNotebook(data) {
    return axios
      .post(API_URL + "updateNotebook/" + data.id, {
        title: data.notebook.title,
        description: data.notebook.description,
        isPublic: data.notebook.isPublic,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  toggleNotebookPrivacy(id) {
    return axios
      .put(API_URL + "toggleNotebookPrivacy/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  deleteNotebook(id) {
    return axios
      .delete(API_URL + "deleteNotebook/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new NotebookService();
