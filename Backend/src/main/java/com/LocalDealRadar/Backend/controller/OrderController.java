package com.LocalDealRadar.Backend.controller;

import com.LocalDealRadar.Backend.Entity.Order;
import com.LocalDealRadar.Backend.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {

    private final OrderRepository repo;

    public OrderController(OrderRepository repo){
        this.repo = repo;
    }

    // 🛒 PLACE ORDER
    @PostMapping
    public String addOrder(@RequestBody Order order){

        // 🔥 CLEAN EMAIL
        order.setEmail(order.getEmail().trim().toLowerCase());

        // 🔥 DEFAULT STATUS
        order.setStatus("PENDING");

        repo.save(order);

        return "ORDER PLACED ✅";
    }

    // 📦 GET USER ORDERS
    @GetMapping("/{email}")
    public List<Order> getOrders(@PathVariable String email){

        email = email.trim().toLowerCase();

        return repo.findByEmail(email);
    }
}