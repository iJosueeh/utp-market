import { render, screen } from '@testing-library/react';
import ContactoForm from '../pages/features/contacto/contacto';
import { describe, it, expect } from 'vitest';

describe('ContactoForm', () => {
  it('renders the contact form', () => {
    render(<ContactoForm />);
    
    expect(screen.getByText('CONTACTANOS')).toBeInTheDocument();
    expect(screen.getByText('Escríbenos un mensaje')).toBeInTheDocument();
    
    expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo')).toBeInTheDocument();
    expect(screen.getByLabelText('Sede')).toBeInTheDocument();
    expect(screen.getByLabelText('Teléfono')).toBeInTheDocument();
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: 'Enviar Mensaje' })).toBeInTheDocument();
  });
});
