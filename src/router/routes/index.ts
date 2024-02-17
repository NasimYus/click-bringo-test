import { type RouteRecordRaw } from 'vue-router'
import CoreLayout from '@/layouts/core-layout/core-layout.vue'
import OrdersView from '@/views/orders-view/orders-view.vue'
import UsersView from '@/views/users-view/users-view.vue'

export const allRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: CoreLayout,
    redirect: { name: 'users-view' },
    children: [
      {
        path: '/orders-view',
        name: 'orders-view',
        component: OrdersView
      },
      {
        path: '/users-view',
        name: 'users-view',
        component: UsersView
      }
    ]
  }
]
