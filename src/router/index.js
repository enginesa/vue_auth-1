import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home'),
        beforeEnter(to, from, next) {

            if (store.getters.loginControl) {
                next();
            } else {
                next({name: "Login"});
            }

        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login'),
        beforeEnter(to, from, next) {
            if (!store.getters.loginControl) next();
            else next({name: "Home"});
        }
    },

    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
        beforeEnter(to, from, next) {
            if (!store.getters.loginControl) next();
            else next({name: "Home"});
        }

    },
    {
        path: '*',
        redirect: {name: 'Home'}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
