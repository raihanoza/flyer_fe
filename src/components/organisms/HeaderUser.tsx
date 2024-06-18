import { IcIndo, IcKaaba, Logo } from '@/assets'
const HeaderUser = () => {
  return (
    <>
      <div className="sm:h-[12%] h-[12%] bg-primary w-full py-3 flex justify-center items-center">
        <img src={Logo} alt="logo" className="h-full object-cover" />
      </div>
      <div className="sm:h-[15%] lg:h-[6%] py-3 bg-yellow-600 px-2 w-full flex flex-col justify-center items-center lg:flex-row">
        <div className="flex lg:justify-center gap-3 items-center">
          <img src={IcKaaba} alt="logo" className="sm:w-[5%] max-w-[5%] h-full object-cover" />
          <p className="text-lg font-semibold">IZIN UMROH NO 536/2020</p>
        </div>
        <div className="flex lg:justify-center gap-3 items-center">
          <img src={IcKaaba} alt="logo" className="sm:w-[5%] max-w-[5%] h-full object-cover" />
          <p className="text-lg font-semibold">IZIN HAJI NO 306/2022</p>
        </div>
        <div className="flex lg:justify-center gap-3 items-center">
          <img src={IcIndo} alt="logo" className="sm:w-[5%] max-w-[5%] h-full object-cover" />
          <p className="text-lg font-semibold">TERSEBAR DI 22 PROVINSI DI INDONESIA</p>
        </div>
      </div>
    </>
  )
}

export default HeaderUser
