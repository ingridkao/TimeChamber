import Vue from 'vue'
import VueRouter from 'vue-router'
import Order from '../components/order.vue'
import Slide from '../components/slide.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false;

export default new VueRouter({
    routes:[{
        path: '/',
        name: 'order',
        component: Order
    },{
        path: '/slide',
        name: 'slide',
        component: Slide
    },{
        path: '*',
        redirect: '/',
    }]
})