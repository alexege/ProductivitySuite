// import NoteService from "../services/note.service";
import axios from 'axios';

export const note = {
    namespaced: true,
    state: () => ({
        notes: []
    }),

    getters: {
        allNotes: state => state.notes
    },

    actions: {

        async fetchNotes({ commit }){
            const response = await axios.get('http://localhost:8080/api/note/allNotes');
            commit("setNotes", response.data);
        },

        async addNote({ commit }, note){
            const response = await axios.post('http://localhost:8080/api/note/addNote', note);
            commit("addNewNote", response.data);
        },

        async deleteNote({ commit }, id){
            await axios.delete(`http://localhost:8080/api/note/deleteNote/${id}`);
            commit("deleteANote", id);
        },

        async updateNote({ commit }, note) {
            console.log("updating note: module", note);
            const response = await axios.post(`http://localhost:8080/api/note/updateNote/${note.id}`, note);
            commit("updateNote", response.data);
        },

        async toggleNotePrivacy({ commit }, id) {
            console.log("Attempting to toggle note privacy");
            const response = await axios.put(`http://localhost:8080/api/note/toggleNotePrivacy/${id}`);
            commit("toggleNotePrivacy", response.data);
        }

        // addNote({ commit }, note) {
        //     return NoteService.addNote(note)
        //     .then(note => {
        //         commit('addNoteSuccess', note);
        //         return Promise.resolve(note);
        //     },
        //     error => {
        //         commit('addNoteFailure', note);
        //         return Promise.reject(error);
        //     })
        // },

        // updateNote({ commit }, note) {
        //     return NoteService.updateNote(note)
        //     .then(note => {
        //         commit('updateNoteSuccess', note);
        //         return Promise.resolve(note);
        //     },
        //     error => {
        //         commit('updateNoteFailure', note);
        //         return Promise.reject(error);
        //     });
        // },

        // deleteNote({ commit }, note) {
        //     return NoteService.deleteNote(note)
        //     .then(note => {
        //         commit('deleteNoteSuccess', note);
        //         return Promise.resolve(note);
        //     },
        //     error => {
        //         commit('deleteNoteFailure', note);
        //         return Promise.reject(error);
        //     })
        // },

        // allNotes({ commit }, note) {
        //     return NoteService.getAllNotes()
        //     .then(notes => {
        //         commit('getAllNotesSuccess', note);
        //         return Promise.resolve(notes);
        //     },
        //     error => {
        //         commit('getAllNotesFailure', note);
        //         return Promise.reject(error);
        //     });
        // },
    },

    mutations: {

        setNotes: (state, notes) => state.notes = notes,
        addNewNote: (state, note) => state.notes.push(note),
        deleteANote: (state, id) => state.notes = state.notes.filter(note => note._id !== id),

        updateNote: (state, note) => state.notes = note,
        toggleNotePrivacy: (state, note) => state.notes = note,

        // addNoteSuccess() {},
        // addNoteFailure() {},
        // updateNoteSuccess() {},
        // updateNoteFailure() {},
        // getAllNotesSuccess() {},
        // getAllNotesFailure() {},
        // deleteNoteSuccess() {},
        // deleteNoteFailure() {},
    }
}