import axios from 'axios';
import { authHeader } from '../utils/auth-header';
import { apiUrl } from '../utils/api';

const state = {
    memberProfile: {},
};

const getters = {
    memberProfile: (state) => state.memberProfile,
};

const actions = {
  async getMemberProfile({ commit }) {
    const response = await axios.get(`${apiUrl}/memberprofile`,
        {
            headers: { ...authHeader() }
        });
        
        commit('setMemberProfile', response.data);
    },
};

const mutations = {
    setMemberProfile: (state, profile) => state.memberProfile = profile,
};

export const profile = {
    state,
    getters,
    actions,
    mutations
};