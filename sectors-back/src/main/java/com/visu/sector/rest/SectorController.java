package com.visu.sector.rest;

import com.visu.sector.model.Sector;
import com.visu.sector.service.SectorService;
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
