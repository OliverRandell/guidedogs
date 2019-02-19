import Vue from 'vue';
import Router from 'vue-router';

// AUTHORISATION PAGES
import Login from './views/auth/Login.vue';
import Registration from './views/auth/Registration.vue';

// APPLICATION PAGES
import Home from './views/Home.vue';
import About from './views/About.vue';
import Events from './views/Events.vue';
import ExpressionsOfInterest from './views/ExpressionsOfInterest.vue';
import Contact from './views/Contact.vue';

import store from './store'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated,
            meta: {
                title: 'Welcome to the project'
            }
        },
        {
            path: 'register',
            name: 'Registration',
            component: Registration,
            meta: {
                title: 'Register an account'
            }
        },
        {
            path: '/account',
            name: 'Account',
            component: Account,
            beforeEnter: ifAuthenticated,
            meta: {
                title: 'Account page'
            }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: 'Website - Homepage'
            }
        },
        {
            path: '/about',
            name: 'About',
            component: About,
            meta: {
                title: 'Website - About page'
            }
        },
        {
            path: '/events',
            name: 'Events',
            component: Events,
            meta: {
                title: 'Website - Events page'
            }
        },
        {
            path: '/expressions-of-interest',
            name: 'ExpressionsOfInterest',
            component: ExpressionsOfInterest,
            meta: {
                title: 'Register an expression of interest'
            }
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
            meta: {
                title: 'Website - contact details'
            }
        }
    ]
})
