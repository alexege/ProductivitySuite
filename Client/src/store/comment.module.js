import CommentService from "../services/comment.service";

export const comment = {
    namespaced: true,
    state: () => ({
        comments: []
    }),

    actions: {

        addComment({ commit }, comment) {
            return CommentService.addComment(comment)
            .then(comment => {
                commit('addCommentSuccess', comment);
                return Promise.resolve(comment);
            },
            error => {
                commit('addCommentFailure', comment);
                return Promise.reject(error);
            })
        },

        updateComment({ commit }, comment) {
            return CommentService.updateComment(comment)
            .then(comment => {
                commit('updateCommentSuccess', comment);
                return Promise.resolve(comment);
            },
            error => {
                commit('updateCommentFailure', comment);
                return Promise.reject(error);
            });
        },

        deleteComment({ commit }, comment) {
            return CommentService.deleteComment(comment)
            .then(comment => {
                commit('deleteCommentSuccess', comment);
                return Promise.resolve(comment);
            },
            error => {
                commit('deleteCommentFailure', comment);
                return Promise.reject(error);
            })
        },

        allComments({ commit }, comment) {
            return CommentService.getAllComments()
            .then(comments => {
                commit('getAllCommentsSuccess', comment);
                return Promise.resolve(comments);
            },
            error => {
                commit('getAllCommentsFailure', comment);
                return Promise.reject(error);
            });
        },
    },

    mutations: {
        addCommentSuccess() {},
        addCommentFailure() {},
        updateCommentSuccess() {},
        updateCommentFailure() {},
        getAllCommentsSuccess() {},
        getAllCommentsFailure() {},
        deleteCommentSuccess() {},
        deleteCommentFailure() {},
    }
}