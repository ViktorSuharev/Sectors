package com.visu.sectors.rest;

import com.visu.sectors.model.Sector;
import com.visu.sectors.service.SectorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SectorController {
    private final SectorService service;

    public SectorController(SectorService service) {
        this.service = service;
    }

    @GetMapping("sectors")
    public List<Sector> getSectors() {
        return service.getSectors();
    }
}
