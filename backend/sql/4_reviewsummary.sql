DROP VIEW IF EXISTS ReviewSummary;

CREATE VIEW ReviewSummary(toilet_id, name, profile_picture_url, cleanliness_rating, title, description, queue) AS (
    SELECT R.toilet_id, P.name, P.profile_picture, R.cleanliness_rating, R.title, R.description, R.queue
    FROM reviews R
    NATURAL JOIN 
    customer_profiles P
);