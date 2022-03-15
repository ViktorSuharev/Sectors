package com.visu.sector.rest;

import com.visu.sector.model.Sector;
import com.visu.sector.service.SectorService;
import org.springframework.web.bind.annotation.*;

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
