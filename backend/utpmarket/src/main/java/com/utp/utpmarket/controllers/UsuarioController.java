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

/**
 * Controlador para gestionar las operaciones relacionadas con los usuarios.
 */
@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    /**
     * Lista todos los usuarios registrados.
     *
     * @return una lista de objetos Usuario.
     */
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarTodos();
    }

    /**
     * Busca un usuario por su ID.
     *
     * @param id el ID del usuario a buscar.
     * @return un ResponseEntity con el usuario encontrado o un estado 404 si no se encuentra.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea un nuevo usuario.
     *
     * @param usuario el objeto Usuario a crear.
     * @return el usuario creado.
     */
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardar(usuario);
    }

    /**
     * Actualiza un usuario existente por su ID.
     *
     * @param id el ID del usuario a actualizar.
     * @param usuario el objeto Usuario con los datos actualizados.
     * @return un ResponseEntity con el usuario actualizado o un estado 404 si no se encuentra.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.actualizar(id, usuario)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Elimina un usuario por su ID.
     *
     * @param id el ID del usuario a eliminar.
     * @return un ResponseEntity con estado 204 (No Content) si se elimina, o 404 (Not Found) si no se encuentra.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        return usuarioService.eliminarPorId(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    /**
     * Obtiene el perfil del usuario autenticado.
     *
     * @param authentication el objeto de autenticación que contiene los detalles del usuario.
     * @return un ResponseEntity con el perfil del usuario o un estado 404 si no se encuentra.
     */
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

    /**
     * Actualiza el perfil del usuario autenticado.
     *
     * @param authentication el objeto de autenticación que contiene los detalles del usuario.
     * @param request la solicitud con los datos actualizados del perfil.
     * @return un ResponseEntity con el perfil actualizado o un estado 404 si no se encuentra.
     */
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