import NotebookService from "../services/notebook.service";

export const notebook = {
    namespaced: true,
    state: () => ({
        notebooks: []
    }),

    actions: {

        addNotebook({ commit }, notebook) {
            return NotebookService.addNotebook(notebook)
            .then(notebook => {
                commit('addNotebookSuccess', notebook);
                return Promise.resolve(notebook);
            },
            error => {
                commit('addNotebookFailure', notebook);
                return Promise.reject(error);
            })
        },

        updateNotebook({ commit }, notebook) {
            return NotebookService.updateNotebook(notebook)
            .then(notebook => {
                commit('updateNotebookSuccess', notebook);
                return Promise.resolve(notebook);
            },
            error => {
                commit('updateNotebookFailure', notebook);
                return Promise.reject(error);
            });
        },

        deleteNotebook({ commit }, notebook) {
            return NotebookService.deleteNotebook(notebook)
            .then(notebook => {
                commit('deleteNotebookSuccess', notebook);
                return Promise.resolve(notebook);
            },
            error => {
                commit('deleteNotebookFailure', notebook);
                return Promise.reject(error);
            })
        },

        allNotebooks({ commit }, notebook) {
            return NotebookService.getAllNotebooks()
            .then(notebooks => {
                commit('getAllNotebookSuccess', notebook);
                return Promise.resolve(notebooks);
            },
            error => {
                commit('getAllNotebookFailure', notebook);
                return Promise.reject(error);
            });
        },
    },

    mutations: {
        addNotebookSuccess() {},
        addNotebookFailure() {},
        updateNotebookSuccess() {},
        updateNotebookFailure() {},
        getAllNotebookSuccess() {},
        getAllNotebookFailure() {},
        deleteNotebookSuccess() {},
        deleteNotebookFailure() {},
    }
}