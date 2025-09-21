package com.utp.utpmarket.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utp.utpmarket.models.dto.LoginRequest;
import com.utp.utpmarket.models.dto.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Pruebas de integración para AuthController.
 */
@SpringBootTest // Carga el contexto completo de la aplicación Spring.
@AutoConfigureMockMvc // Configura y nos permite inyectar MockMvc para hacer peticiones HTTP.
@Transactional // Asegura que cada prueba se ejecute en una transacción que se revierte al final. 
               // Esto mantiene las pruebas aisladas y evita que se afecten entre sí.
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc; // Herramienta principal para simular las peticiones HTTP.

    @Autowired
    private ObjectMapper objectMapper; // Utilidad para convertir objetos Java a JSON y viceversa.

    @Test
    void shouldRegisterUserSuccessfully() throws Exception {
        // Arrange: Preparamos los datos de prueba
        RegisterRequest registerRequest = new RegisterRequest(
                "Test",
                "User",
                "987654321",
                "test.user@utp.edu.pe",
                "password123"
        );

        // Act & Assert: Ejecutamos la petición y verificamos el resultado
        mockMvc.perform(post("/api/auth/register") // Hacemos un POST a la URL de registro
                        .contentType(MediaType.APPLICATION_JSON) // Definimos el tipo de contenido como JSON
                        .content(objectMapper.writeValueAsString(registerRequest))) // Convertimos el objeto a un string JSON
                .andExpect(status().isOk()) // Esperamos que el código de estado sea 200 OK
                .andExpect(jsonPath("$.token").isNotEmpty()); // Verificamos que la respuesta JSON tenga un campo "token" no vacío.
    }

    @Test
    void shouldReturnBadRequestForInvalidEmail() throws Exception {
        // Arrange
        RegisterRequest registerRequest = new RegisterRequest(
                "Test",
                "User",
                "987654321",
                "invalid-email@gmail.com", // Email no institucional, fallará la validación del patrón
                "password123"
        );

        // Act & Assert
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isBadRequest()) // Esperamos un código 400 Bad Request
                .andExpect(jsonPath("$.email").value("El correo debe ser institucional (@utp.edu.pe)")); // Verificamos el mensaje de error específico.
    }

    @Test
    void shouldReturnConflictWhenUserAlreadyExists() throws Exception {
        // Arrange
        RegisterRequest registerRequest = new RegisterRequest(
                "John",
                "Doe",
                "123456789",
                "john.doe@utp.edu.pe",
                "password123"
        );

        // Act 1: Realizamos el primer registro, que debería ser exitoso.
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        // Act 2 & Assert: Intentamos registrar al mismo usuario de nuevo.
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isConflict()); // Esperamos un código 409 Conflict.
    }

    // --- PRUEBAS DE LOGIN ---

    @Test
    void shouldLoginSuccessfullyWithValidCredentials() throws Exception {
        // Arrange: Primero, necesitamos un usuario registrado.
        RegisterRequest registerRequest = new RegisterRequest("loginUser", "Test", "111222333", "login.user@utp.edu.pe", "securePassword");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        // Ahora, preparamos la petición de login
        LoginRequest loginRequest = new LoginRequest("login.user@utp.edu.pe", "securePassword");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void shouldReturnUnauthorizedForInvalidPassword() throws Exception {
        // Arrange: Registramos un usuario.
        RegisterRequest registerRequest = new RegisterRequest("loginUser2", "Test", "222333444", "login.user2@utp.edu.pe", "correctPassword");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        // Preparamos la petición de login con la contraseña INCORRECTA.
        LoginRequest loginRequest = new LoginRequest("login.user2@utp.edu.pe", "wrongPassword");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized()); // Esperamos 401 Unauthorized
    }

    @Test
    void shouldReturnUnauthorizedForNonExistentUser() throws Exception {
        // Arrange: Preparamos una petición para un usuario que no existe.
        LoginRequest loginRequest = new LoginRequest("nosuchuser@utp.edu.pe", "anyPassword");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized()); // Esperamos 401 Unauthorized
    }

    @Test
    void shouldReturnBadRequestForBlankPassword() throws Exception {
        // Arrange
        LoginRequest loginRequest = new LoginRequest("some.user@utp.edu.pe", ""); // Contraseña en blanco

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isBadRequest()); // Esperamos 400 Bad Request por la validación
    }
}
