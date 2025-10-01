package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.ContactoDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Servicio para la gestión de mensajes de contacto en memoria.
 */
@Service
public class ContactoService {

    private final List<ContactoDto> mensajes = new CopyOnWriteArrayList<>();

    /**
     * Guarda un mensaje de contacto en la colección en memoria.
     *
     * @param contactoDto el DTO con los datos del mensaje de contacto a guardar.
     */
    public void guardarMensaje(ContactoDto contactoDto) {
        mensajes.add(contactoDto);
    }

    /**
     * Obtiene todos los mensajes de contacto guardados.
     *
     * @return una lista de todos los mensajes de contacto.
     */
    public List<ContactoDto> obtenerTodos() {
        return mensajes;
    }
}