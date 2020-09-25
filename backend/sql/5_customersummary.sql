DROP VIEW IF EXISTS CustomerSummary;

CREATE VIEW CustomerSummary(id, name, email, auth_type, profile_picture, points) AS (
    SELECT CP.user_id, CP.name, U.email, U.auth_type, CP.profile_picture, CP.points
    FROM customer_profiles CP 
    JOIN users U
    ON CP.user_id = U.id
)