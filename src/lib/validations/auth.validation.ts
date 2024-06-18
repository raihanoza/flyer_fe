import * as Yup from 'yup'

export const loginValidation = Yup.object({
  email: Yup.string().required('atau email harus diisi'),
  password: Yup.string().required('Password harus diisi')
})

export type LoginInput = Yup.InferType<typeof loginValidation>
export const loginUserValidation = Yup.object({
  email: Yup.string().required('Email harus diisi'),
  password: Yup.string().required('Password harus diisi')
})

export type LoginUserFields = Yup.InferType<typeof loginUserValidation>
export const registerValidation = Yup.object({
  phone: Yup.string().required('Nomor Telepon Harus Diisi'),
  name: Yup.string().required('Nama Harus Diisi')
})

export type RegisterInput = Yup.InferType<typeof registerValidation>
export const otpValidation = Yup.object({
  code: Yup.string().required('Nomor Telepon Harus Diisi')
})

export type OtpInput = Yup.InferType<typeof otpValidation>

export const itemValidation = Yup.object({
  title: Yup.string().required('Judul wajib diisi'),
  category: Yup.string().required('Kategori wajib diisi'),
  image: Yup.mixed().required('Gambar Harus Ada'),
  price: Yup.number().required('Harga Harus diisi'),
  month: Yup.string().required('Pilih Bulan Paket'),
  year: Yup.number().required('Pilih Tahun Paket'),
  mekah: Yup.string().required('Jenis Hotel Wajib Dipilih'),
  mekah_rating: Yup.string().required('Jenis Hotel Wajib Dipilih'),
  madina: Yup.string().required('Jenis Hotel Wajib Dipilih'),
  madina_rating: Yup.string().required('Jenis Hotel Wajib Dipilih'),
  rate: Yup.string().required('Rating Wajib Diisi'),
  maskapai: Yup.string().required('Maskapai Wajib Diisi'),
  duration: Yup.number().required('Durasi Wajib Diisi'),
  description: Yup.string().required('Keterangan wajib diisi')
})

export type itemFields = Yup.InferType<typeof itemValidation>

export const historyValidation = Yup.object({
  startDate: Yup.mixed().test('startDate', 'Tanggal wajib diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  endDate: Yup.mixed().test('endDate', 'Tanggal wajib diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  month: Yup.string().required('Bulan Wajib Diisi'),
  year: Yup.string().required('Tahun Wajib Diisi')
})

export type historyFields = Yup.InferType<typeof historyValidation>
