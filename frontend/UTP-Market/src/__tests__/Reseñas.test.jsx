import React from 'react';
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Resenas from "../pages/features/Materiales/Reseñas";


vi.mock("../../../assets/img_M/Persona1.jpg", () => ({ default: "Persona1.jpg" }));
vi.mock("../../../assets/img_M/Persona2.jpg", () => ({ default: "Persona2.jpg" }));
vi.mock("../../../assets/img_M/Persona3.jpg", () => ({ default: "Persona3.jpg" }));

describe("Resenas component", () => {
  it("renderiza el título principal", () => {
    render(<Resenas />);
    expect(screen.getByText(/Reseñas de estudiantes/i)).toBeInTheDocument();
  });

  it("renderiza las reseñas en el carrusel", () => {
    render(<Resenas />);

    expect(screen.getByText(/Vendí mis guías en una tarde/i)).toBeInTheDocument();
    expect(screen.getByText(/Conseguí tutorías fácilmente/i)).toBeInTheDocument();
    expect(screen.getByText(/Compré snacks en el campus y fue súper práctico/i)).toBeInTheDocument();

    expect(screen.getByText(/Valeria R./i)).toBeInTheDocument();
    expect(screen.getByText(/Carlos M./i)).toBeInTheDocument();
    expect(screen.getByText(/Ana G./i)).toBeInTheDocument();
  });

  it("renderiza las imágenes con el alt text correcto", () => {
    render(<Resenas />);
    expect(screen.getByAltText(/Valeria R./i)).toBeInTheDocument();
    expect(screen.getByAltText(/Carlos M./i)).toBeInTheDocument();
    expect(screen.getByAltText(/Ana G./i)).toBeInTheDocument();
  });
});
