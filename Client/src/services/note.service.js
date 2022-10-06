import axios from "axios";

const API_URL = "http://localhost:8080/api/note/";

class NoteService {
  getAllNotes() {
    return axios
      .get(API_URL + "allNotes")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  addNote(data) {
    console.log("adding note:", data);
    const user = JSON.parse(localStorage.getItem("user"));

    return axios
      .post(API_URL + "addNote", {
        title: data.note.title,
        categoryId: data.categoryId,
        author: user.id,
        isPublic: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }

  updateNote(data) {
    return axios
      .post(API_URL + "updateNote/" + data.id, {
        title: data.note.title,
        description: data.note.description,
        isPublic: data.note.isPublic,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  deleteNote(id) {
    return axios
      .delete(API_URL + "deleteNote/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new NoteService();
