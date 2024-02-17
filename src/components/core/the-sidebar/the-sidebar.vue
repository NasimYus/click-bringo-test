<template>
  <aside class="sidebar-wrapper">
    <div class="sidebar-list-container">
      <ul class="sidebar-list">
        <li
          class="sidebar-list-item-wrapper"
          v-for="(navigation, index) in navigations"
          :key="index"
        >
          <router-link
            class="sidebar-list-item"
            :class="{ 'sidebar-item-active': activeNavigationName === navigation.to.name }"
            :to="navigation.to"
            @click="activeNavigationName = navigation.to.name"
          >
            {{ navigation.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TNavigation } from './the-sidebar.types'
import { RouteRecordName, useRoute } from 'vue-router'

const route = useRoute()

const navigations: TNavigation[] = [
  {
    title: 'Клиенты',
    to: { name: 'users-view' }
  },
  {
    title: 'Заказы',
    to: { name: 'orders-view' }
  }
]

const activeNavigationName = ref<RouteRecordName | string>('')

watch(
  () => route.name,
  (value) => {
    if (!value) return
    activeNavigationName.value = value
  },
  { immediate: true }
)
</script>
<style lang="sass" src="./the-sidebar.sass" scoped></style>
