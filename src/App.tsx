import { Route, Routes } from 'react-router-dom'

import { Home, LandingPage, Login, Otp, Paket, Registration, TambahPaket } from './pages'
import { DashboardLayout } from './components'
import UserProtectedRoute from './store/client/UserProtectedRoute'
import DetailProduct from './pages/DetailProduct'

export default function App() {
  return (
    <Routes>
                  <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/paket" element={<Paket />} />
                  <Route path="/tambahpaket" element={<TambahPaket />} />
      </Route>
              <Route element={<UserProtectedRoute />}>
      <Route path="/" element={<LandingPage />} />
      </Route>
                  <Route path="/otp/:phone" element={<Otp />} />
                  <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detail/:id" element={<DetailProduct />} />
    </Routes>
  )
}
