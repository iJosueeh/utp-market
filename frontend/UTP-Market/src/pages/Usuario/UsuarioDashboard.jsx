import React from 'react';
import Sidebar from './SideBar';
import DatosPersonales from './DatosPersonales';
import TusResenas from './TusReseñas';
import TusProductos from './TusProductos';
import Favoritos from './Favoritos';
import HistorialDeCompra from './HistorialDeCompra';
import EstadisticasPersonales from './EstadisticasPersonales';
import { Routes, Route } from 'react-router-dom';

const UsuarioDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route index element={<DatosPersonales />} />
          <Route path="datos-personales" element={<DatosPersonales />} />
          <Route path="tus-resenas" element={<TusResenas />} />
          <Route path="tus-productos" element={<TusProductos />} />
          <Route path="favoritos" element={<Favoritos />} />
          <Route path="historial-de-compra" element={<HistorialDeCompra />} />
          <Route path="estadisticas-personales" element={<EstadisticasPersonales />} />
        </Routes>
      </div>
    </div>
  );
};

export default UsuarioDashboard;