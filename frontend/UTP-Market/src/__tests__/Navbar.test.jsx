
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import brandLogo from '../assets/utpmarketlogo.png';

describe('Componente Navbar', () => {
  it('debería renderizar el logo de la marca', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const brandLogoImg = container.querySelector('img');
    expect(brandLogoImg).toHaveAttribute('src', brandLogo);
  });

  it('debería renderizar los enlaces de navegación principales', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Inicio/i)).not.toBeNull();
    expect(screen.getByText(/Nosotros/i)).not.toBeNull();
    expect(screen.getByText(/Sedes/i)).not.toBeNull();
    expect(screen.getByText(/Ayuda/i)).not.toBeNull();
    expect(screen.getByText(/Vender/i)).not.toBeNull();
  });

  it('debería renderizar el botón de dropdown de categorías', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Categoria/i)).not.toBeNull();
  });

  it('debería renderizar los íconos de carrito, notificaciones y perfil en pantallas grandes', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const cartIcon = container.querySelector('.d-none.d-lg-block .bi-cart2');
    const bellIcon = container.querySelector('.d-none.d-lg-block .bi-bell');
    const personIcon = container.querySelector('.d-none.d-lg-block .bi-person');

    
    expect(cartIcon).not.toBeNull();
    expect(bellIcon).not.toBeNull();
    expect(personIcon).not.toBeNull();
  });

  it('debería renderizar los íconos para móvil en el menú colapsable', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const mobileIcons = container.querySelector('.d-lg-none .bi-cart2');
    expect(mobileIcons).not.toBeNull();
  });
});
