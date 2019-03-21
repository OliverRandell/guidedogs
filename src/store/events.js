import axios from 'axios';
import { authHeader } from '../utils/auth-header';
import { apiUrl } from '../utils/api';

const state = {
    events: [],
    event: {}
};

const getters = {
    allEvents: (state) => state.events,
    event: (state) => state.event
};

const actions = {
    async getEvents({ commit, state }, category) {
        category = category || null;

        // TODO: handle what object property can be considered as attending
        if (category === 'attending') {
            commit('setEvents', []);
            return;
        }

        // determine which endpoint to call
        const getUrl = category === 'all' || category === null ? 'events/paged?ItemsPerPage=20' : `categories/${category}`;
        
        const response = await axios.get(`${apiUrl}/${getUrl}`,
        {
            headers: { ...authHeader() }
        });
        
        // 'reset' to initial response data until we have an api to call
        if (category === 'all' || category === null) {

            commit('setEvents', response.data);
            return;

        }

        response.data = [
            ...response.data.events
        ];
        
        commit('setEvents', response.data);

    },
    async searchEvents({ commit, state }, query) {
        query = query || '';
        
        const response = await axios.get(`${apiUrl}/events/paged?SearchString=${query}&ItemsPerPage=20`,
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
    async uploadEventImage({ commit }, image){
        await axios.post(`${apiUrl}/eventimages`,
        image,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...authHeader()
            }
        });
    }
};

const mutations = {
    setEvents: (state, events) => state.events = events,
    setEvent: (state, event) => state.event = event
};

export const events = {
    state,
    getters,
    actions,
    mutations
};