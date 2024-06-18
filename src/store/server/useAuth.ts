import { type AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../client'
import { loginFn, registerFn, verifyOtpFn } from '@/api/auth.api'

export const useLogin = () => {
  const navigate = useNavigate()
  // const storeToken = useToken((state) => state.storeToken)

  return useMutation(loginFn, {
    onSuccess: (data) => {
      console.log(data)
      // storeToken(data.data.accessToken)
      useAuth.getState().storeToken(data.token)
      navigate('/dashboard')
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        // window.alert('Email or password is incorrect')
      }
    }
  })
}
export const useRegister = () => {
  const navigate = useNavigate()
  // const storeToken = useToken((state) => state.storeToken)

  return useMutation(registerFn, {
    onSuccess: (data) => {
      console.log(data)
      const phoneNumber = data.phone
      // storeToken(data.data.accessToken)
      // useAuth.getState().storeToken(data.token)
      navigate(`/otp/${phoneNumber}`)
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        // window.alert('Email or password is incorrect')
      }
    }
  })
}
export const useVerify = () => {
  const navigate = useNavigate()
  // const storeToken = useToken((state) => state.storeToken)

  return useMutation(verifyOtpFn, {
    onSuccess: (data) => {
      console.log(data)
      // storeToken(data.data.accessToken)
      useAuth.getState().storeToken(data.token)
      // useAuth.getState().storeToken(data.token)
      navigate('/')
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        // window.alert('Email or password is incorrect')
      }
    }
  })
}
