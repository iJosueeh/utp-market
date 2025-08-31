import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import CardProfileTeam from '../pages/features/CardProfileTeam';

describe('Componente CardProfileTeam', () => {
  beforeEach(() => {
    cleanup();
  });

  it('debería renderizar el título principal', () => {
    render(<CardProfileTeam />);
    expect(screen.getByText('Nuestro Equipo')).not.toBeNull();
  });

  it('debería renderizar todos los miembros del equipo', () => {
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

  it('debería renderizar el enlace de contacto para cada perfil', () => {
    render(<CardProfileTeam />);
    const contactLinks = screen.getAllByRole('link', { name: /Contacta a/i });
    expect(contactLinks.length).toBe(5);
  });
});