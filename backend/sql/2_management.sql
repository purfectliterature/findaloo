INSERT INTO roles VALUES(1, 'admin', '');
INSERT INTO roles VALUES(2, 'customer', '');
INSERT INTO roles VALUES(3, 'management', '');

INSERT INTO users(role_id, email, auth_type) values(3,'retail@capitaland.com', 'native');
INSERT INTO users(role_id, email, auth_type) values(3,'crc@sbstransit.com.sg', 'native');
INSERT INTO users(role_id, email, auth_type) values(3,'customer_relations@smrt.com.sg', 'native');

INSERT INTO native_auth_passwords VALUES('retail@capitaland.com', 'native', '$2b$10$Tj9sOKiQD1G/vYhPxakvyOeAhueue/0x9letudq7FmbFAM6fZW.Im');
INSERT INTO native_auth_passwords VALUES('crc@sbstransit.com.sg', 'native', '$2b$10$8AbiDJzFvVNq9KtoXasy/ezMGgKzTuymbnHkAz4f4E50ul2A/HtsS');
INSERT INTO native_auth_passwords VALUES('customer_relations@smrt.com.sg', 'native', '$2b$10$j.lZu204dpAh1gMLl/7LnOUprkQovrasydOPOG61TqMmXcaCAmYPK');

INSERT INTO management_profiles VALUES(1, 'CapitaLand', 'retail@capitaland.com', 'https://www.capitaland.com/content/dam/capitaland-common/logos/standard.svg', '168 Robinson Road #30-01 Capital Tower Singapore 068912');
INSERT INTO management_profiles VALUES(2, 'SBS Transit', 'crc@sbstransit.com.sg', 'https://www.sbstransit.com.sg/Content/img/sbs-transit-logo.png', '205 Braddell Rd, Singapore 579701');
INSERT INTO management_profiles VALUES(3, 'SMRT Corporation Ltd', 'customer_relations@smrt.com.sg', 'https://www.smrt.com.sg/Portals/0/SMRT_Corp_Logo.png?ver=2018-01-11-143632-557', '2 Tanjong Katong Road, #08-01, Tower 3, Paya Lebar Quarter, Singapore 437161');

INSERT INTO certification_authorities VALUES(1, 'Restroom Association (Singapore)', '12. https://www.toilet.org.sg/images/RestroomLogo.png', 'https://toilet.org.sg/');