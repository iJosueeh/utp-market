// FAQList.jsx
export default function FAQList({ faqs, titulo = "Preguntas Frecuentes" }) {
  return (
    <div className="container-fluid px-0 mt-4">
      <h2 className="mb-5 fw-bold text-center text-danger">{titulo}</h2>

      <div className="accordion w-75 mx-auto" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${index !== 0 ? "collapsed" : ""} text-danger`}
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
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
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
