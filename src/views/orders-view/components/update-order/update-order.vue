<template>
  <UiModal
    @submit="updateOrder"
    :loading="loading"
    @cancel="cancel"
    title="Редактировать Заказ"
    submitButtonText="Сохранить"
    v-model="modalState"
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
import { computed, reactive, ref, watch } from 'vue'
import UiInput from '@/components/ui/ui-input/ui-input.vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { EmitEvents } from './update-order.types'
import type { IOrder } from '@/views/orders-view/orders-view.types'
import { updateOrderRequest } from '@/infrastructure/orders'

const emit = defineEmits([EmitEvents.Updated, EmitEvents.Cancel])

const props = defineProps({ order: Object, modal: Boolean })

const modalState = ref()
const orderCopy = ref<IOrder>()

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

function cancel() {
  emit(EmitEvents.Cancel, false)
}
function updateOrder() {
  isSubmitted.value = true
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  loading.value = true
  updateOrderRequest(orderCopy.value.id, newOrder)
    .then(() => {
      emit(EmitEvents.Updated)
      cancel()
      fillUserInfo()
    })
    .finally(() => {
      loading.value = false
      isSubmitted.value = false
    })
}

const fillUserInfo = () => {
  modalState.value = JSON.parse(JSON.stringify(props.modal))
  if (!props.order) return
  orderCopy.value = JSON.parse(JSON.stringify(props.order))
  newOrder.created_date = orderCopy.value.created_date
  newOrder.client_fullName = orderCopy.value.client_fullName
  newOrder.product_title = orderCopy.value.product_title
  newOrder.price = orderCopy.value.price
}

watch(
  () => [props.order, props.modal],
  () => {
    fillUserInfo()
  },
  { immediate: true, deep: true }
)

const v$ = useVuelidate(rules, newOrder)
</script>

<style scoped lang="sass" src="../../orders-view.sass"></style>
