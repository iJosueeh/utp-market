import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="container-fluid vh-100 px-0">
            <div className="row h-100 g-0">

                {/* Lado izquierdo con imagen */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="src/assets/background/register_bg.webp"
                        alt="UTP Market Background"
                        className="img-fluid w-100 h-100"
                        style={{
                            objectFit: 'cover',
                            minHeight: "100%",
                            maxHeight: "100vh"
                        }}
                    />
                </div>

                {/* Lado derecho con formulario */}
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
                    <div className="w-75" style={{ maxWidth: "400px" }}>

                        {/* Logo + título */}
                        <div className="text-center mb-4">
                            <img
                                src="src/assets/UTP-Market.png"
                                alt="UTP Market Logo"
                                style={{ width: "90px" }}
                            />
                            <h2 className="fw-bold mt-3">Regístrate</h2>
                        </div>

                        {/* Formulario */}
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombres</label>
                                    <input type="text" className="form-control" id="nombre" placeholder="John" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                    <input type="text" className="form-control" id="apellidos" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="example@utp.edu.pe" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="password" placeholder="************" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                                <input type="password" className="form-control" id="confirmPassword" placeholder="************" />
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="rememberMe" />
                                <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                            </div>
                            <button type="submit" className="btn btn-danger w-100">Registrarse</button>
                        </form>

                        {/* Enlace login */}
                        <p className="text-center mt-3">
                            ¿Ya tienes una cuenta? <Link to="/login" className="text-danger fw-bold">Iniciar Sesión</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;