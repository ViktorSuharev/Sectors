CREATE TABLE involvements (
    id BIGINT IDENTITY NOT NULL PRIMARY KEY,
    agree_to_terms BOOLEAN NOT NULL,
    user_name VARCHAR(255)
);

CREATE TABLE sectors (
    id BIGINT IDENTITY NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    parent_id BIGINT,
    FOREIGN KEY(parent_id) REFERENCES sectors(id)
);

CREATE TABLE involved_sectors (
    involvement_id BIGINT NOT NULL,
    sector_id BIGINT NOT NULL,
    PRIMARY KEY (involvement_id, sector_id),
    FOREIGN KEY(involvement_id) REFERENCES involvements(id),
    FOREIGN KEY(sector_id) REFERENCES sectors(id)
);
