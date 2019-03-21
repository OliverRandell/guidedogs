import axios from 'axios';
// TODO: import authHeader
let authToken = JSON.parse(JSON.parse(localStorage.getItem('user'))); // over-stringified string, so double JSON.parse()

const state = {
    categories: []
};

const getters = {
    allCategories: (state) => state.categories
};

const actions = {
    async getCategories({ commit }) {
        const response = await axios.get('https://gdvpeersupportplatformapi.azurewebsites.net/api/categories',
        {
            // TODO: set to global (axios) OR interceptor (vue-resource)?
            headers: { Authorization: `Bearer ${authToken.token}` }
        });

        commit('setCategories', response.data);
    }
};

const mutations = {
    setCategories: (state, categories) => state.categories = categories
};

export const categories = {
    state,
    getters,
    actions,
    mutations
};