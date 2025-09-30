import React, { useState } from 'react';
import apiClient from '../../../services/api'; // Importamos el cliente de API

const ContactoForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const validate = () => {
    return {
      nombre: formData.nombre.trim() === '',
      email: !/\S+@\S+\.\S+/.test(formData.email),
      asunto: formData.asunto.trim() === '',
      mensaje: formData.mensaje.trim() === ''
    };
  };

  const errors = validate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleBlur = (event) => {
    setTouched({ ...touched, [event.target.id]: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(errors).some((e) => e)) {
      setStatus({ ...status, error: "Por favor, complete todos los campos correctamente." });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      await apiClient.post('/contacto', formData);

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      setTouched({});
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
      });
      console.error("Error al enviar el formulario de contacto:", error);
    }
  };

  return (
    <div className="container py-5 my-5">
      <div className="text-center mb-5">
        <p className="text-primary fw-bold fs-2">CONTÁCTANOS</p>
        <h2 className="fw-bold fs-1">Escríbenos un mensaje</h2>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form noValidate className="p-4 shadow rounded bg-white" onSubmit={handleSubmit}>

            {/* Nombre */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${touched.nombre ? (errors.nombre ? "is-invalid" : "is-valid") : ""}`}
                id="nombre"
                placeholder="Nombre Completo"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="nombre">Nombre Completo</label>
              <div className="invalid-feedback">Por favor, ingrese su nombre completo.</div>
              <div className="valid-feedback">¡Se ve bien!</div>
            </div>

            {/* Email */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${touched.email ? (errors.email ? "is-invalid" : "is-valid") : ""}`}
                id="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="email">Correo Electrónico</label>
              <div className="invalid-feedback">Ingrese un correo electrónico válido.</div>
              <div className="valid-feedback">¡Correo válido!</div>
            </div>

            {/* Asunto (select con lista) */}
            <div className="form-floating mb-3">
              <select
                className={`form-select ${touched.asunto ? (errors.asunto ? "is-invalid" : "is-valid") : ""}`}
                id="asunto"
                value={formData.asunto}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Selecciona un asunto</option>
                <option value="Consulta General">Consulta General</option>
                <option value="Soporte Técnico">Soporte Técnico</option>
                <option value="Información de Productos">Información de Productos</option>
                <option value="Sugerencias">Sugerencias</option>
                <option value="Reclamos">Reclamos</option>
                <option value="Otro">Otro</option>
              </select>
              <label htmlFor="asunto">Asunto</label>
              <div className="invalid-feedback">Por favor, seleccione un asunto.</div>
              <div className="valid-feedback">¡Perfecto!</div>
            </div>

            {/* Mensaje */}
            <div className="form-floating mb-3">
              <textarea
                className={`form-control ${touched.mensaje ? (errors.mensaje ? "is-invalid" : "is-valid") : ""}`}
                id="mensaje"
                placeholder="Tu Mensaje"
                style={{ height: '120px' }}
                value={formData.mensaje}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              <label htmlFor="mensaje">Tu Mensaje</label>
              <div className="invalid-feedback">Por favor, escriba su mensaje.</div>
              <div className="valid-feedback">¡Mensaje listo!</div>
            </div>

            {/* Mensajes de estado */}
            {status.success && (
              <div className="alert alert-success mt-3" role="alert">
                ¡Mensaje enviado con éxito! Gracias por contactarnos.
              </div>
            )}
            {status.error && (
              <div className="alert alert-danger mt-3" role="alert">
                {status.error}
              </div>
            )}

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-danger btn-lg fw-bold" disabled={status.submitting}>
                {status.submitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactoForm;