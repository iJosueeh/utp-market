
package com.utp.utpmarket.models.dto;

public record ProductoResponse(
    Long id,
    String nombre,
    Double precio,
    String category,
    String image,
    String isNew
) {}
