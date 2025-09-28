package com.utp.utpmarket.models.dto;

import jakarta.validation.constraints.NotBlank;

public record SolicitudPerfilActualizado(
        @NotBlank String nombre,
        @NotBlank String apellido,
        @NotBlank String telefono
) { }
