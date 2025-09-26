
package com.utp.utpmarket.services;

import com.utp.utpmarket.exceptions.EmailAlreadyExistsException;
import com.utp.utpmarket.exceptions.InvalidCredentialsException;
import com.utp.utpmarket.models.dto.RespuestaAuth;
import com.utp.utpmarket.models.dto.SolicitudLogin;
import com.utp.utpmarket.models.dto.SolicitudRegistro;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.utils.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioService usuarioService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldRegisterSuccessfullyWhenEmailIsNotTaken() {
        SolicitudRegistro registerRequest = new SolicitudRegistro("Test", "User", "123456789", "test@utp.edu.pe", "password");
        Usuario usuario = new Usuario();
        usuario.setEmail(registerRequest.email());

        when(usuarioService.buscarPorEmail(registerRequest.email())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(registerRequest.password())).thenReturn("encodedPassword");
        when(usuarioService.guardar(any(Usuario.class))).thenReturn(usuario);
        when(jwtUtil.generarToken(usuario.getEmail())).thenReturn("fake.jwt.token");

        RespuestaAuth authResponse = authService.registrarUsuario(registerRequest);

        assertThat(authResponse).isNotNull();
        assertThat(authResponse.token()).isEqualTo("fake.jwt.token");
    }

    @Test
    void shouldThrowEmailAlreadyExistsExceptionWhenEmailIsTaken() {
        SolicitudRegistro registerRequest = new SolicitudRegistro("Test", "User", "123456789", "test@utp.edu.pe", "password");

        when(usuarioService.buscarPorEmail(registerRequest.email())).thenReturn(Optional.of(new Usuario()));

        assertThatThrownBy(() -> authService.registrarUsuario(registerRequest))
                .isInstanceOf(EmailAlreadyExistsException.class)
                .hasMessage("El Email ya esta registrado");
    }

    @Test
    void shouldLoginSuccessfullyWhenCredentialsAreValid() {
        SolicitudLogin loginRequest = new SolicitudLogin("test@utp.edu.pe", "password123");
        Usuario usuario = new Usuario();
        usuario.setEmail("test@utp.edu.pe");
        usuario.setPassword("encodedPassword");

        when(usuarioService.buscarPorEmail(loginRequest.email())).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches(loginRequest.password(), usuario.getPassword())).thenReturn(true);
        when(jwtUtil.generarToken(usuario.getEmail())).thenReturn("fake.jwt.token");

        RespuestaAuth authResponse = authService.loginUsuario(loginRequest);

        assertThat(authResponse).isNotNull();
        assertThat(authResponse.token()).isEqualTo("fake.jwt.token");
    }

    @Test
    void shouldThrowInvalidCredentialsExceptionWhenUserNotFound() {
        SolicitudLogin loginRequest = new SolicitudLogin("nosuchuser@utp.edu.pe", "password123");

        when(usuarioService.buscarPorEmail(loginRequest.email())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.loginUsuario(loginRequest))
                .isInstanceOf(InvalidCredentialsException.class)
                .hasMessage("Credenciales inválidas");

        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(jwtUtil, never()).generarToken(anyString());
    }

    @Test
    void shouldThrowInvalidCredentialsExceptionWhenPasswordIsIncorrect() {
        SolicitudLogin loginRequest = new SolicitudLogin("test@utp.edu.pe", "wrongPassword");
        Usuario usuario = new Usuario();
        usuario.setEmail("test@utp.edu.pe");
        usuario.setPassword("encodedPassword");

        when(usuarioService.buscarPorEmail(loginRequest.email())).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches(loginRequest.password(), usuario.getPassword())).thenReturn(false);

        assertThatThrownBy(() -> authService.loginUsuario(loginRequest))
                .isInstanceOf(InvalidCredentialsException.class)
                .hasMessage("Credenciales inválidas");

        verify(jwtUtil, never()).generarToken(anyString());
    }
}
