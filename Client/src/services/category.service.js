import axios from "axios";

const API_URL = "http://localhost:8080/api/category/";

class CategoryService {
  getAllCategories() {
    return axios
      .get(API_URL + "allCategorys")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  addCategory(data) {
    console.log("data:", data);
    const user = JSON.parse(localStorage.getItem("user"));

    return axios
      .post(API_URL + "addCategory", {
        title: data.category.title,
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

  updateCategory(data) {
    return axios
      .post(API_URL + "updateCategory/" + data.id, {
        title: data.category.title,
        description: data.category.description,
        isPublic: data.category.isPublic,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  deleteCategory(id) {
    return axios
      .delete(API_URL + "deleteCategory/" + id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new CategoryService();
