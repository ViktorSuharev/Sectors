package com.visu.sector.repository;

import com.visu.sector.model.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SectorRepository extends JpaRepository<Sector, Long> {
    Set<Sector> findByParentIdIsNull();
}
