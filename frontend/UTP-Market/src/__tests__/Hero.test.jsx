import React from 'react';
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "../pages/features/hero/Hero";

describe("Hero component", () => {
  it("debe coincidir con el snapshot", () => {
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });

  it("renderiza la imagen con el alt correcto", () => {
    render(<Hero />);
    const image = screen.getByAltText(/UTP Market/i);
    expect(image).toBeInTheDocument();
  });

  it("muestra el subtítulo 'UTP - MARKET'", () => {
    render(<Hero />);
    expect(screen.getByText(/UTP - MARKET/i)).toBeInTheDocument();
  });

  it("muestra el título principal", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Tu marketplace confiable hecho por y para estudiantes UTP/i)
    ).toBeInTheDocument();
  });

  it("muestra la descripción", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Cada vez más estudiantes usan nuestra página/i)
    ).toBeInTheDocument();
  });

  it("renderiza los botones correctamente", () => {
    render(<Hero />);
    expect(
      screen.getByRole("button", { name: /Explorar productos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Únete a la comunidad/i })
    ).toBeInTheDocument();
  });
});
