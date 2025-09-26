// FAQListInicio.jsx
import FAQList from "../features/faq/FAQList";

// FAQListInicio.jsx

// Array con las preguntas del centro de ayuda
const faqsAyuda = [
  {
    pregunta: "¿Cómo puedo contactar al soporte?",
    respuesta: "Puedes escribirnos directamente desde el chat de WhatsApp disponible en la plataforma. Solo haz clic en el botón de ayuda y uno de nuestros asesores te responderá."
  },
  {
    pregunta: "¿En qué horario atiende el centro de ayuda?",
    respuesta: "Nuestro equipo responde tus dudas de lunes a sábado de 9:00 a.m. a 9:00 p.m. Fuera de ese horario puedes dejar tu mensaje y lo atenderemos en cuanto estemos disponibles."
  },
  {
    pregunta: "¿Qué tipo de dudas puedo resolver en el chat?",
    respuesta: "Puedes consultar sobre compras, ventas, uso de la plataforma, problemas con tu perfil o cualquier duda general sobre UTP Market."
  },
  {
    pregunta: "¿Hay algún costo por usar el centro de ayuda?",
    respuesta: "No. El servicio de soporte y el chat de WhatsApp son totalmente gratuitos para toda la comunidad UTP."
  },
  {
    pregunta: "¿Qué hago si no responden mi consulta?",
    respuesta: "En caso de que no recibas respuesta en el chat, puedes enviar un reporte desde tu perfil en la sección 'Soporte' y un asesor se pondrá en contacto contigo."
  }
];

// Componente que renderiza la lista de FAQs de ayuda
export default function FAQListAyuda() {
  return <FAQList faqs={faqsAyuda} titulo="Preguntas Frecuentes sobre el centro de ayuda" />;
}
