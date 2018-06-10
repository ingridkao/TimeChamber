import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import fontawesome from '@fortawesome/fontawesome'
import faBell from '@fortawesome/fontawesome-free-solid/faBell'
import faCircle from '@fortawesome/fontawesome-free-solid/faCircle'
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle'
import faStar from '@fortawesome/fontawesome-free-solid/faStar'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faFolder from '@fortawesome/fontawesome-free-solid/faFolder'


fontawesome.library.add(faBell, faCircle, faCheckCircle, faStar, faTrash, faEdit, faFolder)

window._ = require('lodash')

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
