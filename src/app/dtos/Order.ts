import { UserInterface } from "./User"

export interface OrderInterface {
  id:number
  items?:ItemInterface[]
  user:UserInterface
  date?: string
  total?:number
}

export interface ItemInterface {
  id:number
  name?:string
  price?: number
  description?:string
  quantity?:number
}
