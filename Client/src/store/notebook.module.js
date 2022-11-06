import axios from 'axios';

export const notebook = {
    namespaced: true,
    state: {
        notebooks: []
    },

    getters: {
        allNotebooks: state => state.notebooks
    },

    actions: {
        async fetchNotebooks({ commit }){
            const response = await axios.get('http://localhost:8080/api/notebook/allNotebooks');
            commit("setNotebooks", response.data);
        },

        async addNotebook({ commit }, notebook){
            const response = await axios.post('http://localhost:8080/api/notebook/addNotebook', notebook);
            commit("addNewNotebook", response.data);
        },

        async deleteNotebook({ commit }, id){
            await axios.delete(`http://localhost:8080/api/notebook/deleteNotebook/${id}`);
            commit("deleteANotebook", id);
        },

        async updateNotebook({ commit }, notebook) {
            console.log("updating notebook: module", notebook);
            const response = await axios.post(`http://localhost:8080/api/notebook/updateNotebook/${notebook.id}`, notebook);
            commit("updateNotebook", response.data);
        },

        async toggleNotebookPrivacy({ commit }, id) {
            console.log("Attempting to toggle notebook privacy");
            const response = await axios.put(`http://localhost:8080/api/notebook/toggleNotebookPrivacy/${id}`);
            commit("toggleNotebookPrivacy", response.data);
        }
    },

    mutations: {
        setNotebooks: (state, notebooks) => state.notebooks = notebooks,
        addNewNotebook: (state, notebook) => state.notebooks.push(notebook),
        deleteANotebook: (state, id) => state.notebooks = state.notebooks.filter(notebook => notebook._id !== id)
    }
}