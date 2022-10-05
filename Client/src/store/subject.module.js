import axios from "axios";
import SubjectService from "../services/subject.service";

export const subject = {
    namespaced: true,
    state: {
        subjects: []
    },

    getters: {
        allSubjects: state => state.subjects
    },

    actions: {

        async fetchSubjects({ commit }){
            const response = await axios.get('http://localhost:8080/api/subject/allSubjects');
            commit("setSubjects", response.data);
        },

        async addSubject({ commit }, subject){
            console.log('[subject.module] ', subject);
            const response = await axios.post('http://localhost:8080/api/subject/addSubject', subject);
            commit("addNewSubject", response.data);
        },

        async deleteSubject({ commit }, id){
            await axios.delete(`http://localhost:8080/api/subject/deleteSubject/${id}`);
            commit("deleteASubject", id);
        },

        // addSubject({ commit }, subject) {
        //     return SubjectService.addSubject(subject)
        //     .then(subject => {
        //         commit('addSubjectSuccess', subject);
        //         return Promise.resolve(subject);
        //     },
        //     error => {
        //         commit('addSubjectFailure', subject);
        //         return Promise.reject(error);
        //     })
        // },

        updateSubject({ commit }, subject) {
            return SubjectService.updateSubject(subject)
            .then(subject => {
                commit('updateSubjectSuccess', subject);
                return Promise.resolve(subject);
            },
            error => {
                commit('updateSubjectFailure', subject);
                return Promise.reject(error);
            });
        },

        // deleteSubject({ commit }, subject) {
        //     return SubjectService.deleteSubject(subject)
        //     .then(subject => {
        //         commit('deleteSubjectSuccess', subject);
        //         return Promise.resolve(subject);
        //     },
        //     error => {
        //         commit('deleteSubjectFailure', subject);
        //         return Promise.reject(error);
        //     })
        // },

        toggleSubjectPrivacy({ commit }, subject) {
            return SubjectService.toggleSubjectPrivacy(subject)
            .then(subject => {
                commit('toggleSubjectPrivacySuccess', subject);
                return Promise.resolve(subject);
            },
            error => {
                commit('toggleSubjectPrivacyFailure', subject);
                return Promise.reject(error);
            })
        },

        allSubjects({ commit }, subject) {
            return SubjectService.getAllSubjects()
            .then(subjects => {
                commit('getAllSubjectSuccess', subject);
                return Promise.resolve(subjects);
            },
            error => {
                commit('getAllSubjectFailure', subject);
                return Promise.reject(error);
            });
        },
    },

    mutations: {

        setSubjects: (state, subjects) => {
            state.subjects = subjects;
        },

        addNewSubject: (state, subject) => state.subjects.push(subject),

        deleteASubject: (state, id) => state.subjects = state.subjects.filter(subject => subject._id !== id),

        addSubjectSuccess() {},
        addSubjectFailure() {},
        updateSubjectSuccess() {},
        updateSubjectFailure() {},
        getAllSubjectSuccess() {},
        getAllSubjectFailure() {},
        deleteSubjectSuccess() {},
        deleteSubjectFailure() {},
        toggleSubjectPrivacySuccess() {},
        toggleSubjectPrivacyFailure() {},
    }
}