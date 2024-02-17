<template>
  <UiModal
    @submit="updateUser"
    :loading="loading"
    @cancel="cancel"
    title="Редактировать клиента"
    submitButtonText="Сохранить"
    v-model="modalState"
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
import { computed, reactive, ref, watch } from 'vue'
import UiInput from '@/components/ui/ui-input/ui-input.vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { IUser } from '@/views/users-view/users-view.types'
import { updateUserRequest } from '@/infrastructure/users'
import { EmitEvents } from './update-user.types'

const emit = defineEmits([EmitEvents.Updated, EmitEvents.Cancel])

const props = defineProps({ user: Object, modal: Boolean })

const modalState = ref()
const userCopy = ref<IUser>()

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

function cancel() {
  emit(EmitEvents.Cancel, false)
}
function updateUser() {
  isSubmitted.value = true
  if (v$.value.$invalid) {
    v$.value.$touch()
    return
  }
  loading.value = true
  updateUserRequest(userCopy.value.id, newUser)
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
  if (!props.user) return
  userCopy.value = JSON.parse(JSON.stringify(props.user))
  newUser.full_name = userCopy.value.full_name
  newUser.birth_date = userCopy.value.birth_date
  newUser.phone = userCopy.value.phone
  newUser.address = userCopy.value.address
}

watch(
  () => [props.user, props.modal],
  () => {
    fillUserInfo()
  },
  { immediate: true, deep: true }
)

const v$ = useVuelidate(rules, newUser)
</script>

<style scoped lang="sass" src="../../users-view.sass"></style>
