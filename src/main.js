window.$ = window.jQuery = require('jquery');

window.Tether = require('tether');
window.Popper = require('popper.js');

import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueAnnouncer from 'vue-announcer';

import App from './App.vue';
//import axios from 'axios'
import { router } from './router';
import { store } from './store';

// IMPORTING OUR STYLES
//import './assets/scss/app.scss';

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VeeValidate);
Vue.use(VueAnnouncer, {}, router);
//Vue.use(axios)
//Vue.use(Vuelidate)

// SETTING UP FAKE BACKEND
import { configureFakeBackend } from './utils/dummy-backend';
configureFakeBackend();

// FILTERS

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
