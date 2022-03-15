package com.visu.involvement.service;

import com.visu.involvement.model.Involvement;
import com.visu.involvement.repository.InvolvementRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class InvolvementService {
    private final InvolvementRepository repository;

    public InvolvementService(InvolvementRepository repository) {
        this.repository = repository;
    }

    public Set<Involvement> getInvolvements() {
        return repository.findAllSet();
    }

    public Involvement getInvolvement(long involvementId) {
        return repository.getById(involvementId);
    }

    public Involvement saveInvolvement(Involvement involvement) {
        return repository.save(involvement);
    }
}
