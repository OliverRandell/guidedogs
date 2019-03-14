import Vue from 'vue';
import Router from 'vue-router';

// AUTHORISATION PAGES
import Login from './views/auth/Login.vue';
import Registration from './views/auth/Registration.vue';
import ForgotPassword from './views/auth/ForgotPassword.vue';

// APPLICATION PAGES
import Home from './views/Home.vue';
import About from './views/About.vue';
//import ExpressionsOfInterest from './views/ExpressionsOfInterest.vue';
import Contact from './views/Contact.vue';

// EVENTS PAGES
import EventListing from './views/events/EventListing.vue';
import EventCreate from './views/events/EventCreate.vue';
import Event from './views/events/Event.vue';

// EXPRESSIONS OF INTEREST
import Ideas from './views/ideas/Ideas.vue';
import IdeaCreate from './views/ideas/IdeaCreate.vue';
import Idea from './views/ideas/Idea.vue';

// BLOG PAGES
import Overview from './views/blog/Overview.vue';
import Article from './views/blog/Article.vue';

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
            name: 'EventCreate',
            component: EventCreate,
            meta: {
                title: 'Create an event'
            }
        },
        {
            path: '/events/:id',
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
            path: '/ideas',
            name: 'Ideas',
            component: Ideas,
            meta: {
                title: 'This is where you can float an idea!'
            }
        },
        {
            path: '/create-idea',
            name: 'IdeaCreate',
            component: IdeaCreate,
            meta: {
                title: 'Create an idea that you would like to see turned into an event!'
            }
        },
        {
            path: '/ideas/:id',
            name: 'Idea',
            component: Idea,
            meta: {
                title: 'This is an idea'
            }
        },
        {
            path: '/library',
            name: 'Overview',
            component: Overview,
            meta: {
                title: 'Website - latest news and goings on'
            }
        },
        {
            path: '/articles/:id',
            name: 'Article',
            component: Article,
            meta: {
                title: 'Blog article'
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
