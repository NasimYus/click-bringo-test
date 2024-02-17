<template>
  <div class="table-wrapper">
    <table class="table">
      <thead class="table-header">
        <tr>
          <th v-for="title in headerTitles" :key="title" class="table-header-item">
            {{ title }}
          </th>
          <th v-if="editButton" class="table-header-item">Действие</th>
          <th v-if="deleteButton" class="table-header-item">Действие</th>
        </tr>
      </thead>
      <tbody v-if="elements?.length" class="table-body">
        <tr class="table-body-raw" v-for="(element, index) in elements" :key="index">
          <slot v-if="elements?.length" name="element" :element="element"></slot>
          <td v-if="editButton" class="table-body-item">
            <p class="table-body-action-item" @click="editClick(element)">Редактировать</p>
          </td>
          <td v-if="deleteButton" class="table-body-item">
            <p class="table-body-action-item" @click="deleteClick(element)">Удалить</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!elements?.length" class="table-empty">Нет данных</div>
  </div>
</template>
<script setup lang="ts">
import type { TElement, TProps } from '@/components/ui/ui-table/ui-table.types'
import { EmitEvents } from '@/components/ui/ui-table/ui-table.types'

const emit = defineEmits<{
  (e: EmitEvents.Edit, item: TElement): void
  (e: EmitEvents.Delete, item: TElement): void
}>()

withDefaults(defineProps<TProps>(), {
  isShowActions: true
})

const editClick = (element: TElement) => {
  emit(EmitEvents.Edit, element)
}

const deleteClick = (element: TElement) => {
  emit(EmitEvents.Delete, element)
}
</script>
<style lang="sass" scoped src="./ui-table.sass" />
