import CategoryService from "../services/category.service";

export const category = {
    namespaced: true,
    state: () => ({
        categories: []
    }),

    actions: {

        addCategory({ commit }, category) {
            return CategoryService.addCategory(category)
            .then(category => {
                commit('addCategorySuccess', category);
                return Promise.resolve(category);
            },
            error => {
                commit('addCategoryFailure', category);
                return Promise.reject(error);
            })
        },

        updateCategory({ commit }, category) {
            return CategoryService.updateCategory(category)
            .then(category => {
                commit('updateCategorySuccess', category);
                return Promise.resolve(category);
            },
            error => {
                commit('updateCategoryFailure', category);
                return Promise.reject(error);
            });
        },

        deleteCategory({ commit }, category) {
            return CategoryService.deleteCategory(category)
            .then(category => {
                commit('deleteCategorySuccess', category);
                return Promise.resolve(category);
            },
            error => {
                commit('deleteCategoryFailure', category);
                return Promise.reject(error);
            })
        },

        allCategories({ commit }, category) {
            return CategoryService.getAllCategories()
            .then(categories => {
                commit('getAllCategoriesSuccess', category);
                return Promise.resolve(categories);
            },
            error => {
                commit('getAllCategoriesFailure', category);
                return Promise.reject(error);
            });
        },
    },

    mutations: {
        addCategorySuccess() {},
        addCategoryFailure() {},
        updateCategorySuccess() {},
        updateCategoryFailure() {},
        getAllCategoriesSuccess() {},
        getAllCategoryFailure() {},
        deleteCategorySuccess() {},
        deleteCategoryFailure() {},
    }
}