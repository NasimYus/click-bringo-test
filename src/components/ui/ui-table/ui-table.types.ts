export type TElement = Record<string, any>

export type TProps = {
  editButton?: boolean
  deleteButton?: boolean
  headerTitles?: string[]
  elements?: TElement[]
  isShowActions?: boolean
}

export enum EmitEvents {
  Edit = 'edit',
  Delete = 'delete'
}
