import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../components/about.vue'
import Ui100 from '../components/ui100.vue'
import Works from '../components/works.vue'
import TodoList from '../components/dailyUI/todoList.vue'
import Building from '../components/dailyUI/building.vue'

import No2 from '../components/no2.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false;

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:[{
        path: '/about',
        name: 'about',
        component: About
    },{
        path: '/works',
        redirect: '/no2',
        name: 'works',
        component: Works,
        children: [{
            path: '/no2',
            name: 'no2',
            component: No2,
        }]
    },{
        path: '/',
        redirect: '/week1',
        name: 'Daily_UI',
        component: Ui100,
        children: [{
            path: '/week1',
            name: 'todoList',
            component: TodoList,
        },{
            path: '/week2',
            name: 'building',
            component: Building,
        }]
    },{
        path: '*',
        redirect: '/',
    }]
})