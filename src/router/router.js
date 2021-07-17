import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// две страницы
import dashboard from '../views/dashboard.vue';
import notFound from "../views/notFound.vue";


export default new Router({
    // что бы в строке не было лишней /*/
    mode: 'history',
    routes: [
        // основная страница
        {
            path: '/dashboard',
            component: dashboard
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
            component: dashboard,
        },
        // путь для добавления расхода
        {
            path: '/dashboard/add/payment*',
            component: dashboard,
        },
        // все неверные url будут уходить в notFound
        {
            path: '*',
            component: notFound
        }
    ]
})