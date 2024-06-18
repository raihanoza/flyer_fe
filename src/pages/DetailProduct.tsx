import { HeaderUser, Loading } from '@/components'
import { useGetItemsById } from '@/store/server/useItem'
import { useParams } from 'react-router-dom'
// import Plane from '../assets/icon/plane-solid.png'
import Tag from '../assets/icon/tag-solid.svg'
import Calendar from '../assets/icon/calendar-solid.svg'
import { IcStar, IcStarFill } from '@/assets'
import Hotel from '../assets/icon/hotel-solid.svg'
const DetailProduct = () => {
  const { id } = useParams()
  const { data: items, isLoading } = useGetItemsById(id)
  const StarRating = (props: { count: any }) => {
    const renderStars = () => {
      const stars = []
      for (let i = 1; i <= 5; i++) {
        const isFilled = i <= props.count
        const starImageSrc = isFilled ? IcStarFill : IcStar

        stars.push(
          <img
            key={i}
            src={starImageSrc}
            alt={`star ${i}`}
            width={20}
            height={20}
          />
        )
      }

      return stars
    }

    return <div className='flex flex-row gap-1'>{renderStars()}</div>
  }
  const formatRupiah = (angka: any) => {
  // Format angka menjadi mata uang Rupiah
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  })

  return formatter.format(angka)
}
  if (isLoading) return <Loading />
  return (
    <>
    <div className='h-screen'>
        <HeaderUser />
        <div className='container lg:flex lg:flex-row sm:flex-col'>
  <div className='lg:w-[50%] sm:w-[100%] flex justify-center py-5'>
    <img
      className="lg:w-[65%] sm:w-full object-fill h-auto rounded-xl hover:scale-105 transition-transform duration-300"
      src={`http://localhost:3001/${items?.image}`}
      alt='flyer'
    />
  </div>
  <div className="lg:w-[50%] py-5">
    <p className='text-4xl text-primary font-extrabold'>{items?.title}</p>
    <hr className='border-yellow-600 border-2 my-2'/>
    <div className='flex flex-row gap-3'>
   <img src={Tag} alt="plane" width={20} height={20} />
    <p className='text-xl font-bold text-primary'>{formatRupiah(items?.price)},-</p>
    </div>
    <div className='flex flex-row gap-3'>
   <img src={Calendar} alt="plane" width={20} height={20} />
   <p className='text-xl font-bold text-primary'>{items?.month}{items?.year}</p>
    </div>
    <div className='flex flex-row gap-3'>
   <img src={Hotel} alt="plane" width={20} height={20} />
   <StarRating count={items?.rate} />
   </div>
  </div>
</div>
    </div>
    </>
  )
}

export default DetailProduct
