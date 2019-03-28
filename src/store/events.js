import axios from 'axios';
import { authHeader } from '../utils/auth-header';
import { apiUrl } from '../utils/api';
import buildQuery from '../utils/query-string';

const state = {
    events: [],
    event: {},
};

const getters = {
    allEvents: (state) => state.events,
    event: (state) => state.event,
};

const actions = {
    makeUrlStringWithParams({ commit }, { queryParams, uriSegment, uriRoot}) {
        let queryString;
        
        queryParams = queryParams || null;
        
        if (queryParams !== null) {
            queryString = buildQuery(queryParams);
        }

        return `${apiUrl}/${uriRoot}/${uriSegment}?${queryString}`;
    },

    async searchEventsAttending({ commit, dispatch }, queryParams ) {
        const url = await dispatch('makeUrlStringWithParams', { queryParams, uriSegment: 'myattendingpaged', uriRoot: 'events' });
        
        const response = await axios.get(url,
        {
            headers: { ...authHeader() }
        });

        commit('setEvents', response.data);
    },

    async searchEvents({ commit, dispatch }, queryParams) {
        const url = await dispatch('makeUrlStringWithParams', { queryParams, uriSegment: 'paged', uriRoot: 'events' });
        
        const response = await axios.get(url,
        {
            headers: { ...authHeader() }
        });

        commit('setEvents', response.data);

    },

    async searchEventsHosting({ commit, dispatch }, queryParams) {
        const url = await dispatch('makeUrlStringWithParams', { queryParams, uriSegment: 'myhostedpaged', uriRoot: 'events' });
        
        const response = await axios.get(url,
        {
            headers: { ...authHeader() }
        });

        commit('setEvents', response.data);

    },

    async getEvent({ commit }, id) {
        const response = await axios.get(`${apiUrl}/events/${id}`,
        {
            headers: { ...authHeader() }
        });
        
        commit('setEvent', response.data);
    },

    async deleteEvent({ commit }, id) {
        await axios.delete(`${apiUrl}/events/${id}`,
        {
            headers: { ...authHeader() }
        });
    },

    async rsvpEvent({ commit }, event) {
        // TODO: get user info to populate POST payload
        await axios.post(`${apiUrl}/events/${event.eventId}/rsvps`,
        {
            "eventId": event.eventId,
            "responseType": event.rsvpType
        },
        {
            headers: { ...authHeader() }
        });
    },

    async createEvent({ commit }, { event }) {
        const response = await axios.post(`${apiUrl}/events`,
        {
            ...event,
        },
        {
            headers: { ...authHeader() }
        });

        commit('setEvent', response.data);
        return response.data;
    },

    async updateEvent({ commit }, { event }) {
        const response = await axios.put(`${apiUrl}/events/${event.eventId}`,
        {
            ...event,
        },
        {
            headers: { ...authHeader() }
        });

        commit('setEvent', response.data);
        return response.data;
    },

    async uploadEventImage({ commit }, image){
        await axios.post(`${apiUrl}/eventimages`,
        image,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...authHeader()
            }
        }).catch((error) => {
            console.error('Image upload failed:', error.response);
        });
    },

    async putEventCategories({ commit }, { id, categories }) {
        await axios.put(`${apiUrl}/events/${id}/categories`,
        {
            categories: categories
        },
        {
            headers: {
                ...authHeader()
            }
        }).catch((error) => {
            console.error('Adding event categories failed:', error.response);
        });

    },

    async getRsvpRequests ({commit}, id) {
        await axios.get(`${apiUrl}/events/${id}/RSVPs`)
        .then(response => response)
        .catch(error => console.error(`Couldn't retrieve RSVP list: ${error.response}`))
    }
};

const mutations = {
    setEvents: (state, events) => state.events = events,
    setEvent: (state, event) => state.event = event,
};

export const events = {
    state,
    getters,
    actions,
    mutations
};