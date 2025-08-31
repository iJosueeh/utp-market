import React, { useState } from 'react';

const ContactoForm = () => {
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
    <div className="container py-5 my-5">
      <div className="text-center mb-5">
        <p className="text-primary fw-bold fs-2">CONTACTANOS</p>
        <h2 className="fw-bold fs-1">Escríbenos un mensaje</h2>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form noValidate className={`p-4 shadow rounded bg-white ${validated ? 'was-validated' : ''}`} onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="nombreCompleto"
                placeholder="Nombre"
                required
              />
              <label htmlFor="nombreCompleto">Nombre Completo</label>
              <div className="invalid-feedback">
                Por favor, ingrese su nombre completo.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Correo"
                required
              />
              <label htmlFor="correo">Correo</label>
              <div className="invalid-feedback">
                Por favor, ingrese un correo electrónico válido.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="sede"
                placeholder="Sede"
                required
              />
              <label htmlFor="sede">Sede</label>
              <div className="invalid-feedback">
                Por favor, ingrese su sede.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                id="telefono"
                placeholder="Teléfono"
                required
              />
              <label htmlFor="telefono">Teléfono</label>
              <div className="invalid-feedback">
                Por favor, ingrese su número de teléfono.
              </div>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="descripcion"
                placeholder="Descripción"
                style={{ height: '120px' }}
                required
              ></textarea>
              <label htmlFor="descripcion">Descripción</label>
              <div className="invalid-feedback">
                Por favor, ingrese una descripción.
              </div>
            </div>
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-danger btn-lg fw-bold">
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactoForm;
