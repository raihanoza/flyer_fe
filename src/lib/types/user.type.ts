export interface IPermission {
  id: string
  name: string
  slugName: string
  isPermitted: boolean
}

export interface IUser {
  data: {
    id: string
    email: string
    name: string
  }
}
export interface IAuthResponse {
  message: string
  token: string
}
export interface IAuthResponseRegister {
  message: string
  token: string
  phone: string
}
export interface IErrorResponse {
  message: string
  errors: Record<string, string[]>
}
export interface IResetPassword {
  password: string
  token: string
}
export interface IChangePassword {
  password: string
}
export interface IChangeProfile {
  name: string
  email: string
  phoneNumber: string
}

export interface IAuth {
  token: string
}
