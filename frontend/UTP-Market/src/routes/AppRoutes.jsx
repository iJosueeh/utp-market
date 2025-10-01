import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AUPage from '../pages/AboutUs/AUPage';
import HelpPage from '../pages/Help/HelpPage';
import MainPage from '../pages/MainPage';
import AuthCallback from '../pages/auth/AuthCallback';
import Sedes from '../pages/features/sedes/Sedes'; // Asegúrate de importar el componente Sedes

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página por defecto ahora es /main */}
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/sedes" element={<Sedes />} />
        {/* Rutas públicas */}
        {/* Ruta para la página "Acerca de nosotros" */}
        <Route path="/about-us" element={<AUPage />} />
        {/* Ruta para la página "Centro de ayuda" */}
        <Route path="/help" element={<HelpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Puedes agregar rutas protegidas aquí más adelante */}
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}

      </Routes>
    </BrowserRouter>
  );
}
