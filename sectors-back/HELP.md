# Getting Started

Implementation of the screening task

### Glossary
**Involvement** - a result of the filling input form. Name - sectors - agree_with_terms bundle.

### Schema and Data
Please check files
- sectors-back/src/main/resources/schema.sql
- sectors-back/src/main/resources/data.sql

### Limitations
- Not enough scalable solution: sectors tree is fully loaded on page refresh, but only top-level sectors are displayed.
As an alternative solution I keep in mind loading children sectors on demand.
- User cannot delete sectors currently used in involvements

### Problems
- Each client request creates a new session.
Backend logic seems to be correct (corresponding test approves it), but I did not found what is wrong with frontend
- N + 1 problem while getting sectors tree
- Only base backend tests are implemented
