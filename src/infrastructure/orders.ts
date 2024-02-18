import { apiClient } from '@/infrastructure/apiClient'
import type { IOrder } from '@/views/orders-view/orders-view.types'

export const getOrdersRequest = () => apiClient.get(`/orders`)
export const createOrderRequest = (params: IOrder) => apiClient.post(`/orders`, params)
export const updateOrderRequest = (orderId: string, params: IOrder) =>
  apiClient.put(`/orders/${orderId}`, params)

export const deleteOrderRequest = (orderId: string) => apiClient.delete(`/orders/${orderId}`)
