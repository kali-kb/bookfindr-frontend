import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LogInView from '../views/LogInView.vue'
import SavedBook from '../views/SavedBooksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'login',
      component: LogInView
    },

    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },

    {
      path: '/saved-books',
      name: 'saved-books',
      component: SavedBook
    }
  ]
})

export default router
