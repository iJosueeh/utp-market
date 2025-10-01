import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import UsuarioDashboard from '../pages/Usuario/UsuarioDashboard';


vi.mock('../pages/Usuario/Sidebar', () => ({ default: ({ isOpen }) => <div data-testid="sidebar">{isOpen ? 'Sidebar Open' : 'Sidebar Closed'}</div> }));
vi.mock('../pages/Usuario/DatosPersonales', () => ({ default: () => <div>Datos Personales</div> }));
vi.mock('../pages/Usuario/TusReseñas', () => ({ default: () => <div>Tus Reseñas</div> }));
vi.mock('../pages/Usuario/TusProductos', () => ({ default: () => <div>Tus Productos</div> }));
vi.mock('../pages/Usuario/Favoritos', () => ({ default: () => <div><h1>Favoritos</h1></div> }));
vi.mock('../pages/Usuario/HistorialDeCompra', () => ({ default: () => <div>Historial De Compra</div> }));
vi.mock('../pages/Usuario/EstadisticasPersonales', () => ({ default: () => <div>Estadisticas Personales</div> }));

describe('UsuarioDashboard', () => {
  const renderWithRouter = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/usuario/*" element={<UsuarioDashboard />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renderiza el Sidebar y la ruta por defecto (DatosPersonales)', () => {
    const { asFragment } = renderWithRouter(['/usuario']);
    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar Closed');
    expect(screen.getByText('Datos Personales')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('intercala el sidebar al hacer click en el botón', () => {
    renderWithRouter(['/usuario']);
    const button = screen.getByTestId('sidebar-toggle');
    
    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar Closed');

    fireEvent.click(button);

    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar Open');

    fireEvent.click(button);

    expect(screen.getByTestId('sidebar')).toHaveTextContent('Sidebar Closed');
  });

  test('renderiza el componente TusResenas en la ruta /tus-resenas', () => {
    renderWithRouter(['/usuario/tus-resenas']);
    expect(screen.getByText('Tus Reseñas')).toBeInTheDocument();
  });

  test('renderiza el componente TusProductos en la ruta /tus-productos', () => {
    renderWithRouter(['/usuario/tus-productos']);
    expect(screen.getByText('Tus Productos')).toBeInTheDocument();
  });

  test('renderiza el componente Favoritos en la ruta /favoritos', () => {
    renderWithRouter(['/usuario/favoritos']);
    expect(screen.getByRole('heading', { name: 'Favoritos' })).toBeInTheDocument();
  });

  test('renderiza el componente HistorialDeCompra en la ruta /historial-de-compra', () => {
    renderWithRouter(['/usuario/historial-de-compra']);
    expect(screen.getByText('Historial De Compra')).toBeInTheDocument();
  });

  test('renderiza el componente EstadisticasPersonales en la ruta /estadisticas-personales', () => {
    renderWithRouter(['/usuario/estadisticas-personales']);
    expect(screen.getByText('Estadisticas Personales')).toBeInTheDocument();
  });
});