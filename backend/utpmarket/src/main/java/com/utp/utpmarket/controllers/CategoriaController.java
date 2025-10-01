
package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.entity.Categoria;
import com.utp.utpmarket.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controlador para gestionar las categorías.
 */
@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    /**
     * Obtiene todas las categorías.
     *
     * @return una lista de todas las categorías.
     */
    @GetMapping
    public List<Categoria> getAll() {
        return categoriaService.findAll();
    }
}
