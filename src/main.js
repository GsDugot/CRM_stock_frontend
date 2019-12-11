import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'
import interceptor from './interceptor'

interceptor.init()

Vue.config.productionTip = false

export const EventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
