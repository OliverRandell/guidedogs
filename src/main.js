window.$ = window.jQuery = require('jquery');

window.Tether = require('tether');
window.Popper = require('popper.js');

import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueAnnouncer from 'vue-announcer';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
// import axios from 'axios'
// import VueAxios from 'vue-axios'

import App from './App.vue';
import { router } from './router';
import { store } from './store';

// COMMON COMPONENTS
import LayoutMaster from './components/common/layouts/layout-master.vue';
import Hero from './components/common/global/hero.vue';

// IMPORTING OUR STYLES
//import './assets/scss/app.scss';

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VeeValidate);
Vue.use(VueAnnouncer, {}, router);
Vue.use(VueResource);
Vue.use(VueMoment);
// Vue.use(VueAxios, axios)
//Vue.use(Vuelidate)

// SETTING UP FAKE BACKEND
import { configureFakeBackend } from './utils/dummy-backend';
configureFakeBackend();

// CAPITALISE TITLES
// Vue.filter('capitalize', function (value) {
//     return value.toCapitalize()
// })

// FILTERS

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
