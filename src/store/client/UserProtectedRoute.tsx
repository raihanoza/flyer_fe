import { useAuth } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export default function UserProtectedRoute() {
  const location = useLocation()

  const auth = useAuth((state) => ({
    token: state.token
  }))

  if (!auth?.token) {
    return <Navigate to="/register" replace state={{ from: location }} />
  }

  // Decode the JWT token to get its expiration time
  const decodedToken = jwtDecode(auth.token)
  const currentTime = Date.now() / 1000 // Convert milliseconds to seconds

  // Check if the token is expired
  if (!decodedToken ?? !decodedToken.exp) {
    // If expiration time doesn't exist, handle the situation accordingly
    return <Navigate to="/register" replace state={{ from: location }} />
  }
  if (decodedToken.exp < currentTime) {
    // Token is expired, redirect to register page
    return <Navigate to="/register" replace state={{ from: location }} />
  }

  return <Outlet />
}
