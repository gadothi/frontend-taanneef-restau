import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MenuClient from './pages/MenuClient'
import Cuisine from './pages/Cuisine'
import DashboardAdmin from './pages/DashboardAdmin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/menu?table=1" replace />} />
        <Route path="/menu" element={<MenuClient />} />
        <Route path="/cuisine" element={<Cuisine />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
