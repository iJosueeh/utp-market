import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import CardProfileTeam from '../pages/features/CardProfileTeam';

describe('CardProfileTeam component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render the main title', () => {
    render(<CardProfileTeam />);
    expect(screen.getByText('Nuestro Equipo')).not.toBeNull();
  });

  it('should render all team members', () => {
    render(<CardProfileTeam />);
    const profiles = [
      "Kenny Salazar",
      "Josue Tanta",
      "Alexander Sinte",
      "Katherine Salas",
      "Ian Callirgos"
    ];

    profiles.forEach(name => {
      const elements = screen.getAllByText(name);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('should render the contact link for each profile', () => {
    render(<CardProfileTeam />);
    const contactLinks = screen.getAllByRole('link', { name: /Contacta a/i });
    expect(contactLinks.length).toBe(5);
  });
});
