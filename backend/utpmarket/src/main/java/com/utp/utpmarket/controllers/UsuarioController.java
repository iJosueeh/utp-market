package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.SolicitudPerfilActualizado;
import com.utp.utpmarket.models.dto.RespuestaPerfil;
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
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardar(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.actualizar(id, usuario)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        return usuarioService.eliminarPorId(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/perfil")
    public ResponseEntity<RespuestaPerfil> getPerfil(Authentication authentication) {
        String email = authentication.getName();
        return usuarioService.buscarPorEmail(email)
                .map(usuario -> ResponseEntity.ok(
                        new RespuestaPerfil(
                                usuario.getNombre(),
                                usuario.getApellidos(),
                                usuario.getTelefono(),
                                usuario.getEmail()
                        )
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/perfil")
    public ResponseEntity<RespuestaPerfil> actualizarPerfil(
            Authentication authentication,
            @RequestBody SolicitudPerfilActualizado request) {
        String email = authentication.getName();
        return usuarioService.actualizarPerfil(email, request)
                .map(actualizado -> ResponseEntity.ok(
                        new RespuestaPerfil(
                                actualizado.getNombre(),
                                actualizado.getApellidos(),
                                actualizado.getTelefono(),
                                actualizado.getEmail()
                        )
                ))
                .orElse(ResponseEntity.notFound().build());
    }
}