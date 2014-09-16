-- MySQL dump 10.15  Distrib 10.0.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: tessy
-- ------------------------------------------------------
-- Server version	10.0.11-MariaDB-1~saucy-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user_id` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `company_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'ShutterStock'),(2,'OffSet'),(3,'SkillFeed'),(4,'BigStock');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `component`
--

DROP TABLE IF EXISTS `component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `component` (
  `co_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `co_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`co_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `component`
--

LOCK TABLES `component` WRITE;
/*!40000 ALTER TABLE `component` DISABLE KEYS */;
INSERT INTO `component` VALUES (1,'Login'),(2,'Filters'),(3,'Header'),(4,'Footer');
/*!40000 ALTER TABLE `component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relate`
--

DROP TABLE IF EXISTS `relate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relate` (
  `r_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `c_id` smallint(5) unsigned DEFAULT NULL,
  `t_id` smallint(5) unsigned DEFAULT NULL,
  `co_id` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`r_id`),
  KEY `c_id` (`c_id`),
  KEY `t_id` (`t_id`),
  KEY `co_id` (`co_id`),
  CONSTRAINT `relate_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `company` (`company_id`),
  CONSTRAINT `relate_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `relate_ibfk_3` FOREIGN KEY (`co_id`) REFERENCES `component` (`co_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relate`
--

LOCK TABLES `relate` WRITE;
/*!40000 ALTER TABLE `relate` DISABLE KEYS */;
INSERT INTO `relate` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(5,1,2,2);
/*!40000 ALTER TABLE `relate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `team_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `team_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Customer'),(2,'Search'),(3,'Mobile'),(4,'OffSet'),(5,'BigStock');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testcases`
--

DROP TABLE IF EXISTS `testcases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testcases` (
  `tc_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `tc_scenario` varchar(255) NOT NULL,
  `tc_steps` varchar(255) DEFAULT NULL,
  `tc_relate_id` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`tc_id`),
  KEY `tc_relate_id` (`tc_relate_id`),
  CONSTRAINT `testcases_ibfk_1` FOREIGN KEY (`tc_relate_id`) REFERENCES `relate` (`r_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testcases`
--

LOCK TABLES `testcases` WRITE;
/*!40000 ALTER TABLE `testcases` DISABLE KEYS */;
INSERT INTO `testcases` VALUES (1,'Verify login functionality','1,2,3,4,5',1),(3,'verify search','1,2',1),(4,'Verify Negative Login functionality',NULL,1),(5,'Verify Forgot Password',NULL,1),(6,'Verify Display Preferences - Mosaic',NULL,1),(7,'Verify Display Preferences - Large',NULL,1),(8,'Verify Display Preferences - Small',NULL,1),(9,'Verify Display Preferences - Show Preview',NULL,1),(10,'Verify Display Preferences - Safe Search',NULL,1),(11,'Verify Advanced Search - Media Type - All Images',NULL,1),(12,'Verify Advanced Search - Media Type - Photos',NULL,1),(13,'Verify Advanced Search - Media Type - Vectors',NULL,1),(14,'Verify Advanced Search - Media Type - Illustrations',NULL,1);
/*!40000 ALTER TABLE `testcases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testcases_steps`
--

DROP TABLE IF EXISTS `testcases_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testcases_steps` (
  `st_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `st_type` varchar(20) DEFAULT NULL,
  `st_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testcases_steps`
--

LOCK TABLES `testcases_steps` WRITE;
/*!40000 ALTER TABLE `testcases_steps` DISABLE KEYS */;
INSERT INTO `testcases_steps` VALUES (1,'given','I load the Login page'),(2,'when','I enter valid credentials'),(3,'and','I submit the form'),(4,'then','I should be logged in'),(5,'And','I see username in the header');
/*!40000 ALTER TABLE `testcases_steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(40) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `password_hash` varchar(100) DEFAULT NULL,
  `email_main` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mikey','luis','lopez','$2a$10$mJ/7mF86Zlauv.HvMmMHi.CQhedSSeTOXvDhfK0c1x0RSIE9odJoa','mikeylopez@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-09-15 23:53:41
