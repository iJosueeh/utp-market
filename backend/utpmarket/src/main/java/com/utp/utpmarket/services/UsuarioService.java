package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.SolicitudPerfilActualizado;
import com.utp.utpmarket.models.entity.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Servicio para la gestión de usuarios en memoria.
 */
@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final Map<Long, Usuario> usuarios = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);
    private final PasswordEncoder passwordEncoder;

    /**
     * Crea un token de reseteo de contraseña para el usuario especificado.
     *
     * @param email el email del usuario.
     * @return el token de reseteo de contraseña, o null si el usuario no existe.
     */
    public String crearTokenReseteoPassword(String email) {
        return buscarPorEmail(email).map(usuario -> {
            String token = UUID.randomUUID().toString();
            usuario.setResetPasswordToken(token);
            usuario.setResetPasswordTokenExpiryDate(LocalDateTime.now().plusHours(1)); // Token válido por 1 hora
            usuarios.put(usuario.getId(), usuario);
            return token;
        }).orElse(null); // O lanzar una excepción si se prefiere no revelar si el email existe
    }

    /**
     * Valida un token de reseteo de contraseña.
     *
     * @param token el token a validar.
     * @return un Optional que contiene el usuario si el token es válido y no ha expirado.
     */
    public Optional<Usuario> validarTokenReseteoPassword(String token) {
        return usuarios.values().stream()
                .filter(usuario -> token.equals(usuario.getResetPasswordToken()))
                .findFirst()
                .filter(usuario -> usuario.getResetPasswordTokenExpiryDate().isAfter(LocalDateTime.now()));
    }

    /**
     * Cambia la contraseña de un usuario.
     *
     * @param usuario el usuario cuya contraseña se va a cambiar.
     * @param nuevaPassword la nueva contraseña.
     */
    public void cambiarPassword(Usuario usuario, String nuevaPassword) {
        usuario.setPassword(passwordEncoder.encode(nuevaPassword));
        usuario.setResetPasswordToken(null);
        usuario.setResetPasswordTokenExpiryDate(null);
        usuarios.put(usuario.getId(), usuario);
    }

    /**
     * Lista todos los usuarios.
     *
     * @return una lista inmutable de todos los usuarios.
     */
    public List<Usuario> listarTodos() {
        return List.copyOf(usuarios.values());
    }

    /**
     * Busca un usuario por su ID.
     *
     * @param id el ID del usuario a buscar.
     * @return un Optional que contiene el usuario si se encuentra, o vacío si no.
     */
    public Optional<Usuario> buscarPorId(Long id) {
        return Optional.ofNullable(usuarios.get(id));
    }

    /**
     * Guarda un usuario (crea uno nuevo o actualiza uno existente).
     *
     * @param usuario el usuario a guardar.
     * @return el usuario guardado con su ID asignado si es nuevo.
     */
    public Usuario guardar(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setId(sequence.incrementAndGet());
        }
        usuarios.put(usuario.getId(), usuario);
        return usuario;
    }

    /**
     * Actualiza los detalles de un usuario existente.
     *
     * @param id el ID del usuario a actualizar.
     * @param detallesUsuario el objeto Usuario con los detalles actualizados.
     * @return un Optional que contiene el usuario actualizado si se encuentra, o vacío si no.
     */
    public Optional<Usuario> actualizar(Long id, Usuario detallesUsuario) {
        return buscarPorId(id).map(usuarioExistente -> {
            usuarioExistente.setNombre(detallesUsuario.getNombre());
            usuarioExistente.setApellidos(detallesUsuario.getApellidos());
            usuarioExistente.setTelefono(detallesUsuario.getTelefono());
            usuarioExistente.setEmail(detallesUsuario.getEmail());
            usuarios.put(id, usuarioExistente);
            return usuarioExistente;
        });
    }

    /**
     * Actualiza el perfil de un usuario basándose en su email.
     *
     * @param email el email del usuario cuyo perfil se va a actualizar.
     * @param request la solicitud con los datos actualizados del perfil.
     * @return un Optional que contiene el usuario actualizado si se encuentra, o vacío si no.
     */
    public Optional<Usuario> actualizarPerfil(String email, SolicitudPerfilActualizado request) {
        return buscarPorEmail(email).map(usuario -> {
            usuario.setNombre(request.nombre());
            usuario.setApellidos(request.apellido());
            usuario.setTelefono(request.telefono());
            usuarios.put(usuario.getId(), usuario);
            return usuario;
        });
    }

    /**
     * Elimina un usuario por su ID.
     *
     * @param id el ID del usuario a eliminar.
     * @return true si el usuario fue eliminado, false en caso contrario.
     */
    public boolean eliminarPorId(Long id) {
        return usuarios.remove(id) != null;
    }

    /**
     * Busca un usuario por su dirección de email.
     *
     * @param email la dirección de email del usuario a buscar.
     * @return un Optional que contiene el usuario si se encuentra, o vacío si no.
     */
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarios.values().stream()
                .filter(usuario -> email.equals(usuario.getEmail()))
                .findFirst();
    }
}