import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/cats',
  },
  {
    path: '/cats',
    name: 'Cats',
    component: () => import('./views/Cats.vue'),
  },
  {
    path: '/cats/:catId',
    name: 'CatDetail',
    component: () => import('./views/CatDetail.vue'),
    
    // Setting props to true will pass
    // :catId as props to CatDetail
    props: true,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
