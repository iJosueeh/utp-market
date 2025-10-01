
package com.utp.utpmarket.models.dto;

public record ProductoRequest(
    String nombre,
    Double precio,
    Long categoryId,
    String image,
    String isNew
) {}
