import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DatosPersonales from './DatosPersonales';
import TusResenas from './TusReseñas';
import TusProductos from './TusProductos';
import Favoritos from './Favoritos';
import HistorialDeCompra from './HistorialDeCompra';
import EstadisticasPersonales from './EstadisticasPersonales';
import NotFoundSection from './NotFoundSection';
import { Routes, Route } from 'react-router-dom';

const UsuarioDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="usuario-dashboard">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <div className="main-content">
        <button className={`sidebar-toggle d-lg-none ${isSidebarOpen ? 'hidden' : ''}`} onClick={toggleSidebar} data-testid="sidebar-toggle">
          <i className="bi bi-list"></i>
        </button>
        <div className="content-wrapper">
          <Routes>
            <Route index element={<DatosPersonales />} />
            <Route path="datos-personales" element={<DatosPersonales />} />
            <Route path="tus-resenas" element={<TusResenas />} />
            <Route path="tus-productos" element={<TusProductos />} />
            <Route path="favoritos" element={<Favoritos />} />
            <Route path="historial-de-compra" element={<HistorialDeCompra />} />
            <Route path="estadisticas-personales" element={<EstadisticasPersonales />} />
            <Route path="*" element={<NotFoundSection />} />
          </Routes>
        </div>
      </div>
      <style jsx>{`
        .usuario-dashboard {
          display: flex;
        }
        .main-content {
          flex: 1;
          padding: 20px;
          position: relative;
        }
        .sidebar-toggle {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1001;
          background: #222222;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 0;
        }
        .sidebar-toggle.hidden {
          display: none;
        }
        @media (max-width: 992px) {
          .content-wrapper {
            padding-top: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default UsuarioDashboard;
