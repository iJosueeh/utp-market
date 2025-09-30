package com.utp.utpmarket.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ContactoDto(
    @NotBlank(message = "El nombre no puede estar vacío.")
    String nombre,

    @NotBlank(message = "El email no puede estar vacío.")
    @Email(message = "Debe proporcionar un email válido.")
    String email,

    @NotBlank(message = "El asunto no puede estar vacío.")
    String asunto,

    @NotBlank(message = "El mensaje no puede estar vacío.")
    String mensaje
) {}
