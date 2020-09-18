CREATE TABLE `users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `role_id` bigint,
  `email` varchar(255) NOT NULL,
  `auth_type` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `last_updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `native_auth_passwords` (
  `email` varchar(255) PRIMARY KEY,
  `auth_type` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `refresh_tokens` (
  `token` varchar(255) PRIMARY KEY
);

CREATE TABLE `roles` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `permissions` varchar(255),
  `last_updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `customer_profiles` (
  `user_id` bigint PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `profile_picture` varchar(255),
  `points` bigint DEFAULT 0
);

CREATE TABLE `management_profiles` (
  `user_id` bigint PRIMARY KEY,
  `company_name` varchar(255) NOT NULL,
  `display_email` varchar(255) NOT NULL,
  `company_logo` varchar(255),
  `office_address` varchar(255) NOT NULL
);

CREATE TABLE `toilets` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `management_id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` precision NOT NULL,
  `longitude` precision NOT NULL,
  `review_rating` precision,
  `queue` precision,
  `created_at` timestamp DEFAULT (now()),
  `last_updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `toilet_features` (
  `toilet_id` bigint PRIMARY KEY NOT NULL,
  `has_handheld_bidet` boolean DEFAULT false,
  `has_seat_bidet` boolean DEFAULT false,
  `has_toilet_paper` boolean DEFAULT false,
  `has_seat_cleaner` boolean DEFAULT false,
  `has_handicap` boolean DEFAULT false,
  `is_free` boolean DEFAULT false,
  `has_water_heater` boolean DEFAULT false,
  `has_hand_dryer` boolean DEFAULT false,
  `has_hand_soap` boolean DEFAULT false,
  `has_baby_change_station` boolean DEFAULT false,
  `last_updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `toilet_images` (
  `toilet_id` bigint NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `last_updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `toilet_certifications` (
  `toilet_id` bigint NOT NULL,
  `certification_authority` varchar(255) NOT NULL,
  `rating` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `last_updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `reviews` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `toilet_id` bigint NOT NULL,
  `cleanliness_rating` precision NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `queue` int,
  `created_at` timestamp DEFAULT (now()),
  `last_updated_at` timestamp DEFAULT (now())
);

CREATE TABLE `reports` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `toilet_id` bigint NOT NULL,
  `issue` varchar(255) NOT NULL,
  `items` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT "Reported",
  `created_at` timestamp DEFAULT (now()),
  `last_updated_at` timestamp DEFAULT (now())
);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`email`, `auth_type`) REFERENCES `native_auth_passwords` (`email`, `auth_type`);

ALTER TABLE `customer_profiles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `management_profiles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `toilets` ADD FOREIGN KEY (`management_id`) REFERENCES `management_profiles` (`user_id`);

ALTER TABLE `toilet_features` ADD FOREIGN KEY (`toilet_id`) REFERENCES `toilets` (`id`);

ALTER TABLE `toilet_images` ADD FOREIGN KEY (`toilet_id`) REFERENCES `toilets` (`id`);

ALTER TABLE `toilet_certifications` ADD FOREIGN KEY (`toilet_id`) REFERENCES `toilets` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`toilet_id`) REFERENCES `toilets` (`id`);

ALTER TABLE `reports` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reports` ADD FOREIGN KEY (`toilet_id`) REFERENCES `toilets` (`id`);

CREATE UNIQUE INDEX `users_index_0` ON `users` (`email`, `auth_type`);

CREATE UNIQUE INDEX `toilet_images_index_1` ON `toilet_images` (`toilet_id`, `image_url`);

CREATE UNIQUE INDEX `toilet_certifications_index_2` ON `toilet_certifications` (`toilet_id`, `certification_authority`);

ALTER TABLE `native_auth_passwords` ADD FOREIGN KEY (`email`) REFERENCES `users` (`email`);