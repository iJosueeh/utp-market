import React, { useState } from "react";
import Tutoria from "../../../assets/img_M/tutoria.jpg";
import Guias from "../../../assets/img_M/guias.jpg";
import Ventas from "../../../assets/img_M/ventas.jpg";
import Material from "../../../assets/img_M/mt.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Emprendimiento() {
  const [selected, setSelected] = useState(null);
  const [validated, setValidated] = useState(false);

  const data = [
    {
      id: 1,
      titulo: "Tutorías",
      desc: "Apoyo académico entre estudiantes para reforzar materias clave.",
      img: Tutoria,
    },
    {
      id: 2,
      titulo: "Guías de estudio",
      desc: "Resúmenes y materiales hechos por estudiantes para facilitar el aprendizaje.",
      img: Guias,
    },
    {
      id: 3,
      titulo: "Ventas de snack",
      desc: "Snacks accesibles y prácticos dentro del campus.",
      img: Ventas,
    },
    {
      id: 4,
      titulo: "Materiales",
      desc: "Intercambio y venta de útiles y herramientas académicas.",
      img: Material,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      alert("Formulario enviado correctamente ✅");
      // aquí puedes manejar el envío real
    }
    setValidated(true);
  };

  return (
    <div className="container my-5">
      <h5 className="text-black text-center">MATERIALES</h5>
      <h2 className="text-center fw-bold mb-4">Emprendimientos estudiantiles</h2>

      <div className="row">
        {data.map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.img}
                alt={item.titulo}
                className="card-img-top img-fluid"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.titulo}</h5>
                <p className="card-text">{item.desc}</p>
                <button
                  className="btn btn-dark w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#infoModal"
                  onClick={() => setSelected(item)}
                >
                  Más Información →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Bootstrap puro */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex="-1"
        aria-labelledby="infoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form
              className={`needs-validation ${validated ? "was-validated" : ""}`}
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="modal-header">
                <h5 className="modal-title" id="infoModalLabel">
                  {selected?.titulo}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                <p>{selected?.desc}</p>

                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, ingresa tu nombre.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    required
                  />
                  <div className="invalid-feedback">
                    Por favor, ingresa un correo válido.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje
                  </label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    rows="3"
                    required
                  ></textarea>
                  <div className="invalid-feedback">
                    Por favor, escribe un mensaje.
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
