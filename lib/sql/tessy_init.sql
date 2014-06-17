



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
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `accounts` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `accounts` (`id`,`user_id`) VALUES
-- ('','');

