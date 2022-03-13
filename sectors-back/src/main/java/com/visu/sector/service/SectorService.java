package com.visu.sector.service;

import com.visu.sector.model.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectorService {
    private final JpaRepository<Sector, Long> repository;

    public SectorService(JpaRepository<Sector, Long> repository) {
        this.repository = repository;
    }

    public List<Sector> getSectors() {
        return repository.findAll();
    }
}
