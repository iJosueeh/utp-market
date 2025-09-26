import { render, screen } from '@testing-library/react';
import PhilosophySection from '../pages/AboutUs/PhilosophySection';

describe('PhilosophySection', () => {
  test('renders the main heading', () => {
    render(<PhilosophySection />);
    const heading = screen.getByRole('heading', { name: /nuestra identidad/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the secondary heading', () => {
    render(<PhilosophySection />);
    const heading = screen.getByRole('heading', { name: /filosofía institucional/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the vision card', () => {
    render(<PhilosophySection />);
    const visionHeading = screen.getByRole('heading', { name: /visión/i });
    const visionText = screen.getByText(/Ser la principal plataforma de compra y venta universitaria en la UTP/i);
    
    expect(visionHeading).toBeInTheDocument();
    expect(visionText).toBeInTheDocument();
  });

  test('renders the mission card', () => {
    render(<PhilosophySection />);
    const missionHeading = screen.getByRole('heading', { name: /misión/i });
    const missionText = screen.getByText(/Facilitar a los estudiantes de la UTP el acceso a productos útiles/i);

    expect(missionHeading).toBeInTheDocument();
    expect(missionText).toBeInTheDocument();
  });
});
