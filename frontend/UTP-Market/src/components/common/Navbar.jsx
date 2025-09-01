import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/utpmarketlogo.png";
const Navbar = () => {
  return (
    <>
      {/* NAVBAR: wrapper principal de navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
        {/* CONTAINER: contiene a los grupos de la izquierda y derecha*/}
        <div className="container-fluid px-0">
          {/* Grupo a la izquierda, contiene el logo*/}
          <div className="d-flex">
            {/* Logo*/}
            <a className="navbar-brand ms-5" href="/">
              <img
                src={brandLogo}
                alt="Geeks high quality website templates created with Bootstrap 5."
                style={{ height: 45 }}
              />
            </a>
          </div>
          {/* Grupo a la derecha, contiene carrito de compras, boton de notificaciónes, botones de autenticación
           ( la clase "order-lg-3" lo posiciciona a la derecha) */}
          <div className="order-lg-3">
            <div className="d-flex align-items-center">
              {/* Carrito de compras (Se esconde en pantallas pequeñas)*/}
              <span className="d-none d-lg-block">
                <a href="#" className="btn btn-icon btn-dark rounded-circle bg-dark">
                  <i className="bi bi-cart2 align-middle"></i>
                </a>
              </span>
              <span className="d-none d-lg-block">
                <a href="#" className="btn btn-icon btn-dark rounded-circle bg-dark">
                  <i className="bi bi-bell align-middle"></i>
                </a>
              </span>
              {/* Boton de perfil (Visible en pantallas grandes) */}
              <Link to="/login" className="btn btn-icon btn-dark rounded-circle bg-dark me-4 d-none d-lg-block">
                <i className="bi bi-person align-middle"></i>
              </Link>
              {/* Alternador movil: alterna el colapso*/}
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
          {/* Barra de navegación con los links principales de la pagina principal (Colapsa en moviles) */}
          <div className="collapse navbar-collapse justify-content-center" id="navbar-default2">
            <ul className="navbar-nav mx-1 text-center">
              {/* Items de navegación principales*/}
              {/* Pagina de inicio */}
              <li className="nav-item mx-2">
                <a className="nav-link active text-white " aria-current="page" href="#">Inicio</a>
              </li>
              {/* Pagina de nosotros */}
              <li className="nav-item mx-2">
                <a className="nav-link text-white" href="#">Nosotros</a>
              </li>
              {/* Pagina de sedes */}
              <li className="nav-item mx-2">
                <a className="nav-link text-white " aria-current="page" href="#">Sedes</a>
              </li>
              {/* Pagina de ayuda */}
              <li className="nav-item mx-2">
                <a className="nav-link text-white " aria-current="page" href="#">Ayuda</a>
              </li>
              {/* Pagina de vender */}
              <li className="nav-item mx-2">
                <a className="nav-link text-white " aria-current="page" href="#">Vender</a>
              </li>
              <li>
                {/* Dropdown de categoria, solo se muestra en pantallas medianas o más grandes */}
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
                  <Link to="/login" className="btn btn-icon btn-dark rounded-circle bg-dark mx-2">
                    <i className="bi bi-person align-middle"></i>
                  </Link>
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