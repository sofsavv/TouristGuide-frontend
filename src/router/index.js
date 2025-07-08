import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/destinations',
    name: 'destinations',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/destination/AllDestinations.vue')
  },
  {
    path: '/single-destination',
    name: 'single-destination',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/SingleDestination.vue'),
    props: true
  },
  {
    path: '/destinations/:id',
    name: 'edit-destination',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/destination/EditDestination.vue'),
    props: true
  },
  {
    path: '/destinations/add',
    name: 'new-destination',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/destination/NewDestination.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/article/AllArticles.vue')
  },
  {
    path: '/articles/:id',
    name: 'single-article',
    meta: {
      authRequired: false,
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/SingleArticle.vue'),
    props: true
  },
  {
    path: '/most-read',
    name: 'most-read',
    meta: {
      authRequired: false,
    },
    props: { type: 'most-read' },
    component: () => import(/* webpackChunkName: "about" */ '../views/online/ArticlesView.vue'),
  },
  {
    path: '/find',
    name: 'find',
    meta: {
      authRequired: false,
    },
    props: route => ({ type: 'find', destinationId: route.query.destinationId }),
    component: () => import(/* webpackChunkName: "about" */ '../views/online/ArticlesView.vue'),
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      authRequired: false,
    },
    props: { type: 'latest' },
    component: () => import(/* webpackChunkName: "about" */ '../views/online/ArticlesView.vue'),
  },
  {
    path: '/articles/edit/:id',
    name: 'edit-article',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/article/EditArticle.vue'),
    props: true
  },
  {
    path: '/articles/add',
    name: 'new-article',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/article/NewArticle.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      authRequired: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/user/AllUsers.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.authRequired){
    const jwt = localStorage.getItem('jwt');

    if(!jwt){
      next({name: 'login'});
      return;
    }
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);

    if(expDate < new Date()){
      next({name: 'login'});
      return;
    }
  }
  next();
});

export default router
