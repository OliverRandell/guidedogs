window.$ = window.jQuery = require('jquery');

import Vue from 'vue'
import App from './App.vue'
import router from './router';

// IMPORTING OUR STYLES
import './assets/scss/styles.scss';

Vue.config.productionTip = false



new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
