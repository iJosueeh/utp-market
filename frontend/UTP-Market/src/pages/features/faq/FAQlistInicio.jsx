// FAQListInicio.jsx
import FAQList from "./FAQList";

const faqsInicio = [
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

export default function FAQListInicio() {
  return <FAQList faqs={faqsInicio} />;
}
