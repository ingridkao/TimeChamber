import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../components/about.vue'
import Ui100 from '../components/ui100.vue'
import Works from '../components/works.vue'
import TodoList from '../components/dailyUI/no1/todoList.vue'
import No2 from '../components/no2.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false;

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:[{
        path: '/',
        name: 'about',
        component: About
    },{
        path: '/ui100',
        name: 'ui100',
        component: Ui100,
        children: [{
            path: '/todoList',
            name: 'todoList',
            component: TodoList,
        },{
            path: '/no2',
            name: 'no2',
            component: No2,
        }]
    },{
        path: '/works',
        name: 'works',
        component: Works,
        children: [{
            path: '/todoList',
            name: 'todoList',
            component: TodoList,
        },{
            path: '/no2',
            name: 'no2',
            component: No2,
        }]
    },{
        path: '/*',
        redirect: '/',
    }]
})