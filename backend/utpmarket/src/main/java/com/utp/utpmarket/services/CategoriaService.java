
package com.utp.utpmarket.services;

import com.utp.utpmarket.models.entity.Categoria;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Servicio para la gestión de categorías en memoria.
 */
@Service
public class CategoriaService {

    private final Map<Long, Categoria> categorias = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);

    /**
     * Inicializa algunas categorías de ejemplo al iniciar el servicio.
     */
    @PostConstruct
    public void init() {
        save(new Categoria(null, "Tutorías universitarias"));
        save(new Categoria(null, "Guías de estudio"));
        save(new Categoria(null, "Ventas de snacks"));
        save(new Categoria(null, "Materiales"));
    }

    /**
     * Guarda una nueva categoría o actualiza una existente.
     *
     * @param categoria la categoría a guardar.
     * @return la categoría guardada con su ID asignado si es nueva.
     */
    public Categoria save(Categoria categoria) {
        if (categoria.getId() == null) {
            categoria.setId(sequence.incrementAndGet());
        }
        categorias.put(categoria.getId(), categoria);
        return categoria;
    }

    /**
     * Obtiene todas las categorías disponibles.
     *
     * @return una lista inmutable de todas las categorías.
     */
    public List<Categoria> findAll() {
        return List.copyOf(categorias.values());
    }

    /**
     * Busca una categoría por su ID.
     *
     * @param id el ID de la categoría a buscar.
     * @return la categoría encontrada, o null si no existe.
     */
    public Categoria findById(Long id) {
        return categorias.get(id);
    }
}
