package com.visu.sector.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "sectors")
@Data
public class Sector {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    @Column(name="parent_id")
    private Long parentId;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name="parent_id")
    @OrderBy("name")
    private Set<Sector> children;
}
