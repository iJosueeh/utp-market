package com.utp.utpmarket.services;

import com.utp.utpmarket.exceptions.EmailAlreadyExistsException;
import com.utp.utpmarket.exceptions.InvalidCredentialsException;
import com.utp.utpmarket.models.dto.RespuestaAuth;
import com.utp.utpmarket.models.dto.SolicitudLogin;
import com.utp.utpmarket.models.dto.SolicitudRegistro;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Servicio para la autenticación y registro de usuarios.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * Registra un nuevo usuario en el sistema.
     *
     * @param request la solicitud de registro que contiene los datos del nuevo usuario.
     * @return una RespuestaAuth que contiene el token JWT para el usuario registrado.
     * @throws EmailAlreadyExistsException si el email proporcionado ya está registrado.
     */
    public RespuestaAuth registrarUsuario(SolicitudRegistro request) {
        usuarioService.buscarPorEmail(request.email()).ifPresent(u -> {
            throw new EmailAlreadyExistsException("El Email ya esta registrado");
        });

        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre());
        usuario.setApellidos(request.apellidos());
        usuario.setTelefono(request.telefono());
        usuario.setEmail(request.email());
        usuario.setPassword(passwordEncoder.encode(request.password()));

        Usuario savedUsuario = usuarioService.guardar(usuario);

        String token = jwtUtil.generarToken(savedUsuario.getEmail());
        return new RespuestaAuth(token);
    }

    /**
     * Autentica a un usuario en el sistema.
     *
     * @param request la solicitud de login que contiene las credenciales del usuario.
     * @return una RespuestaAuth que contiene el token JWT para el usuario autenticado.
     * @throws InvalidCredentialsException si las credenciales proporcionadas son inválidas.
     */
    public RespuestaAuth loginUsuario(SolicitudLogin request) {
        Usuario usuario = usuarioService.buscarPorEmail(request.email())
                .orElseThrow(() -> new InvalidCredentialsException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.password(), usuario.getPassword())) {
            throw new InvalidCredentialsException("Credenciales inválidas");
        }

        String token = jwtUtil.generarToken(usuario.getEmail());
        return new RespuestaAuth(token);
    }

    /**
     * Genera un token JWT para un usuario dado su nombre de usuario (email).
     *
     * @param nombreUsuario el email del usuario para el cual se generará el token.
     * @return una RespuestaAuth que contiene el token JWT.
     */
    public RespuestaAuth generarTokenParaUsuario(String nombreUsuario) {
        String token = jwtUtil.generarToken(nombreUsuario);
        return new RespuestaAuth(token);
    }

}