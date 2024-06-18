import { type IItems, type IAllItems, type IAllHistorys } from '@/lib/types/item.type'
import axios from 'axios'
import { type HistoryParams, type ItemParams } from '@/store/server/useItem'
import { type itemFields } from '@/lib/validations/auth.validation'
import ENV from '@/lib/environment'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const getItemsFn = async ({ month, page }: ItemParams): Promise<IAllItems> => {
  const response = await apiPublic.get(`/items?month=${month}&page=${page}&limit=30`)
  return response.data
}
export const getHistorysFn = async ({
  page,
  month,
  startDate,
  year,
  endDate
}: HistoryParams): Promise<IAllHistorys> => {
  const response = await apiPublic.get(
    `/history?page=${page}&limit=10&startDate=${startDate}&endDate=${endDate}&month=${month}&year=${year}`
  )
  return response.data
}
export const getItemsByIdFn = async (id: any): Promise<IItems> => {
  const response = await apiPublic.get(`/items/${id}`)
  return response.data
}
export const storeItemsFn = async (fields: itemFields) => {
  const formData = new FormData()
  formData.append('title', fields.title)
  formData.append('category', fields.category)
  formData.append('price', fields.price.toString())
  formData.append('month', fields.month)
  formData.append('year', fields.year.toString())
  formData.append('mekah', fields.mekah)
  formData.append('mekah_rating', fields.mekah_rating)
  formData.append('madina', fields.madina)
  formData.append('madina_rating', fields.madina_rating)
  formData.append('rate', fields.rate)
  formData.append('maskapai', fields.maskapai)
  formData.append('duration', fields.duration.toString())
  formData.append('description', fields.description)
  if (Array.isArray(fields.image) && fields.image.length > 0) {
    formData.append('image', fields.image[0] as File)
  }
  await apiPublic.post('/items', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteItemFn = async (id: string) => {
  await apiPublic.delete(`/items/${id}`)
}
