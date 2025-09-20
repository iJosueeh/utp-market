import React from "react";
import helpImage from "../../assets/img_M/Ayuda.png";

export default function SupportSection() {
  return (
    <section className="py-5" >
      <div className="container">
        <div className="row align-items-center">
          {/* Columna Izquierda */}
          <div className="col-md-6 text-white">
            <p className="fw-bold text-uppercase mb-2">
              ¿No encontraste tu duda arriba?
            </p>
            <h2 className="fw-bold text-dark mb-3">
              Contacta con uno de nuestros asesores
            </h2>
            <p className="mb-4">
              Puedes ponerte en contacto con uno de nuestros asesores de soporte,
              quienes estarán disponibles para ayudarte de manera rápida y
              personalizada a resolver cualquier duda o inconveniente que tengas.
            </p>
            <button className="btn btn-light text-danger fw-bold">
              Chat de Soporte
            </button>
          </div>

          {/* Columna Derecha */}
          <div className="col-md-6 text-center py-4">
            <img
              src={helpImage}
              alt="Centro de Ayuda"
              className="img-fluid rounded shadow"
              style={{ maxHeight: 400, objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
