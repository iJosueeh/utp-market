package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.ContactoDto;
import com.utp.utpmarket.models.dto.RespuestaGenerica;
import com.utp.utpmarket.services.ContactoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para gestionar los mensajes de contacto.
 */
@RestController
@RequestMapping("/api/contacto")
@RequiredArgsConstructor
public class ContactoController {

    private final ContactoService contactoService;

    /**
     * Recibe y guarda un mensaje de contacto.
     *
     * @param contactoDto el DTO con los datos del mensaje de contacto.
     * @return un ResponseEntity con una respuesta genérica indicando el éxito de la operación.
     */
    @PostMapping
    public ResponseEntity<RespuestaGenerica> recibirMensajeContacto(@Valid @RequestBody ContactoDto contactoDto) {
        contactoService.guardarMensaje(contactoDto);
        RespuestaGenerica respuesta = new RespuestaGenerica(true, "Mensaje recibido correctamente.");
        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
    }

    /**
     * Obtiene todos los mensajes de contacto registrados.
     *
     * @return un ResponseEntity con una lista de ContactoDto.
     */
    @GetMapping
    public ResponseEntity<List<ContactoDto>> obtenerTodosLosMensajes() {
        List<ContactoDto> mensajes = contactoService.obtenerTodos();
        return ResponseEntity.ok(mensajes);
    }
}