import React, { useState } from 'react';
import { Link } from "react-router-dom";
import utpMarketLogo from '../assets/UTP-Market.png';
import loginBg from '../assets/background/login_bg.webp';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [validated, setValidated] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className="container-fluid vh-100 px-0">
            <div className="row h-100 g-0">

                {/* Imagen izquierda */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src={loginBg}
                        alt="UTP Market Login Background"
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Formulario lado derecho */}
                <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
                    <div className="w-75" style={{ maxWidth: "400px" }}>

                        {/* Encabezado */}
                        <div className="text-center mb-4">
                            <img
                                src={utpMarketLogo}
                                alt="UTP Market Logo"
                                style={{ width: "90px" }}
                            />
                            <h2 className="fw-bold mt-3">Iniciar Sesión</h2>
                            <p className="text-muted">Accede a tu cuenta de UTP Market</p>
                        </div>

                        {/* Formulario */}
                        <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="InputEmail" className="form-label">Correo institucional</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="InputEmail"
                                    placeholder="example@utp.edu.pe"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Por favor, ingrese un correo electrónico válido.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InputPassword" className="form-label">Contraseña</label>
                                <div className="input-group has-validation">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="InputPassword"
                                        placeholder="************"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePassword}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </button>
                                    <div className="invalid-feedback">
                                        Por favor, ingrese su contraseña.
                                    </div>
                                </div>
                                <p className="mt-1 text-secondary small">
                                    Debe tener al menos 8 caracteres, con letras, números y símbolos.
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                {/* Link izquierda */}
                                <Link to="/forgot-password" className="text-decoration-none">
                                    ¿Olvidaste tu contraseña?
                                </Link>

                                {/* Checkbox derecha */}
                                <div className="form-check m-0">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Recordarme
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-danger w-100">Iniciar Sesión</button>
                        </form>

                        {/* Separador */}
                        <hr className="my-4" />

                        {/* Link de registro */}
                        <p className="text-center">
                            ¿Aún no tienes una cuenta? <Link to="/register" className="text-danger fw-bold">Regístrate aquí</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;