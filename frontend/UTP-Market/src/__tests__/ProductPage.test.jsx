
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from '../pages/ProductPage';

describe('ProductsPage', () => {
  it('renders the products page with all components', () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Lista de productos')).toBeInTheDocument();
  });
});
