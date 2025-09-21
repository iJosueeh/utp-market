package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.AuthResponse;
import com.utp.utpmarket.models.dto.LoginRequest;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.repository.UsuarioRepository;
import com.utp.utpmarket.utils.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldLoginSuccessfullyWhenCredentialsAreValid() {
        LoginRequest loginRequest = new LoginRequest("test@utp.edu.pe", "password123");
        Usuario usuario = new Usuario();
        usuario.setEmail("test@utp.edu.pe");
        usuario.setPassword("encodedPassword"); // Contraseña ya codificada

        when(usuarioRepository.findByEmail(loginRequest.email())).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches(loginRequest.password(), usuario.getPassword())).thenReturn(true);
        when(jwtUtil.generarToken(usuario.getEmail())).thenReturn("fake.jwt.token");

        ResponseEntity<?> responseEntity = authService.loginUsuario(loginRequest);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody()).isInstanceOf(AuthResponse.class);

        AuthResponse authResponse = (AuthResponse) responseEntity.getBody();
        assert authResponse != null;
        assertThat(authResponse.token()).isEqualTo("fake.jwt.token");
    }

    @Test
    void shouldReturnUnauthorizedWhenUserNotFound() {
        LoginRequest loginRequest = new LoginRequest("nosuchuser@utp.edu.pe", "password123");

        when(usuarioRepository.findByEmail(loginRequest.email())).thenReturn(Optional.empty());

        ResponseEntity<?> responseEntity = authService.loginUsuario(loginRequest);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(responseEntity.getBody()).isEqualTo("Credenciales inválidas");

        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(jwtUtil, never()).generarToken(anyString());
    }

    @Test
    void shouldReturnUnauthorizedWhenPasswordIsIncorrect() {
        LoginRequest loginRequest = new LoginRequest("test@utp.edu.pe", "wrongPassword");
        Usuario usuario = new Usuario();
        usuario.setEmail("test@utp.edu.pe");
        usuario.setPassword("encodedPassword");

        when(usuarioRepository.findByEmail(loginRequest.email())).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches(loginRequest.password(), usuario.getPassword())).thenReturn(false);

        ResponseEntity<?> responseEntity = authService.loginUsuario(loginRequest);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(responseEntity.getBody()).isEqualTo("Credenciales inválidas");

        verify(jwtUtil, never()).generarToken(anyString());
    }
}
