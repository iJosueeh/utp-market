import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AUPage from '../pages/AboutUs/AUPage';
import HelpPage from '../pages/Help/HelpPage';
import MainPage from '../pages/MainPage';
import UsuarioDashboard from '../pages/Usuario/UsuarioDashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página por defecto ahora es /main */}
        <Route path="/" element={<Navigate to="/main" replace />} />

        {/* Rutas públicas */}
        {/* Ruta para la página "Acerca de nosotros" */}
        <Route path="/about-us" element={<AUPage />} />
        {/* Ruta para la página "Centro de ayuda" */}
        <Route path="/help" element={<HelpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/usuario/*" element={<UsuarioDashboard />} />
        {/* Puedes agregar rutas protegidas aquí más adelante */}
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}

      </Routes>
    </BrowserRouter>
  );
}
