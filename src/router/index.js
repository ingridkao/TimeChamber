import Vue from 'vue'
import VueRouter from 'vue-router'

// // import NotFound from '../components/notFound.vue'
import About from '../components/about.vue'
import Resume from '../components/resume.vue'
import Ui100 from '../components/ui100.vue'
import Works from '../components/works.vue'
import TodoList from '../components/dailyUI/todoList.vue'
import Filter from '../components/dailyUI/filter.vue'
import Gallery from '../components/dailyUI/gallery.vue'
import Validation from '../components/dailyUI/validation.vue'

import Building from '../components/dailyUI/building.vue'

import No2 from '../components/no2.vue'

Vue.use(VueRouter)
// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

export default new VueRouter({
    // mode: 'history',
    // base: __dirname,
    base: '/TimeChamber',
    routes:[{
        path: '/about',
        component: About
    },{
        path: '/resume',
        component: Resume
    },{
        path: '/works',
        redirect: '/works/no2',
        component: Works,
        children: [{
            path: '/works/no2',
            component: No2,
        }]
    },{
        path: '/dailyUI',
        redirect: '/dailyUI/week2',
        component: Ui100,
        children: [{
            path: '/dailyUI/week1',
            component: TodoList
        },{
            path: '/dailyUI/week2',
            component: Filter
        },{
            path: '/dailyUI/week3',
            component: Building
        },{
            path: '/dailyUI/week4',
            component: Gallery
        },{
            path: '/dailyUI/week6',
            component: Validation
        }]
    },{
        path: '*',
        component: About
    }]
})