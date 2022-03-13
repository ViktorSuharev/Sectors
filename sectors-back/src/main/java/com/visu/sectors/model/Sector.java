package com.visu.sectors.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "sectors")
@Data
public class Sector {
    @Id
    private long id;
    private String name;
    private long parentId;
}
