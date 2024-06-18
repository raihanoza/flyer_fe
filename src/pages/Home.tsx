import { Loading } from '@/components'
import DatePicker from '@/components/atoms/DatePicker'
import Pagination from '@/components/atoms/Pagination'
import { useCreateParams, useGetParams } from '@/components/hooks'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { type historyFields } from '@/lib/validations/auth.validation'
import { useGetHistory } from '@/store/server/useItem'
import { useForm } from 'react-hook-form'
import { HiArrowPath, HiMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const { page, startDate, endDate, month, year } = useGetParams(['page', 'startDate', 'endDate', 'month', 'year'])
  const createParams = useCreateParams()
  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    const day = date.getUTCDate() // Menggunakan getUTCDate untuk mendapatkan tanggal dalam UTC timezone
    const month = date.getUTCMonth() + 1 // Menggunakan getUTCMonth untuk mendapatkan bulan dalam UTC timezone
    const year = date.getUTCFullYear() // Menggunakan getUTCFullYear untuk mendapatkan tahun dalam UTC timezone

    // Mengonversi nilai-nilai tanggal, bulan, dan tahun menjadi string dan menambahkan '0' jika diperlukan
    const formattedDay = day < 10 ? '0' + day : day
    const formattedMonth = month < 10 ? '0' + month : month

    // Mengembalikan string dalam format 'dd-mm-yyyy'
    return `${formattedDay}-${formattedMonth}-${year}`
  }
  const convertISOToFormattedDate = (isoDateString: string): string => {
    const dateObject = new Date(isoDateString)
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
    return dateObject.toLocaleDateString('id-ID', options)
    // Ubah 'id-ID' menjadi kode bahasa yang sesuai dengan kebutuhan
  }
  const forms = useForm<historyFields>({
    defaultValues: { startDate: '', endDate: '', month: '', year: '' }
  })
  const {
    data: items,
    refetch,
    isFetching,
    isLoading
  } = useGetHistory({
    page: parseInt(page) ?? 1,
    startDate: startDate ? convertISOToFormattedDate(startDate) : '',
    endDate: endDate ? convertISOToFormattedDate(endDate) : '',
    month,
    year
  })
  console.log(items)
  const updateParam = (key: any, value: any) => {
    if (value !== '') {
      createParams({ key, value })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key, value: '' })
    }
  }
  const onSubmit = async (values: historyFields) => {
    updateParam('startDate', values.startDate)
    updateParam('endDate', values.endDate)
    updateParam('month', values.month)
    updateParam('year', values.year)

    await refetch()
  }

  const handleReset = () => {
    navigate('/dashboard')
    forms.reset()
  }
  if (isLoading) return <Loading />

  return (
    <div className="bg-white py-10 container">
      {isFetching && <Loading />}
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-8">
            <FormField
              name="startDate"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tanggal Awal</FormLabel>
                  <FormControl>
                    <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="endDate"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tanggal Akhir</FormLabel>
                  <FormControl>
                    <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="month"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Bulan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="year"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tahun</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
              <HiArrowPath className="text-lg" />
              <span>Reset</span>
            </Button>
            <Button className="gap-2 border-none rounded-lg bg-primary text-white" type="submit">
              <HiMagnifyingGlass className="text-lg" />
              <span>Cari Data</span>
            </Button>
          </div>
        </form>
      </Form>
      <Table className="mt-5">
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white font-bold text-[15px]">No.</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Waktu</TableHead>
            <TableHead className="text-white font-bold text-[15px]">No.Telepon</TableHead>
            <TableHead className="text-white font-bold text-[15px]">Nama</TableHead>
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
                  {formatDate(item.registrationDate)}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.phone}
                </TableCell>
                <TableCell className="text-center bg-[#F9FAFC]" position="center">
                  {item.name}
                </TableCell>
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
      {(items?.meta?.total as number) > 10 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={items?.meta.total as number}
          pageSize={10}
          onPageChange={(page) => {
            createParams({ key: 'page', value: page.toString() })
          }}
        />
      ) : null}
    </div>
  )
}

export default Home
