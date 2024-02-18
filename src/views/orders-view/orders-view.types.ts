export interface IOrder {
  client_fullName: string
  created_date: string
  product: {
    title: string
    price: string
  }
}

export interface IGetOrderResponse extends IOrder {
  id: string
}
