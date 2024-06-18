import { Logo } from '@/assets'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type RegisterInput, registerValidation } from '@/lib/validations/auth.validation'
import { useRegister } from '@/store/server/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { type AxiosError } from 'axios'
import { type IErrorResponse } from '@/lib/types/user.type'
import { toast } from '@/components/ui/use-toast'

export default function Register() {
  const currentYear = new Date().getFullYear()
  const { mutate: Register, isLoading } = useRegister()
  const forms = useForm<RegisterInput>({
    mode: 'onTouched',
    resolver: yupResolver(registerValidation),
    defaultValues: {
      phone: '',
      name: ''
    }
  })

  const onSubmit = async (values: RegisterInput) => {
    Register(values, {
      onError: (error: AxiosError) => {
        const errorResponse = error.response?.data as IErrorResponse
        console.log(errorResponse)
        if (errorResponse !== undefined) {
          toast({
            variant: 'destructive',
            title: errorResponse.message,
            description: 'There was a problem with your request.'
          })
        }
      },
      onSuccess: () => {
        toast({
          title: 'Register Success',
          description: 'You have successfully logged in.'
        })
      }
    })
  }

  return (
    <main className="py-14 px-4 sm:px-8 md:px-16 lg:px-36 flex flex-col items-center border justify-center min-h-screen">
      <section className="h-full flex justify-center w-full sm:w-[80%] md:w-[70%] lg:w-[60%] rounded-2xl py-10 items-center shadow-xl px-5 sm:px-5 lg:px-0">
        <div className="w-full sm:w-6/12 h-full flex flex-col justify-between">
          <div className="flex justify-center items-center my-10">
            <img src={Logo} alt="logo" className="object-contain w-[70%] h-[70%]" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-primary">Selamat Datang</h1>
              <p className="font-medium text-lg text-[#5b6481]">Silahkan masukkan akun anda untuk tahap selanjutnya</p>
            </div>
            <Form {...forms}>
              <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  name="phone"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">No.Telepon</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="08XXXXXXXXXXX" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="name"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Nama Lengkap Anda." />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="py-6 text-[17px] font-normal bg-primary text-white" loading={isLoading}>
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <p className="text-[#959CB6] text-center text-sm mt-20">© {currentYear} ALL RIGHTS RESERVED</p>
        </div>
      </section>
    </main>
  )
}
