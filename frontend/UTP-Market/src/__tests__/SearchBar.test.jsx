
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '../pages/productos/SearchBar';

describe('SearchBar', () => {
  it('calls onSearch with the query when the form is submitted', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Buscar productos...');
    const button = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('test query');
  });
});
