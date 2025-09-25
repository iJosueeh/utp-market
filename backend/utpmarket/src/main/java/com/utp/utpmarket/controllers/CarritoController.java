package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.entity.CarritoItem;
import com.utp.utpmarket.services.CarritoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrito")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    @PostMapping("/add")
    public CarritoItem addProducto(@RequestBody CarritoItem item) {
        return carritoService.addProducto(item);
    }
    @DeleteMapping("/remove/{id}")
    public void removeProducto(@PathVariable Long id) {
        carritoService.removeProducto(id);
    }

    @GetMapping
    public List<CarritoItem> listarProductos() {
        return carritoService.listarProductos();
    }
}
