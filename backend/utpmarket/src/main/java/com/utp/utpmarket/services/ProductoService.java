package com.utp.utpmarket.services;

import com.utp.utpmarket.models.dto.ProductoRequest;
import com.utp.utpmarket.models.dto.ProductoResponse;
import com.utp.utpmarket.models.entity.Categoria;
import com.utp.utpmarket.models.entity.Producto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Servicio para la gestión de productos en memoria.
 */
@Service
@RequiredArgsConstructor
public class ProductoService {

    private final Map<Long, Producto> productos = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);
    private final CategoriaService categoriaService;

    /**
     * Inicializa algunos productos de ejemplo al iniciar el servicio.
     */
    @PostConstruct
    public void init() {
        save(new Producto(null, "Tutoría de Matemáticas", 25.0, categoriaService.findById(1L), "https://www.aulaplaneta.com/sites/default/files/styles/article_detail/public/articles/images/recurso462.jpeg?itok=3rEnqGzj", "new"));
        save(new Producto(null, "Guía de Álgebra", 10.0, categoriaService.findById(2L), "https://img.freepik.com/foto-gratis/estudiantes-aprendiendo-algebra_1098-1155.jpg", "normal"));
        save(new Producto(null, "Snack Galletas", 3.0, categoriaService.findById(3L), "https://images-cdn.ubuy.co.id/64ff997c192014395b3b6379-cookie-variety-pack-assortment-25-pack.jpg", "normal"));
        save(new Producto(null, "Cuaderno A4", 6.0, categoriaService.findById(4L), "https://www.infofar.com.pe/wp-content/uploads/CUADERNO-ALPHA-A4-X-92H-RAYADO.jpg", "normal"));
        save(new Producto(null, "Tutoría de Física", 30.0, categoriaService.findById(1L), "https://images.squarespace-cdn.com/content/v1/5728d511cf80a17bbd8f8dcb/1462705348963-P6EDSWXTDTIJPUNIO1KF/tutoria-individual-fisica-matematica-tutor-san-salvador-el-salvador", "new"));
        save(new Producto(null, "Guía de Estadística", 12.0, categoriaService.findById(2L), "https://sciencemediacentre.es/sites/default/files/2023-07/estadistica.jpg", "normal"));
    }

    /**
     * Crea un nuevo producto.
     *
     * @param request los datos del producto a crear.
     * @return el producto creado.
     * @throws RuntimeException si la categoría no es encontrada.
     */
    public ProductoResponse createProducto(ProductoRequest request) {
        Categoria categoria = categoriaService.findById(request.categoryId());
        if (categoria == null) {
            throw new RuntimeException("Categoría no encontrada");
        }

        Producto producto = new Producto(
                null,
                request.nombre(),
                request.precio(),
                categoria,
                request.image(),
                request.isNew()
        );
        save(producto);
        return mapToResponse(producto);
    }

    /**
     * Obtiene todos los productos.
     *
     * @return una lista de todos los productos.
     */
    public List<ProductoResponse> getAllProductos() {
        return productos.values().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Busca un producto por su ID.
     *
     * @param id el ID del producto a buscar.
     * @return el producto encontrado.
     * @throws RuntimeException si el producto con el ID especificado no es encontrado.
     */
    public ProductoResponse getProductoById(Long id) {
        Producto producto = productos.get(id);
        if (producto == null) {
            throw new RuntimeException("Producto con ID " + id + " no encontrado");
        }
        return mapToResponse(producto);
    }

    /**
     * Actualiza un producto existente.
     *
     * @param id el ID del producto a actualizar.
     * @param request los nuevos datos del producto.
     * @return el producto actualizado.
     * @throws RuntimeException si el producto o la categoría no son encontrados.
     */
    public ProductoResponse updateProducto(Long id, ProductoRequest request) {
        Producto producto = productos.get(id);
        if (producto == null) {
            throw new RuntimeException("Producto con ID " + id + " no encontrado");
        }

        Categoria categoria = categoriaService.findById(request.categoryId());
        if (categoria == null) {
            throw new RuntimeException("Categoría no encontrada");
        }

        producto.setNombre(request.nombre());
        producto.setPrecio(request.precio());
        producto.setCategoria(categoria);
        producto.setImage(request.image());
        producto.setIsNew(request.isNew());

        save(producto);
        return mapToResponse(producto);
    }

    /**
     * Elimina un producto por su ID.
     *
     * @param id el ID del producto a eliminar.
     * @throws RuntimeException si el producto con el ID especificado no es encontrado.
     */
    public void deleteProducto(Long id) {
        if (productos.remove(id) == null) {
            throw new RuntimeException("Producto con ID " + id + " no encontrado");
        }
    }

    /**
     * Guarda un producto en la colección en memoria.
     *
     * @param producto el producto a guardar.
     * @return el producto guardado con su ID asignado si es nuevo.
     */
    private Producto save(Producto producto) {
        if (producto.getId() == null) {
            producto.setId(sequence.incrementAndGet());
        }
        productos.put(producto.getId(), producto);
        return producto;
    }

    /**
     * Mapea un objeto Producto a un objeto ProductoResponse.
     *
     * @param producto el objeto Producto a mapear.
     * @return el objeto ProductoResponse resultante.
     */
    private ProductoResponse mapToResponse(Producto producto) {
        return new ProductoResponse(
                producto.getId(),
                producto.getNombre(),
                producto.getPrecio(),
                producto.getCategoria().getNombre(),
                producto.getImage(),
                producto.getIsNew()
        );
    }
}
