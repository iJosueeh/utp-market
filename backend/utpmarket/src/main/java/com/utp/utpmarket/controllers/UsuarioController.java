package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.PerfilActualizadoRequest;
import com.utp.utpmarket.models.dto.PerfilResponse;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.crearUsuario(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        try {
            return ResponseEntity.ok(usuarioService.actualizarUsuario(id, usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/perfil")
    public ResponseEntity<PerfilResponse> getPerfil(Authentication authentication) {
        String email = authentication.getName();
        return usuarioService.buscarPorEmail(email)
                .map(usuario -> ResponseEntity.ok(
                        new PerfilResponse(
                                usuario.getNombre(),
                                usuario.getApellido(),
                                usuario.getTelefono(),
                                usuario.getEmail()
                        )
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/perfil")
    public ResponseEntity<PerfilResponse> actualizarPerfil(
            Authentication authentication,
            @RequestBody PerfilActualizadoRequest request) {
        String email = authentication.getName();
        try {
            Usuario actualizado = usuarioService.actualizarPerfil(email, request);
            return ResponseEntity.ok(
                    new PerfilResponse(
                            actualizado.getNombre(),
                            actualizado.getApellido(),
                            actualizado.getTelefono(),
                            actualizado.getEmail()
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
