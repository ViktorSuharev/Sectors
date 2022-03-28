package com.visu.sector.rest;

import com.visu.sector.model.Sector;
import com.visu.sector.service.SectorService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;

@RestController
public class SectorController {
    private final SectorService service;

    public SectorController(SectorService service) {
        this.service = service;
    }

    @GetMapping("sectors")
    public Set<Sector> getSectors() {
        return service.getSectors();
    }

    // For testing purpose
    @GetMapping("sectors/{id}")
    public Sector getSectorById(@PathVariable Long id) {
        Optional<Sector> optionalSector = service.getSectorById(id);
        if (optionalSector.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return optionalSector.get();
    }

    @PostMapping("sectors")
    public Sector addSector(@RequestBody Sector sector) {
        return service.saveSector(sector);
    }

    @PutMapping("sectors")
    public Sector updateSector(@RequestBody Sector sector) {
        return service.saveSector(sector);
    }

    @DeleteMapping("sectors/{sectorId}")
    public void deleteSector(@PathVariable long sectorId) {
        service.deleteSector(sectorId);
    }
}
