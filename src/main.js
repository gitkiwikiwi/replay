// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import VueClipboard from 'vue-clipboard2'
import VModal from 'vue-js-modal'
import ToggleButton from 'vue-js-toggle-button'
import lodash from 'lodash'
import 'vue-material/dist/vue-material.css'
import draggable from 'vuedraggable'

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.use(VueClipboard)
Vue.use(draggable)
Vue.use(VModal)
Vue.use(VueMaterial)
Vue.use(lodash)
Vue.use(ToggleButton)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
