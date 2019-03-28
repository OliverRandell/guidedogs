import axios from 'axios';
import { authHeader } from '../utils/auth-header';

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
            headers: { ...authHeader() }
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