package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.ProductRequest;
import com.utp.utpmarket.models.dto.ProductResponse;
import com.utp.utpmarket.models.entity.Product;
import com.utp.utpmarket.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    
    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product(request.getNombre(), request.getPrecio());
        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto con ID " + id + " no encontrado"));
        return mapToResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto con ID " + id + " no encontrado"));
        product.setNombre(request.getNombre());
        product.setPrecio(request.getPrecio());
        Product updated = productRepository.save(product);
        return mapToResponse(updated);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Producto con ID " + id + " no encontrado");
        }
        productRepository.deleteById(id);
    }

    private ProductResponse mapToResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getNombre(),
                product.getPrecio()
        );
    }
}
