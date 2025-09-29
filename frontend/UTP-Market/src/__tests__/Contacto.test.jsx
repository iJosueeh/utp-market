import { render, screen } from '@testing-library/react';
import ContactoForm from '../pages/features/contacto/contacto';
import { describe, it, expect } from 'vitest';

describe('ContactoForm', () => {
  it('renders the contact form', () => {
    render(<ContactoForm />);
    
    expect(screen.getByText('CONTÁCTANOS')).toBeInTheDocument();
    expect(screen.getByText('Escríbenos un mensaje')).toBeInTheDocument();
    
    expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Asunto')).toBeInTheDocument();
    expect(screen.getByLabelText('Tu Mensaje')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: 'Enviar Mensaje' })).toBeInTheDocument();
  });
});
