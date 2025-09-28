
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

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

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

    public RespuestaAuth loginUsuario(SolicitudLogin request) {
        Usuario usuario = usuarioService.buscarPorEmail(request.email())
                .orElseThrow(() -> new InvalidCredentialsException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.password(), usuario.getPassword())) {
            throw new InvalidCredentialsException("Credenciales inválidas");
        }

        String token = jwtUtil.generarToken(usuario.getEmail());
        return new RespuestaAuth(token);
    }

    public RespuestaAuth generarTokenParaUsuario(String nombreUsuario) {
        String token = jwtUtil.generarToken(nombreUsuario);
        return new RespuestaAuth(token);
    }

}
