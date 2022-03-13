package com.visu.order.model;

import com.visu.sector.model.Sector;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long orderId;
    private String userName;
    private boolean isAgreeToTerms;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "ordered_sectors",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "sector_id"))
    private Set<Sector> sectors;
}
