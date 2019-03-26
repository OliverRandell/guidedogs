import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert';
import { account } from './account';
import { users } from './users';
import { events } from './events';
import { categories } from './categories';
import { ideas } from './ideas';
import { profile } from './profile';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        events,
        categories,
        ideas,
        profile,
    }
});
