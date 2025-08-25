package com.utp.utpmarket.models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "producto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @Column(name = "precio", nullable = false)
    private BigDecimal precio;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Column(length = 255)
    private String imagenUrl;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    private boolean isDestacado;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha_creacion")
    private Timestamp fecha_creacion;

}
