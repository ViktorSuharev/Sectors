package com.visu.sectors.service;

import com.visu.sectors.model.Sector;
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
