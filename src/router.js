import Vue from 'vue';
import Router from 'vue-router';
import GameBoard from '@/pages/GameBoard';
import SessionExpired from '@/pages/SessionExpired';
import Platforms from '@/pages/Platforms';
import Boards from '@/pages/Boards';
import Board from '@/pages/Board';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

Vue.use(Router);

const routes = [
  {
    name: 'platforms',
    path: '/',
    component: Platforms,
    meta: {
      title: 'Platforms',
    },
  },
  {
    name: 'platforms',
    path: '/platforms',
    component: Platforms,
    meta: {
      title: 'Platforms',
    },
  },
  {
    name: 'board',
    path: '/board/:id',
    component: Board,
    meta: {
      title: 'Board',
    },
  },
  {
    name: 'boards',
    path: '/boards',
    component: Boards,
    meta: {
      title: 'Boards',
    },
  },
  {
    name: 'sessionExpired',
    path: '/session-expired',
    component: SessionExpired,
    meta: {
      title: 'Session expired',
    },
  },
  {
    name: 'settings',
    path: '/settings',
    component: Settings,
    meta: {
      title: 'Settings',
    },
  },
  {
    path: '/board',
    name: 'game-board',
    component: GameBoard,
  },
  {
    path: '/settings',
    name: 'settings',
    component: GameBoard,
  },
  {
    path: '/auth/:authProvider',
    name: 'auth',
    component: GameBoard,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
