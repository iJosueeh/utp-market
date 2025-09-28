package com.utp.utpmarket.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utp.utpmarket.models.dto.RespuestaAuth;
import com.utp.utpmarket.models.dto.SolicitudRegistro;
import com.utp.utpmarket.services.AuthService;
import com.utp.utpmarket.services.UsuarioService;
import com.utp.utpmarket.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private UsuarioService usuarioService;

    @MockBean
    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        // Configuramos el mock de JwtUtil para que devuelva un token falso
        when(jwtUtil.generarToken(anyString())).thenReturn("fake-jwt-token");

        // Configuramos el mock de AuthService para registrar y devolver un token
        when(authService.registrarUsuario(any(SolicitudRegistro.class)))
                .thenReturn(new RespuestaAuth("fake-jwt-token"));

        // Configuramos el mock de UsuarioService para buscar por email
        when(usuarioService.buscarPorEmail(anyString()))
                .thenReturn(java.util.Optional.of(new com.utp.utpmarket.models.entity.Usuario(
                        1L, "Test", "User", "987654321", Instant.now(), "test.user@utp.edu.pe", "encodedPassword", null, null
                )));
    }

    @Test
    void testShowLoginPage() throws Exception {
        mockMvc.perform(get("/login"))
                .andExpect(status().isOk())
                .andExpect(view().name("login"));
    }

    @Test
    void testShowRegisterPage() throws Exception {
        mockMvc.perform(get("/register"))
                .andExpect(status().isOk())
                .andExpect(view().name("register"));
    }

    @Test
    void deberiaProcesarRegistroYRedirigirALaApp() throws Exception {
        SolicitudRegistro solicitudRegistro = new SolicitudRegistro("Test", "User", "987654321", "test.user@utp.edu.pe", "password123");

        mockMvc.perform(post("/register")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED) // Form submission
                        .param("nombre", solicitudRegistro.nombre())
                        .param("apellidos", solicitudRegistro.apellidos())
                        .param("telefono", solicitudRegistro.telefono())
                        .param("email", solicitudRegistro.email())
                        .param("password", solicitudRegistro.password()))
                .andExpect(status().isFound()) // 302 Found
                .andExpect(redirectedUrlPattern("http://localhost:5173/auth/callback?token=*&user=*"));
    }

    @Test
    void testShowForgotPasswordPage() throws Exception {
        mockMvc.perform(get("/forgot-password"))
                .andExpect(status().isOk())
                .andExpect(view().name("forgot-password"));
    }

    @Test
    void testShowForgotPasswordSentPage() throws Exception {
        mockMvc.perform(get("/forgot-password-sent"))
                .andExpect(status().isOk())
                .andExpect(view().name("forgot-password-sent"));
    }

    @Test
    void testShowResetPasswordForm() throws Exception {
        mockMvc.perform(get("/reset-password").param("token", "test-token"))
                .andExpect(status().isOk())
                .andExpect(view().name("reset-password"))
                .andExpect(model().attribute("token", "test-token"));
    }

    @Test
    void testAccessProtectedPage_RedirectsToLogin() throws Exception {
        mockMvc.perform(get("/some-protected-page"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("http://localhost/login"));
    }
}
