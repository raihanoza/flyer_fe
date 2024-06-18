import { create } from 'zustand'

export interface AuthStore {
  token: string | null
  storeToken: (token: string) => void
  removeToken: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  token: JSON.parse(localStorage.getItem('access-token') ?? '""'),
  storeToken: (token) => {
    localStorage.setItem('access-token', JSON.stringify(token))
    set({ token })
  },
  removeToken: () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('user')
    set({ token: null })
  }
}))
