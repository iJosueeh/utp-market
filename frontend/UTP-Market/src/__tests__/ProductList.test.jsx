
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductList from '../pages/productos/ProductList';

describe('ProductList', () => {
  const products = [
    {
      id: 1,
      name: 'Test Product 1',
      price: 100,
      category: 'Category 1',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      name: 'Test Product 2',
      price: 200,
      category: 'Category 2',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  it('renders a list of products', () => {
    render(<ProductList products={products} />);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Mostrando 2 productos')).toBeInTheDocument();
  });

  it('shows a message when there are no products', () => {
    render(<ProductList products={[]} />);

    expect(screen.getByText('No hay productos disponibles')).toBeInTheDocument();
  });

  it('adds a product to the cart', () => {
    render(<ProductList products={products} />);

    const buttons = screen.getAllByText('Agregar al carrito');
    fireEvent.click(buttons[0]);

    expect(screen.getByText('Carrito: 1 | Wishlist: 0')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1 añadido al carrito 🛒')).toBeInTheDocument();
  });

  it('adds a product to the wishlist', () => {
    render(<ProductList products={products} />);

    const buttons = screen.getAllByText('🤍');
    fireEvent.click(buttons[0]);

    expect(screen.getByText('Carrito: 0 | Wishlist: 1')).toBeInTheDocument();
  });
});
