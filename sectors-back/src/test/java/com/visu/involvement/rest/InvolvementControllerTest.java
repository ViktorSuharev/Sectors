package com.visu.involvement.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.visu.involvement.model.Involvement;
import com.visu.sector.model.Sector;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Collections;
import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class InvolvementControllerTest {
    private final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getInvolvementById() throws Exception {
        Involvement involvement = createInvolvement(1L, "Frodo", Set.of(
                createSector(1L, "name", 1L),
                createSector(2L, "name", 1L)
        ));
        assertInvolvement(involvement);
    }

    @Test
    void getSavedInvolvement() throws Exception {
        // check there is no involvements stored in the session
        // and provide session object for further sharing between requests
        MvcResult sessionProvider = this.mockMvc
                .perform(get("/involvements/session"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").doesNotExist())
                .andReturn();
        MockHttpSession session = (MockHttpSession) sessionProvider.getRequest().getSession();

        Involvement expected = createInvolvement(3L, "Gandalf",
                Set.of(
                        createSector(77L, "Rail", 75L),
                        createSector(78L, "Road", 75L)
                )
        );
        String json = mapper.writeValueAsString(expected);

        // save an involvement
        this.mockMvc
                .perform(post("/involvements")
                        .session(session)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andReturn();

        // there is an involvement stored in the session previously
        MvcResult storedSessionMvcResult = this.mockMvc
                .perform(get("/involvements/session")
                        .session(session))
                .andExpect(status().isOk())
                .andReturn();

        Involvement actual = mapper.readValue(storedSessionMvcResult.getResponse().getContentAsString(), new TypeReference<>() {});

        Assertions.assertEquals(expected, actual);
    }

    @Test
    void saveInvolvement() throws Exception {
        Involvement expected = createInvolvement(3L, "Gandalf",
                Set.of(
                        createSector(77L, "Rail", 75L),
                        createSector(78L, "Road", 75L)
                )
        );
        String json = mapper.writeValueAsString(expected);

        MvcResult mvcResult = this.mockMvc
                .perform(post("/involvements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andReturn();
        Involvement actual = mapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<>() {});

        assertInvolvement(actual, expected); // check response returned
        assertInvolvement(expected); // check object saved indeed
    }

    private void assertInvolvement(Involvement expected) throws Exception {
        MvcResult mvcResult = this.mockMvc
                .perform(get("/involvements/" + expected.getId()))
                .andExpect(status().isOk())
                .andReturn();

        Involvement actual = mapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<>() {});

        assertInvolvement(expected, actual);
    }

    private void assertInvolvement(Involvement expected, Involvement actual) {
        Assertions.assertEquals(expected.getId(), actual.getId());
        Assertions.assertEquals(expected.getUserName(), actual.getUserName());
        Assertions.assertEquals(expected.isAgreeToTerms(), actual.isAgreeToTerms());
        Assertions.assertEquals(expected.getSectors().size(), actual.getSectors().size());
    }

    private Involvement createInvolvement(Long id, String name, Set<Sector> sectors) {
        Involvement involvement = new Involvement();
        involvement.setId(id);
        involvement.setUserName(name);
        involvement.setAgreeToTerms(true);
        involvement.setSectors(sectors);

        return involvement;
    }

    private Sector createSector(Long id, String name, Long parentId) {
        Sector sector = new Sector();
        sector.setId(id);
        sector.setName(name);
        sector.setParentId(parentId);
        sector.setChildren(Collections.emptySet());

        return sector;
    }
}
