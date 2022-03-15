package com.visu.involvement.rest;

import com.visu.involvement.model.Involvement;
import com.visu.involvement.service.InvolvementService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
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

    //TODO Session stickiness is not working. Session is recreated on each call
    private Long getInvolvementId(HttpSession session) {
        Object associatedInvolvementObj = session.getAttribute(ASSOCIATED_INVOLVEMENT);
        return associatedInvolvementObj instanceof Long ?
                (Long) associatedInvolvementObj :
                null;
    }
}
