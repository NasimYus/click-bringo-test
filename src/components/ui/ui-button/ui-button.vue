<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['ui-button', variants[variant], sizes[size]]"
  >
    <UiSpinner v-if="loading" :width="22" :height="22" />
    <slot />
  </button>
</template>

<script setup lang="ts">
type TProps = {
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}

const sizes = {
  md: 'ui-button-md',
  full: 'ui-button-full'
}

const variants = {
  primary: 'ui-button-primary',
  light: 'ui-button-light'
}

withDefaults(defineProps<TProps>(), {
  size: 'md',
  variant: 'primary',
  type: 'submit'
})

import UiSpinner from '@/components/ui/ui-spinner.vue'
</script>
<style scoped lang="sass" src="./ui-button.sass" />
