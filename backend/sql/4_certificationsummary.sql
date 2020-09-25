DROP VIEW IF EXISTS CertificationSummary;

CREATE VIEW CertificationSummary(toilet_id, certification_authority, certification_logo, certification_webpage, rating) AS (
    SELECT TC.toilet_id, CA.certification_authority, CA.certification_logo, CA.certification_webpage, TC.rating
    FROM toilet_certifications TC
    JOIN certification_authorities CA
    ON TC.certification_id = CA.id
);