package com.visu.sector.service;

import com.visu.sector.model.Sector;
import com.visu.sector.repository.SectorRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class SectorService {
    private final SectorRepository repository;

    public SectorService(SectorRepository repository) {
        this.repository = repository;
    }

    public Set<Sector> getSectors() {
        return repository.findByParentIdIsNull();
    }

    public Sector saveSector(Sector sector) {
        return repository.save(sector);
    }

    public void deleteSector(long id) {
        repository.deleteById(id);
    }
}
