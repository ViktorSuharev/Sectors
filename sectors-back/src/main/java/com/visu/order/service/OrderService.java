package com.visu.order.service;

import com.visu.order.model.Order;
import com.visu.order.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public Set<Order> getOrders() {
        return repository.findAllSet();
    }

    public Order createOrder(Order order) {
        return repository.save(order);
    }
}
