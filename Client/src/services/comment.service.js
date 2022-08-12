import axios from "axios";

const API_URL = "http://localhost:8080/api/comment/";

class CommentService {
  getAllComments() {
    return axios
      .get(API_URL + "allComments")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  addComment(data) {
    console.log("data:", data);
    const user = JSON.parse(localStorage.getItem("user"));

    return axios
      .post(API_URL + "addComment", {
        title: data.comment.title,
        noteId: data.noteId,
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

  updateComment(data) {
    return axios
      .post(API_URL + "updateComment/" + data.id, {
        title: data.comment.title,
        description: data.comment.description,
        isPublic: data.comment.isPublic,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  deleteComment(id) {
    return axios
      .delete(API_URL + "deleteComment/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new CommentService();
