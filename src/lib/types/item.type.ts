export interface IMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  hasNext: boolean
  hasPrevious: boolean
}
export interface IItems {
  id: string
  title: string
  category: string
  image: string
  price: number
  month: number
  year: number
  mekah: string
  mekah_rating: string
  madina_rating: string
  madina: string
  rate: string
  maskapai: string
  duration: number
  description: string
}
export interface IHistorys {
  id: string
  name: string
  phone: string
  registrationDate: string
}
export interface IAllItems {
  data: IItems[]
  meta: IMeta
}
export interface IAllHistorys {
  data: IHistorys[]
  meta: IMeta
}
