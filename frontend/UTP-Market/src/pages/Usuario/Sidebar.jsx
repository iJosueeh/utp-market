import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import utpMarketLogo from '../../assets/utpmarketlogo.png';

const Sidebar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();

  const linkStyle = {
    border: 'none',
    color: 'white',
    textAlign: 'left',
    padding: '10px 15px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginLeft: '10px',
  };

  const iconStyle = {
    marginRight: '10px',
  };

  const topButtonStyle = {
    border: 'none',
    color: 'white',
    padding: 0,
    margin: 0,
    lineHeight: 1,
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} data-testid="sidebar">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={utpMarketLogo} alt="UTP Market Logo" style={{ width: '80%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '0 10px', marginBottom: '20px', alignItems: 'center' }}>
          <button onClick={() => navigate('/main')} style={topButtonStyle} className="sidebar-button"><i className="bi bi-house" style={{ fontSize: '20px' }}></i></button>
          <button style={topButtonStyle} className="sidebar-button"><i className="bi bi-cart" style={{ fontSize: '20px' }}></i></button>
          <button style={topButtonStyle} className="sidebar-button"><i className="bi bi-gear" style={{ fontSize: '20px' }}></i></button>
          <button style={topButtonStyle} className="sidebar-button"><i className="bi bi-bell" style={{ fontSize: '20px' }}></i></button>
        </div>
        <nav style={{ flexGrow: 1 }}>
          <Link to="/usuario/datos-personales" style={linkStyle} className="sidebar-button"><i className="bi bi-person" style={iconStyle}></i> Datos Personales</Link>
          <Link to="/usuario/tus-resenas" style={linkStyle} className="sidebar-button"><i className="bi bi-star" style={iconStyle}></i> Tus reseñas</Link>
          <Link to="/usuario/tus-productos" style={linkStyle} className="sidebar-button"><i className="bi bi-box" style={iconStyle}></i> Tus productos</Link>
          <Link to="/usuario/favoritos" style={linkStyle} className="sidebar-button"><i className="bi bi-heart" style={iconStyle}></i> Favoritos</Link>
          <Link to="/usuario/historial-de-compra" style={linkStyle} className="sidebar-button"><i className="bi bi-clock-history" style={iconStyle}></i> Historial de compra</Link>
          <Link to="/usuario/estadisticas-personales" style={linkStyle} className="sidebar-button"><i className="bi bi-bar-chart" style={iconStyle}></i> Estadísticas Personales</Link>
        </nav>
        <div>
          <button style={linkStyle} className="sidebar-button"><i className="bi bi-box-arrow-right" style={iconStyle}></i> Cerrar sesión</button>
        </div>
      </div>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={toggle}></div>
      <style jsx>{`
        .sidebar {
          background-color: #222222;
          padding: 20px 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          width: 220px;
          transition: transform 0.3s ease-in-out;
          z-index: 1000;
        }
        .sidebar-button {
          background: none;
          transition: background-color 0.3s;
        }
        .sidebar-button:hover {
          background-color: #B50D30;
        }
        .sidebar-overlay {
          display: none;
        }
        @media (max-width: 992px) {
          .sidebar {
            position: fixed;
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
          }
          .sidebar-overlay.open {
            opacity: 1;
            visibility: visible;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
