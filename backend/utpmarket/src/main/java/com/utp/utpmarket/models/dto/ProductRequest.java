package com.utp.utpmarket.models.dto;

public class ProductRequest {
    private String nombre;
    private Double precio;

    public ProductRequest() {
    }

    // Constructor con argumentos
    public ProductRequest(String nombre, Double precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
