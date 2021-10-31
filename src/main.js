import { createApp } from 'vue' //utiliser cette methode pour Vue 3
import App from './App.vue' //importer app depuis vue
import router from './router' //importer router + store
import store from './store'

createApp(App).use(store).use(router).mount('#app') //creer app avec l'id app => public => index.js