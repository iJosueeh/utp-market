import FAQCard from "./FAQCard";

export default function FAQList() {
  const faqs = [
    {
      question: "¿Qué es UTP Market?",
      answer: "UTP Market es una plataforma creada por y para estudiantes UTP, donde puedes comprar y vender servicios, materiales, guías y más de manera segura."
    },
    {
      question: "¿Quiénes pueden usar la plataforma?",
      answer: "La comunidad está pensada principalmente para estudiantes UTP, aunque en un futuro podría abrirse a otros usuarios verificados."
    },
    {
      question: "¿Es seguro comprar y vender aquí?",
      answer: "Sí. Solo interactúas con estudiantes UTP, lo que genera un entorno de confianza dentro de la comunidad."
    },
    {
      question: "¿Qué puedo vender en UTP Market?",
      answer: "Puedes vender materiales de estudio, servicios académicos, guías, apuntes, accesorios y artículos relacionados con la vida universitaria."
    },
    {
      question: "¿Qué hago si tengo un problema con mi compra o venta?",
      answer: "Puedes reportar el caso al soporte de la plataforma desde tu perfil, y nuestro equipo te ayudará a solucionarlo."
    }
  ];

  return (
    <div className="ccontainer-fluid px-0 mt-4">
      <h2 className="mb-5 text-center text-danger " >Preguntas Frecuentes</h2>
      {faqs.map((faq, index) => (
        <FAQCard key={index} question={faq.question} answer={faq.answer} />
      ))} 
    </div>
  );
}
