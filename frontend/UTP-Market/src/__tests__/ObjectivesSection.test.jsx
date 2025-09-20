import { render, screen } from '@testing-library/react';
import ObjectivesSection from '../pages/AboutUs/ObjectivesSection';

describe('ObjectivesSection', () => {
  test('renders the main heading', () => {
    render(<ObjectivesSection />);
    const heading = screen.getByRole('heading', { name: /objetivos/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders all objectives', () => {
    render(<ObjectivesSection />);
    const objective1 = screen.getByText(/Fomentar la reutilización de recursos/i);
    const objective2 = screen.getByText(/Garantizar seguridad y confianza/i);
    const objective3 = screen.getByText(/Crear una red de apoyo económico/i);
    const objective4 = screen.getByText(/Impulsar la innovación y el crecimiento/i);

    expect(objective1).toBeInTheDocument();
    expect(objective2).toBeInTheDocument();
    expect(objective3).toBeInTheDocument();
    expect(objective4).toBeInTheDocument();
  });

  test('renders the image', () => {
    render(<ObjectivesSection />);
    const image = screen.getByAltText(/Objetivos UTP Market/i);
    expect(image).toBeInTheDocument();
  });
});
