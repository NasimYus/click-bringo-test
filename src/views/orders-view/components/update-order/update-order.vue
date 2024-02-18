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
      v-model="newOrder.product.title"
      :is-error="isSubmitted && v$.product.title.$invalid"
      errorText="Обязательное поле"
      label="Наименование товара"
      placeholder="MackBook"
    />
    <UiInput
      class="form-element"
      v-model="newOrder.product.price"
      :is-error="isSubmitted && v$.product.price.$invalid"
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
import type { IGetOrderResponse, IOrder } from '@/views/orders-view/orders-view.types'
import { updateOrderRequest } from '@/infrastructure/orders'

const emit = defineEmits([EmitEvents.Updated, EmitEvents.Cancel])
const props = defineProps<{ order: IGetOrderResponse | null; modal: boolean }>()

const modalState = ref(false)
const orderCopy = ref<IGetOrderResponse>()

const loading = ref(false)
const isSubmitted = ref(false)

const newOrder = reactive<IOrder>({
  created_date: '',
  client_fullName: '',
  product: {
    title: '',
    price: ''
  }
})

const rules = computed(() => ({
  created_date: { required },
  client_fullName: { required },
  product: {
    title: { required },
    price: { required }
  }
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
  const orderId = orderCopy.value?.id || ''
  updateOrderRequest(orderId, newOrder)
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
  newOrder.created_date = orderCopy.value?.created_date || ''
  newOrder.client_fullName = orderCopy.value?.client_fullName || ''
  newOrder.product.title = orderCopy.value?.product?.title || ''
  newOrder.product.price = orderCopy.value?.product?.price || ''
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

<style scoped lang="sass" src="../../orders-view.sass" />
