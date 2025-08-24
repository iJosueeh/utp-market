package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.TokenRequest;
import com.utp.utpmarket.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email){
        String token = jwtUtil.generarToken(email);
        return ResponseEntity.ok("Bearer " + token);
    }

    @PostMapping("/validar")
    public ResponseEntity<?> validateToken(@RequestBody TokenRequest request) {
        String token = request.getToken();
        String email = jwtUtil.extraerEmail(token);

        if (jwtUtil.validarToken(token, email)) {
            return ResponseEntity.ok("Token válido. Usuario: " + email);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido");
    }

    @PostMapping("/generate-token")
    public ResponseEntity<String> generateToken(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String token = jwtUtil.generarToken(email);
        return ResponseEntity.ok(token);
    }

}
