import React from 'react';
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Emprendimiento from "../pages/features/Materiales/Emprendimiento";


vi.mock("../../../assets/img_M/tutoria.jpg", () => ({ default: "tutoria.jpg" }));
vi.mock("../../../assets/img_M/guias.jpg", () => ({ default: "guias.jpg" }));
vi.mock("../../../assets/img_M/ventas.jpg", () => ({ default: "ventas.jpg" }));
vi.mock("../../../assets/img_M/mt.jpg", () => ({ default: "mt.jpg" }));

describe("Emprendimiento component", () => {
  it("renderiza el título principal", () => {
    render(<Emprendimiento />);
    expect(screen.getByRole('heading', { name: /Emprendimientos estudiantiles/i, level: 2 })).toBeInTheDocument();
  });

  it("renderiza las cuatro tarjetas de emprendimiento", () => {
    const { container } = render(<Emprendimiento />);
    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBe(4);

    const titles = ['Tutorías', 'Guías de estudio', 'Ventas de snack', 'Materiales'];
    titles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("abre el modal con la información correcta al hacer clic en 'Más Información'", () => {
    render(<Emprendimiento />);
    
    const tutoriaCard = screen.getByText(/Tutorías/).closest('.card');
    const masInfoButton = within(tutoriaCard).getByRole('button', { name: /Más Información →/i });
    fireEvent.click(masInfoButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText('Tutorías')).toBeInTheDocument();
  });

  it("cierra el modal al hacer clic en el botón de cierre del header", async () => {
    render(<Emprendimiento />);
    
    const masInfoButton = screen.getAllByRole('button', { name: /Más Información →/i })[0];
    fireEvent.click(masInfoButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
