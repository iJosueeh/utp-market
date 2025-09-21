package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.AuthResponse;
import com.utp.utpmarket.models.dto.LoginRequest;
import com.utp.utpmarket.models.dto.RegisterRequest;
import com.utp.utpmarket.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@Valid @RequestBody RegisterRequest request) {
        return authService.registrarUsuario(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return authService.loginUsuario(request);
    }

}
