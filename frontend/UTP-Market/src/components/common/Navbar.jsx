import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import brandLogo from "../../assets/utpmarketlogo.png";
import Carrito from "../../pages/features/carrito/Carrito";
import { useAuth } from "../../hooks/useAuth";

const AuthSection = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/main');
    };

    if (loading) {
        return null;
    }

    return (
        <>
            {user ? (
                <div className="dropdown">
                    <a href="#" className="nav-link text-white dropdown-toggle pe-5" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Hola, {user.nombre}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end pe-3" aria-labelledby="userDropdown">
                        <li><Link className="dropdown-item" to="/profile">Ver Perfil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item dropdown-item-logout" onClick={handleLogout}>Cerrar Sesión</button></li>
                    </ul>
                </div>
            ) : (
                <a href="http://localhost:8080/login" className="btn btn-icon btn-dark rounded-circle bg-dark me-4 d-none d-lg-block">
                    <i className="bi bi-person align-middle"></i>
                </a>
            )}
        </>
    );
};

const AuthSectionMobile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/main');
    };

    return (
        <>
            {user ? (
                 <div className="dropdown">
                    <a href="#" className="nav-link text-white dropdown-toggle" id="userDropdownMobile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Hola, {user.nombre}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="userDropdownMobile">
                        <li><Link className="dropdown-item" to="/profile">Ver Perfil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                    </ul>
                </div>
            ) : (
                <a href="http://localhost:8080/login" className="btn btn-icon btn-dark rounded-circle bg-dark mx-2">
                    <i className="bi bi-person align-middle"></i>
                </a>
            )}
        </>
    );
};

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
        <div className="container-fluid px-0">
          <div className="d-flex">
            <a className="navbar-brand ms-5" href="/">
              <img
                src={brandLogo}
                alt=""
                style={{ height: 45 }}
              />
            </a>
          </div>
          <div className="order-lg-3">
            <div className="d-flex align-items-center">
              <div className="position-relative d-none d-lg-block" ref={cartRef}> 
                <button type="button" className="btn btn-icon btn-dark rounded-circle bg-dark" onClick={() => setShowCart(!showCart)}>
                  <i className="bi bi-cart2 align-middle"></i>
                </button>
                {showCart && (
                  <div className="dropdown-menu dropdown-menu-end show p-3" style={{ position: 'absolute', top: '120%', right: 0, width: '550px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Carrito de Compras</h5>
                      <Link to="/" className="btn btn-sm text-white " style={{background:'#B50D30'}}>Ver todo</Link>
                    </div>
                    <Carrito />
                  </div>
                )}
              </div>
              <span className="d-none d-lg-block">
                <a href="#" className="btn btn-icon btn-dark rounded-circle bg-dark">
                  <i className="bi bi-bell align-middle"></i>
                </a>
              </span>
              <div className="d-none d-lg-block">
                <AuthSection />
              </div>
              <button
                className="navbar-toggler ms-2 me-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-default2"
                aria-controls="navbar-default2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
          <div className="collapse navbar-collapse justify-content-center" id="navbar-default2">
            <ul className="navbar-nav mx-1 text-center">
              <li className="nav-item mx-2">
                <Link className="nav-link text-white" to="/main">
                  Inicio
                  </Link>
              </li>
              <li className="nav-item mx-2">
                   <Link className="nav-link text-white" to="/about-us">
                  Nosotros
                  </Link>
              </li>
              <li className="nav-item mx-2">

                <Link className="nav-link text-white" to="/sedes">Sedes</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-white" to="/help">
                  Ayuda
                  </Link>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-white " aria-current="page" href="#">Vender</a>
              </li>
              <li>
                <div className="dropdown d-none d-md-block">
                  <button
                    className="btn btn-light-primary text-white"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categoria
                    <i className="bi bi-caret-down-fill ms-2 align-middle"></i>
                  </button>
                  {/* Menu: Listado de categorias */}
                  <ul className="dropdown-menu rounded shadow-lg border-0 py-3" aria-labelledby="dropdownMenuButton1">
                    <li><a href="#" className="dropdown-item px-4 py-2">Tutorías</a></li>
                    <li><a href="#" className="dropdown-item px-4 py-2">Guías de estudio</a></li>
                    <li><a href="#" className="dropdown-item px-4 py-2">Ventas de snack</a></li>
                    <li><a href="#" className="dropdown-item px-4 py-2">Materiales</a></li>
                  </ul>
                </div>
              </li>
              {/* Iconos para movil */}
              <li className="nav-item d-lg-none mt-3">
                 <div className="d-flex justify-content-center">
                    <a href="#" className="btn btn-icon btn-dark rounded-circle bg-dark mx-2">
                        <i className="bi bi-cart2 align-middle"></i>
                    </a>
                    <a href="#" className="btn btn-icon btn-dark rounded-circle bg-dark mx-2">
                        <i className="bi bi-bell align-middle"></i>
                    </a>
                    <AuthSectionMobile />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
