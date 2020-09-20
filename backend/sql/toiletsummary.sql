DROP VIEW IF EXISTS ToiletSummary;

CREATE VIEW ToiletSummary(id, building_id, management_id, name, avg_review, review_count) AS (
    WITH review_summary AS (
        SELECT toilet_id, AVG(cleanliness_rating) AS avg_review, COUNT(*) as review_count
        FROM reviews
        GROUP BY toilet_id
    )

    SELECT T.id, T.building_id, T.management_id, T.name, R.avg_review, R.review_count
    FROM toilets T
    NATURAL LEFT JOIN
    review_summary R
);