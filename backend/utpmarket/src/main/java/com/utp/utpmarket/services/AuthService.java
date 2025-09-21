package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.AuthResponse;
import com.utp.utpmarket.models.dto.LoginRequest;
import com.utp.utpmarket.models.dto.RegisterRequest;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.repository.UsuarioRepository;
import com.utp.utpmarket.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public ResponseEntity<?> registrarUsuario(RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El Email ya esta registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre());
        usuario.setApellido(request.apellido());
        usuario.setTelefono(request.telefono());
        usuario.setEmail(request.email());
        usuario.setPassword(passwordEncoder.encode(request.password()));

        usuarioRepository.save(usuario);

        String token = jwtUtil.generarToken(usuario.getEmail());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    public ResponseEntity<?> loginUsuario(LoginRequest request) {
        return usuarioRepository.findByEmail(request.email())
                .map(usuario -> {
                    if (!passwordEncoder.matches(request.password(), usuario.getPassword())) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
                    }
                    String token = jwtUtil.generarToken(usuario.getEmail());
                    return ResponseEntity.ok(new AuthResponse(token));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));
    }

}
