import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



export default new Router({
    // что бы в строке не было лишней /*/
    mode: 'history',
    routes: [
        // основная страница
        {
            path: '/dashboard',
            component: () => import('../views/dashboard.vue')
            , name: 'dashboard',
        },
        // если напишуть без dashboard - перекинет на dashboard
        {
            path: '/',
            redirect: { name: 'dashboard' }
        },
        // путь для пагинации
        {
            path: '/dashboard/paginate*',
            component: () => import('../views/dashboard.vue')
        },
        // путь для добавления расхода
        {
            path: '/dashboard/add/payment*',
            component: () => import('../views/dashboard.vue')
        },
        // все неверные url будут уходить в notFound
        {
            path: '*',
            component: () => import('../views/notFound.vue')
        }
    ]
})