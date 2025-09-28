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

@RestController
@RequestMapping("/api/contacto")
@RequiredArgsConstructor
public class ContactoController {

    private final ContactoService contactoService;

    @PostMapping
    public ResponseEntity<RespuestaGenerica> recibirMensajeContacto(@Valid @RequestBody ContactoDto contactoDto) {
        contactoService.guardarMensaje(contactoDto);
        RespuestaGenerica respuesta = new RespuestaGenerica(true, "Mensaje recibido correctamente.");
        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
    }

    @GetMapping
    public ResponseEntity<List<ContactoDto>> obtenerTodosLosMensajes() {
        List<ContactoDto> mensajes = contactoService.obtenerTodos();
        return ResponseEntity.ok(mensajes);
    }
}
