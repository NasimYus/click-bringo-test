<template>
  <div class="core-layout-wrapper">
    <div class="core-layout-content">
      <TheSidebar />
      <div class="core-layout-main">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheSidebar from '@/components/core/the-sidebar/the-sidebar.vue'
</script>
<style lang="sass" src="./core-layout.sass" scoped />
