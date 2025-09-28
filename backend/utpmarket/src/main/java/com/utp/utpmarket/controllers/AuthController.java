package com.utp.utpmarket.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.utp.utpmarket.models.dto.RespuestaAuth;
import com.utp.utpmarket.models.dto.SolicitudLogin;
import com.utp.utpmarket.models.dto.SolicitudRegistro;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.services.AuthService;
import com.utp.utpmarket.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.http.ResponseEntity;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UsuarioService usuarioService;
    private final ObjectMapper objectMapper;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RespuestaAuth registrarUsuario(@Valid @RequestBody SolicitudRegistro request) {
        return authService.registrarUsuario(request);
    }

    @PostMapping("/login")
    public RespuestaAuth login(@Valid @RequestBody SolicitudLogin request) {
        return authService.loginUsuario(request);
    }

    @GetMapping("/redirect-to-app")
    public ResponseEntity<Void> redirigirALaApp(@RequestParam("username") String nombreUsuario) throws JsonProcessingException, UnsupportedEncodingException {
        // Generar token
        RespuestaAuth respuestaAuth = authService.generarTokenParaUsuario(nombreUsuario);
        String token = respuestaAuth.token();

        // Obtener perfil de usuario
        Usuario perfilUsuario = usuarioService.buscarPorEmail(nombreUsuario)
                .orElseThrow(() -> new IllegalStateException("Usuario no encontrado después del login"));

        // Serializar perfil y codificar
        String perfilUsuarioString = URLEncoder.encode(objectMapper.writeValueAsString(perfilUsuario), StandardCharsets.UTF_8);
        String tokenString = URLEncoder.encode(token, StandardCharsets.UTF_8);

        // Construir la URL de redirección
        String redirectUrl = UriComponentsBuilder
                .fromUriString("http://localhost:5173/auth/callback")
                .queryParam("token", tokenString)
                .queryParam("user", perfilUsuarioString)
                .build().toUriString();

        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(redirectUrl)).build();
    }
}