import Vue from 'vue';
import Router from 'vue-router';

// AUTHORISATION PAGES
import Login from './views/auth/Login.vue';


// APPLICATION PAGES
import Home from './views/Home.vue';
import About from './views/About.vue';
import Events from './views/Events.vue';
import ExpressionsOfInterest from './views/ExpressionsOfInterest.vue';
import Contact from './views/Contact.vue';

Vue.use(Router);

export default new Router ({
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
