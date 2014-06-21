-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'accounts'
-- 
-- ---

DROP TABLE IF EXISTS `accounts`;
		
CREATE TABLE `accounts` (
  `id` SMALLINT NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` SMALLINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
		
CREATE TABLE `users` (
  `id` SMALLINT NULL AUTO_INCREMENT DEFAULT NULL,
  `user_name` VARCHAR(40) NULL DEFAULT NULL,
  `first_name` VARCHAR(50) NULL DEFAULT NULL,
  `last_name` VARCHAR(50) NULL DEFAULT NULL,
  `password_hash` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `accounts` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `accounts` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `accounts` (`id`,`user_id`) VALUES
-- ('','');
-- INSERT INTO `users` (`id`,`user_name`,`first_name`,`last_name`,`password_hash`) VALUES
-- ('','','','','');

