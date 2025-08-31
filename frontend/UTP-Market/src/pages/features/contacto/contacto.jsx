import React from 'react';

const ContactoForm = () => {
  return (
    <div className="container py-5" style={{ marginTop: "200px",marginBottom:"200px" }}>
      <div className="text-center mb-5">
        <p className="text-primary fw-bold fs-2">CONTACTANOS</p>
        <h2 className="fw-bold fs-1">Escríbenos un mensaje</h2>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form className="p-4 shadow rounded bg-white">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="nombreCompleto"
                placeholder="Nombre"
              />
              <label htmlFor="nombreCompleto">Nombre Completo</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Correo"
              />
              <label htmlFor="correo">Correo</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="sede"
                placeholder="Sede"
              />
              <label htmlFor="sede">Sede</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                id="telefono"
                placeholder="Teléfono"
              />
              <label htmlFor="telefono">Teléfono</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="descripcion"
                placeholder="Descripción"
                style={{ height: '120px' }}
              ></textarea>
              <label htmlFor="descripcion">Descripción</label>
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
