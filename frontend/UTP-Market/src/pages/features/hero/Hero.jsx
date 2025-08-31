import React from 'react';
import image1 from "../../../assets/image1.webp";
const Hero = () => {
    return (
 <section className="container py-5"style={{ marginTop: "200px",marginBottom: "200px"}}>
      <div className="row align-items-center">
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img
            src={image1}
            alt="UTP Market"
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6 ps-md-5">
          <h6 className="text-danger fw-bold">UTP - MARKET</h6>
          <h1 className="fw-bold text-dark">
            Tu marketplace confiable hecho por y para estudiantes UTP
          </h1>
          <p className="text-muted fs-5 mt-3">
            Cada vez más estudiantes usan nuestra página para comprar y vender
            servicios, materiales, guías y otros recursos académicos.
          </p>

          
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-danger px-4 py-2">
              Explorar productos
            </button>
            <button className="btn btn-outline-danger px-4 py-2">
              Únete a la comunidad
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero;