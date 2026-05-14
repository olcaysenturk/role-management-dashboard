import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../app/HomePage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    }
  ]
});
