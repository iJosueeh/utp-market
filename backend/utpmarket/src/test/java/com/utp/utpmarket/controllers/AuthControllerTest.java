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
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldRegisterUserSuccessfully() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "Test",
                "User",
                "987654321",
                "test.user@utp.edu.pe",
                "password123"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void shouldReturnBadRequestForInvalidEmail() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "Test",
                "User",
                "987654321",
                "invalid-email@gmail.com", // Email no institucional
                "password123"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.messages.email")
                        .value("El correo debe ser institucional (@utp.edu.pe)"))
                .andExpect(jsonPath("$.error").value("Bad Request"));
    }

    @Test
    void shouldReturnConflictWhenUserAlreadyExists() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "John",
                "Doe",
                "123456789",
                "john.doe@utp.edu.pe",
                "password123"
        );

        // Primer registro exitoso
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        // Segundo intento con mismo usuario
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isConflict());
    }

    @Test
    void shouldLoginSuccessfullyWithValidCredentials() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "loginUser",
                "Test",
                "111222333",
                "login.user@utp.edu.pe",
                "securePassword"
        );
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        LoginRequest loginRequest = new LoginRequest("login.user@utp.edu.pe", "securePassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void shouldReturnUnauthorizedForInvalidPassword() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "loginUser2",
                "Test",
                "222333444",
                "login.user2@utp.edu.pe",
                "correctPassword"
        );
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        LoginRequest loginRequest = new LoginRequest("login.user2@utp.edu.pe", "wrongPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldReturnUnauthorizedForNonExistentUser() throws Exception {
        LoginRequest loginRequest = new LoginRequest("nosuchuser@utp.edu.pe", "anyPassword");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldReturnBadRequestForBlankPassword() throws Exception {
        LoginRequest loginRequest = new LoginRequest("some.user@utp.edu.pe", "");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Bad Request"));
    }
}
