import axios from "axios";

const API_URL = "http://localhost:8080/api/subject/";

class SubjectService {
  getAllSubjects() {
    return axios
      .get(API_URL + "allSubjects")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  addSubject(data) {
    console.log("data:", data);
    const user = JSON.parse(localStorage.getItem("user"));

    return axios
      .post(API_URL + "addSubject", {
        title: data.subject.title,
        notebookId: data.notebookId,
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

  toggleSubjectPrivacy(id) {
    return axios
      .put(API_URL + "toggleSubjectPrivacy/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  updateSubject(data) {
    return axios
      .post(API_URL + "updateSubject/" + data.id, {
        title: data.subject.title,
        description: data.subject.description,
        isPublic: data.subject.isPublic,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  deleteSubject(id) {
    return axios
      .delete(API_URL + "deleteSubject/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new SubjectService();
