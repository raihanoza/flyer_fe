import { type IUser, type IAuthResponse, type IAuthResponseRegister } from '@/lib/types/user.type'
import {
  type LoginUserFields,
  type LoginInput,
  type RegisterInput,
  type OtpInput
} from '@/lib/validations/auth.validation'
import axios from 'axios'
import api from './axiosInstance'
import ENV from '@/lib/environment'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const loginFn = async (fields: LoginInput): Promise<IAuthResponse> => {
  const response = await apiPublic.post('/auth/login', fields)
  return response.data
}
export const registerFn = async (fields: RegisterInput): Promise<IAuthResponseRegister> => {
  const response = await apiPublic.post('/auth/register', fields)
  return response.data
}
export const verifyOtpFn = async (fields: OtpInput): Promise<IAuthResponseRegister> => {
  const response = await apiPublic.post('/auth/verify', fields)
  return response.data
}
export const logoutFn = async (): Promise<IAuthResponse> => {
  const response = await api.post('/auth/logout')
  return response.data
}

export const getMeFn = async (): Promise<IUser> => {
  const response = await api.get('/auth/me')
  return response.data
}
// LANDING PAGE
export const loginUserFn = async (fields: LoginUserFields): Promise<IAuthResponse> => {
  const response = await apiPublic.post('/public/auth/login', fields)
  return response.data
}
