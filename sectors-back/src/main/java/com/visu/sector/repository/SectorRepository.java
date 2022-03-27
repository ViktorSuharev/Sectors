package com.visu.sector.repository;

import com.visu.sector.model.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SectorRepository extends JpaRepository<Sector, Long> {
//    @Query(value = "WITH LINK(ID, NAME, PARENT_ID, LEVEL) AS (\n" +
//            "    SELECT ID, NAME, PARENT_ID, 0 FROM SECTORS WHERE PARENT_ID IS NULL\n" +
//            "    UNION ALL\n" +
//            "    SELECT SECTORS.ID, SECTORS.NAME, SECTORS.PARENT_ID, LEVEL + 1\n" +
//            "    FROM LINK INNER JOIN SECTORS ON LINK.ID = SECTORS.PARENT_ID\n" +
//            ")\n" +
//            "SELECT ID, NAME, PARENT_ID FROM LINK WHERE NAME IS NOT NULL ORDER BY ID", nativeQuery = true)
    Set<Sector> findByParentIdIsNull();
}
