import Vue from 'vue'
import App from './App.vue'
import router from './router'

import moment from "moment"
Vue.prototype.$moment = moment;

import fontawesome from '@fortawesome/fontawesome'
import faBell from '@fortawesome/fontawesome-free-solid/faBell'
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle'
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faFolder from '@fortawesome/fontawesome-free-solid/faFolder'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle'
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt'
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt'
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone'
import faTicketAlt from '@fortawesome/fontawesome-free-solid/faTicketAlt'
import faBullseye from '@fortawesome/fontawesome-free-solid/faBullseye'
import faGenderless from '@fortawesome/fontawesome-free-solid/faGenderless'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

fontawesome.library.add(faBell, faCircle, faCheckCircle, faStar, faTrash, faEdit, faFolder, faSearch, faTimesCircle, faCalendarAlt, faMapMarkerAlt, faPhone, faTicketAlt, faBullseye, faGenderless, faEnvelope)

import axios from 'axios';
axios.defaults.timeout = 8000;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = __API__;
Vue.prototype.$axios = axios;

window._ = require('lodash')

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
