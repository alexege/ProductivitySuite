import NoteService from "../services/note.service";

export const note = {
    namespaced: true,
    state: () => ({
        notes: []
    }),

    actions: {

        addNote({ commit }, note) {
            return NoteService.addNote(note)
            .then(note => {
                commit('addNoteSuccess', note);
                return Promise.resolve(note);
            },
            error => {
                commit('addNoteFailure', note);
                return Promise.reject(error);
            })
        },

        updateNote({ commit }, note) {
            return NoteService.updateNote(note)
            .then(note => {
                commit('updateNoteSuccess', note);
                return Promise.resolve(note);
            },
            error => {
                commit('updateNoteFailure', note);
                return Promise.reject(error);
            });
        },

        deleteNote({ commit }, note) {
            return NoteService.deleteNote(note)
            .then(note => {
                commit('deleteNoteSuccess', note);
                return Promise.resolve(note);
            },
            error => {
                commit('deleteNoteFailure', note);
                return Promise.reject(error);
            })
        },

        allNotes({ commit }, note) {
            return NoteService.getAllNotes()
            .then(notes => {
                commit('getAllNotesSuccess', note);
                return Promise.resolve(notes);
            },
            error => {
                commit('getAllNotesFailure', note);
                return Promise.reject(error);
            });
        },
    },

    mutations: {
        addNoteSuccess() {},
        addNoteFailure() {},
        updateNoteSuccess() {},
        updateNoteFailure() {},
        getAllNotesSuccess() {},
        getAllNotesFailure() {},
        deleteNoteSuccess() {},
        deleteNoteFailure() {},
    }
}