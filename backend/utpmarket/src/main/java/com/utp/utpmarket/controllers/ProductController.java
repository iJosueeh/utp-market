package com.utp.utpmarket.controllers;

import com.utp.utpmarket.models.dto.ProductRequest;
import com.utp.utpmarket.models.dto.ProductResponse;
import com.utp.utpmarket.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products") // prefijo de la ruta
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Crear producto
    @PostMapping
    public ProductResponse create(@RequestBody ProductRequest request) {
        return productService.createProduct(request);
    }

    // Listar todos
    @GetMapping
    public List<ProductResponse> getAll() {
        return productService.getAllProducts();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ProductResponse getById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @RequestBody ProductRequest request) {
        return productService.updateProduct(id, request);
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
