<template>
  <main>
    <section class="users-view__header">
      <h3 class="users-view__header-text">Клиенты</h3>
      <AddUser @created="getUsersInfo" />
    </section>
    <div class="users-view__loading" v-if="loading"><UiSpinner /></div>
    <section v-else>
      <UiTable
        @edit="updateUserHandler"
        @delete="deleteUserHandler"
        :elements="users"
        edit-button
        delete-button
        :header-titles="headerTitles"
      >
        <template #element="{ element: item }">
          <UiTableItem>
            {{ item.full_name }}
          </UiTableItem>
          <UiTableItem>
            {{ item.phone }}
          </UiTableItem>
          <UiTableItem>
            {{ item.birth_date }}
          </UiTableItem>
          <UiTableItem>
            {{ item.address }}
          </UiTableItem>
        </template>
      </UiTable>
    </section>
    <UpdateUser
      @updated="getUsersInfo()"
      @cancel="updateModal = $event"
      :modal="updateModal"
      :user="selectedUser"
    />
    <UiModal
      title="Клиенты"
      submitButtonText="Удалить"
      @submit="deleteUser"
      :loading="deleteLoading"
      v-model="deleteModal"
    >
      <p>
        Вы действительно хотите удалить
        <strong>"{{ selectedUser?.full_name }}"</strong> ?
      </p>
    </UiModal>
  </main>
</template>
<script setup lang="ts">
import { deleteUserRequest, getUsersRequest } from '@/infrastructure/users.ts'
import { onMounted, ref } from 'vue'
import UiTable from '@/components/ui/ui-table/ui-table.vue'
import UiTableItem from '@/components/ui/ui-table-item/ui-table-item.vue'
import UiSpinner from '@/components/ui/ui-spinner.vue'
import AddUser from '@/views/users-view/components/add-user/add-user.vue'
import UpdateUser from '@/views/users-view/components/update-user/update-user.vue'
import type { IGetUserResponse } from '@/views/users-view/users-view.types'
import UiModal from '@/components/ui/ui-modal/ui-modal.vue'

const users = ref<IGetUserResponse[]>([])
const headerTitles = ['ФИО', 'Телефон', 'Дата рождения', 'Адрес']
const selectedUser = ref<IGetUserResponse | null>(null)
const loading = ref(false)
const deleteLoading = ref(false)
const updateModal = ref(false)
const deleteModal = ref(false)

const getUsersInfo = async () => {
  try {
    loading.value = true
    const response = await getUsersRequest()
    users.value = response.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const updateUserHandler = (user: IGetUserResponse) => {
  selectedUser.value = user
  updateModal.value = true
}

const deleteUserHandler = (user: IGetUserResponse) => {
  selectedUser.value = user
  deleteModal.value = true
}

const deleteUser = () => {
  if (!selectedUser.value?.id) return
  deleteLoading.value = true
  deleteUserRequest(selectedUser.value?.id)
    .then(() => {
      deleteModal.value = false
      getUsersInfo()
    })
    .finally(() => (deleteLoading.value = false))
}

onMounted(() => {
  getUsersInfo()
})
</script>
<style scoped src="./users-view.sass" lang="sass" />
