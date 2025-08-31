export default function FAQList() {
  const faqs = [
    {
      pregunta: "¿Qué es UTP Market?",
      respuesta: "UTP Market es una plataforma creada por y para estudiantes UTP, donde puedes comprar y vender servicios, materiales, guías y más de manera segura."
    },
    {
      pregunta: "¿Quiénes pueden usar la plataforma?",
      respuesta: "La comunidad está pensada principalmente para estudiantes UTP, aunque en un futuro podría abrirse a otros usuarios verificados."
    },
    {
      pregunta: "¿Es seguro comprar y vender aquí?",
      respuesta: "Sí. Solo interactúas con estudiantes UTP, lo que genera un entorno de confianza dentro de la comunidad."
    },
    {
      pregunta: "¿Qué puedo vender en UTP Market?",
      respuesta: "Puedes vender materiales de estudio, servicios académicos, guías, apuntes, accesorios y artículos relacionados con la vida universitaria."
    },
    {
      pregunta: "¿Qué hago si tengo un problema con mi compra o venta?",
      respuesta: "Puedes reportar el caso al soporte de la plataforma desde tu perfil, y nuestro equipo te ayudará a solucionarlo."
    }
  ];

  return (
    <div className="container-fluid px-0 mt-4">
      <h2 className="mb-5 text-center text-danger">Preguntas Frecuentes</h2>

      <div className="accordion w-75 mx-auto" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""
                  } text-danger`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? "true" : "false"}
                aria-controls={`collapse${index}`}
              >
                {faq.pregunta}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                }`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.respuesta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
