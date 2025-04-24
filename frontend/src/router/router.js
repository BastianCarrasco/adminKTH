import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Profesores from '@/views/Profesores.vue'
import Inventos from '@/views/Inventos.vue'
import Cuestionario from '@/views/Cuestionario.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/profesores', component: Profesores },
  { path: '/inventos', component: Inventos },
  { path: '/cuestionario', component: Cuestionario },
  

]

export default createRouter({
  history: createWebHistory(),
  routes
})
