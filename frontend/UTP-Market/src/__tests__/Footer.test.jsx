
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/common/Footer';

describe('Componente Footer', () => {
  test('muestra el aviso de copyright', () => {
    render(<Footer />);
    const copyrightElement = screen.getByText(/© UTP MARKET 2025. Todos los derechos reservados/i);
    expect(copyrightElement).toBeInTheDocument();
  });

  test('muestra los enlaces de las redes sociales', () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText(/facebook/i);
    const twitterLink = screen.getByLabelText(/twitter/i);
    const instagramLink = screen.getByLabelText(/instagram/i);

    expect(facebookLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
  });
});
