import SubjectService from "../services/subject.service";

export const subject = {
    namespaced: true,
    state: () => ({
        subjects: []
    }),

    actions: {

        addSubject({ commit }, subject) {
            return SubjectService.addSubject(subject)
            .then(subject => {
                commit('addSubjectSuccess', subject);
                return Promise.resolve(subject);
            },
            error => {
                commit('addSubjectFailure', subject);
                return Promise.reject(error);
            })
        },

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

        deleteSubject({ commit }, subject) {
            return SubjectService.deleteSubject(subject)
            .then(subject => {
                commit('deleteSubjectSuccess', subject);
                return Promise.resolve(subject);
            },
            error => {
                commit('deleteSubjectFailure', subject);
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
        addSubjectSuccess() {},
        addSubjectFailure() {},
        updateSubjectSuccess() {},
        updateSubjectFailure() {},
        getAllSubjectSuccess() {},
        getAllSubjectFailure() {},
        deleteSubjectSuccess() {},
        deleteSubjectFailure() {},
    }
}