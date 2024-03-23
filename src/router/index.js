import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SigninView from '../views/SigninView.vue';
import UnauthorizedView from '../views/UnauthorizedView.vue';
import LoggedinView from '../views/LoggedinView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      path: '/loggedin',
      name: 'loggedin',
      component: LoggedinView
    }
  ]
});

export default router
