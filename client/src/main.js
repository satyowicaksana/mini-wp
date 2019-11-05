import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import wysiwyg from "vue-wysiwyg"
import "../node_modules/vue-wysiwyg/dist/vueWysiwyg.css"

Vue.use(Buefy)
Vue.use(wysiwyg, {});
Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('./components/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./components/Login.vue')
  },
  {
    path: '/write-article',
    name: 'write-article',
    component: () => import('./components/AddArticle.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')