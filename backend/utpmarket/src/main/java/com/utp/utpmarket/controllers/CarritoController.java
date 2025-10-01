package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.entity.CarritoItem;
import com.utp.utpmarket.services.CarritoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para gestionar las operaciones del carrito de compras.
 */
@RestController
@RequestMapping("/carrito")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    /**
     * Agrega un producto al carrito.
     *
     * @param item el item del carrito a agregar.
     * @return el item del carrito agregado.
     */
    @PostMapping("/add")
    public CarritoItem addProducto(@RequestBody CarritoItem item) {
        return carritoService.addProducto(item);
    }

    /**
     * Elimina un producto del carrito por su ID.
     *
     * @param id el ID del item del carrito a eliminar.
     */
    @DeleteMapping("/remove/{id}")
    public void removeProducto(@PathVariable Long id) {
        carritoService.removeProducto(id);
    }

    /**
     * Lista todos los productos en el carrito.
     *
     * @return una lista de todos los items en el carrito.
     */
    @GetMapping
    public List<CarritoItem> listarProductos() {
        return carritoService.listarProductos();
    }
}