// store/auth.ts
import create from 'zustand'

interface AuthState {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('token') ?? null,
  login: (token) => set({ token }),
  logout: () => set({ token: null })
}))

export const useLogout = () => {
  const { logout } = useAuth.getState()
  return logout
}
