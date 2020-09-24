CREATE TABLE "users" (
  "id" BIGSERIAL PRIMARY KEY,
  "role_id" bigint,
  "email" varchar NOT NULL,
  "auth_type" varchar,
  "created_at" timestamp DEFAULT (now()),
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "native_auth_passwords" (
  "email" varchar PRIMARY KEY,
  "auth_type" varchar NOT NULL,
  "password" varchar NOT NULL
);

CREATE TABLE "refresh_tokens" (
  "token" varchar PRIMARY KEY
);

CREATE TABLE "roles" (
  "id" BIGSERIAL PRIMARY KEY,
  "role_name" varchar NOT NULL,
  "permissions" varchar,
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "customer_profiles" (
  "user_id" bigint PRIMARY KEY,
  "name" varchar NOT NULL,
  "profile_picture" varchar,
  "points" bigint DEFAULT 0
);

CREATE TABLE "management_profiles" (
  "user_id" bigint PRIMARY KEY,
  "company_name" varchar NOT NULL,
  "display_email" varchar NOT NULL,
  "company_logo" varchar,
  "office_address" varchar NOT NULL
);

CREATE TABLE "buildings" (
  "id" BIGSERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "region" varchar NOT NULL,
  "address" varchar NOT NULL,
  "latitude" double precision NOT NULL,
  "longitude" double precision NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "toilets" (
  "id" BIGSERIAL PRIMARY KEY,
  "building_id" bigint NOT NULL,
  "management_id" bigint NOT NULL,
  "name" varchar NOT NULL,
  "queue" double precision,
  "created_at" timestamp DEFAULT (now()),
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "toilet_features" (
  "toilet_id" bigint PRIMARY KEY NOT NULL,
  "is_free" boolean DEFAULT false,
  "has_handheld_bidet" boolean DEFAULT false,
  "has_seat_bidet" boolean DEFAULT false,
  "has_toilet_paper" boolean DEFAULT false,
  "has_seat_cleaner" boolean DEFAULT false,
  "has_handicap" boolean DEFAULT false,
  "has_water_heater" boolean DEFAULT false,
  "has_hand_dryer" boolean DEFAULT false,
  "has_hand_soap" boolean DEFAULT false,
  "has_baby_change_station" boolean DEFAULT false,
  "has_female" boolean DEFAULT false,
  "has_male" boolean DEFAULT false,
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "toilet_images" (
  "toilet_id" bigint NOT NULL,
  "image_url" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "toilet_certifications" (
  "toilet_id" bigint NOT NULL,
  "certification_id" bigint NOT NULL,
  "rating" double precision
);

CREATE TABLE "certification_authorities" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "certification_authority" varchar NOT NULL,
  "certification_logo" varchar,
  "certification_webpage" varchar,
  "created_at" timestamp DEFAULT (now()),
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "reviews" (
  "id" BIGSERIAL PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "toilet_id" bigint NOT NULL,
  "cleanliness_rating" double precision NOT NULL,
  "title" varchar NOT NULL,
  "description" varchar NOT NULL,
  "queue" int,
  "created_at" timestamp DEFAULT (now()),
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "reports" (
  "id" BIGSERIAL PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "toilet_id" bigint NOT NULL,
  "issue" varchar NOT NULL,
  "items" varchar NOT NULL,
  "description" varchar NOT NULL,
  "status" varchar DEFAULT 'Reported',
  "created_at" timestamp DEFAULT (now()),
  "last_updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "toilet_version" (
  "version" BIGSERIAL PRIMARY KEY
)

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "customer_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "management_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "toilets" ADD FOREIGN KEY ("building_id") REFERENCES "buildings" ("id");

ALTER TABLE "toilets" ADD FOREIGN KEY ("management_id") REFERENCES "management_profiles" ("user_id");

ALTER TABLE "toilet_features" ADD FOREIGN KEY ("toilet_id") REFERENCES "toilets" ("id");

ALTER TABLE "toilet_images" ADD FOREIGN KEY ("toilet_id") REFERENCES "toilets" ("id");

ALTER TABLE "toilet_certifications" ADD FOREIGN KEY ("toilet_id") REFERENCES "toilets" ("id");

ALTER TABLE "toilet_certifications" ADD FOREIGN KEY ("certification_id") REFERENCES "certification_authorities" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("toilet_id") REFERENCES "toilets" ("id");

ALTER TABLE "reports" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reports" ADD FOREIGN KEY ("toilet_id") REFERENCES "toilets" ("id");

CREATE UNIQUE INDEX ON "users" ("email", "auth_type");

ALTER TABLE "native_auth_passwords" ADD FOREIGN KEY ("email", "auth_type") REFERENCES "users" ("email", "auth_type");

CREATE UNIQUE INDEX ON "toilet_images" ("toilet_id", "image_url");

INSERT INTO "toilet_version" VALUES (1);
