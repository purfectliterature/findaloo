INSERT INTO roles VALUES(1, 'admin', '');
INSERT INTO roles VALUES(2, 'customer', '');
INSERT INTO roles VALUES(3, 'management', '');

INSERT INTO users(role_id, email, auth_type) values(3,'retail@capitaland.com', 'native');
INSERT INTO users(role_id, email, auth_type) values(3,'crc@sbstransit.com.sg', 'native');
INSERT INTO users(role_id, email, auth_type) values(3,'customer_relations@smrt.com.sg', 'native');

INSERT INTO native_auth_passwords VALUES('retail@capitaland.com', );
INSERT INTO native_auth_passwords VALUES('crc@sbstransit.com.sg', );
INSERT INTO native_auth_passwords VALUES('crc@sbstransit.com.sg', );

INSERT INTO management_profiles VALUES(1, 'CapitaLand', 'retail@capitaland.com', 'https://www.capitaland.com/content/dam/capitaland-common/logos/standard.svg', '168 Robinson Road #30-01 Capital Tower Singapore 068912');
INSERT INTO management_profiles VALUES(2, 'SBS Transit', 'crc@sbstransit.com.sg', 'https://www.sbstransit.com.sg/Content/img/sbs-transit-logo.png', '205 Braddell Rd, Singapore 579701');
INSERT INTO management_profiles VALUES(3, 'SMRT Corporation Ltd', 'customer_relations@smrt.com.sg', 'https://www.smrt.com.sg/Portals/0/SMRT_Corp_Logo.png?ver=2018-01-11-143632-557', '2 Tanjong Katong Road, #08-01, Tower 3, Paya Lebar Quarter, Singapore 437161');