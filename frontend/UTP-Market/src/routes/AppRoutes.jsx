import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AUPage from '../pages/AboutUs/AUPage';
import HelpPage from '../pages/Help/HelpPage';
import MainPage from '../pages/MainPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta para la página "Acerca de nosotros" */}    
      <Route path="/about-us" element={<AUPage />} />
        {/* Ruta para la página "Centro de ayuda" */}
      <Route path="/help" element={<HelpPage />} />
      <Route path="/main" element={<MainPage />} />
        {/* Puedes agregar rutas protegidas aquí más adelante */}
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}

      </Routes>
    </BrowserRouter>
  );
}
