package com.utp.utpmarket.repository;

import com.utp.utpmarket.models.entity.CarritoItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoRepository extends JpaRepository<CarritoItem, Long> {
}
