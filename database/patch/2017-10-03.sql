/*
SQLyog Community Edition- MySQL GUI v7.14 
MySQL - 5.7.17 : Database - lms
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `leaves` */

CREATE TABLE `leaves` (
  `leave_id` int(20) NOT NULL AUTO_INCREMENT,
  `employee_id` int(20) unsigned NOT NULL,
  `reason` varchar(150) NOT NULL,
  `leave_type` enum('half-day','full-day') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `number_of_days` int(3) NOT NULL,
  `applied_on` datetime DEFAULT NULL,
  `responded_on` datetime DEFAULT NULL,
  `status` enum('Initial','Granted','Rejected') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `privelege_of_leave` varchar(20) DEFAULT NULL,
  `responded_by` varchar(60) DEFAULT NULL,
  `rejected_reason` varchar(100) DEFAULT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`leave_id`),
  KEY `fk_leaves_employee_id` (`employee_id`),
  CONSTRAINT `fk_leaves_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `permission` ( 
  `permission_id` int(20) NOT NULL AUTO_INCREMENT, 
  `employee_id` int(20) unsigned NOT NULL, 
  `reason` varchar(150) NOT NULL, 
  `date` date NOT NULL,
  `from_time` time NOT NULL, 
  `to_time` time NOT NULL, 
  `status` enum('Initial','Granted','Rejected') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL, 
  `applied_on` date NOT NULL, 
  `responded_on` date NOT NULL, 
  `responded_by` varchar(60) DEFAULT NULL, 
  `rejected_reason` varchar(100) DEFAULT NULL, 
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`permission_id`), 
  KEY `fk_permission_employee_id` (`employee_id`), 
  CONSTRAINT `fk_permission_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION 
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1; 


CREATE TABLE `compoff` ( 
  `compoff_id` int(20) unsigned NOT NULL AUTO_INCREMENT, 
  `employee_id` int(20) unsigned NOT NULL, 
  `worked_on` date NOT NULL, 
  `leave_on` date NOT NULL, 
  `description` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL, 
  `status` enum('Initial','Granted','Rejected') COLLATE utf8_unicode_ci NOT NULL, 
  `applied_on` datetime NOT NULL, 
  `responded_on` datetime DEFAULT NULL, 
  `responded_by` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL, 
  `rejected_reason` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL, 
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`compoff_id`), 
  KEY `fk_compoff_employee_id_idx` (`employee_id`), 
  CONSTRAINT `fk_compoff_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION 
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `department` (
  `department_id` int(20) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(20) DEFAULT NULL,
  `description` varchar(250) CHARACTER SET utf8 NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `holiday` (
  `holiday_id` int(20) NOT NULL AUTO_INCREMENT,
  `holiday_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `holiday_date` date DEFAULT NULL,
  `location_id` int(20) NOT NULL,
  `department_id` int(20) NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`holiday_id`),
  KEY `fk_holiday_department_id` (`department_id`),
  KEY `fk_holiday_location_id` (`location_id`),
  CONSTRAINT `FK_holiday_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `FK_holiday_location_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `location` (
  `location_id` int(20) NOT NULL AUTO_INCREMENT,
  `location_number` int(20) NOT NULL,
  `location_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `location_street` varchar(50) CHARACTER SET utf8 NOT NULL,
  `location_city` varchar(50) CHARACTER SET utf8 NOT NULL,
  `location_state` varchar(50) CHARACTER SET utf8 NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `location_number_UNIQUE` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calendar` (
  `calendar_id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(10) DEFAULT NULL,
  `monday` tinyint(1) NOT NULL DEFAULT '0',
  `tuesday` tinyint(1) NOT NULL DEFAULT '0',
  `wednesday` tinyint(1) NOT NULL DEFAULT '0',
  `thursday` tinyint(1) NOT NULL DEFAULT '0',
  `friday` tinyint(1) NOT NULL DEFAULT '0',
  `saturday` tinyint(1) NOT NULL DEFAULT '0',
  `sunday` tinyint(1) NOT NULL DEFAULT '0',
   `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`calendar_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `settings_id` int(20) NOT NULL AUTO_INCREMENT,
  `remainder_days` int(20) NOT NULL,
  `compoff_expiry` int(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL,
  PRIMARY KEY (`settings_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

