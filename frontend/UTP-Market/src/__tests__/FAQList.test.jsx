import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import FAQList from '../pages/features/faq/FAQList';

afterEach(cleanup);

describe('Lista de Preguntas Frecuentes', () => {
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

  it('debería renderizar el título principal', () => {
    render(<FAQList />);
    expect(screen.getByText('Preguntas Frecuentes')).not.toBeNull();
  });

  it('debería renderizar todas las preguntas frecuentes', () => {
    render(<FAQList />);
    
    faqs.forEach(faq => {
      expect(screen.getByText(faq.question)).not.toBeNull();
    });
  });

  it('debería renderizar el número correcto de tarjetas de preguntas frecuentes', () => {
    const { container } = render(<FAQList />);
    const cards = container.querySelectorAll('.accordion-item');
    expect(cards.length).toBe(faqs.length);
  });
});