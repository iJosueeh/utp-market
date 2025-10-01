import React from "react";
export default function Sedes() {
  const sedes = [
    {
      id: 1,
      nombre: "Sede Norte",
      direccion: "Panamericana Norte, Av. Alfredo Mendiola 6377, Los Olivos 15306",
      telefono: "970804148",
      mapa: "https://www.google.com/maps/place/Universidad+Tecnológica+del+Perú/@-11.9530276,-77.0723372,1056m/data=!3m1!1e3!4m6!3m5!1s0x9105d1d877f532d7:0x8db19fe8e1f40feb!8m2!3d-11.9528899!4d-77.070192!16s%2Fg%2F11bwqpvckg?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
    },
    {
      id: 2,
      nombre: "Sede Lima Centro",
      direccion: "Avenida Petit Thouars 116, Lima 15046",
      telefono: "(01) 3159600",
      mapa: "www.google.com/maps/place/Torre+Tecnologica+UTP+-+Sede+Hernán+Velarde/@-12.065257,-77.037297,19z/data=!4m5!3m4!1s0x9105c8ea518cc623:0xfdac3d89dfbfb056!8m2!3d-12.0653906!4d-77.0367775?shorturl=1&shorturl=1"
    },
    {
      id: 3,
      nombre: "Sede Sur",
      direccion: "Ctra. Panamericana Sur km 16, Villa EL Salvador 15842",
      telefono: "(01) 3159600",
      mapa: "https://www.google.com/maps/place/Universidad+Tecnológica+del+Perú+UTP/@-12.1936042,-76.9718558,528m/data=!3m1!1e3!4m6!3m5!1s0x9105b9a26836ac01:0x4fd233c0d43ca479!8m2!3d-12.1940306!4d-76.9714698!16s%2Fg%2F11hbqbtdnp?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center" style={{ color: "#B50D30" }}>
        📍 Nuestras Sedes
      </h2>

      <div className="row g-4">
        {sedes.map((sede) => (
          <div key={sede.id} className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#222222" }}>
                  {sede.nombre}
                </h5>
                <p className="card-text mb-1">
                  <strong>Dirección:</strong> {sede.direccion}
                </p>
                <p className="card-text mb-3">
                  <strong>Teléfono:</strong> {sede.telefono}
                </p>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={sede.mapa}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={sede.nombre}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
