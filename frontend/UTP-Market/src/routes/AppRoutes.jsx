import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Puedes agregar rutas protegidas aquí más adelante */}
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
      </Routes>
    </BrowserRouter>
  );
}
