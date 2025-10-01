package com.utp.utpmarket.services;

import com.utp.utpmarket.models.entity.CarritoItem;
import com.utp.utpmarket.repository.CarritoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio para la gestión de items en el carrito de compras.
 */
@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;

    public CarritoService(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    /**
     * Agrega un producto al carrito.
     *
     * @param item el item del carrito a agregar.
     * @return el item del carrito agregado.
     */
    public CarritoItem addProducto(CarritoItem item) {
        return carritoRepository.save(item);
    }

    /**
     * Elimina un producto del carrito por su ID.
     *
     * @param id el ID del item del carrito a eliminar.
     */
    public void removeProducto(Long id) {
        carritoRepository.deleteById(id);
    }

    /**
     * Lista todos los productos en el carrito.
     *
     * @return una lista de todos los items en el carrito.
     */
    public List<CarritoItem> listarProductos() {
        return carritoRepository.findAll();
    }
}