package com.LocalDealRadar.Backend.repository;

import com.LocalDealRadar.Backend.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByEmail(String email);
}
