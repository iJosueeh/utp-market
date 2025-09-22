import { render, screen } from '@testing-library/react';
import HeroAU from '../pages/AboutUs/HeroAU';

describe('HeroAU', () => {
  test('renders the main heading', () => {
    render(<HeroAU />);
    const heading = screen.getByRole('heading', { name: /acerca de nosotros/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the secondary heading', () => {
    render(<HeroAU />);
    const heading = screen.getByRole('heading', { name: /utp market/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the descriptive text', () => {
    render(<HeroAU />);
    const text = screen.getByText(/UTP Market es una plataforma pensada para la comunidad universitaria/i);
    expect(text).toBeInTheDocument();
  });

  test('renders the image', () => {
    render(<HeroAU />);
    const image = screen.getByAltText(/utp market/i);
    expect(image).toBeInTheDocument();
  });
});
