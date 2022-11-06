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
        },

        async updateComment({ commit }, comment) {
            console.log("updating comment: module", comment);
            const response = await axios.post(`http://localhost:8080/api/comment/updateComment/${comment.id}`, comment);
            commit("updateComment", response.data);
        },

        async toggleCommentPrivacy({ commit }, id) {
            console.log("Attempting to toggle comment privacy");
            const response = await axios.put(`http://localhost:8080/api/comment/toggleCommentPrivacy/${id}`);
            commit("toggleCommentPrivacy", response.data);
        }
    },

    mutations: {
        setComments: (state, comments) => state.comments = comments,
        addNewComment: (state, comment) => state.comments.push(comment),
        
        //May be wrong
        updateComment: (state, comment) => state.comments = comment,
        toggleCommentPrivacy: (state, comment) => state.comments = comment,
        deleteAComment: (state, id) => state.comments = state.comments.filter(comment => comment._id !== id)
    }
}