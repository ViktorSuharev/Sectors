package com.visu.sector.rest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.visu.sector.model.Sector;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SectorControllerTest {
    private final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getSectors() throws Exception {
        MvcResult mvcResult = this.mockMvc
                .perform(get("/sectors"))
                .andExpect(status().isOk())
                .andReturn();

        Set<Sector> actual = mapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<>() {});

        Assertions.assertEquals(3, actual.size());
        Assertions.assertEquals(79, getSectorsCount(actual));

        Set<Sector> set = actual.stream()
                .map(s -> createSector(s.getId(), s.getName(), s.getParentId()))
                .collect(Collectors.toSet());

        Assertions.assertTrue(set.contains(createSector(1L, "Manufacturing", null)));
        Assertions.assertTrue(set.contains(createSector(61L, "Other", null)));
        Assertions.assertTrue(set.contains(createSector(65L, "Service", null)));
    }

    @Test
    void getSectorById() throws Exception {
        assertSector(createSector(44L, "Plastic goods", 42L));
    }

    @Test
    void addSector() throws Exception {
        MvcResult mvcResult = this.mockMvc
                .perform(post("/sectors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"new\", \"parentId\":1, \"children\":[]}"))
                .andExpect(status().isOk())
                .andReturn();

        Sector actual = mapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<>() {});
        Assertions.assertEquals("new", actual.getName());
        Assertions.assertEquals(1L, actual.getParentId());
        Assertions.assertNotNull(actual.getId());

        assertSector(createSector(actual.getId(), "new", 1L));
    }

    @Test
    void updateSector() throws Exception {
        MvcResult mvcResult = this.mockMvc
                .perform(put("/sectors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":63, \"name\":\"updated\", \"parentId\":61, \"children\":[]}"))
                .andExpect(status().isOk())
                .andReturn();

        Sector actual = mapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<>() {});
        Assertions.assertEquals(63L, actual.getId());
        Assertions.assertEquals("updated", actual.getName());
        Assertions.assertEquals(61L, actual.getParentId());
        Assertions.assertNotNull(actual.getId());

        assertSector(createSector(63L, "updated", 61L));
    }

    @Test
    void deleteSector() throws Exception {
        this.mockMvc
                .perform(delete("/sectors/64"))
                .andExpect(status().isOk());

        this.mockMvc
                .perform(get("/sectors/64"))
                .andExpect(status().isNotFound());
    }

    private void assertSector(Sector expected) throws Exception {
        MvcResult mvcResult = this.mockMvc
                .perform(get("/sectors/" + expected.getId()))
                .andExpect(status().isOk())
                .andReturn();

        Sector actual = mapper.readValue(mvcResult.getResponse().getContentAsString(), new TypeReference<>() {});

        Assertions.assertEquals(expected.getName(), actual.getName());
        Assertions.assertEquals(expected.getParentId(), actual.getParentId());
        Assertions.assertEquals(expected.getChildren().size(), actual.getChildren().size());
    }

    private int getSectorsCount(Collection<Sector> sectors) {
        int count = 0;
        for (Sector s : sectors) {
            count++;
            if (!CollectionUtils.isEmpty(s.getChildren())) {
                count += getSectorsCount(s.getChildren());
            }
        }

        return count;
    }

    private Sector createSector(Long id, String name, Long parentId) {
        return createSector(id, name, parentId, Collections.emptySet());
    }

    private Sector createSector(Long id, String name, Long parentId, Set<Sector> children) {
        Sector sector = new Sector();
        sector.setId(id);
        sector.setName(name);
        sector.setParentId(parentId);
        sector.setChildren(children);

        return sector;
    }
}
