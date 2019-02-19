window.$ = window.jQuery = require('jquery');

window.Tether = require('tether');
window.Popper = require('popper.js');

import Vue from 'vue'
import App from './App.vue'
import router from './router';

// IMPORTING OUR STYLES
import './assets/scss/app.scss';

Vue.config.productionTip = false



new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
