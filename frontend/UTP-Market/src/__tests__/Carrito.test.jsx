import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Carrito from '../pages/features/carrito/Carrito';

// Mocking react-router-dom
vi.mock('react-router-dom', () => ({
  Link: (props) => <a {...props} href={props.to}>{props.children}</a>,
}));

describe('Carrito Component', () => {
  it('should render the shopping cart with items', () => {
    render(<Carrito />);

    // Check for product names
    expect(screen.getByText('Guia de calculo I')).toBeInTheDocument();
    expect(screen.getByText('Chocotejas de oreo')).toBeInTheDocument();

    // Check for categories
    expect(screen.getByText('Guias de estudio')).toBeInTheDocument();
    expect(screen.getByText('Snack')).toBeInTheDocument();
  });

  it('should toggle trash icon on click', () => {
    render(<Carrito />);
    
    const trashButtons = screen.getAllByRole('button');
    const firstTrashButton = trashButtons.find(btn => btn.querySelector('.bi-trash'));
    const firstTrashIcon = firstTrashButton.querySelector('i');

    // Initial state
    expect(firstTrashIcon).toHaveClass('bi-trash');
    expect(firstTrashIcon).not.toHaveClass('bi-trash-fill');
    expect(firstTrashIcon.style.color).toBe('inherit');

    // Click to fill
    fireEvent.click(firstTrashButton);
    expect(firstTrashIcon).toHaveClass('bi-trash-fill');
    expect(firstTrashIcon.style.color).toBe('rgb(181, 13, 48)'); // #B50D30

    // Click to unfill
    fireEvent.click(firstTrashButton);
    expect(firstTrashIcon).toHaveClass('bi-trash');
    expect(firstTrashIcon).not.toHaveClass('bi-trash-fill');
    expect(firstTrashIcon.style.color).toBe('inherit');
  });

  it('should toggle star icon on click', () => {
    render(<Carrito />);
    
    const starButtons = screen.getAllByRole('button');
    const firstStarButton = starButtons.find(btn => btn.querySelector('.bi-star'));
    const firstStarIcon = firstStarButton.querySelector('i');

    // Initial state
    expect(firstStarIcon).toHaveClass('bi-star');
    expect(firstStarIcon).not.toHaveClass('bi-star-fill');
    expect(firstStarIcon.style.color).toBe('inherit');

    // Click to fill
    fireEvent.click(firstStarButton);
    expect(firstStarIcon).toHaveClass('bi-star-fill');
    expect(firstStarIcon.style.color).toBe('rgb(181, 13, 48)'); // #B50D30

    // Click to unfill
    fireEvent.click(firstStarButton);
    expect(firstStarIcon).toHaveClass('bi-star');
    expect(firstStarIcon).not.toHaveClass('bi-star-fill');
    expect(firstStarIcon.style.color).toBe('inherit');
  });
});
