export type TProps = {
  id?: string
  label?: string
  modelValue: string | number
  type?: string
  errorText?: string
  isError?: boolean
  placeholder?: string
  className?: string
  inputClass?: string
}

export enum EmitEvents {
  UpdateModalValue = 'update:modelValue'
}
