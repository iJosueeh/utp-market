import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import UsuarioDashboard from '../pages/Usuario/UsuarioDashboard';

// Mock the components to isolate the test
vi.mock('../pages/Usuario/SideBar', () => ({ default: () => <div>Sidebar</div> }));
vi.mock('../pages/Usuario/DatosPersonales', () => ({ default: () => <div>Datos Personales</div> }));
vi.mock('../pages/Usuario/TusReseñas', () => ({ default: () => <div>Tus Reseñas</div> }));
vi.mock('../pages/Usuario/TusProductos', () => ({ default: () => <div>Tus Productos</div> }));
vi.mock('../pages/Usuario/Favoritos', () => ({ default: () => <div>Favoritos</div> }));
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

  test('renders Sidebar and default route (DatosPersonales)', () => {
    const { asFragment } = renderWithRouter(['/usuario']);
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Datos Personales')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders TusResenas component on /tus-resenas route', () => {
    renderWithRouter(['/usuario/tus-resenas']);
    expect(screen.getByText('Tus Reseñas')).toBeInTheDocument();
  });

  test('renders TusProductos component on /tus-productos route', () => {
    renderWithRouter(['/usuario/tus-productos']);
    expect(screen.getByText('Tus Productos')).toBeInTheDocument();
  });

  test('renders Favoritos component on /favoritos route', () => {
    renderWithRouter(['/usuario/favoritos']);
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
  });

  test('renders HistorialDeCompra component on /historial-de-compra route', () => {
    renderWithRouter(['/usuario/historial-de-compra']);
    expect(screen.getByText('Historial De Compra')).toBeInTheDocument();
  });

  test('renders EstadisticasPersonales component on /estadisticas-personales route', () => {
    renderWithRouter(['/usuario/estadisticas-personales']);
    expect(screen.getByText('Estadisticas Personales')).toBeInTheDocument();
  });
});