import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AUPage from '../pages/AboutUs/AUPage';
import { MemoryRouter } from 'react-router-dom';

// Mock de los componentes hijos
vi.mock('../components/common/Navbar', () => ({ default: () => <div data-testid="navbar-mock" /> }));
vi.mock('../components/common/Footer', () => ({ default: () => <div data-testid="footer-mock" /> }));
vi.mock('../pages/AboutUs/HeroAU', () => ({ default: () => <div data-testid="hero-au-mock" /> }));
vi.mock('../pages/AboutUs/PhilosophySection', () => ({ default: () => <div data-testid="philosophy-section-mock" /> }));
vi.mock('../pages/AboutUs/ObjectivesSection', () => ({ default: () => <div data-testid="objectives-section-mock" /> }));

describe('AUPage', () => {
  test('renders all child components', () => {
    render(
      <MemoryRouter>
        <AUPage />
      </MemoryRouter>
    );

    // Verificar que todos los componentes mockeados se renderizan
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('hero-au-mock')).toBeInTheDocument();
    expect(screen.getByTestId('philosophy-section-mock')).toBeInTheDocument();
    expect(screen.getByTestId('objectives-section-mock')).toBeInTheDocument();
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });
});
