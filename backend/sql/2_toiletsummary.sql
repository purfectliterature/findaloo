DROP VIEW IF EXISTS ToiletSummary;

CREATE VIEW ToiletSummary(id, building_id, address, latittude, longitude, management_id, name, avg_review, review_count) AS (
    WITH review_summary AS (
        SELECT toilet_id, AVG(cleanliness_rating) AS avg_review, COUNT(*) as review_count
        FROM reviews
        GROUP BY toilet_id
    )

    SELECT T.id, T.building_id, B.address, B.latitude, B.longitude, T.management_id, T.name, R.avg_review, R.review_count
    FROM toilets T
    LEFT JOIN review_summary R
    ON T.id = R.toilet_id
    JOIN buildings B
    ON B.id = T.building_id
);
