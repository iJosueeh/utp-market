import FAQCard from "./FAQCard";

export default function FAQList() {
  const faqs = [
    {
      question: "¿Qué es UTP Market?",
      answer: "UTP Market es una plataforma creada por y para estudiantes UTP, donde puedes comprar y vender servicios, materiales, guías y más de manera segura."
    },
    {
      question: "¿Cómo puedo publicar un producto?",
      answer: "Debes registrarte con tu correo UTP, ir a 'Publicar' y completar el formulario."
    },
    {
      question: "¿La plataforma cobra comisión?",
      answer: "No, UTP Market es completamente gratuito para los estudiantes."
    },
    {
      question: "¿Cómo me comunico con un vendedor?",
      answer: "Cada publicación tiene un botón de contacto que abre el chat con el vendedor."
    },
    {
      question: "¿Qué tipo de productos puedo vender?",
      answer: "Puedes vender materiales, guías, accesorios, ropa, tecnología y más."
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
