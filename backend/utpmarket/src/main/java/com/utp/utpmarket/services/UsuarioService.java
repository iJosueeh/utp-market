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

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final Map<Long, Usuario> usuarios = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);
    private final PasswordEncoder passwordEncoder;

    public String crearTokenReseteoPassword(String email) {
        return buscarPorEmail(email).map(usuario -> {
            String token = UUID.randomUUID().toString();
            usuario.setResetPasswordToken(token);
            usuario.setResetPasswordTokenExpiryDate(LocalDateTime.now().plusHours(1)); // Token válido por 1 hora
            usuarios.put(usuario.getId(), usuario);
            return token;
        }).orElse(null); // O lanzar una excepción si se prefiere no revelar si el email existe
    }

    public Optional<Usuario> validarTokenReseteoPassword(String token) {
        return usuarios.values().stream()
                .filter(usuario -> token.equals(usuario.getResetPasswordToken()))
                .findFirst()
                .filter(usuario -> usuario.getResetPasswordTokenExpiryDate().isAfter(LocalDateTime.now()));
    }

    public void cambiarPassword(Usuario usuario, String nuevaPassword) {
        usuario.setPassword(passwordEncoder.encode(nuevaPassword));
        usuario.setResetPasswordToken(null);
        usuario.setResetPasswordTokenExpiryDate(null);
        usuarios.put(usuario.getId(), usuario);
    }

    public List<Usuario> listarTodos() {
        return List.copyOf(usuarios.values());
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return Optional.ofNullable(usuarios.get(id));
    }

    public Usuario guardar(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setId(sequence.incrementAndGet());
        }
        usuarios.put(usuario.getId(), usuario);
        return usuario;
    }

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

    public Optional<Usuario> actualizarPerfil(String email, SolicitudPerfilActualizado request) {
        return buscarPorEmail(email).map(usuario -> {
            usuario.setNombre(request.nombre());
            usuario.setApellidos(request.apellido());
            usuario.setTelefono(request.telefono());
            usuarios.put(usuario.getId(), usuario);
            return usuario;
        });
    }

    public boolean eliminarPorId(Long id) {
        return usuarios.remove(id) != null;
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarios.values().stream()
                .filter(usuario -> email.equals(usuario.getEmail()))
                .findFirst();
    }
}