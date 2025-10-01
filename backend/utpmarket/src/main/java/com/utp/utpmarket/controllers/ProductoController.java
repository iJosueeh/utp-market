
package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.ProductoRequest;
import com.utp.utpmarket.models.dto.ProductoResponse;
import com.utp.utpmarket.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para gestionar los productos.
 */
@RestController
@RequestMapping("/api/productos") // prefijo de la ruta
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    /**
     * Crea un nuevo producto.
     *
     * @param request los datos del producto a crear.
     * @return el producto creado.
     */
    @PostMapping
    public ProductoResponse create(@RequestBody ProductoRequest request) {
        return productoService.createProducto(request);
    }

    /**
     * Obtiene todos los productos.
     *
     * @return una lista de todos los productos.
     */
    @GetMapping
    public List<ProductoResponse> getAll() {
        return productoService.getAllProductos();
    }

    /**
     * Busca un producto por su ID.
     *
     * @param id el ID del producto a buscar.
     * @return el producto encontrado.
     */
    @GetMapping("/{id}")
    public ProductoResponse getById(@PathVariable Long id) {
        return productoService.getProductoById(id);
    }

    /**
     * Actualiza un producto existente.
     *
     * @param id el ID del producto a actualizar.
     * @param request los nuevos datos del producto.
     * @return el producto actualizado.
     */
    @PutMapping("/{id}")
    public ProductoResponse update(@PathVariable Long id, @RequestBody ProductoRequest request) {
        return productoService.updateProducto(id, request);
    }

    /**
     * Elimina un producto por su ID.
     *
     * @param id el ID del producto a eliminar.
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productoService.deleteProducto(id);
    }
}
