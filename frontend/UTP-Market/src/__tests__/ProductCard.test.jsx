
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from '../pages/productos/ProductCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    nombre: 'Test Product',
    precio: 100,
    image: 'https://via.placeholder.com/300x200',
    isNew: 'new',
    isWishlisted: false,
  };

  const onAddToCart = vi.fn();
  const onToggleWishlist = vi.fn();

  it('renders product information correctly', () => {
    render(
      <Router>
        <ProductCard product={product} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} />
      </Router>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('Añadir al carrito')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('calls onAddToCart when the add to cart button is clicked', () => {
    render(
      <Router>
        <ProductCard product={product} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} />
      </Router>
    );

    fireEvent.click(screen.getByText('Añadir al carrito'));
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });

  it('calls onToggleWishlist when the wishlist button is clicked', () => {
    render(
      <Router>
        <ProductCard product={product} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} />
      </Router>
    );

    fireEvent.click(screen.getByText('🤍'));
    expect(onToggleWishlist).toHaveBeenCalledWith(product);
  });

  it('shows filled heart when product is wishlisted', () => {
    const wishlistedProduct = { ...product, isWishlisted: true };
    render(
      <Router>
        <ProductCard product={wishlistedProduct} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} />
      </Router>
    );

    expect(screen.getByText('❤️')).toBeInTheDocument();
  });
});
