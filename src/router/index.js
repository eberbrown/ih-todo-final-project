import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
/* import SigninView from '../views/SigninView.vue'; */
import UnauthorizedView from '../views/UnauthorizedView.vue';
import LoggedinView from '../views/LoggedinView.vue';
import { seeCurrentUser } from '@/api/userApi';

let localUser = "";

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
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      path: '/loggedin',
      name: 'loggedin',
      component: LoggedinView,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

//getUser
async function getUser(next) {
  localUser = await seeCurrentUser();
  if (localUser == null) {
    next("/")
  } else {
    next();
  }
}

//auth requirement
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next);
  } else {
    next();
  }
});



export default router
