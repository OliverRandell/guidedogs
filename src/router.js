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
import EventRequest from './views/events/EventRequest.vue';

// EXPRESSIONS OF INTEREST
import IdeaListing from './views/ideas/IdeaListing.vue';
import IdeaCreate from './views/ideas/IdeaCreate.vue';
import Idea from './views/ideas/Idea.vue';

// BLOG PAGES
import Overview from './views/blog/Overview.vue';
//import Article from './views/blog/Article.vue';
import AccessibilityEntitlements from './views/blog/AccessibilityEntitlements.vue';
import InsuranceScheme from './views/blog/InsuranceScheme.vue';
import FinancialEntitlements from './views/blog/FinancialEntitlements.vue';

// USER PAGES
import Account from './views/account/Account.vue';
import Preferences from './views/account/Preferences.vue';
import HostingOverview from './views/account/HostingOverview.vue';

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
            path: '/my-hosting',
            name: 'HostingOverview',
            component: HostingOverview,
            meta: {
                title: 'My events and ideas!',
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
        {
            path: '/events/event-request',
            name: 'EventRequest',
            component: EventRequest,
            meta: {
                title: 'Request attendence to this event.'
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
            name: 'IdeaListing',
            component: IdeaListing,
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
        // {
        //     path: '/articles/:id',
        //     name: 'Article',
        //     component: Article,
        //     meta: {
        //         title: 'Blog article'
        //     }
        // },
        {
            path: '/articles/accessibility-entitlements',
            name: 'AccessibilityEntitlements',
            component: AccessibilityEntitlements,
        },
        {
            path: '/articles/insurance-scheme',
            name: 'InsuranceScheme',
            component: InsuranceScheme,
            meta: {
                title: 'News article about becoming a participant of the national disability insurance scheme'
            }
        },
        {
            path: '/articles/financial-entitlements',
            name: 'FinancialEntitlements',
            component: FinancialEntitlements,
            meta: {
                title: 'News article: Financial entitlements'
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
