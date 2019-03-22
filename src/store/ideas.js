import axios from 'axios';
import { authHeader } from '../utils/auth-header';
import { apiUrl } from '../utils/api';

const state = {
    ideas: [],
    idea: {}
};

const getters = {
    allIdeas: (state) => state.ideas,
    idea: (state) => state.idea
};

const actions = {
    async getIdeas({ commit, state }, query) {
        query = query || '';
        
        const response = await axios.get(`${apiUrl}/eois/paged?SearchString=${query}&ItemsPerPage=20`,
        {
            headers: { ...authHeader() }
        });

        commit('setIdeas', response.data);

    },
    async getIdea({ commit }, id) {
        const response = await axios.get(`${apiUrl}/eois/${id}`,
        {
            headers: { ...authHeader() }
        });
        
        commit('setIdea', response.data);
    },
    async deleteIdea({ commit }, id) {
        await axios.delete(`${apiUrl}/eois/${id}`,
        {
            headers: { ...authHeader() }
        });
    },
    async rsvpIdea({ commit }, idea) {
        await axios.post(`${apiUrl}/eois/${idea.eventId}/rsvps`,
        {
            "eventId": idea.eventId,
            "responseType": idea.rsvpType
        },
        {
            headers: { ...authHeader() }
        });
    },
    async createIdea({ commit }, { idea }) {
        const response = await axios.post(`${apiUrl}/eois`,
        {
            ...idea,
        },
        {
            headers: { ...authHeader() }
        });

        commit('setIdea', response.data);
        return response.data;
    }
};

const mutations = {
    setIdeas: (state, ideas) => state.ideas = ideas,
    setIdea: (state, idea) => state.idea = idea
};

export const ideas = {
    state,
    getters,
    actions,
    mutations
};