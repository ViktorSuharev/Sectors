package com.visu.involvement.rest;

import com.visu.involvement.model.Involvement;
import com.visu.involvement.service.InvolvementService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import java.util.Optional;
import java.util.Set;

@RestController
public class InvolvementController {
    private static final String ASSOCIATED_INVOLVEMENT = "ASSOCIATED_INVOLVEMENT";

    private final InvolvementService service;

    public InvolvementController(InvolvementService service) {
        this.service = service;
    }

    @GetMapping("involvements")
    public Set<Involvement> getInvolvements() {
        return service.getInvolvements();
    }

    // For testing purpose
    @GetMapping("involvements/{id}")
    public Involvement getInvolvementById(@PathVariable Long id) {
        Optional<Involvement> optionalInvolvement = service.getInvolvementById(id);
        if (optionalInvolvement.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return optionalInvolvement.get();
    }

    @GetMapping("involvements/session")
    public Involvement getSavedInvolvement(HttpSession session) {
        Long involvementId = getInvolvementId(session);
        System.out.println(involvementId);
        return involvementId != null ? service.getInvolvement(involvementId) : null;
    }

    @PostMapping("involvements")
    public Involvement saveInvolvement(HttpSession session, @RequestBody Involvement involvement) {
        Long involvementId = getInvolvementId(session);
        if (involvementId != null) {
            involvement.setId(involvementId);
        }

        Involvement stored = service.saveInvolvement(involvement);
        if (involvementId == null) {
            session.setAttribute(ASSOCIATED_INVOLVEMENT, stored.getId());
        }

        return stored;
    }

    private Long getInvolvementId(HttpSession session) {
        Object associatedInvolvementObj = session.getAttribute(ASSOCIATED_INVOLVEMENT);
        return associatedInvolvementObj instanceof Long ?
                (Long) associatedInvolvementObj :
                null;
    }
}
