import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import utpMarketLogo from '../../assets/utpmarketlogo.png';

const Sidebar = () => {
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
    <div>
      <style>{`
        .sidebar-button {
          background: none;
          transition: background-color 0.3s;
        }
        .sidebar-button:hover {
          background-color: #B50D30;
        }
      `}</style>
      <div style={{ backgroundColor: '#222222', padding: '20px 0', height: '100vh', display: 'flex', flexDirection: 'column', width: '220px' }}>
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
    </div>
  );
};

export default Sidebar;