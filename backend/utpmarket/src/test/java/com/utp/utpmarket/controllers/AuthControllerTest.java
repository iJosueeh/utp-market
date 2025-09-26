
package com.utp.utpmarket.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utp.utpmarket.models.dto.SolicitudLogin;
import com.utp.utpmarket.models.dto.SolicitudRegistro;
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

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UsuarioService usuarioService; // Inyectamos el servicio real

    @MockBean
    private JwtUtil jwtUtil; // Mockeamos solo la utilidad de JWT

    @BeforeEach
    void setUp() {
        // Limpiamos los usuarios antes de cada prueba para asegurar el aislamiento
        usuarioService.listarTodos().forEach(user -> usuarioService.eliminarPorId(user.getId()));
        // Configuramos el mock de JwtUtil para que devuelva un token falso
        when(jwtUtil.generarToken(anyString())).thenReturn("fake-jwt-token");
    }

    @Test
    void deberiaRegistrarUsuarioExitosamente() throws Exception {
        SolicitudRegistro solicitudRegistro = new SolicitudRegistro("Test", "User", "987654321", "test.user@utp.edu.pe", "password123");

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
