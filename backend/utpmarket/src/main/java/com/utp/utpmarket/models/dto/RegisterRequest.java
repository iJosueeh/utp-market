package com.utp.utpmarket.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RegisterRequest(
        @NotBlank String nombre,
        @NotBlank String apellido,
        @NotBlank String telefono,
        @NotBlank @Email @Pattern(regexp = "^[A-Za-z0-9._%+-]+@utp\\.edu\\.pe$", message = "El correo debe ser institucional (@utp.edu.pe)")
        String email,
        @NotBlank String password
) {}
