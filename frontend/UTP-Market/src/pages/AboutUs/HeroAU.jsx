import React from "react";
import utpImage from "../../assets/img_M/NosotrosPage.jpg";

export default function HeroAboutUS() {
  return (
 <section className="container py-5"style={{ marginTop: "100px",marginBottom: "100px"}}>
      <div className="row align-items-center">
        {/* Imagen */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={utpImage}
            alt="UTP Market"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Texto */}
        <div className="col-md-6">
          <h5 className="text-danger text-uppercase fw-bold mb-2">
            Acerca de nosotros
          </h5>
          <h2 className="fw-bold mb-3">UTP Market</h2>
          <p className="fs-5 text-muted">
            UTP Market es una plataforma pensada para la comunidad universitaria
            que facilita la compra y venta de productos entre estudiantes. Desde
            libros hasta tecnología, ofrece un espacio seguro, rápido y confiable
            para ahorrar tiempo, compartir oportunidades y aprovechar recursos.
          </p>
        </div>
      </div>
    </section>
  );
}
