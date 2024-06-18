import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Loading } from '@/components'
import { useGetItems } from '@/store/server/useItem'
import { useGetParams } from '../hooks'
import { useEffect } from 'react'
import { HiBuildingOffice, HiCalendar, HiClock, HiPaperClip, HiStar } from 'react-icons/hi2'
import Plane from '../../assets/icon/plane.png'
import ENV from '@/lib/environment'
// import { useNavigate } from 'react-router-dom'
interface FormValues {
  month?: string
}
const MainSection = () => {
  // const navigate = useNavigate()
  const { page } = useGetParams(['page'])
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const {
    data: items,
    isFetching,
    isLoading,
    refetch
  } = useGetItems({
    page: parseInt(page) ?? 1,
    month: forms.watch('month')
  })
  useEffect(() => {
    void refetch()
  }, [page, forms.watch('month')])
  const formatRupiah = (angka: any) => {
    // Format angka menjadi mata uang Rupiah
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    return formatter.format(angka)
  }

  const RatingComponent = ({ apiResponse }: { apiResponse: string }) => {
    const renderStars = (count: number) => {
      const stars = []
      for (let i = 0; i < count; i++) {
        stars.push(<HiStar key={i} className="text-sm lg:text-2xl text-yellow-500" />)
      }
      return stars
    }

    const renderRating = () => {
      switch (apiResponse) {
        case '4':
          return renderStars(4)
        case '5':
          return renderStars(5)
        case '5mix':
          return (
            <>
              {renderStars(5)}
              <span className="text-lg font-thin text-green-700">MIX</span>
            </>
          )
        case '5vip':
          return (
            <>
              {renderStars(5)}
              <span className="text-lg font-thin text-green-300">VIP</span>
            </>
          )
        case 'dar':
          return (
            <>
              <span className="text-base font-thin text-yellow-300">(Dar/Apartemen)</span>
            </>
          )
        case 'shuttle':
          return (
            <>
              <span className="text-base font-thin text-yellow-300">(Shuttle)</span>
            </>
          )
        default:
          return null
      }
    }

    return <div className="flex flex-row gap-1">{renderRating()}</div>
  }
  const RatingComponentPrice = ({ apiResponse }: { apiResponse: string }) => {
    const renderStars = (count: number) => {
      const stars = []
      for (let i = 0; i < count; i++) {
        stars.push(<HiStar key={i} className="text-2xl text-yellow-500" />)
      }
      return stars
    }

    const renderRating = () => {
      switch (apiResponse) {
        case '4':
          return renderStars(4)
        case '5':
          return renderStars(5)
        case '5mix':
          return (
            <>
              {renderStars(5)}
              <span className="text-lg font-thin text-green-700">MIX</span>
            </>
          )
        case '5vip':
          return (
            <>
              {renderStars(5)}
              <span className="text-lg font-thin text-green-300">VIP</span>
            </>
          )
        case 'dar':
          return (
            <>
              <span className="text-base font-thin text-yellow-300">(Dar/Apartemen)</span>
            </>
          )
        case 'shuttle':
          return (
            <>
              <span className="text-base font-thin text-yellow-300">(Shuttle)</span>
            </>
          )
        default:
          return null
      }
    }

    return <div className="flex flex-row gap-1">{renderRating()}</div>
  }
  if (isLoading) return <Loading />
  return (
    <div className="container py-5">
      <h5 className="text-2xl font-semithin">List Paket Umroh</h5>
      <h5 className="text-md">Pilih Paket Umroh Sesuai Keinginan Keluarga Anda</h5>
      {isFetching && <Loading />}
      <div className="w-full border-4 border-primary rounded-lg my-3" />
      <div className="w-80">
        <Form {...forms}>
          <FormField
            name="month"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Bulan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Januari">Januari</SelectItem>
                    <SelectItem value="Februari">Februari</SelectItem>
                    <SelectItem value="Maret">Maret</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="Mei">Mei</SelectItem>
                    <SelectItem value="Juni">Juni</SelectItem>
                    <SelectItem value="Juli">Juli</SelectItem>
                    <SelectItem value="Agustus">Agustus</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="Oktober">Oktober</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="Desember">Desember</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </Form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-5">
        {items?.data?.length !== 0 ? (
          items?.data.map((item, index) => (
            <div
              key={index}
              className="h-fit max-w-md rounded-2xl overflow-hidden shadow-3xl border flex flex-col hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img className="w-full bg-primary object-fill h-[65%]" src={`${ENV.apiUrl}${item.image}`} alt="flyer" />
              <div className="flex flex-col h-[35%] bg-primary justify-between flex-1">
                <div className="px-6 bg-white pb-4 pt-2 h-36 rounded-br-[300px]">
                  <div className="font-bold text-primary text-2xl mb-2">
                    {item.title}
                    <RatingComponentPrice apiResponse={item.rate} />
                  </div>
                  <div className="flex flex-row gap-3">
                    <p className="text-primary text-xl font-bold">{formatRupiah(item?.price)},-</p>
                  </div>
                </div>
                <div className="flex flex-col bg-primary h-full py-2 px-2">
                  <div className="flex flex-row gap-3">
                    <div>
                      <HiCalendar className="text-3xl text-yellow-500" />
                    </div>
                    <div className="w-[60%]">
                      <p className="lg:text-lg sm:text-xs text-white font-semithin">Jadwal</p>
                    </div>
                    <div className="w-full">
                      <p className="text-white lg:text-lg sm:text-xs font-semithin">
                        {item.month} {item.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div>
                      <HiClock className="text-3xl text-yellow-500" />
                    </div>
                    <div className="w-[60%]">
                      <p className="lg:text-lg sm:text-xs text-white font-semithin">Durasi</p>
                    </div>
                    <div className="w-full">
                      <p className="text-white lg:text-lg sm:text-xs font-semithin">{item.duration} Hari</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div>
                      <HiBuildingOffice className="text-3xl text-yellow-500" />
                    </div>
                    <div className="w-[60%]">
                      <p className="lg:text-lg sm:text-xs text-white font-semithin">Mekah</p>
                      <RatingComponent apiResponse={item.mekah_rating} />
                    </div>
                    <div className="w-full">
                      <p className="text-white lg:text-lg sm:text-xs font-semithin">{item.mekah}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div>
                      <HiBuildingOffice className="text-3xl text-yellow-500" />
                    </div>
                    <div className="w-[60%]">
                      <p className="lg:lg:text-lg sm:text-xs text-white font-semithin">Madinah</p>
                      <RatingComponent apiResponse={item.madina_rating} />
                    </div>
                    <div className="w-full">
                      <p className="text-white lg:text-lg sm:text-xs font-semithin">{item.madina}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div>
                      <img src={Plane} width={55} height={55} alt="icon" />
                    </div>
                    <div className="w-[60%]">
                      <p className="lg:text-lg sm:text-xs text-white font-semithin">Maskapai</p>
                    </div>
                    <div className="w-full">
                      <p className="text-white lg:text-lg sm:text-xs font-semithin">{item.maskapai}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div>
                      <HiPaperClip className="text-3xl text-yellow-500" />
                    </div>
                    <div className="w-[60%]">
                      <p className="lg:text-lg sm:text-xs text-white font-semithin">Keterangan</p>
                    </div>
                    <div className="w-full">
                      <p className="text-white lg:text-lg sm:text-xs font-semithin">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Tidak Ada Data</h1>
        )}
      </div>
    </div>
  )
}

export default MainSection
