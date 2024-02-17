<template>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="modelValue" @click="closeModal"></div>
  </transition>
  <transition name="pop" appear>
    <div class="modal" role="dialog" v-if="modelValue">
      <div class="modal-content">
        <div class="modal-content-body">
          <p class="modal-content-body-title" v-if="title">
            {{ title }}
          </p>
        </div>
        <slot></slot>
        <div class="modal-content-actions" v-if="footerButton">
          <UiButton @click="cancel" variant="light" size="full">{{ cancelButtonText }}</UiButton>
          <UiButton :loading="loading" @click="submit" size="full">{{ submitButtonText }}</UiButton>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import UiButton from '@/components/ui/ui-button/ui-button.vue'
import type { TProps } from './ui-modal.types'
import { EmitEvents } from './ui-modal.types'

withDefaults(defineProps<TProps>(), {
  modelValue: false,
  footerButton: true,
  submitButtonText: 'Добавить',
  cancelButtonText: 'Отменить'
})

const emit = defineEmits<{
  (e: EmitEvents.UpdateModalValue, value: boolean): void
  (e: EmitEvents.Cancel): void
  (e: EmitEvents.Submit): void
}>()

function closeModal() {
  emit(EmitEvents.UpdateModalValue, false)
}
function cancel() {
  emit(EmitEvents.Cancel)
  emit(EmitEvents.UpdateModalValue, false)
}
function submit() {
  emit(EmitEvents.Submit)
}
</script>
<style lang="sass" src="./ui-modal.sass" />
