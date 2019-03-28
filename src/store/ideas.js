import axios from 'axios';
import { authHeader } from '../utils/auth-header';
import { apiUrl } from '../utils/api';
import buildQuery from '../utils/query-string';

const state = {
    ideas: [],
    idea: {}
};

const getters = {
    allIdeas: (state) => state.ideas,
    idea: (state) => state.idea
};

const actions = {
    async searchIdeasAttending({ commit, dispatch }, queryParams ) {
        const url = await dispatch('makeUrlStringWithParams', { queryParams, uriSegment: 'myattendingpaged', uriRoot: 'eois' });
        
        const response = await axios.get(url,
        {
            headers: { ...authHeader() }
        });

        commit('setIdeas', response.data);
    },
    
    async searchIdeas({ commit, dispatch }, queryParams) {
        const url = await dispatch('makeUrlStringWithParams', { queryParams, uriSegment: 'paged', uriRoot: 'eois' });
        
        const response = await axios.get(url,
        {
            headers: { ...authHeader() }
        });
        
        commit('setIdeas', response.data);
            
    },

    async searchIdeasHosting({ commit, dispatch }, queryParams) {
        const url = await dispatch('makeUrlStringWithParams', { queryParams, uriSegment: 'myhostedpaged', uriRoot: 'eois' });
        
        const response = await axios.get(url,
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
    },

    async updateIdea({ commit }, { idea }) {
        const response = await axios.put(`${apiUrl}/eois/${idea.eventId}`,
        {
            ...idea,
        },
        {
            headers: { ...authHeader() }
        });

        commit('setIdea', response.data);
        return response.data;
    },

    async putIdeaCategories({ commit }, { id, categories }) {
        await axios.put(`${apiUrl}/eois/${id}/categories`,
        {
            categories: categories
        },
        {
            headers: {
                ...authHeader()
            }
        }).catch((error) => {
            console.error('Adding idea categories failed:', error.response);
        });

    },

    async convertToEvent({ commit }, { id }) {
        await axios.get(`${apiUrl}/eois/${id}/promotetoevent`,
        { },
        {
            headers: {
                ...authHeader()
            }
        });
    },
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