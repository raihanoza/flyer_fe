import { Loading } from '@/components'
import Pagination from '@/components/atoms/Pagination'
import { useCreateParams, useGetParams } from '@/components/hooks'
import Action from '@/components/ui/Action'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDeleteItems, useGetItems } from '@/store/server/useItem'
import { HiPlus } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const Paket = () => {
  const navigate = useNavigate()
  const { page } = useGetParams(['page'])
  const createParams = useCreateParams()

  const {
    data: items,
    isFetching,
    isLoading
  } = useGetItems({
    page: parseInt(page) ?? 1
  })
  const { mutateAsync: deletePkr } = useDeleteItems()
  const handleDelete = async (id: string) => {
    try {
      await Promise.resolve(alert('anda yakin ingin menghapus item ini?'))
      await deletePkr(id)
    } catch (error) {
      console.error(error)
    }
  }
  if (isLoading) return <Loading />

  return (
    <div className="bg-white py-10 container">
      {isFetching && <Loading />}
      <div className="flex flex-row gap-8">
        <Button
          type="button"
          className="bg-primary w-fit flex rounded-xl py-4"
          onClick={() => {
            navigate('/tambahpaket')
          }}
        >
          <HiPlus className="w-6 h-6 text-white" />
          <p className="font-bold text-sm text-white">Tambah Data</p>
        </Button>
      </div>
      <Table className="mt-5">
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white font-bold text-[15px]">No.</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Judul Paket</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Kategori</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Harga</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Bulan</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Tahun</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Gambar</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.data?.length !== 0 ? (
            items?.data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {(items.meta.currentPage - 1) * items.meta.perPage + index + 1}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.title}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.category ?? '-'}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.price ?? '-'}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.month ?? '-'}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.year ?? '-'}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.image}
                </TableCell>
                <Table>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action onDelete={async () => await handleDelete(item.id)} />
                  </TableCell>
                </Table>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {(items?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={items?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => {
            createParams({ key: 'page', value: page.toString() })
          }}
        />
      ) : null}
    </div>
  )
}

export default Paket
