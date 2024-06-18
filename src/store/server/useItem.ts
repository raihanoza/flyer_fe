import { deleteItemFn, getHistorysFn, getItemsByIdFn, getItemsFn, storeItemsFn } from '@/api/item.api'
import { toast, useToast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
export interface ItemParams {
  month?: string
  page?: number
}
export interface HistoryParams {
  month?: string
  page?: number
  startDate?: string
  endDate?: string
  year?: string
}
export const useGetItems = ({ month, page }: ItemParams) => {
  return useQuery(['items', page, month], async () => await getItemsFn({ page, month }))
}
export const useGetHistory = ({ page, month, startDate, year, endDate }: HistoryParams) => {
  return useQuery(
    ['historys', page, month, startDate, year, endDate],
    async () => await getHistorysFn({ page, month, startDate, year, endDate })
  )
}
export const useGetItemsById = (id: any) => {
  return useQuery(['items', id], async () => await getItemsByIdFn(id))
}
export const useCreateItems = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation(storeItemsFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('items')
      toast({
        title: 'Berhasil',
        description: 'Data Item berhasil ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse
      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
export const useDeleteItems = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteItemFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('items')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data PKR Berhasil Dihapus'
      })
    }
  })
}
