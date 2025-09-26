export default function PhilosophySection() {
  return (
    <section style={{ backgroundColor: "#a3002a", padding: "100px 0" }}>
      <div className="container text-center text-white">
        {/* Título */}
        <h6 className="text-uppercase fw-bold">Nuestra Identidad</h6>
        <h2 className="fw-bold mb-5">Filosofía Institucional</h2>

        {/* Tarjetas */}
        <div className="row justify-content-center g-5">
          {/* Visión */}
          <div className="col-md-5">
            <div className="bg-white text-dark p-5 rounded shadow-sm h-100">
              <h5 className="fw-bold mb-3">Visión</h5>
              <p className="mb-0">
                Ser la principal plataforma de compra y venta universitaria en la UTP,
                consolidándonos como un espacio confiable, innovador y accesible que
                promueva la colaboración y el apoyo entre estudiantes.
              </p>
            </div>
          </div>

          {/* Misión */}
          <div className="col-md-5">
            <div className="bg-white text-dark p-5 rounded shadow-sm h-100">
              <h5 className="fw-bold mb-3">Misión</h5>
              <p className="mb-0">
                Facilitar a los estudiantes de la UTP el acceso a productos útiles para su vida
                académica y personal, a través de una plataforma segura, rápida y eficiente
                que conecta a compradores y vendedores dentro de la comunidad universitaria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
