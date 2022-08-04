import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notebook/';

class NotebookService {

  deleteNotebook(id) {
    return axios.delete(API_URL + 'deleteNotebook/' + id)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  }

  getAllNotebooks() {
    return axios.get(API_URL + 'allNotebooks')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    })
  }

  addNotebook(notebook) {
    const user = JSON.parse(localStorage.getItem('user'));

    return axios.post(API_URL + 'addNotebook', {
      title: notebook.title,
      description: notebook.description,
      author: user.id,
      isPublic: true,
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    })
  }

    updateNotebook(data) {
        console.log("updatenotebbookservice, ", data);
        return axios.post(API_URL + 'updateNotebook/' + data.id, 
        {
            title: data.notebook.title,
            description: data.notebook.description,
            isPublic: data.notebook.isPublic
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    }
}

export default new NotebookService();