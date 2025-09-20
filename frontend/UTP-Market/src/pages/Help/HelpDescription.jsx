import helpImage from "../../assets/img_M/CentroAyuda.png"; 

export default function HelpCenter() {
  return (
    <section className="container py-5 my-5">
      <div className="row align-items-center">
        
        {/* Texto */}
<div className="col-md-6">
  <h2 className="fw-bold text-uppercase mb-4">Centro de Ayuda</h2>
  <p className="text-white me-5 " style={{ textAlign: "justify" }}>
    Bienvenido a nuestro Centro de Ayuda. Aquí encontrarás todo lo que necesitas para resolver tus dudas de manera rápida y sencilla. 
    En la primera sección podrás consultar las Preguntas Frecuentes, con respuestas a las consultas más comunes. 
    Si no encuentras lo que buscas o necesitas atención personalizada, en la segunda sección tendrás a tu disposición nuestro canal de Contacto con Soporte.
  </p>
</div>


        {/* Imagen */}
        <div className="col-md-6 text-center ">
          <img
            src={helpImage}
            alt="Centro de Ayuda"
            className="img-fluid shadow"
            style={{ maxHeight: 400, objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
