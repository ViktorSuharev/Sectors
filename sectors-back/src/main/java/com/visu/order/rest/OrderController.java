package com.visu.order.rest;

import com.visu.order.model.Order;
import com.visu.order.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping("orders")
    public Set<Order> getOrders() {
        return service.getOrders();
    }

    @PostMapping("orders")
    public Order createOrder(@RequestBody Order order) {
        return service.createOrder(order);
    }
}
