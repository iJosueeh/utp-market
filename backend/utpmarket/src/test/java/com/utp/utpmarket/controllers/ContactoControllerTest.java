package com.utp.utpmarket.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utp.utpmarket.models.dto.ContactoDto;
import com.utp.utpmarket.services.ContactoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.is;

@SpringBootTest
@AutoConfigureMockMvc
class ContactoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ContactoService contactoService;

    @Test
    void recibirMensajeContacto_conDatosValidos_debeRetornarCreated() throws Exception {
        // Given
        ContactoDto contactoDto = new ContactoDto("Test User", "test@example.com", "Test Subject", "Test Message");

        // When & Then
        mockMvc.perform(post("/api/contacto")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contactoDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.exito", is(true)))
                .andExpect(jsonPath("$.mensaje", is("Mensaje recibido correctamente.")));

        verify(contactoService).guardarMensaje(contactoDto);
    }

    @Test
    void recibirMensajeContacto_conNombreVacio_debeRetornarBadRequest() throws Exception {
        // Given
        ContactoDto contactoDto = new ContactoDto("", "test@example.com", "Test Subject", "Test Message");

        // When & Then
        mockMvc.perform(post("/api/contacto")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contactoDto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void recibirMensajeContacto_conEmailInvalido_debeRetornarBadRequest() throws Exception {
        // Given
        ContactoDto contactoDto = new ContactoDto("Test User", "not-an-email", "Test Subject", "Test Message");

        // When & Then
        mockMvc.perform(post("/api/contacto")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contactoDto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void obtenerTodosLosMensajes_debeRetornarOkYListaDeMensajes() throws Exception {
        // Given
        ContactoDto contactoDto = new ContactoDto("Test User", "test@example.com", "Test Subject", "Test Message");
        when(contactoService.obtenerTodos()).thenReturn(Collections.singletonList(contactoDto));

        // When & Then
        mockMvc.perform(get("/api/contacto"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nombre", is("Test User")))
                .andExpect(jsonPath("$[0].email", is("test@example.com")));
    }
}
