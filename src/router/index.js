import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/profile/post',
      name: 'myPosts',
      component: () => import('../views/MyPostsView.vue')
    },
    {
      path: '/personal-info',
      name: 'personal-info',
      component: () => import('../views/PersonalInfoView.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/UserListView.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('../views/BoardSearch.vue')
    },
    {
      path: '/board/:id',
      name: 'postList',
      component: () => import('../views/PostListView.vue'),
      props: true
    },
    {
      path: '/posts/:id/:no',
      name: 'postView',
      component: () => import('../views/PostViewView.vue')
    },
    {
      path: '/posts/:id',
      name: 'postWrite',
      component: () => import('../views/PostWriteView.vue')
    },
    {
      path: '/posts/:no/edit',
      name: 'postUpdate',
      component: () => import('../views/PostUpdateView.vue')
    },
    {
      path: '/posts/tags/:tag',
      name: 'postTags',
      component: () => import('../views/PostTagsView.vue')
    }
  ]
})

export default router
