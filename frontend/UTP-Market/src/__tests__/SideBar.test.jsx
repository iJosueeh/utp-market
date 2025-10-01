
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SideBar from '../pages/productos/SideBar';

describe('SideBar', () => {
  const categories = ['Category 1', 'Category 2'];
  const onFilter = vi.fn();
  const onSort = vi.fn();

  it('renders categories and sort options', () => {
    render(
      <SideBar
        categories={categories}
        onFilter={onFilter}
        onSort={onSort}
        activeCategory="all"
        sortValue="default"
      />
    );

    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('Ordenar por')).toBeInTheDocument();
  });

  it('calls onFilter when a category button is clicked', () => {
    render(
      <SideBar
        categories={categories}
        onFilter={onFilter}
        onSort={onSort}
        activeCategory="all"
        sortValue="default"
      />
    );

    fireEvent.click(screen.getByText('Category 1'));
    expect(onFilter).toHaveBeenCalledWith('Category 1');
  });

  it('calls onSort when the sort select is changed', () => {
    render(
      <SideBar
        categories={categories}
        onFilter={onFilter}
        onSort={onSort}
        activeCategory="all"
        sortValue="default"
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'price-asc' } });

    expect(onSort).toHaveBeenCalledWith('price-asc');
  });

  it('calls onFilter and onSort when the clear filters button is clicked', () => {
    render(
      <SideBar
        categories={categories}
        onFilter={onFilter}
        onSort={onSort}
        activeCategory="Category 1"
        sortValue="price-asc"
      />
    );

    fireEvent.click(screen.getByText('Limpiar filtros'));
    expect(onFilter).toHaveBeenCalledWith('all');
    expect(onSort).toHaveBeenCalledWith('default');
  });
});
