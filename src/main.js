window.$ = window.jQuery = require('jquery');

window.Tether = require('tether');
window.Popper = require('popper.js');

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router';

// IMPORTING OUR STYLES
//import './assets/scss/app.scss';

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(vueAxios, axios)
Vue.use(Vuelidate)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
