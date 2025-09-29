package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.ContactoDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class ContactoService {

    private final List<ContactoDto> mensajes = new CopyOnWriteArrayList<>();

    public void guardarMensaje(ContactoDto contactoDto) {
        mensajes.add(contactoDto);
    }

    public List<ContactoDto> obtenerTodos() {
        return mensajes;
    }
}
