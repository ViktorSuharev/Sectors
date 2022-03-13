package com.visu.order.repository;

import com.visu.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM orders o LEFT JOIN FETCH o.sectors")
    Set<Order> findAllSet();
}

