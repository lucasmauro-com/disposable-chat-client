import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home', // @ts-ignore
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/room',
      name: 'room', // @ts-ignore
      component: () => import('@/views/RoomView.vue'),
      beforeEnter: (to, from, next) => {
        from.name === 'home' ? next() : next({ name: 'home' })
      }
    }
  ]
})

export default router
