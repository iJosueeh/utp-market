import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import Sedes from '../pages/features/sedes/Sedes';

// Mock a los componentes Navbar y Footer
vi.mock('../../../components/common/Navbar', () => ({
  default: () => <nav>Navbar</nav>
}));
vi.mock('../../../components/common/Footer', () => ({
  default: () => <footer>Footer</footer>
}));

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <UserProvider>
        {ui}
      </UserProvider>
    </MemoryRouter>
  );
};

describe('Sedes', () => {
  test('renders the main title', () => {
    renderWithProviders(<Sedes />);
    const titleElement = screen.getByText(/Nuestras Sedes/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders all sede cards', () => {
    renderWithProviders(<Sedes />);
    const main = screen.getByRole('main');
    const sedeCards = within(main).getAllByRole('heading', { level: 5 });
    expect(sedeCards).toHaveLength(5);
  });

  test('renders sede names correctly', () => {
    renderWithProviders(<Sedes />);
    expect(screen.getByText('Sede Norte')).toBeInTheDocument();
    expect(screen.getByText('Sede Lima Centro')).toBeInTheDocument();
    expect(screen.getByText('Sede Lima Sur')).toBeInTheDocument();
    expect(screen.getByText('Sede San Juan de Lurigancho')).toBeInTheDocument();
    expect(screen.getByText('Sede Ate')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = renderWithProviders(<Sedes />);
    expect(asFragment()).toMatchSnapshot();
  });
});