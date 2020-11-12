import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';

import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';

// Auth
import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';

// Manage
import manageUsers from '../views/Manage/Users';

Vue.use(VueRouter);
Vue.use(VueMeta);

function isLoggedIn(to, from, next) {
    if (localStorage.token) {
        next();
    } else {
        next('/auth/login');
    }
}

function isLoggedInToDashboard(to, from, next) {
    if (localStorage.token) {
        next('/dashboard');
    } else {
        next();
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: isLoggedIn,
    },

    // Auth
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        beforeEnter: isLoggedInToDashboard,
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        beforeEnter: isLoggedInToDashboard,
    },

    // Management
    {
        path: '/manage/users',
        name: 'manageUsers',
        component: manageUsers,
        beforeEnter: isLoggedIn,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
