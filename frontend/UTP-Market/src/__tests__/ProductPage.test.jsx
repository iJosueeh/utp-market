import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Import vi
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from '../pages/ProductPage';
import { UserProvider } from '../context/UserContext';
import * as productService from '../services/productService'; // Import productService

// Mock the productService module
vi.mock('../services/productService', () => ({
  getProductos: vi.fn(() => Promise.resolve([
    { id: 1, nombre: 'Mock Product 1', price: 100, category: 'Category A', image: 'mock-image-1.jpg' },
    { id: 2, nombre: 'Mock Product 2', price: 200, category: 'Category B', image: 'mock-image-2.jpg' },
  ])),
  getCategorias: vi.fn(() => Promise.resolve([
    { id: 1, nombre: 'Category A' },
    { id: 2, nombre: 'Category B' },
  ])),
}));

describe('ProductsPage', () => {
  it('renders the products page with all components', async () => { // Added async
    render(
      <MemoryRouter>
        <UserProvider>
          <ProductsPage />
        </UserProvider>
      </MemoryRouter>
    );

    // Wait for the mocked API calls to resolve and the components to render
    await screen.findByText('Mock Product 1'); // Still wait for a product to appear
    // Use findAllByText for categories as there are multiple elements with 'Category A'
    const categoryAElements = await screen.findAllByText('Category A');
    expect(categoryAElements.length).toBeGreaterThan(0);

    expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Lista de productos')).toBeInTheDocument();
    expect(screen.getByText('Mock Product 1')).toBeInTheDocument();
    expect(screen.getByText('Mock Product 2')).toBeInTheDocument();
    // Assert that at least one 'Category B' is rendered
    const categoryBElements = await screen.findAllByText('Category B');
    expect(categoryBElements.length).toBeGreaterThan(0);
  });
});