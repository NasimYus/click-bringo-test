import { apiClient } from '@/infrastructure/apiClient'
import type { IUser } from '@/views/users-view/users-view.types'

export const getUsersRequest = () => apiClient.get(`/users`)
export const createUserRequest = (params: IUser) => apiClient.post(`/users`, params)
export const updateUserRequest = (userId: string, params: IUser) =>
  apiClient.put(`/users/${userId}`, params)

export const deleteUserRequest = (userId: string) => apiClient.delete(`/users/${userId}`)
