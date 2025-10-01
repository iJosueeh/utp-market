import React from "react";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";

export default function Sedes() {
  const sedes = [
    {
      id: 1,
      nombre: "Sede Norte",
      direccion: "Panamericana Norte, Av. Alfredo Mendiola 6377, Los Olivos 15306",
      telefono: "970804148",
      mapa: "https://www.google.com/maps/place/Panamericana+Norte+6377,+Los+Olivos+15306",
      imagen: "https://utp.edu.pe/sites/default/files/campus/campus-los-olivos-utp.webp"
    },
    {
      id: 2,
      nombre: "Sede Lima Centro",
      direccion: "Avenida Petit Thouars 116, Lima 15046",
      telefono: "(01) 3159600",
      mapa: "https://www.google.com/maps/place/Avenida+Petit+Thouars+116,+Lima+15046",
      imagen: "https://utp.edu.pe/sites/default/files/campus/utp-lima-centro.webp"
    },
    {
      id: 3,
      nombre: "Sede Lima Sur",
      direccion: "Ctra. Panamericana Sur km 16, Villa El Salvador 15842",
      telefono: "(01) 3159600",
      mapa: "https://www.google.com/maps/place/Panamericana+Sur+Km+16,+Villa+El+Salvador+15842",
      imagen: "https://utp.edu.pe/sites/default/files/campus/LimaSur-.webp"
    },
    {
      id: 4,
      nombre: "Sede San Juan de Lurigancho",
      direccion: "Av. Wiesse 571, San Juan de Lurigancho 15434",
      telefono: "(01) 3159600",
      mapa: "https://maps.app.goo.gl/REhYfwjyYBLGhErc6",
      imagen: "https://utp.edu.pe/sites/default/files/campus/SJL-.webp"
    },
    {
      id: 5,
      nombre: "Sede Ate",
      direccion: "Av. Carretera Central 123, Ate, Lima",
      telefono: "(01) 3159600",
      mapa: "https://maps.app.goo.gl/m6p3aiWzAuyf8mLu7",
      imagen: "https://utp.edu.pe/sites/default/files/campus/utp-sede-ate.webp"
    }
  ];

  return (
    <div className="d-flex flex-column min-vh-100">

      <Navbar />

      <main className="container my-5 flex-grow-1 pt-5">
        <h2 className="mb-5 text-center fw-bold" style={{ color: "#B50D30" }}>
           Nuestras Sedes
        </h2>

        <div className="row g-4">
          {sedes.map((sede) => (
            <div key={sede.id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100 border-0 rounded-3">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold mb-3" style={{ color: "#222" }}>
                    {sede.nombre}
                  </h5>
                  <p className="card-text mb-2">
                    <strong>Dirección:</strong> {sede.direccion}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Teléfono:</strong> {sede.telefono}
                  </p>

                  <a href={sede.mapa} target="_blank" rel="noopener noreferrer">
                    <img
                      src={sede.imagen}
                      alt={`Imagen ${sede.nombre}`}
                      className="img-fluid rounded shadow-sm"
                      style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                        width: "100%"
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
