package com.visu.involvement.repository;

import com.visu.involvement.model.Involvement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface InvolvementRepository extends JpaRepository<Involvement, Long> {
    @Query("SELECT i FROM involvements i LEFT JOIN FETCH i.sectors")
    Set<Involvement> findAllSet();
}

