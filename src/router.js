import Vue from 'vue';
import Router from 'vue-router';

// AUTHORISATION PAGES
import Login from './views/auth/Login.vue';
import Registration from './views/auth/Registration.vue';
import ForgotPassword from './views/auth/ForgotPassword.vue';

// APPLICATION PAGES
import Home from './views/Home.vue';
import About from './views/About.vue';
import Information from './views/Information.vue';
//import ExpressionsOfInterest from './views/ExpressionsOfInterest.vue';
import Contact from './views/Contact.vue';

// EVENTS PAGES
import EventListing from './views/events/EventListing.vue';
import EventCreate from './views/events/EventCreate.vue';
import Event from './views/events/Event.vue';

// USER PAGES
import Account from './views/account/Account.vue';
import Preferences from './views/account/Preferences.vue';

Vue.use(Router);

export const router =  new Router ({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: 'Welcome to the project'
            }
        },
        {
            path: '/register',
            name: 'Registration',
            component: Registration,
            meta: {
                title: 'Register an account'
            }
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: ForgotPassword,
            meta: {
                title: 'Retrieve your password'
            }
        },
        {
            path: '/account',
            name: 'Account',
            component: Account,
            meta: {
                title: 'Account page'
            }
        },
        {
            path: '/preferences',
            name: 'Preferences',
            component: Preferences,
            meta: {
                title: 'My preferences'
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
            component: EventListing,
            meta: {
                title: 'Website - Events page'
            }
        },
        {
            path: '/create-event',
            name: 'CreateEvent',
            component: EventCreate,
            meta: {
                title: 'Create an event'
            }
        },
        {
            path: '/event/:id',
            name: 'Event',
            component: Event,
            meta: {
                title: 'Page for your event'
            }
        },
        // {
        //     path: '/expressions-of-interest',
        //     name: 'ExpressionsOfInterest',
        //     component: ExpressionsOfInterest,
        //     meta: {
        //         title: 'Register an expression of interest'
        //     }
        // },
        {
            path: '/information',
            name: 'Information',
            component: Information,
            meta: {
                title: 'Website - latest news and goings on'
            }
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact,
            meta: {
                title: 'Website - contact details'
            }
        },
        // OTHERWISE REDIRECT TO HOME
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    // REDIRECT TO LOGIN PG IN USER IS NOT LOGGED IN
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})
