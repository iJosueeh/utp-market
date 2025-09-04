import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import utpMarketLogo from '@src/assets/UTP-Market.png';

const ResetPasswordPage = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className='container-fluid vh-100 px-0' style={{ backgroundColor: '#F2F4F8' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <div className="text-center mb-4">
                <img
                  src={utpMarketLogo}
                  alt="UTP Market Logo"
                  style={{ width: "90px" }}
                />
                <h2 className="fw-bold mt-3">Recuperar Contraseña</h2>
                <p className="text-muted">Ingresa tu correo institucional para recibir instrucciones</p>
              </div>

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
                <button type="submit" className="btn btn-danger w-100">Enviar</button>
              </form>
              <div className="text-center mt-3">
                <Link to="/" className="btn btn-outline-secondary w-100"><i className="bi bi-arrow-left"></i> Volver al inicio</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage;
