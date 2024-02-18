export interface IUser {
  full_name: string
  birth_date: string
  phone: string
  address: string
}

export interface IGetUserResponse extends IUser {
  id: string
}
