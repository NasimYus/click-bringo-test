<template>
  <div>
    <div class="ui-input-label-wrapper">
      <label v-if="label" :for="id" class="ui-input-label">
        {{ label }}
      </label>
    </div>
    <div :class="['ui-input-wrapper', className]">
      <input
        :id="id"
        v-model="displayValue"
        :type="type"
        class="ui-input"
        :class="inputClass"
        :placeholder="placeholder"
        v-bind="$attrs"
        @change="handleInput"
      />
      <slot />
    </div>
    <p v-if="isError" class="ui-input-error-text">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { generatorId } from '@/utils/generators'
import { EmitEvents } from './ui-input.types'
import type { TProps } from './ui-input.types'

const props = withDefaults(defineProps<TProps>(), {
  id: generatorId('input'),
  type: 'text'
})
const emit = defineEmits<{
  (e: EmitEvents.UpdateModalValue, value: string): void
}>()

const displayValue = ref('')

watch(
  () => props.modelValue,
  () => {
    displayValue.value = props.modelValue.toString()
  },
  {
    immediate: true
  }
)

const handleInput = (event: Event) => {
  if (!(event?.currentTarget instanceof HTMLInputElement)) {
    return
  }
  displayValue.value = event.currentTarget.value
  emit(EmitEvents.UpdateModalValue, event.currentTarget.value)
}
</script>
<style scoped lang="sass" src="./ui-input.sass" />
