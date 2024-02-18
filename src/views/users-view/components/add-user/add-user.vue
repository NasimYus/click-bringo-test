<template>
  <UiButton size="md" @click="modal = !modal">Добавить</UiButton>
  <UiModal
    @submit="createUser"
    :loading="loading"
    @cancel="cancel"
    title="Добавить клиента"
    submitButtonText="Сохранить"
    v-model="modal"
  >
    <UiInput
      class="form-element"
      v-model="newUser.full_name"
      :is-error="isSubmitted && v$.full_name.$invalid"
      errorText="Обязательное поле"
      label="ФИО"
      placeholder="Иванов Иван Иванович"
    />
    <UiInput
      class="form-element"
      v-model="newUser.birth_date"
      :is-error="isSubmitted && v$.birth_date.$invalid"
      errorText="Обязательное поле"
      type="date"
      label="Дата рождения"
      placeholder="11.10.199"
    />
    <UiInput
      class="form-element"
      v-model="newUser.phone"
      :is-error="isSubmitted && v$.phone.$invalid"
      errorText="Обязательное поле"
      type="numeric"
      label="Номер телефона"
      placeholder="+998919999999"
    />
    <UiInput
      class="form-element"
      v-model="newUser.address"
      :is-error="isSubmitted && v$.address.$invalid"
      errorText="Обязательное поле"
      label="Адрес"
      placeholder="Корасу 2, д 5, кв 4"
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
import type { IUser } from '@/views/users-view/users-view.types'
import { createUserRequest } from '@/infrastructure/users'

const emit = defineEmits(['created'])

const modal = ref(false)
const loading = ref(false)
const isSubmitted = ref(false)

const newUser = reactive<IUser>({
  full_name: '',
  birth_date: '',
  phone: '',
  address: ''
})

const rules = computed(() => ({
  full_name: { required },
  birth_date: { required },
  phone: { required },
  address: { required }
}))

const createUser = () => {
  isSubmitted.value = true
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  loading.value = true
  createUserRequest(newUser)
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
  newUser.full_name = ''
  newUser.birth_date = ''
  newUser.phone = ''
  newUser.address = ''
  modal.value = false
}

const v$ = useVuelidate(rules, newUser)
</script>

<style scoped lang="sass" src="../../users-view.sass"></style>
