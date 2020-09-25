CREATE OR REPLACE FUNCTION increment_version() RETURNS TRIGGER AS $$

BEGIN
    UPDATE toilet_version
    SET version = version + 1;
    RETURN NULL;
END;

$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS increment_version_toilets ON toilets CASCADE;
CREATE TRIGGER increment_version_toilets
    AFTER INSERT OR UPDATE ON toilets
    EXECUTE FUNCTION increment_version();
    
DROP TRIGGER IF EXISTS increment_version_certifications ON toilet_certifications CASCADE;
CREATE TRIGGER increment_version_certifications
    AFTER INSERT OR UPDATE ON toilet_certifications
    EXECUTE FUNCTION increment_version();

DROP TRIGGER IF EXISTS increment_version_featuress ON toilet_features CASCADE;
CREATE TRIGGER increment_version_features
    AFTER INSERT OR UPDATE ON toilet_features
    EXECUTE FUNCTION increment_version();

DROP TRIGGER IF EXISTS increment_version_images ON toilet_images CASCADE;
CREATE TRIGGER increment_version_images
    AFTER INSERT OR UPDATE ON toilet_images
    EXECUTE FUNCTION increment_version();