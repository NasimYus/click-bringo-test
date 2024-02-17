<template>
  <UiButton size="md" @click="modal = !modal">Добавить</UiButton>
  <UiModal
    @submit="createOrder"
    :loading="loading"
    @cancel="cancel"
    title="Добавить Заказ"
    submitButtonText="Сохранить"
    v-model="modal"
  >
    <UiInput
      class="form-element"
      v-model="newOrder.created_date"
      :is-error="isSubmitted && v$.created_date.$invalid"
      errorText="Обязательное поле"
      type="date"
      label="Дата создания"
      placeholder="11.10.199"
    />
    <UiInput
      class="form-element"
      v-model="newOrder.client_fullName"
      :is-error="isSubmitted && v$.client_fullName.$invalid"
      errorText="Обязательное поле"
      label="ФИО заказчика"
      placeholder="Иванов Иван Иванович"
    />

    <UiInput
      class="form-element"
      v-model="newOrder.product_title"
      :is-error="isSubmitted && v$.product_title.$invalid"
      errorText="Обязательное поле"
      label="Наименование товара"
      placeholder="MackBook"
    />
    <UiInput
      class="form-element"
      v-model="newOrder.price"
      :is-error="isSubmitted && v$.price.$invalid"
      errorText="Обязательное поле"
      label="Цена"
      placeholder="20000"
    />
  </UiModal>
</template>
<script setup lang="ts">
import UiModal from '@/components/ui/ui-modal/ui-modal.vue'
import UiButton from '@/components/ui/ui-button/ui-button.vue'
import { computed, reactive, ref } from 'vue'
import UiInput from '@/components/ui/ui-input/ui-input.vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import type { IOrder } from '@/views/orders-view/orders-view.types'
import { createOrderRequest } from '@/infrastructure/orders'

const emit = defineEmits(['created'])

const modal = ref(false)
const loading = ref(false)
const isSubmitted = ref(false)

const newOrder = reactive<IOrder>({
  created_date: '',
  client_fullName: '',
  product_title: '',
  price: ''
})

const rules = computed(() => ({
  created_date: { required },
  client_fullName: { required },
  product_title: { required },
  price: { required }
}))

const createOrder = () => {
  isSubmitted.value = true
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  loading.value = true
  createOrderRequest(newOrder)
    .then(() => {
      emit('created')
      cancel()
    })
    .finally(() => {
      loading.value = false
      isSubmitted.value = false
    })
}

const cancel = () => {
  newOrder.created_date = ''
  newOrder.client_fullName = ''
  newOrder.product_title = ''
  newOrder.price = ''
  modal.value = false
}

const v$ = useVuelidate(rules, newOrder)
</script>

<style scoped lang="sass" src="../../orders-view.sass"></style>
