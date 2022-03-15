package com.visu.involvement.model;

import com.visu.sector.model.Sector;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "involvements")
@Data
public class Involvement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userName;
    private boolean agreeToTerms;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "involved_sectors",
            joinColumns = @JoinColumn(name = "involvement_id"),
            inverseJoinColumns = @JoinColumn(name = "sector_id"))
    private Set<Sector> sectors;
}
