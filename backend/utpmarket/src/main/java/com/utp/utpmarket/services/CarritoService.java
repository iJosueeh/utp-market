package com.utp.utpmarket.services;

import com.utp.utpmarket.models.entity.CarritoItem;
import com.utp.utpmarket.repository.CarritoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;

    public CarritoService(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    public CarritoItem addProducto(CarritoItem item) {
        return carritoRepository.save(item);
    }

    public void removeProducto(Long id) {
        carritoRepository.deleteById(id);
    }

    public List<CarritoItem> listarProductos() {
        return carritoRepository.findAll();
    }
}
