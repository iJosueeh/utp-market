
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/common/Footer';

describe('Footer component', () => {
  test('renders copyright notice', () => {
    render(<Footer />);
    const copyrightElement = screen.getByText(/© UTP MARKET 2025. Todos los derechos reservados/i);
    expect(copyrightElement).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText(/facebook/i);
    const twitterLink = screen.getByLabelText(/twitter/i);
    const instagramLink = screen.getByLabelText(/instagram/i);

    expect(facebookLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
  });
});
