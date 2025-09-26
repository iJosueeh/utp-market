package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.RespuestaAuth;
import com.utp.utpmarket.models.dto.SolicitudLogin;
import com.utp.utpmarket.models.dto.SolicitudRegistro;
import com.utp.utpmarket.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RespuestaAuth registrarUsuario(@Valid @RequestBody SolicitudRegistro request) {
        return authService.registrarUsuario(request);
    }

    @PostMapping("/login")
    public RespuestaAuth login(@Valid @RequestBody SolicitudLogin request) {
        return authService.loginUsuario(request);
    }

}