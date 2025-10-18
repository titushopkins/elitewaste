import axios from 'axios'
import { computed, createApp, defineAsyncComponent, reactive, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { MotionPlugin } from '@vueuse/motion'
import { port, mangoDomain, useDevAPI } from '@settings'
import VueClipboard from 'vue3-clipboard'
import Vue3TouchEvents from "vue3-touch-events";
import App from './App.vue'
import './index.css'
import Services from './components/pages/services.vue'
import About from './components/pages/about.vue'
import Testimonials from './components/pages/testimonials.vue'
import Contact from './components/pages/contact.vue'

/*
    If these are dynamicly imported I end up with a blank
    screen while the route is waiting for the component
    to download... not sure how to fix.
*/

import Home from './components/pages/home.vue'
const isDev = import.meta.env.DEV

const routes = [

    { path: '/', component: Home },
    { path: '/services', component: Services },
    { path: '/about', component: About },
    { path: '/reviews', component: Testimonials },
    { path: '/contact', component: Contact },
    { path: '/protectedRoute', component: Home, meta: { protected: true, fallback: '/' } },

]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {

        let toPath = to.matched?.[0]?.path

        let sameComponent = to.matched?.[0]?.components?.default == from.matched?.[0]?.components?.default
        let sameComponentExceptions = ['/inventory/:id', /account\/*/g]
        let exceptionExists = sameComponentExceptions.some(e => !!toPath?.match(e)?.length)

        if (to.hash) { return { el: to.hash, behavior: 'smooth' } }
        if (savedPosition) return savedPosition
        if (sameComponent && !exceptionExists) return null

        return { top: 0 }

    },
    routes,
})


const app = createApp(App)

app.use(router)
app.use(Vue3TouchEvents)
app.use(MotionPlugin)
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
})

/*

Global Properties

*/

import darkMode from './helpers/darkMode'
import { initUser } from './helpers/user';

app.provide('darkMode', darkMode().darkMode)

const user = initUser()

let api = useDevAPI ? `http://localhost:${port}` : `https://${mangoDomain}`
if (!isDev) api = `https://${mangoDomain}`

const store = reactive({

    user,
    api,

})

let Authorization = window.localStorage.getItem('email') + ';' + window.localStorage.getItem('user')
axios.defaults.headers.common['Authorization'] = Authorization

app.provide('store', store)
app.provide('axios', axios)
app.provide('mode', import.meta.env.MODE)

/*

Global Components

*/

import { Mango, mango } from 'mango-cms'
import Spinner from './components/layout/spinner.vue'
import Modal from './components/layout/modal.vue'

app.component('Mango', Mango)
app.component('Spinner', Spinner)
app.component('Modal', Modal)
// app.component('resource', defineAsyncComponent(Layouter.vue')))

app.config.globalProperties.$mango = mango

/*

Route Guard

*/

router.beforeEach((to, from, next) => {

    // Log in google analytics...
    if (window.ga) window.ga('send', 'pageview', to.fullPath);

    if (to.meta?.protected && !store.user?.id) {
        console.log('protected', store.user?.id)
        store.login = { next: to.path }
        if (to.meta?.fallback) {
            console.log('to', to)
            // Get params from path and add them to the fallback path (/event/:id)
            let fallback = to.meta.fallback?.split('/')?.map(p => {
                if (p.includes(':')) {
                    let param = p.replaceAll(':', '')
                    return to.params[param] || ''
                } else {
                    return p
                }
            })?.join('/')
            return next(fallback || to.meta.fallback)
        }
        return next('')
    }
    next()
})

app.mount('#app')
