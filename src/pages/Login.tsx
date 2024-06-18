import { Logo } from '@/assets'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type LoginInput, loginValidation } from '@/lib/validations/auth.validation'
import { useLogin } from '@/store/server/useAuth'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { type AxiosError } from 'axios'
import { type IErrorResponse } from '@/lib/types/user.type'
import { toast } from '@/components/ui/use-toast'

export default function Login() {
  const currentYear = new Date().getFullYear()
  const { mutate: Login, isLoading } = useLogin()
  const forms = useForm<LoginInput>({
    mode: 'onTouched',
    resolver: yupResolver(loginValidation),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: LoginInput) => {
    Login(values, {
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
          title: 'Login Success',
          description: 'You have successfully logged in.'
        })
      }
    })
  }

  return (
    <main className="py-14 px-36 flex flex-row items-center border justify-center h-screen">
      <section className="h-full flex justify-center w-[60%] rounded-2xl py-10 items-center shadow-xl">
        <div className="w-6/12 h-full flex flex-col justify-between">
          <div className="flex justify-center items-center">
            <img src={Logo} alt="logo" className="object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold text-font">Selamat Datang</h1>
              <p className="font-medium text-lg text-[#5b6481]">Silahkan masukkan akun anda untuk tahap selanjutnya</p>
            </div>

            <Form {...forms}>
              <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  name="email"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Example@email.com" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Kata Sandi</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="At least 8 characters" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Link to="/forgot-password" className="text-[#1E4AE9] text-right text-sm hover:underline font-medium">
                  Lupa Kata Sandi?
                </Link>
                <Button className="py-6 text-[17px] font-normal bg-primary text-white" loading={isLoading}>
                  Masuk
                </Button>
              </form>
            </Form>
          </div>
          <p className="text-[#959CB6] text-center text-sm">© {currentYear} ALL RIGHTS RESERVED</p>
        </div>
      </section>
    </main>
  )
}
