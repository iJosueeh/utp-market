import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import utpMarketLogo from '@src/assets/UTP-MARKET.png';
import registerBg from '@src/assets/background/register_bg.webp';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const password = form.elements.password.value;
        const confirmPassword = form.elements.confirmPassword.value;

        if (password !== confirmPassword) {
            form.elements.confirmPassword.setCustomValidity("Las contraseñas no coinciden.");
        } else {
            form.elements.confirmPassword.setCustomValidity("");
        }

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <div className="container-fluid vh-100 px-0">
            <div className="row h-100 g-0">
                {/* Lado izquierdo con imagen */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src={registerBg}
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
                        <div className="text-center mb-4">
                            <img
                                src={utpMarketLogo}
                                alt="UTP Market Logo"
                                style={{ width: "90px" }}
                            />
                            <h2 className="fw-bold mt-3">Regístrate</h2>
                        </div>
                        <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombres</label>
                                    <input type="text" className="form-control" id="nombre" placeholder="John" required />
                                    <div className="invalid-feedback">
                                        Por favor, ingrese su nombre.
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                    <input type="text" className="form-control" id="apellidos" placeholder="Doe" required />
                                    <div className="invalid-feedback">
                                        Por favor, ingrese sus apellidos.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="example@utp.edu.pe" required />
                                <div className="invalid-feedback">
                                    Por favor, ingrese un correo electrónico válido.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <div className="input-group has-validation">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="password"
                                        placeholder="************"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </button>
                                    <div className="invalid-feedback">
                                        Por favor, ingrese una contraseña.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                                <div className="input-group has-validation">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="************"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </button>
                                    <div className="invalid-feedback">
                                        Las contraseñas no coinciden o el campo está vacío.
                                    </div>
                                </div>
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