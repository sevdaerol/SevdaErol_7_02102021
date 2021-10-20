import { createApp } from 'vue'
import App from './App.vue' //importer app depuis vue
import router from './router' //importer router + store
import store from './store'

createApp(App).use(store).use(router).mount('#app') //creer app avec l'id app => public => index.js


/*import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') */
