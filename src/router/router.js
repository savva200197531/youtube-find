import Vue from 'vue';
import Router from 'vue-router';
import Authentication from '@/components/Authentication';
import MainLayout from '@/components/MainLayout';
import FindVideo from '@/components/FindVideo';
import FavoritesVideo from '@/components/FavoritesVideo';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mainLayout',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'findVideo',
          component: FindVideo
        },
        {
          path: '/favorites',
          name: 'favoritesVideo',
          component: FavoritesVideo
        },
      ]
    },
    {
      path: '/auth',
      name: 'authentication',
      component: Authentication,
    },
  ],
});

export default router;
