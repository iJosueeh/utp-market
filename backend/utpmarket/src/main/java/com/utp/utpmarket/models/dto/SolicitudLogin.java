package com.utp.utpmarket.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SolicitudLogin(
        @NotBlank @Email String email,
        @NotBlank String password
) { }
