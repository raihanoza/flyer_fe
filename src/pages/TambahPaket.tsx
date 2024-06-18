import { IcStarFill } from '@/assets'
import DropZone, { type FileWithPreview } from '@/components/atoms/DropZone'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { type itemFields } from '@/lib/validations/auth.validation'
import { useCreateItems } from '@/store/server/useItem'
import { useForm } from 'react-hook-form'
import { HiDocumentArrowUp } from 'react-icons/hi2'
const TambahPaket = () => {
  const forms = useForm<itemFields>({
    mode: 'onTouched'
  })
  const { mutate: createItems, isLoading: isLoadingCreate } = useCreateItems()

  const onSubmit = async (data: itemFields) => {
    createItems(data, {
      onSuccess: () => {
        forms.reset()
      }
    })
  }
  return (
    <div className="container w-full bg-white py-5">
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)}>
          <FormField
            name="title"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Judul</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Judul" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-5 my-5">
            <FormField
              name="category"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormLabel className="font-semibold dark:text-white">Kategori Paket</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori Paket" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Umroh">Umroh</SelectItem>
                      <SelectItem value="Haji">Haji</SelectItem>
                      <SelectItem value="Wisata">Wisata</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Harga</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Harga" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="duration"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Durasi</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Durasi" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="mekah"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Mekah</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Hotel Mekah" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="mekah_rating"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormLabel className="font-semibold dark:text-white">Bintang Hotel Mekah</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5">
                        <div className="flex flex-row gap-3">
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                        </div>
                      </SelectItem>
                      <SelectItem value="4">
                        <div className="flex flex-row gap-3">
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                        </div>
                      </SelectItem>
                      <SelectItem value="dar">
                        <div className="flex flex-row gap-3">
                          <span>Dar/Apartemen</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="shuttle">
                        <div className="flex flex-row gap-3">
                          <span>SHUTTLE</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="madina"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Madinah</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Hotel Madinah" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="madina_rating"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormLabel className="font-semibold dark:text-white">Bintang Hotel Madinah</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5">
                        <div className="flex flex-row gap-3">
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                        </div>
                      </SelectItem>
                      <SelectItem value="4">
                        <div className="flex flex-row gap-3">
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                        </div>
                      </SelectItem>
                      <SelectItem value="dar">
                        <div className="flex flex-row gap-3">
                          <span>Dar/Apartemen</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="shuttle">
                        <div className="flex flex-row gap-3">
                          <span>SHUTTLE</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="month"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormLabel className="font-semibold dark:text-white">Bulan</FormLabel>
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
            <FormField
              name="year"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tahun</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Harga" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="maskapai"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Maskapai</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Maskapai" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="rate"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormLabel className="font-semibold dark:text-white">Rating</FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5vip">
                        <div className="flex flex-row gap-3">
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <p> - VIP</p>
                        </div>
                      </SelectItem>
                      <SelectItem value="5mix">
                        <div className="flex flex-row gap-3">
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <p> - MIX</p>
                        </div>
                      </SelectItem>
                      <SelectItem value="4">
                        <div className="flex flex-row gap-3">
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                          <img src={IcStarFill} alt="logo" className="w-5" />
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Gambar</FormLabel>
                  <FormControl>
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      maxFiles={1}
                      id="selfie"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="description"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value ?? ''} placeholder="Masukan Keterangan" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="cancel"
              className="font-bold"
              onClick={() => {
                forms.reset()
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button className="font-bold" type="submit" loading={isLoadingCreate}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TambahPaket
