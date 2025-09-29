package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.ContactoDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ContactoServiceTest {

    private ContactoService contactoService;

    @BeforeEach
    void setUp() {
        contactoService = new ContactoService();
    }

    @Test
    void testGuardarYObtenerMensajes() {
        // Given: Un nuevo mensaje de contacto
        ContactoDto nuevoMensaje = new ContactoDto(
                "Juan Perez",
                "juan.perez@example.com",
                "Consulta General",
                "Este es un mensaje de prueba."
        );

        // When: Se guarda el mensaje
        contactoService.guardarMensaje(nuevoMensaje);

        // Then: La lista de mensajes no debe estar vacía y debe contener el mensaje guardado
        List<ContactoDto> mensajes = contactoService.obtenerTodos();
        assertFalse(mensajes.isEmpty(), "La lista de mensajes no debería estar vacía.");
        assertEquals(1, mensajes.size(), "La lista debería contener exactamente un mensaje.");
        assertTrue(mensajes.contains(nuevoMensaje), "La lista debería contener el mensaje que fue guardado.");
    }

    @Test
    void testObtenerTodosConListaVacia() {
        // When: Se obtienen los mensajes sin haber guardado ninguno
        List<ContactoDto> mensajes = contactoService.obtenerTodos();

        // Then: La lista de mensajes debe estar vacía
        assertTrue(mensajes.isEmpty(), "La lista de mensajes debería estar vacía inicialmente.");
    }
}
