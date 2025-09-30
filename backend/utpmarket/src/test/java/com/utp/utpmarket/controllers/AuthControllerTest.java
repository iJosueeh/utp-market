package com.utp.utpmarket.controllers;

import com.utp.utpmarket.config.SecurityConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.utp.utpmarket.exceptions.EmailAlreadyExistsException;
import com.utp.utpmarket.exceptions.InvalidCredentialsException;
import com.utp.utpmarket.models.dto.RespuestaAuth;
import com.utp.utpmarket.models.dto.SolicitudLogin;
import com.utp.utpmarket.models.dto.SolicitudRegistro;
import com.utp.utpmarket.models.entity.Usuario;
import com.utp.utpmarket.services.AuthService;
import com.utp.utpmarket.services.UsuarioService;
import com.utp.utpmarket.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrlPattern;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class, excludeAutoConfiguration = {SecurityConfig.class, SecurityAutoConfiguration.class, UserDetailsServiceAutoConfiguration.class})
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UsuarioService usuarioService;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        when(jwtUtil.generarToken(anyString())).thenReturn("fake-jwt-token");

        // Mocking for authService.registrarUsuario()
        Set<String> registeredEmails = new HashSet<>();
        when(authService.registrarUsuario(any(SolicitudRegistro.class)))
                .thenAnswer(invocation -> {
                    SolicitudRegistro reg = invocation.getArgument(0);
                    if (registeredEmails.contains(reg.email())) {
                        throw new EmailAlreadyExistsException("El Email ya esta registrado");
                    }
                    registeredEmails.add(reg.email());
                    return new RespuestaAuth("fake-jwt-token");
                });

        // Mocking for authService.loginUsuario()
        when(authService.loginUsuario(any(SolicitudLogin.class)))
                .thenAnswer(invocation -> {
                    SolicitudLogin login = invocation.getArgument(0);
                    if ("login.user@utp.edu.pe".equals(login.email()) && "password123".equals(login.password())) {
                        return new RespuestaAuth("fake-jwt-token");
                    } else if ("nosuchuser@utp.edu.pe".equals(login.email())) {
                        throw new InvalidCredentialsException("Credenciales inválidas");
                    } else if ("login.user2@utp.edu.pe".equals(login.email()) && "wrongPassword".equals(login.password())) {
                        throw new InvalidCredentialsException("Credenciales inválidas");
                    }
                    return new RespuestaAuth("fake-jwt-token"); // Default successful login
                });

        // Mocking for usuarioService.guardar()
        when(usuarioService.guardar(any(Usuario.class)))
                .thenAnswer(invocation -> {
                    Usuario user = invocation.getArgument(0);
                    user.setId(3L); // Assign a dummy ID
                    return user;
                });

        // Mocking for usuarioService.buscarPorEmail()
        when(usuarioService.buscarPorEmail("test.user@utp.edu.pe"))
                .thenReturn(Optional.of(new Usuario(1L, "Test", "User", "987654321", Instant.now(), "test.user@utp.edu.pe", "encodedPassword", null, null)));

        when(usuarioService.buscarPorEmail("login.user@utp.edu.pe"))
                .thenReturn(Optional.of(new Usuario(2L, "Login", "User", "111222333", Instant.now(), "login.user@utp.edu.pe", "encodedPassword", null, null)));

        when(usuarioService.buscarPorEmail("login.user2@utp.edu.pe"))
                .thenReturn(Optional.of(new Usuario(4L, "Login", "User", "111222333", Instant.now(), "login.user2@utp.edu.pe", "encodedPassword", null, null)));

        when(usuarioService.buscarPorEmail("nosuchuser@utp.edu.pe"))
                .thenReturn(Optional.empty());
    }

    @Test
    void deberiaRedirigirALaAppConTokenYUsuario() throws Exception {
        // Arrange: Mock the behavior of authService.generarTokenParaUsuario
        when(authService.generarTokenParaUsuario("test.user@utp.edu.pe"))
                .thenReturn(new RespuestaAuth("fake-auth-token"));

        // Mock the behavior of usuarioService.buscarPorEmail
        when(usuarioService.buscarPorEmail("test.user@utp.edu.pe"))
                .thenReturn(Optional.of(new Usuario(1L, "Test", "User", "987654321", Instant.now(), "test.user@utp.edu.pe", "encodedPassword", null, null)));

        mockMvc.perform(get("/api/auth/redirect-to-app")
                        .param("username", "test.user@utp.edu.pe"))
                .andExpect(status().isFound()) // 302 Found
                .andExpect(redirectedUrlPattern("http://localhost:5173/auth/callback?token=*&user=*"));
    }

    @Test
    void deberiaRegistrarUsuarioExitosamente() throws Exception {
        SolicitudRegistro solicitudRegistro = new SolicitudRegistro("New", "User", "123456789", "new.user@utp.edu.pe", "password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(solicitudRegistro)))
                .andExpect(status().isCreated()) // Esperamos 201 Created
                .andExpect(jsonPath("$.token").value("fake-jwt-token"));
    }

    @Test
    void deberiaRetornarConflictoCuandoEmailYaExiste() throws Exception {
        // Arrange: Registramos un usuario primero
        SolicitudRegistro solicitudRegistro = new SolicitudRegistro("Test", "User", "987654321", "test.user@utp.edu.pe", "password123");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(solicitudRegistro)))
                .andExpect(status().isCreated());

        // Act & Assert: Intentamos registrarlo de nuevo
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(solicitudRegistro)))
                .andExpect(status().isConflict());
    }

    @Test
    void deberiaIniciarSesionExitosamenteConCredencialesValidas() throws Exception {
        // Arrange: Registramos un usuario
        SolicitudRegistro solicitudRegistro = new SolicitudRegistro("Login", "User", "111222333", "login.user@utp.edu.pe", "password123");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(solicitudRegistro)))
                .andExpect(status().isCreated());

        SolicitudLogin solicitudLogin = new SolicitudLogin("login.user@utp.edu.pe", "password123");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(solicitudLogin)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("fake-jwt-token"));
    }

    @Test
    void deberiaRetornarNoAutorizadoParaUsuarioInexistente() throws Exception {
        SolicitudLogin solicitudLogin = new SolicitudLogin("nosuchuser@utp.edu.pe", "anyPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(solicitudLogin)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void deberiaRetornarNoAutorizadoParaPasswordIncorrecta() throws Exception {
        // Arrange: Registramos un usuario
        SolicitudRegistro solicitudRegistro = new SolicitudRegistro("Login", "User", "111222333", "login.user2@utp.edu.pe", "correctPassword");
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(solicitudRegistro)))
                .andExpect(status().isCreated());

        SolicitudLogin solicitudLogin = new SolicitudLogin("login.user2@utp.edu.pe", "wrongPassword");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(solicitudLogin)))
                .andExpect(status().isUnauthorized());
    }
}