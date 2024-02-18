<template>
  <main>
    <section class="users-view__header">
      <h3 class="users-view__header-text">Заказы</h3>
      <AddOrder @created="getOrdersInfo" />
    </section>
    <div class="users-view__loading" v-if="loading"><UiSpinner /></div>
    <section v-else>
      <UiTable
        @edit="updateUserHandler"
        @delete="deleteUserHandler"
        :elements="orders"
        edit-button
        delete-button
        :header-titles="headerTitles"
      >
        <template #element="{ element: item }">
          <UiTableItem>
            {{ item.created_date }}
          </UiTableItem>
          <UiTableItem>
            {{ item.client_fullName }}
          </UiTableItem>
          <UiTableItem>
            {{ item.product.title }}
          </UiTableItem>
          <UiTableItem>
            {{ item.product.price }}
          </UiTableItem>
        </template>
      </UiTable>
    </section>
    <UpdateOrder
      @updated="getOrdersInfo()"
      @cancel="updateModal = $event"
      :modal="updateModal"
      :order="selectedOrder"
    />
    <UiModal
      title="Заказы"
      submitButtonText="Удалить"
      @submit="deleteOrder"
      :loading="deleteLoading"
      v-model="deleteModal"
    >
      <p>
        Вы действительно хотите удалить
        <strong>"{{ selectedOrder?.product.title }}"</strong> ?
      </p>
    </UiModal>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UiTable from '@/components/ui/ui-table/ui-table.vue'
import UiTableItem from '@/components/ui/ui-table-item/ui-table-item.vue'
import UiSpinner from '@/components/ui/ui-spinner.vue'
import AddOrder from './components/add-order/add-order.vue'
import UpdateOrder from './components/update-order/update-order.vue'
import type { IGetOrderResponse } from './orders-view.types'
import UiModal from '@/components/ui/ui-modal/ui-modal.vue'
import { deleteOrderRequest, getOrdersRequest } from '@/infrastructure/orders'

const loading = ref(false)
const deleteLoading = ref(false)
const orders = ref<IGetOrderResponse[]>([])
const headerTitles = ['Дата', 'Клиент', 'Продукт', 'Цена']
const selectedOrder = ref<IGetOrderResponse | null>()
const updateModal = ref(false)
const deleteModal = ref(false)

const getOrdersInfo = async () => {
  try {
    loading.value = true
    const response = await getOrdersRequest()
    orders.value = response.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const updateUserHandler = (user: IGetOrderResponse) => {
  selectedOrder.value = user
  updateModal.value = true
}

const deleteUserHandler = (user: IGetOrderResponse) => {
  selectedOrder.value = user
  deleteModal.value = true
}

const deleteOrder = () => {
  if (!selectedOrder.value?.id) return
  deleteLoading.value = true
  deleteOrderRequest(selectedOrder.value?.id)
    .then(() => {
      deleteModal.value = false
      getOrdersInfo()
    })
    .finally(() => (deleteLoading.value = false))
}

onMounted(() => {
  getOrdersInfo()
})
</script>
<style scoped src="./orders-view.sass" lang="sass" />
