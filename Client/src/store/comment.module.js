import axios from 'axios';

export const comment = {
    namespaced: true,
    state: () => ({
        comments: []
    }),

    getters: {
        allComments: state => state.comments
    },

    actions: {
        async fetchComments({ commit }){
            const response = await axios.get('http://localhost:8080/api/comment/allComments');
            commit("setComments", response.data);
        },

        async addComment({ commit }, comment){
            const response = await axios.post('http://localhost:8080/api/comment/addComment', comment);
            commit("addNewComment", response.data);
        },

        async deleteComment({ commit }, id){
            await axios.delete(`http://localhost:8080/api/comment/deleteComment/${id}`);
            commit("deleteAComment", id);
        }
    },

    mutations: {
        setComments: (state, comments) => state.comments = comments,
        addNewComment: (state, comment) => state.comments.push(comment),
        deleteAComment: (state, id) => state.comments = state.comments.filter(comment => comment._id !== id)
    }
}