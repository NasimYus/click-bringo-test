export type TProps = {
  title?: string
  submitButtonText?: string
  cancelButtonText?: string
  modelValue: boolean
  footerButton?: boolean
  loading?: boolean
}

export enum EmitEvents {
  UpdateModalValue = 'update:modelValue',
  Cancel = 'cancel',
  Submit = 'submit'
}
