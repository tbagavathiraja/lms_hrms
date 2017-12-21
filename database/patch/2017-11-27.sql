-- MySQL dump 10.13  Distrib 5.6.33, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: lms_test1
-- ------------------------------------------------------
-- Server version	5.6.33-0ubuntu0.14.04.1

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
-- Table structure for table `assessment_parameter`
--

DROP TABLE IF EXISTS `assessment_parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assessment_parameter` (
  `assessment_parameter_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `parameter_name` varchar(45) CHARACTER SET utf8 NOT NULL,
  `default_parameter_weightage` int(2) unsigned NOT NULL,
  `apraisal_parameter_type` enum('KRA','GENERAL') CHARACTER SET latin1 NOT NULL,
  `active` tinyint(1) unsigned DEFAULT '1',
  `tenant_id` int(20) unsigned NOT NULL,
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`assessment_parameter_id`),
  KEY `fk_assessment_parameter_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_assessment_parameter_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_parameter`
--

LOCK TABLES `assessment_parameter` WRITE;
/*!40000 ALTER TABLE `assessment_parameter` DISABLE KEYS */;
INSERT INTO `assessment_parameter` VALUES (43,'asdfasdf',1,'GENERAL',1,1,1,'2017-10-31 06:02:06','2017-10-31 06:02:06'),(44,'gf',2,'GENERAL',1,1,1,'2017-10-31 10:44:24','2017-10-31 10:44:24'),(45,'sadas',3,'GENERAL',1,1,1,'2017-10-31 12:57:59','2017-10-31 12:57:59');
/*!40000 ALTER TABLE `assessment_parameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assessment_period`
--

DROP TABLE IF EXISTS `assessment_period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assessment_period` (
  `period_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `submission_start_date` datetime NOT NULL,
  `submission_end_date` datetime NOT NULL,
  `resubmission_end_date` datetime NOT NULL,
  `active` tinyint(1) unsigned DEFAULT '1',
  `tenant_id` int(20) unsigned NOT NULL,
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`period_id`),
  KEY `fk_period_table_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_period_table_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment_period`
--

LOCK TABLES `assessment_period` WRITE;
/*!40000 ALTER TABLE `assessment_period` DISABLE KEYS */;
INSERT INTO `assessment_period` VALUES (43,'2017-10-01','2017-12-31','2017-10-19 00:00:00','2017-10-26 00:00:00','2017-10-26 00:00:00',0,1,0,'2017-10-30 12:07:07','2017-10-30 12:07:07');
/*!40000 ALTER TABLE `assessment_period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar`
--

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (3,5,1,1,1,1,1,0,0,'2017-10-30 12:32:49','2017-10-31 18:26:30'),(4,0,0,0,0,0,0,0,0,'2017-10-31 11:32:31','2017-10-31 16:09:07');
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compoff`
--

DROP TABLE IF EXISTS `compoff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compoff`
--

LOCK TABLES `compoff` WRITE;
/*!40000 ALTER TABLE `compoff` DISABLE KEYS */;
INSERT INTO `compoff` VALUES (1,37,'2017-11-23','2017-11-29','fgdgdfguyhhhhhhhhhhhhhhhjggggggggggggggg','Initial','2017-11-23 11:11:18',NULL,NULL,NULL,'2017-11-23 11:11:18','2017-11-23 11:11:18');
/*!40000 ALTER TABLE `compoff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `department_id` int(20) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(20) DEFAULT NULL,
  `description` varchar(250) CHARACTER SET utf8 NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (4,'test','test','2017-10-30 12:30:30','2017-10-30 12:30:30'),(5,'dsfsd','dsfsdfs','2017-11-17 10:44:33','2017-11-17 10:44:33');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `employee_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee_number` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `employee_name` varchar(60) CHARACTER SET utf8 NOT NULL,
  `employee_email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `employee_password` varchar(45) CHARACTER SET latin1 NOT NULL,
  `designation` varchar(45) CHARACTER SET utf8 NOT NULL,
  `date_of_joining` date NOT NULL,
  `location` varchar(45) CHARACTER SET utf8 NOT NULL,
  `department` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) unsigned DEFAULT '1',
  `tenant_id` int(20) unsigned NOT NULL,
  `admin_access` tinyint(1) NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_id_UNIQUE` (`employee_id`),
  KEY `fk_employee_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_employee_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'1','Padmanaban','test@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','Senior project manager','2013-02-01','chennai','',1,1,1,0,'2016-11-16 05:46:45','2017-11-02 04:36:46'),(2,'2','Thangarajj m','thangaraj.matheson@ionixxtech.com','cc03e747a6afbbcbf8be7668acfebee5','Test engineer','0000-00-00','chennai','',1,1,0,1,'2016-11-16 05:46:45','2017-10-27 07:13:13'),(3,'4','Lokeshkumar s','lokeshkumar.sankaralingam@ionixxtech.com','ceb6c970658f31504a901b89dcd3e461','Module leader','2017-11-17','OMR','dsfsd',1,1,0,0,'2016-11-16 05:46:45','2017-11-27 10:54:56'),(4,'5','Paramasivan ss','paramasivan.selvaraj@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','Senior programmer','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2017-11-02 10:33:47'),(5,'10','Jebanand k c','jc@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','Project manager','2013-09-25','chennai','',1,1,0,0,'2016-11-16 05:46:45','2017-08-16 15:01:02'),(6,'17','BALAMURUGAN N K','balamurugan.karuppaiya@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','PROJECT LEADER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(7,'19','ABDUL RAHUMAN ','ar@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','PROJECT MANAGER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(8,'22','Ganapathi raman g','ganapathiraman.gurusamy@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','Module leader','2013-10-02','chennai','',1,1,0,0,'2016-11-16 05:46:45','2017-08-03 13:45:44'),(9,'23','KARTHIC K','karthic.kumar@ionixxtech.com','','PROJECT LEADER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(10,'30','BASKAR N','baskar.natarajan@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','MODULE LEADER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(11,'34','ASHOK J','ashok.jayaprakash@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','SENIOR PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(12,'35','Ezra johnson p','ezrajohnson.paularul@ionixxtech.com','5a105e8b9d40e1329780d62ea2265d8a','Senior programmer','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2017-08-10 21:05:09'),(13,'36','Kaniazhagan k','kaniazhagan.kasi@ionixxtech.com','','Module leader','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2017-08-07 18:03:12'),(14,'44','HARI BABU V','haribabu.venugopal@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','SENIOR PROGRAMMER','0000-00-00','chennai','',0,1,0,0,'2016-11-16 05:46:45','2017-07-21 15:34:26'),(15,'45','Ramesh babu r','rameshbabu.ragavan@ionixxtech.com','5a105e8b9d40e1329780d62ea2265d8a','Senior programmer','2017-08-10','srp tools','',1,1,0,1,'2016-11-16 05:46:45','2017-08-10 15:36:08'),(16,'46','VISWANATHAN M','Viswanath.sundaram@ionixxtech.com','','PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(17,'47','Sakthi saravana s','sakthisaravana.sundaramurthy@ionixxtech.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Senior test engineer','2014-08-15','chennai','',1,1,0,0,'2016-11-16 05:46:45','2017-08-10 11:43:05'),(18,'50','SRINIVAS ANAND Y R S N','sa@ionixxtech.com','','CHIEF OPERATING OFFICER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(19,'54','NATARAJAN M','natarajan.muthulingam@ionixxtech.com','','TRAINEE TEST ENGINEER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(20,'55','SATHYASRI KANNAN ','sathyasri.kannan@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(21,'56','KEERTHIKA J R','keerthika.ramdoss@ionixxtech.com','','PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(22,'57','KARPAGA SUNDARI R','karpagasundari.ramasundaram@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(23,'58','Anitha tT','anitha.thilagar@ionixxtech.com','','Programmer','2017-08-16','chennai','',1,1,0,0,'2016-11-16 05:46:45','2017-08-08 01:46:13'),(24,'68','VENKATESH REDDY P','venkatesh.pauvulluri@ionixxtech.com','','SENIOR TEST ENGINEER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(25,'72','PRAVEEN P','praveen.puthumaikan@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(26,'75','RAM PRAKASH B','ramprakash.balachandran@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(27,'77','PRABHAKARAN K','prabhakaran.krishnan@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(28,'82','PADMANABAN S','padmanaban.subramanian@ionixxtech.com','','PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(29,'83','ROHIT KUMAR ','rohitkumar@ionixxtech.com','','TEST ENGINEER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(30,'85','Mohammed jishad ','mohammed.jishad@ionixxtech.com','098f6bcd4621d373cade4e832627b4f6','Trainee programmer','0000-00-00','velacherry','',1,1,0,0,'2016-11-16 05:46:45','2017-08-04 18:41:27'),(31,'86','Vivek t','vivek.tamilarasan@ionixxtech.com','','Trainee programmer','0000-00-00','chennai.','',1,1,0,0,'2016-11-16 05:46:45','2017-10-30 12:09:34'),(32,'87','AMARNADH ESWAR I','amarnadh.eswar@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(33,'88','SAI VINAY MOHAN I','saivinaymohan.i@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(34,'89','CHANESH BABU G','chaneshbabu.gopinath@ionixxtech.com','','BUSINESS DEVELOPMENT MANAGER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(35,'90','REVATHI V','revathi.vijayaraj@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(36,'91','RAJARAM S','rajaram.selvam@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(37,'92','Selvarani r','selvarani.ravi@ionixxtech.com','ceb6c970658f31504a901b89dcd3e461','Trainee programmer','2017-06-29','srb tools','dsfsd',1,1,0,0,'2016-11-16 05:46:45','2017-11-23 18:29:02'),(38,'93','BALAMURUGAN A','balamurugan.aasaipandian@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(39,'94','KEERTHANA R','keerthana.ravichandran@ionixxtech.com','','TRAINEE PROGRAMMER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(40,'95','RINGU G','ringu.george@ionixxtech.com','','SENIOR SOFTWARE DEVELOPER','0000-00-00','chennai','',1,1,0,0,'2016-11-16 05:46:45','2016-11-16 05:46:45'),(41,'96','BALAMURUGAN G','balamurugan.gurusamy@ionixxtech.com','','SENIOR SOFTWARE DEVELOPER','2013-02-01','chennai','',1,1,0,1,'2016-11-16 05:46:45','2017-07-28 10:25:26'),(43,'97','test','ganapathiraman.gurusamy1@ionixxtech.com','','test','0000-00-00','test','',1,1,0,1,'2017-07-21 18:03:03','2017-07-21 18:04:10'),(44,'0','Admin','admin@ionixxtech.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Administrator','0000-00-00','Chennai','',1,1,0,0,'2017-08-03 09:16:07','2017-08-03 09:16:07'),(45,'1','Test admin','testadmin@gmail.com','cc03e747a6afbbcbf8be7668acfebee5','admin','2017-03-06','srp tools','',1,1,0,0,'2017-08-03 18:38:00','2017-08-03 18:38:00'),(46,'1','test admin2','testadmin@gmail.com','cc03e747a6afbbcbf8be7668acfebee5','admin two','2017-05-08','srp tools','',1,1,0,0,'2017-08-03 18:39:22','2017-08-03 18:39:22'),(47,'1','test admin2','admin2@gmail.com','cc03e747a6afbbcbf8be7668acfebee5','admin two','2017-05-08','srp tools','',1,1,0,0,'2017-08-03 18:39:41','2017-08-03 18:39:41'),(48,'1','testad','testadmin@gmail.com','cc03e747a6afbbcbf8be7668acfebee5','admmmin','2017-06-01','velcherry','',1,1,0,0,'2017-08-03 18:42:08','2017-08-03 18:42:08'),(49,'1','Testad','test2admin@gmail.com','cc03e747a6afbbcbf8be7668acfebee5','Admmmin','2017-06-01','velcherry','',1,1,0,0,'2017-08-03 18:42:29','2017-08-04 18:28:30'),(50,'12','test emp','testag@gmail.com','cc03e747a6afbbcbf8be7668acfebee5','test','2017-08-01','chenni  ','',1,1,0,0,'2017-08-03 20:47:17','2017-08-03 20:47:17'),(51,'0','dsdsd','sdsd@gmauil.com','e10adc3949ba59abbe56e057f20f883e','sdsds','2017-08-04','sdsdsdsdsd','',1,1,0,0,'2017-08-04 14:13:26','2017-08-04 14:13:26'),(52,'4294967295','Ssssakthi','dfdfd@fdf.com','42456ebf12c55343a17ae186d4bce08d','Sdaadasdada','2017-08-25','dadadad','',1,1,0,1,'2017-08-07 18:25:28','2017-08-07 12:57:23'),(53,'23','second','first@gmail.com','9b65f03b800741822d3885acfc4b22f2','Senior programmer','2017-08-31','chennai','',1,1,0,0,'2017-08-07 18:31:23','2017-08-07 18:42:04'),(54,'43','Resource','resource@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','resource manager','2017-08-25','chennai','',1,1,0,0,'2017-08-07 19:26:06','2017-08-07 19:26:06'),(55,'44','Abc','abc@gmail.com','61bd60c60d9fb60cc8fc7767669d40a1','Programmer','2017-08-04','Bangalore','',1,1,0,0,'2017-08-07 19:49:29','2017-08-07 20:00:27'),(56,'55','basha','basha@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmer','2017-08-31','Chennai','',1,1,0,0,'2017-08-07 19:55:53','2017-08-07 19:55:53'),(57,'56','abcdemployee','abcd@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Senior lead','2017-08-17','Bangalore','',1,1,0,0,'2017-08-07 20:03:03','2017-08-08 01:48:44'),(58,'100','Admin','admin@sample.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','admin programmer','2013-08-30','chennai','',1,1,0,0,'2017-08-07 20:18:44','2017-08-07 20:18:44'),(59,'101','Manager','manager@sample.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Senior programmer','2017-08-31','Chennai','',1,1,0,0,'2017-08-07 20:20:47','2017-08-07 20:20:47'),(60,'102','Leave','lead@sample.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','lead programmer','2017-08-18','Chennai','',1,1,0,0,'2017-08-07 20:45:47','2017-08-07 20:45:47'),(61,'103','Employee','employee@sample.com','cc03e747a6afbbcbf8be7668acfebee5','Trainee','2017-08-31','Bangalore','',1,1,0,1,'2017-08-07 20:46:40','2017-10-27 06:59:18'),(62,'4294967295','Newemp','employeeemailasdadadadadaddadaddadadadadadadaadadadadaadadsadadad@gmail.com','de9941d863a2969104e2410b7c03a673','Fresher','2017-08-14','chennai','',1,1,0,1,'2017-08-07 23:48:09','2017-08-07 19:08:20'),(63,'147','Sampleemployee','sampleemployee@gmail.com','751cb3f4aa17c36186f4856c8982bf27','Programmer','2017-08-31','Bangalore','',1,1,0,1,'2017-08-10 11:44:14','2017-08-10 06:20:31'),(64,'49','Samemployeeeee','same@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmernew','2017-08-18','Chennai','',1,1,0,0,'2017-08-10 12:57:54','2017-08-10 18:39:12'),(65,'480','dada','asda@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','asdada','2017-08-31','sdad','',1,1,0,0,'2017-08-10 13:06:59','2017-08-10 13:06:59'),(66,'445','ddadaa','dada@fdf.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','adada','2017-09-29','adada','',1,1,0,1,'2017-08-10 13:43:25','2017-08-21 11:55:42'),(67,'454','Sakthiemp','sakthiemployee@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmerr','2014-08-21','Chennai','',1,1,0,1,'2017-08-10 15:09:30','2017-08-10 10:08:24'),(68,'455','sakthiadmin','sakthiadmin@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Admin','2017-08-11','Bangalore','',1,1,0,1,'2017-08-10 15:43:29','2017-08-10 10:15:42'),(69,'544','dad','adad@fd.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','aSAs','2017-08-24','AaS','',1,1,0,1,'2017-08-10 15:44:20','2017-08-10 10:14:39'),(70,'455','sakthilead','sakthiead@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Senior programmer','2017-08-31','Mumbai','',1,1,0,1,'2017-08-10 15:46:42','2017-08-10 10:46:24'),(71,'456','sakthimanager','sakthimanager@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Manager','2017-08-25','Cochin','',1,1,0,1,'2017-08-10 16:17:00','2017-08-10 10:47:49'),(72,'555','Sakthitest','sakthitest@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmer','2017-08-25','Chennai','',1,1,0,0,'2017-08-10 18:46:48','2017-08-10 18:50:03'),(73,'333','siva','siva@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','ddfd','2017-08-11','dadada','',1,1,0,1,'2017-08-11 20:23:41','2017-08-11 14:54:05'),(74,'988','Newassessmetn','newtrainee@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmer','2017-08-24','Bangalore','',1,1,0,0,'2017-08-16 11:49:53','2017-08-16 11:58:21'),(75,'777','Newemployee1','newtrainee1@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmer','2017-08-17','CHENNAI','',1,1,0,0,'2017-08-16 12:01:10','2017-08-16 12:01:10'),(76,'767','Newemployee3','Newemployee@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmer','2017-08-25','Bangalore','',1,1,0,0,'2017-08-16 13:04:39','2017-08-16 13:05:36'),(77,'666','Cgocg0v0uc','Cho@xftx.ugfu','e64b78fc3bc91bcbc7dc232ba8ec59e0',' cxgx','2017-08-30','Hpcphccu','',1,1,0,1,'2017-08-16 13:38:23','2017-08-16 08:09:15'),(78,'223','Vkgky','Hkcycy@_¥%/¥6.ccc','e64b78fc3bc91bcbc7dc232ba8ec59e0','Meeramaideen y','2017-08-31','Meeramaideen ','',1,1,0,1,'2017-08-16 14:56:03','2017-08-16 09:31:11'),(79,'213','<p>I will display &euro;</p>','dada@fdf.com','8288b2eafd62b38cc772c557cbe81a8a','<p>I will display &euro;<','2017-08-04','<p>I will display &euro;</p>','',1,1,0,1,'2017-08-16 16:22:14','2017-08-21 11:55:42'),(80,'333','<!doctype html> <html> <body>  <h2>javascript numbers</h2>  ','dsas@ss.com','fe364450e1391215f596d043488f989f','<!doctype html> <html> <b','2017-08-10','<!DOCTYPE html> <html> <body> ','',1,1,0,1,'2017-08-16 16:23:51','2017-08-21 11:55:37'),(81,'344','Copy/Paste the entire text of Hamlet (thanks to QA Hates You','asdad@sfdf.com','c26c5e13019d85df3ea45b352d2b8f78','Copy/Paste the entire tex','2017-08-16','Copy/Paste the entire text of ','',1,1,0,1,'2017-08-16 16:38:04','2017-08-21 11:55:33'),(82,'989','Gana','gana@test.com','5a105e8b9d40e1329780d62ea2265d8a','test','2017-08-10','test','',1,1,0,0,'2017-08-21 15:56:34','2017-08-21 15:56:34'),(83,'675','Gana','gana1@test.com','5a105e8b9d40e1329780d62ea2265d8a','Test','2017-08-11','Vvv','',1,1,0,0,'2017-08-21 16:00:03','2017-08-21 16:00:03'),(84,'98','test','test2@ionixxtech.com','5a105e8b9d40e1329780d62ea2265d8a','test','2017-09-13','test','',1,1,0,0,'2017-09-01 16:11:37','2017-09-01 16:11:37'),(85,'99','test2','test34@test.com','5a105e8b9d40e1329780d62ea2265d8a','test','2017-09-14','test','',1,1,0,0,'2017-09-04 13:11:40','2017-09-04 13:11:40'),(86,'45','test','test54@test.com','5a105e8b9d40e1329780d62ea2265d8a','test','2017-09-15','test','',1,1,0,1,'2017-09-04 16:40:56','2017-09-04 11:11:07'),(87,'240','Hello','Hello@gmail.com','2481656a94ba52fd208ea3b8f7e1d645','Test eng','2017-09-22','srb tools','test',1,1,0,0,'2017-09-05 15:25:52','2017-11-20 11:51:49'),(88,'33','Hellonew','Hellonew@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0',' cvvv','2017-09-29','Chennai','',1,1,0,1,'2017-09-05 15:47:03','2017-09-05 10:34:15'),(89,'42','Sakthi newgggggghhhhhhhhhjjhjjjjjjjjjjhhhhhhhhhhhhhhhhhh','Cutfyi@cfvfbg.drf','e64b78fc3bc91bcbc7dc232ba8ec59e0','Hellooooooo and I love th','2017-09-23','Chebgggvgg is a new woman and ','',1,1,0,1,'2017-09-05 16:25:23','2017-10-06 06:23:29'),(90,'311','Sakthineww','Sakthinew@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Senior tester','2017-09-29','Chennai','',1,1,0,1,'2017-09-05 16:33:50','2017-09-05 12:02:54'),(91,'554','Sakthinew','Sakthii@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmer','2017-09-14','Chennai','',1,1,0,0,'2017-09-05 17:44:21','2017-09-05 17:44:21'),(92,'1054','Newtestt','newtest@gmail.com','e64b78fc3bc91bcbc7dc232ba8ec59e0','Programmer','2017-09-07','Chennai','',1,1,0,1,'2017-09-05 18:25:57','2017-09-05 12:58:21'),(93,'2243','Sanjay','sanjay@grr.la','cc03e747a6afbbcbf8be7668acfebee5','Trainee programmer','2017-03-06','velacherry','',1,1,0,1,'2017-10-30 12:52:53','2017-11-02 19:34:21'),(94,'2243','Sanjay','sanjay@grr.la','cc03e747a6afbbcbf8be7668acfebee5','Trainee programmer','2017-03-06','velacherry','',1,1,0,0,'2017-10-30 12:54:51','2017-11-02 19:34:21'),(95,'22432','barath','barath.murugan@ionixxtech.com','ceb6c970658f31504a901b89dcd3e461','test','2017-10-02','chennai,SRB tools','',1,1,1,1,'2017-10-30 12:59:09','2017-10-30 07:30:16'),(96,'22222','Test manager','manger@grr.la','cc03e747a6afbbcbf8be7668acfebee5','Test manager','2017-10-05','Chennai','',1,1,0,0,'2017-10-30 13:01:49','2017-11-07 10:55:47'),(97,'111','Admin','admin@gmail.com','cc03e747a6afbbcbf8be7668acfebee5','Admin','2017-10-01','OMR','test',1,1,1,0,'2017-10-30 16:28:19','2017-11-20 11:46:57'),(98,'150','Vik','vikram.ravichandran@ionixxtech.com','ceb6c970658f31504a901b89dcd3e461','Fdgd','2017-10-26','srb tools','test',1,1,0,0,'2017-10-31 10:51:35','2017-11-27 12:40:54'),(99,'250','fdgd','test1234@ionixxtech.com','ceb6c970658f31504a901b89dcd3e461','dsffdsf','2017-11-15','srb tools','test',1,1,0,0,'2017-11-16 13:17:30','2017-11-16 13:17:30'),(100,'137','Bhagavathi Raja','bagavathiraja.t@ionixxtech.com','ceb6c970658f31504a901b89dcd3e461','trainee','2017-11-23','srb tools','test',1,1,0,0,'2017-11-27 10:56:58','2017-11-27 10:56:58');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_assessment`
--

DROP TABLE IF EXISTS `employee_assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_assessment` (
  `employee_assessment_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int(20) unsigned NOT NULL,
  `period_id` int(20) unsigned NOT NULL,
  `assessment_status` enum('NEED_TO_FILL','DRAFT','SUBMITTED','REVERTED','ASSESSED','CLOSED') CHARACTER SET utf8 NOT NULL,
  `employee_comment` text CHARACTER SET utf8 NOT NULL,
  `employee_development_plan` text CHARACTER SET utf8 NOT NULL,
  `employee_improvement_area` text CHARACTER SET utf8 NOT NULL,
  `tenant_id` int(20) unsigned NOT NULL,
  `is_deleted` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`employee_assessment_id`),
  KEY `fk_employee_assessment_employee_id_idx` (`employee_id`),
  KEY `fk_employee_assessment_tenant_id_idx` (`tenant_id`),
  KEY `fk_employee_assessment_period_id_idx` (`period_id`,`tenant_id`),
  CONSTRAINT `fk_employee_assessment_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_assessment_period_id` FOREIGN KEY (`period_id`) REFERENCES `assessment_period` (`period_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_assessment_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=722 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_assessment`
--

LOCK TABLES `employee_assessment` WRITE;
/*!40000 ALTER TABLE `employee_assessment` DISABLE KEYS */;
INSERT INTO `employee_assessment` VALUES (720,3,42,'NEED_TO_FILL','','','',1,0,'2017-10-27 18:57:17','2017-10-27 18:57:17'),(721,25,42,'NEED_TO_FILL','','','',1,0,'2017-10-27 18:57:17','2017-10-27 18:57:17');
/*!40000 ALTER TABLE `employee_assessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_assessment_details`
--

DROP TABLE IF EXISTS `employee_assessment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_assessment_details` (
  `employee_assessment_details_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee_assessment_id` int(20) unsigned NOT NULL,
  `assessment_parameter_id` int(20) unsigned NOT NULL,
  `parameter_weightage` int(2) unsigned NOT NULL,
  `apraisee_comments` text CHARACTER SET latin1 NOT NULL,
  `appraiser_remarks` text CHARACTER SET latin1 NOT NULL,
  `appraisee_rating` int(2) unsigned NOT NULL,
  `appraiser_rating` int(2) unsigned NOT NULL,
  `milestone` text CHARACTER SET latin1 NOT NULL,
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`employee_assessment_details_id`),
  KEY `fk_employee_assessment_details_tenant_id` (`tenant_id`),
  KEY `fk_employee_assessment_details_employee_assessment_id_idx` (`employee_assessment_id`),
  KEY `fk_employee_assessment_details_assessment_parameter_id_idx` (`assessment_parameter_id`),
  CONSTRAINT `fk_employee_assessment_details_assessment_parameter_id` FOREIGN KEY (`assessment_parameter_id`) REFERENCES `assessment_parameter` (`assessment_parameter_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_assessment_details_employee_assessment_id` FOREIGN KEY (`employee_assessment_id`) REFERENCES `employee_assessment` (`employee_assessment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_assessment_details_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_assessment_details`
--

LOCK TABLES `employee_assessment_details` WRITE;
/*!40000 ALTER TABLE `employee_assessment_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_assessment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_assessment_log`
--

DROP TABLE IF EXISTS `employee_assessment_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_assessment_log` (
  `employee_assessment_log_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee_assessment_id` int(20) unsigned NOT NULL,
  `old_status` enum('NEED_TO_FILL','DRAFT','SUBMITTED','REVERTED','ASSESSED','CLOSED') COLLATE utf8_unicode_ci NOT NULL,
  `new_status` enum('NEED_TO_FILL','DRAFT','SUBMITTED','REVERTED','ASSESSED','CLOSED') COLLATE utf8_unicode_ci NOT NULL,
  `updated_by` int(20) unsigned NOT NULL,
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`employee_assessment_log_id`),
  KEY `fk_employee_assessment_log_employee_assessment_id_idx` (`employee_assessment_id`),
  KEY `fk_employee_assessment_log_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_employee_assessment_log_employee_assessment_id` FOREIGN KEY (`employee_assessment_id`) REFERENCES `employee_assessment` (`employee_assessment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_assessment_log_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_assessment_log`
--

LOCK TABLES `employee_assessment_log` WRITE;
/*!40000 ALTER TABLE `employee_assessment_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_assessment_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_project`
--

DROP TABLE IF EXISTS `employee_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_project` (
  `employee_project_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(20) unsigned NOT NULL,
  `employee_id` int(20) unsigned NOT NULL,
  `role_type` enum('MEMBER','REPORT_MANAGER','ASSESSMENT_MANAGER') COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `active` tinyint(1) unsigned DEFAULT '1',
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`employee_project_id`),
  KEY `fk_employee_project_project_id_idx` (`project_id`),
  KEY `fk_employee_project_employee_id_idx` (`employee_id`),
  KEY `fk_employee_project_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_employee_project_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_project_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_project_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=692 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_project`
--

LOCK TABLES `employee_project` WRITE;
/*!40000 ALTER TABLE `employee_project` DISABLE KEYS */;
INSERT INTO `employee_project` VALUES (1,3,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(2,7,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(3,8,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(4,9,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(5,11,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(6,13,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(7,14,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(8,16,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(9,17,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(10,19,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(11,21,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(12,22,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(13,20,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(14,23,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(15,24,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(16,12,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(17,10,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(18,26,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(19,24,2,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(20,10,2,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(21,19,2,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(22,8,3,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(23,3,3,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(24,12,4,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(25,11,5,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(26,16,5,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(27,17,5,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(28,18,5,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(29,21,5,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(30,10,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(31,9,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(32,11,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(33,14,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(34,17,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(35,13,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(36,18,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(37,19,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(38,3,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(39,7,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(40,21,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(41,22,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(42,20,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(43,23,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(44,24,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(45,26,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(46,12,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(47,8,6,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(48,13,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(49,11,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(50,9,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(51,19,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(52,8,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(53,7,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(54,10,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(55,20,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(56,21,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(57,12,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(58,26,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(59,16,8,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(60,13,8,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(61,13,9,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(62,20,9,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(63,12,9,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(64,27,9,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(65,23,10,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(66,8,13,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(67,16,13,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(68,3,13,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(69,7,13,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(70,10,14,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(71,14,14,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(72,9,14,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(73,19,14,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(74,22,14,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(75,23,14,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(76,24,14,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(77,10,15,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(78,11,15,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(79,17,15,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(80,19,15,'REPORT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(81,9,17,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(82,12,19,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(83,12,20,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(84,7,21,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(85,3,21,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(86,13,22,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(87,12,23,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(88,11,24,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(89,17,25,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(90,18,25,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(91,21,25,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(92,22,25,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(93,10,25,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(94,9,25,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(95,13,26,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(96,13,27,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(97,27,27,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(98,13,28,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(99,10,29,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(100,13,29,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(101,13,30,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(102,26,30,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(103,9,31,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(104,9,32,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(105,13,33,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(106,24,33,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(107,26,33,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(108,13,35,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(109,20,35,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(110,19,35,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(111,10,35,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(112,12,35,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(113,8,36,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(114,7,36,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(115,17,37,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(116,10,38,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(117,19,38,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(118,13,39,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(119,11,39,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(120,10,40,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(121,11,40,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(122,20,40,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(123,20,41,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(124,11,41,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(125,10,41,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(126,10,42,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(127,11,42,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-11-29 07:26:52','2016-11-29 07:26:52'),(128,28,11,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-12-19 16:47:39','2016-12-19 16:47:43'),(129,28,12,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-12-19 16:47:39','2016-12-19 16:47:43'),(130,28,16,'MEMBER','2016-07-01','2016-11-30',1,1,'2016-12-19 16:47:39','2016-12-19 16:47:43'),(131,28,1,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-12-19 16:47:39','2016-12-19 16:47:43'),(132,28,5,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-12-19 16:47:39','2016-12-19 16:47:43'),(133,28,7,'ASSESSMENT_MANAGER','2016-07-01','2016-11-30',1,1,'2016-12-19 16:47:39','2016-12-19 16:47:43'),(134,11,2,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(135,23,2,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(136,27,2,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(137,24,2,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(138,31,2,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(139,19,2,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(140,10,2,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(141,34,3,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(142,43,3,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(143,12,3,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(144,8,3,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(145,12,4,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(146,27,8,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(147,13,8,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(148,31,8,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(149,11,10,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(150,23,10,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(151,37,10,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(152,39,10,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(153,33,10,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(154,11,11,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(155,41,11,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(156,7,13,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(157,3,13,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(158,8,13,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(159,23,14,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(160,29,14,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(161,24,14,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(162,12,14,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(163,22,14,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(164,41,14,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(165,10,14,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(166,11,15,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(167,36,15,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(168,11,17,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(169,29,17,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(170,9,17,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(171,12,19,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(172,12,20,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(173,32,20,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(174,7,21,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(175,27,22,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(176,24,22,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(177,13,22,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(178,12,23,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(179,11,24,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(180,36,24,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(181,41,24,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(182,10,24,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(183,11,25,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(184,27,25,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(185,31,25,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(186,17,25,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(187,10,25,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(188,18,25,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(189,42,25,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(190,23,26,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(191,27,26,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(192,24,26,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(193,38,26,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(194,13,26,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(195,32,26,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(196,22,26,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(197,10,26,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(198,27,27,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(199,13,27,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(200,32,27,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(201,41,27,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(202,27,28,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(203,13,28,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(204,43,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(205,27,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(206,38,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(207,30,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(208,13,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(209,19,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(210,32,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(211,41,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(212,10,29,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(213,27,30,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(214,12,30,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(215,13,30,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(216,26,30,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(217,39,30,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(218,9,31,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(219,26,31,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(220,37,31,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(221,40,31,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(222,36,31,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(223,9,32,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(224,26,32,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(225,37,32,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(226,7,33,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(227,24,33,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(228,22,33,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(229,26,33,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(230,40,33,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(231,27,35,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(232,12,35,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(233,32,35,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(234,7,36,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(235,8,36,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(236,27,37,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(237,17,37,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(238,11,38,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(239,27,38,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(240,19,38,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(241,10,38,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(242,11,39,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(243,12,39,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(244,19,39,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(245,37,39,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(246,10,39,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(247,11,40,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(248,27,40,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(249,20,40,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(250,44,40,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(251,11,42,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(252,10,42,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(253,11,45,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(254,27,45,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(255,32,45,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(256,11,41,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(257,12,41,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(258,10,41,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(259,28,11,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(260,28,12,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(261,28,16,'MEMBER','2016-12-01','2017-03-31',1,1,'2017-04-05 19:05:17','2017-04-05 19:05:17'),(262,12,47,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(263,32,47,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(264,11,48,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(265,27,48,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(266,42,48,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(267,12,49,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(268,20,49,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(269,27,49,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(270,32,49,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(271,36,49,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(272,43,49,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(273,10,50,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(274,22,50,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(275,23,50,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(276,24,50,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(277,38,50,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(278,39,50,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(279,41,50,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(280,12,51,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(281,32,51,'MEMBER','2017-10-01','2017-05-31',1,1,'2017-06-01 15:30:46','2017-06-01 15:30:46'),(552,10,2,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(553,23,2,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(554,26,2,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(555,27,2,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(556,29,2,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(557,37,2,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(559,12,3,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(560,26,3,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(561,29,3,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(562,48,3,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(566,12,4,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(567,29,4,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(569,26,8,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(570,27,8,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(572,11,10,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(573,12,10,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(574,29,10,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(575,11,11,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(576,12,11,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(577,29,11,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(578,46,11,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(582,3,13,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(583,7,13,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(584,8,13,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(585,10,14,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(586,12,14,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(587,24,14,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(588,34,14,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(589,46,14,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(592,29,15,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(593,37,15,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(594,41,15,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(595,11,17,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(596,29,17,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(597,34,17,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(598,52,17,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(602,12,19,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(603,29,19,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(605,7,21,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(606,29,21,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(608,12,23,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(609,29,23,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(611,12,24,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(612,29,24,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(613,41,24,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(614,46,24,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(618,10,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(619,11,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(620,17,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(621,18,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(622,29,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(623,36,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(624,46,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(625,47,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(626,48,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(627,50,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(628,51,25,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(633,27,28,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(634,10,29,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(635,27,29,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(636,29,29,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(637,43,29,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(638,46,29,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(639,48,29,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(641,26,30,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(642,44,30,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(644,29,31,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(645,41,31,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(646,42,31,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(647,45,31,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(651,26,33,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(652,12,35,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(653,27,35,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(654,29,35,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(655,37,35,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(659,7,36,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(660,8,36,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(661,29,36,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(662,10,37,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(663,17,37,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(664,29,37,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(665,46,37,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(669,10,38,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(670,11,38,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(671,29,38,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(672,49,38,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(676,10,39,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(677,27,39,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(678,29,39,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(679,42,39,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(683,11,40,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(684,29,40,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(685,49,40,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(686,10,41,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(687,29,41,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(688,42,41,'MEMBER','2017-04-01','2017-06-30',1,1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(689,3,57,'REPORT_MANAGER','2017-08-07','2017-08-07',1,1,'2017-08-07 14:52:35','2017-08-07 14:52:35'),(690,7,57,'REPORT_MANAGER','2017-08-07','2017-08-07',1,1,'2017-08-07 14:52:47','2017-08-07 14:52:47'),(691,26,57,'REPORT_MANAGER','2017-08-07','2017-08-07',1,1,'2017-08-07 14:52:57','2017-08-07 14:52:57');
/*!40000 ALTER TABLE `employee_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_reporting`
--

DROP TABLE IF EXISTS `employee_reporting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_reporting` (
  `employee_reporting_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int(20) unsigned NOT NULL,
  `reporting_type` enum('ASSESSMENT') NOT NULL,
  `reporting_employee_id` int(20) unsigned NOT NULL,
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`employee_reporting_id`),
  KEY `fk_employee_reporting_employee_id_idx` (`employee_id`),
  KEY `fk_employee_reporting_tenant_id_idx` (`tenant_id`),
  KEY `fk_employee_reporting_reporting_employee_id_idx` (`employee_id`),
  CONSTRAINT `fk_employee_reporting_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_reporting_reporting_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_reporting_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_reporting`
--

LOCK TABLES `employee_reporting` WRITE;
/*!40000 ALTER TABLE `employee_reporting` DISABLE KEYS */;
INSERT INTO `employee_reporting` VALUES (11,95,'ASSESSMENT',96,1,'2017-10-30 16:35:54','2017-10-30 16:35:54'),(30,24,'ASSESSMENT',6,1,'2017-10-31 11:23:53','2017-10-31 11:23:53'),(31,24,'ASSESSMENT',7,1,'2017-10-31 11:23:53','2017-10-31 11:23:53'),(61,95,'ASSESSMENT',3,1,'2017-11-02 10:39:03','2017-11-02 10:39:03'),(62,95,'ASSESSMENT',4,1,'2017-11-02 10:41:57','2017-11-02 10:41:57'),(63,90,'ASSESSMENT',7,1,'2017-11-02 10:52:20','2017-11-02 10:52:20'),(64,90,'ASSESSMENT',9,1,'2017-11-02 10:52:20','2017-11-02 10:52:20'),(251,40,'ASSESSMENT',4,1,'2017-11-03 14:44:31','2017-11-03 14:44:31'),(255,98,'ASSESSMENT',96,1,'2017-11-08 19:10:41','2017-11-08 19:10:41'),(256,94,'ASSESSMENT',96,1,'2017-11-09 12:37:57','2017-11-09 12:37:57'),(257,37,'ASSESSMENT',98,1,'2017-11-22 13:31:42','2017-11-22 13:31:42'),(258,100,'ASSESSMENT',98,1,'2017-11-27 10:59:08','2017-11-27 10:59:08');
/*!40000 ALTER TABLE `employee_reporting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_roles`
--

DROP TABLE IF EXISTS `employee_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_roles` (
  `employee_role_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(20) unsigned NOT NULL,
  `employee_id` int(20) unsigned NOT NULL,
  `active` tinyint(1) unsigned DEFAULT '1',
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`employee_role_id`),
  KEY `fk_employee_roles_tenant_id_idx` (`tenant_id`),
  KEY `fk_employee_roles_role_id_idx` (`role_id`),
  KEY `fk_employee_roles_employee_id_idx` (`employee_id`),
  CONSTRAINT `fk_employee_roles_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_roles_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_roles`
--

LOCK TABLES `employee_roles` WRITE;
/*!40000 ALTER TABLE `employee_roles` DISABLE KEYS */;
INSERT INTO `employee_roles` VALUES (1,1,1,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(2,4,3,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(3,2,4,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(4,2,5,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(5,4,6,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(6,2,7,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(7,5,8,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(8,4,9,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(9,4,10,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(10,5,11,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(11,5,12,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(12,5,13,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(13,5,14,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(14,5,15,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(15,5,16,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(16,5,17,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(17,2,18,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(18,5,19,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(19,5,20,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(20,5,21,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(21,5,22,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(22,5,23,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(23,5,24,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(24,5,25,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(25,5,26,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(26,5,27,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(27,5,28,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(28,5,29,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(29,5,30,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(30,5,31,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(31,5,32,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(32,5,33,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(33,5,34,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(34,5,35,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(35,5,36,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(36,5,37,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(37,5,38,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(38,5,39,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(39,5,40,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(40,5,41,1,1,'2017-10-27 08:18:11','2017-10-27 08:18:11'),(41,5,93,1,1,'2017-10-30 12:52:53','2017-10-30 12:52:53'),(42,5,94,1,1,'2017-10-30 12:54:51','2017-10-30 12:54:51'),(43,5,95,1,1,'2017-10-30 12:59:09','2017-10-30 12:59:09'),(44,4,96,1,1,'2017-10-30 13:01:49','2017-10-30 13:01:49'),(45,1,97,1,1,'2017-10-30 16:28:19','2017-10-30 16:28:19'),(46,4,98,1,1,'2017-10-31 10:51:35','2017-10-31 10:51:35'),(47,5,99,1,1,'2017-11-16 13:17:30','2017-11-16 13:17:30'),(48,5,87,1,1,'2017-11-20 11:51:49','2017-11-20 11:51:49'),(49,5,100,1,1,'2017-11-27 10:56:58','2017-11-27 10:56:58');
/*!40000 ALTER TABLE `employee_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `future_kra`
--

DROP TABLE IF EXISTS `future_kra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `future_kra` (
  `future_kra_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `kra_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `weightage` int(2) unsigned NOT NULL,
  `employee_id` int(20) unsigned NOT NULL,
  `active` tinyint(1) unsigned DEFAULT '1',
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`future_kra_id`),
  KEY `fk_future_kra_employee_id_idx` (`employee_id`),
  KEY `fk_future_kra_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_future_kra_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_future_kra_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `future_kra`
--

LOCK TABLES `future_kra` WRITE;
/*!40000 ALTER TABLE `future_kra` DISABLE KEYS */;
/*!40000 ALTER TABLE `future_kra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holiday`
--

DROP TABLE IF EXISTS `holiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `holiday` (
  `holiday_id` int(20) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(10) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday`
--

LOCK TABLES `holiday` WRITE;
/*!40000 ALTER TABLE `holiday` DISABLE KEYS */;
INSERT INTO `holiday` VALUES (1,1,'vgfh','2017-11-17',5,4,'2017-11-07 13:32:51','2017-11-07 13:32:59');
/*!40000 ALTER TABLE `holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kra_details`
--

DROP TABLE IF EXISTS `kra_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kra_details` (
  `kra_details_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `employee_assessment_details_id` int(20) unsigned NOT NULL,
  `kra_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`kra_details_id`),
  KEY `fk_kra_details_employee_assessment_details_id_idx` (`employee_assessment_details_id`),
  KEY `fk_kra_details_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_kra_details_employee_assessment_details_id` FOREIGN KEY (`employee_assessment_details_id`) REFERENCES `employee_assessment_details` (`employee_assessment_details_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_kra_details_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2171 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kra_details`
--

LOCK TABLES `kra_details` WRITE;
/*!40000 ALTER TABLE `kra_details` DISABLE KEYS */;
INSERT INTO `kra_details` VALUES (4,16,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(5,17,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(6,18,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(7,31,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(8,32,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(9,33,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(10,46,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(11,47,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(12,48,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(13,61,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(14,62,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(15,63,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(28,136,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(29,137,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(30,138,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(31,151,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(32,152,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(33,153,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(34,166,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(35,167,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(36,168,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(37,181,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(38,182,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(39,183,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(40,196,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(41,197,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(42,198,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(43,211,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(44,212,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(45,213,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(46,226,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(47,227,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(48,228,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(49,241,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(50,242,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(51,243,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(52,256,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(53,257,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(54,258,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(55,271,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(56,272,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(57,273,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(58,286,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(59,287,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(60,288,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(61,301,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(62,302,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(63,303,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(64,316,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(65,317,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(66,318,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(67,331,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(68,332,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(69,333,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(70,346,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(71,347,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(72,348,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(73,361,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(74,362,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(75,363,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(76,376,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(77,377,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(78,378,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(79,391,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(80,392,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(81,393,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(82,406,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(83,407,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(84,408,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(85,421,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(86,422,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(87,423,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(88,436,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(89,437,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(90,438,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(91,451,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(92,452,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(93,453,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(94,466,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(95,467,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(96,468,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(97,481,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(98,482,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(99,483,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(100,496,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(101,497,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(102,498,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(103,511,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(104,512,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(105,513,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(106,526,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(107,527,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(108,528,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(109,541,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(110,542,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(111,543,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(112,556,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(113,557,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(114,558,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(115,571,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(116,572,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(117,573,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(118,586,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(119,587,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(120,588,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(121,601,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(122,602,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(123,603,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(127,630,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(128,631,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(129,632,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(130,644,'KRA-1',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(131,645,'KRA-2',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(132,646,'KRA-3',1,'2016-11-29 07:43:13','2016-11-29 07:43:13'),(1735,8669,'KRA-3',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1736,8668,'KRA-2',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1737,8667,'KRA-1',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1738,8684,'KRA-3',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1739,8683,'KRA-2',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1740,8682,'KRA-1',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1741,8699,'KRA-3',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1742,8698,'KRA-2',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1743,8697,'KRA-1',1,'2017-07-12 16:22:02','2017-07-12 16:22:02'),(1744,8714,'KRA-3',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1745,8713,'KRA-2',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1746,8712,'KRA-1',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1747,8729,'KRA-3',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1748,8728,'KRA-2',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1749,8727,'KRA-1',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1750,8744,'KRA-3',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1751,8743,'KRA-2',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1752,8742,'KRA-1',1,'2017-07-12 16:22:03','2017-07-12 16:22:03'),(1753,8759,'KRA-3',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1754,8758,'KRA-2',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1755,8757,'KRA-1',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1756,8774,'KRA-3',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1757,8773,'KRA-2',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1758,8772,'KRA-1',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1759,8789,'KRA-3',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1760,8788,'KRA-2',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1761,8787,'KRA-1',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1762,8804,'KRA-3',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1763,8803,'KRA-2',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1764,8802,'KRA-1',1,'2017-07-12 16:22:04','2017-07-12 16:22:04'),(1765,8819,'KRA-3',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1766,8818,'KRA-2',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1767,8817,'KRA-1',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1768,8834,'KRA-3',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1769,8833,'KRA-2',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1770,8832,'KRA-1',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1771,8849,'KRA-3',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1772,8848,'KRA-2',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1773,8847,'KRA-1',1,'2017-07-12 16:22:05','2017-07-12 16:22:05'),(1774,8864,'KRA-3',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1775,8863,'KRA-2',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1776,8862,'KRA-1',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1777,8879,'KRA-3',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1778,8878,'KRA-2',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1779,8877,'KRA-1',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1780,8894,'KRA-3',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1781,8893,'KRA-2',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1782,8892,'KRA-1',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1783,8909,'KRA-3',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1784,8908,'KRA-2',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1785,8907,'KRA-1',1,'2017-07-12 16:22:06','2017-07-12 16:22:06'),(1786,8924,'KRA-3',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1787,8923,'KRA-2',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1788,8922,'KRA-1',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1789,8939,'KRA-3',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1790,8938,'KRA-2',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1791,8937,'KRA-1',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1792,8954,'KRA-3',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1793,8953,'KRA-2',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1794,8952,'KRA-1',1,'2017-07-12 16:22:07','2017-07-12 16:22:07'),(1795,8969,'KRA-3',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1796,8968,'KRA-2',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1797,8967,'KRA-1',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1798,8984,'KRA-3',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1799,8983,'KRA-2',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1800,8982,'KRA-1',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1801,8999,'KRA-3',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1802,8998,'KRA-2',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1803,8997,'KRA-1',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1804,9014,'KRA-3',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1805,9013,'KRA-2',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1806,9012,'KRA-1',1,'2017-07-12 16:22:08','2017-07-12 16:22:08'),(1807,9029,'KRA-3',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1808,9028,'KRA-2',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1809,9027,'KRA-1',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1810,9044,'KRA-3',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1811,9043,'KRA-2',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1812,9042,'KRA-1',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1813,9059,'KRA-3',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1814,9058,'KRA-2',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1815,9057,'KRA-1',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1816,9074,'KRA-3',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1817,9073,'KRA-2',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1818,9072,'KRA-1',1,'2017-07-12 16:22:09','2017-07-12 16:22:09'),(1819,9089,'KRA-3',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1820,9088,'KRA-2',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1821,9087,'KRA-1',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1822,9104,'KRA-3',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1823,9103,'KRA-2',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1824,9102,'KRA-1',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1825,9119,'KRA-3',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1826,9118,'KRA-2',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1827,9117,'KRA-1',1,'2017-07-12 16:22:10','2017-07-12 16:22:10'),(1828,9134,'KRA-3',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1829,9133,'KRA-2',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1830,9132,'KRA-1',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1831,9149,'KRA-3',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1832,9148,'KRA-2',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1833,9147,'KRA-1',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1834,9164,'KRA-3',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1835,9163,'KRA-2',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1836,9162,'KRA-1',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1837,9179,'KRA-3',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1838,9178,'KRA-2',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1839,9177,'KRA-1',1,'2017-07-12 16:22:11','2017-07-12 16:22:11'),(1840,9194,'KRA-3',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1841,9193,'KRA-2',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1842,9192,'KRA-1',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1843,9209,'KRA-3',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1844,9208,'KRA-2',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1845,9207,'KRA-1',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1846,9224,'KRA-3',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1847,9223,'KRA-2',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1848,9222,'KRA-1',1,'2017-07-12 16:22:12','2017-07-12 16:22:12'),(1849,9239,'KRA-3',1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(1850,9238,'KRA-2',1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(1851,9237,'KRA-1',1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(1852,9254,'KRA-3',1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(1853,9253,'KRA-2',1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(1854,9252,'KRA-1',1,'2017-07-12 16:22:13','2017-07-12 16:22:13'),(1858,9281,'KRA-0',1,'2017-07-28 10:42:54','2017-07-28 10:42:54'),(1859,9282,'KRA-0',1,'2017-07-28 10:42:54','2017-07-28 10:42:54'),(1860,9283,'KRA-0',1,'2017-07-28 10:42:54','2017-07-28 10:42:54'),(1861,9296,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1862,9297,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1863,9298,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1864,9310,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1865,9311,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1866,9312,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1867,9324,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1868,9325,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1869,9326,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1870,9338,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1871,9339,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1872,9340,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1873,9352,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1874,9353,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1875,9354,'KRA-0',1,'2017-08-03 13:32:09','2017-08-03 13:32:09'),(1876,9366,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1877,9367,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1878,9368,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1879,9381,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1880,9382,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1881,9383,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1882,9396,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1883,9397,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1884,9398,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1885,9411,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1886,9412,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1887,9413,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1888,9426,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1889,9427,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1890,9428,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1891,9441,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1892,9442,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1893,9443,'KRA-0',1,'2017-08-03 15:15:51','2017-08-03 15:15:51'),(1951,9775,'KRA-0',1,'2017-08-07 20:41:45','2017-08-07 20:41:45'),(1952,9776,'KRA-0',1,'2017-08-07 20:41:45','2017-08-07 20:41:45'),(1953,9777,'KRA-0',1,'2017-08-07 20:41:45','2017-08-07 20:41:45'),(1954,9793,'KRA-0',1,'2017-08-08 10:08:07','2017-08-08 10:08:07'),(1955,9794,'KRA-0',1,'2017-08-08 10:08:07','2017-08-08 10:08:07'),(1956,9795,'KRA-0',1,'2017-08-08 10:08:07','2017-08-08 10:08:07'),(1957,9810,'KRA-0',1,'2017-08-09 12:06:45','2017-08-09 12:06:45'),(1958,9811,'KRA-0',1,'2017-08-09 12:06:45','2017-08-09 12:06:45'),(1959,9812,'KRA-0',1,'2017-08-09 12:06:45','2017-08-09 12:06:45'),(1960,9827,'KRA-0',1,'2017-08-10 09:45:25','2017-08-10 09:45:25'),(1961,9828,'KRA-0',1,'2017-08-10 09:45:25','2017-08-10 09:45:25'),(1962,9829,'KRA-0',1,'2017-08-10 09:45:25','2017-08-10 09:45:25'),(1963,9844,'KRA-0',1,'2017-08-10 10:20:11','2017-08-10 10:20:11'),(1964,9845,'KRA-0',1,'2017-08-10 10:20:11','2017-08-10 10:20:11'),(1965,9846,'KRA-0',1,'2017-08-10 10:20:11','2017-08-10 10:20:11'),(1966,9861,'KRA-0',1,'2017-08-10 10:20:11','2017-08-10 10:20:11'),(1971,9884,'KRA-0',1,'2017-08-10 13:16:12','2017-08-10 13:16:12'),(1972,9885,'KRA-0',1,'2017-08-10 13:16:12','2017-08-10 13:16:12'),(1973,9886,'KRA-0',1,'2017-08-10 13:16:12','2017-08-10 13:16:12'),(1974,9901,'KRA-0',1,'2017-08-10 13:16:12','2017-08-10 13:16:12'),(1987,9968,'KRA-0',1,'2017-08-10 13:23:26','2017-08-10 13:23:26'),(1988,9969,'KRA-0',1,'2017-08-10 13:23:26','2017-08-10 13:23:26'),(1989,9970,'KRA-0',1,'2017-08-10 13:23:26','2017-08-10 13:23:26'),(1990,9985,'KRA-0',1,'2017-08-10 13:23:26','2017-08-10 13:23:26'),(1991,9989,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(1992,9990,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(1993,9991,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(1994,10006,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(1995,10010,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(1996,10011,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(1997,10012,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(1998,10027,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(1999,10031,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2000,10032,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2001,10033,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2002,10048,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2003,10052,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2004,10053,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2005,10054,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2006,10069,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2007,10073,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2008,10074,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2009,10075,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2010,10090,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2011,10094,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2012,10095,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2013,10096,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2014,10111,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2015,10115,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2016,10116,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2017,10117,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2018,10132,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2019,10136,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2020,10137,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2021,10138,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2022,10153,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2023,10157,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2024,10158,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2025,10159,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2026,10174,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2027,10178,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2028,10179,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2029,10180,'KRA-0',1,'2017-08-10 13:47:57','2017-08-10 13:47:57'),(2030,10195,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2031,10199,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2032,10200,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2033,10201,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2034,10216,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2035,10220,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2036,10221,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2037,10222,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2038,10237,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2039,10241,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2040,10242,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2041,10243,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2042,10258,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2043,10262,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2044,10263,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2045,10264,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2046,10279,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2047,10283,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2048,10284,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2049,10285,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2050,10300,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2051,10304,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2052,10305,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2053,10306,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2054,10321,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2055,10325,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2056,10326,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2057,10327,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2058,10342,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2059,10346,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2060,10347,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2061,10348,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2062,10363,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2063,10367,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2064,10368,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2065,10369,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2066,10384,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2067,10388,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2068,10389,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2069,10390,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2070,10405,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2071,10409,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2072,10410,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2073,10411,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2074,10426,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2075,10430,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2076,10431,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2077,10432,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2078,10447,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2079,10451,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2080,10452,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2081,10453,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2082,10468,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2083,10472,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2084,10473,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2085,10474,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2086,10489,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2087,10493,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2088,10494,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2089,10495,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2090,10510,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2091,10514,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2092,10515,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2093,10516,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2094,10531,'KRA-0',1,'2017-08-10 13:47:58','2017-08-10 13:47:58'),(2095,10535,'KRA-0',1,'2017-08-16 06:20:10','2017-08-16 06:20:10'),(2096,10536,'KRA-0',1,'2017-08-16 06:20:10','2017-08-16 06:20:10'),(2097,10537,'KRA-0',1,'2017-08-16 06:20:10','2017-08-16 06:20:10'),(2098,10552,'KRA-0',1,'2017-08-16 06:20:10','2017-08-16 06:20:10'),(2111,10617,'KRA-0',1,'2017-08-16 07:55:14','2017-08-16 07:55:14'),(2112,10618,'KRA-0',1,'2017-08-16 07:55:14','2017-08-16 07:55:14'),(2113,10619,'KRA-0',1,'2017-08-16 07:55:14','2017-08-16 07:55:14'),(2114,10634,'KRA-0',1,'2017-08-16 07:55:14','2017-08-16 07:55:14'),(2115,10638,'KRA-0',1,'2017-08-16 09:39:56','2017-08-16 09:39:56'),(2116,10639,'KRA-0',1,'2017-08-16 09:39:56','2017-08-16 09:39:56'),(2117,10640,'KRA-0',1,'2017-08-16 09:39:56','2017-08-16 09:39:56'),(2118,10655,'KRA-0',1,'2017-08-16 09:39:56','2017-08-16 09:39:56'),(2119,10660,'KRA-0',1,'2017-08-16 09:40:18','2017-08-16 09:40:18'),(2120,10661,'KRA-0',1,'2017-08-16 09:40:18','2017-08-16 09:40:18'),(2121,10662,'KRA-0',1,'2017-08-16 09:40:18','2017-08-16 09:40:18'),(2122,10677,'KRA-0',1,'2017-08-16 09:40:18','2017-08-16 09:40:18'),(2127,10704,'KRA-0',1,'2017-08-16 11:06:25','2017-08-16 11:06:25'),(2128,10705,'KRA-0',1,'2017-08-16 11:06:25','2017-08-16 11:06:25'),(2129,10706,'KRA-0',1,'2017-08-16 11:06:25','2017-08-16 11:06:25'),(2130,10721,'KRA-0',1,'2017-08-16 11:06:25','2017-08-16 11:06:25'),(2131,10726,'KRA-0',1,'2017-09-05 09:52:46','2017-09-05 09:52:46'),(2132,10727,'KRA-0',1,'2017-09-05 09:52:46','2017-09-05 09:52:46'),(2133,10728,'KRA-0',1,'2017-09-05 09:52:46','2017-09-05 09:52:46'),(2134,10743,'KRA-0',1,'2017-09-05 09:52:46','2017-09-05 09:52:46'),(2135,10748,'KRA-0',1,'2017-09-05 09:53:28','2017-09-05 09:53:28'),(2136,10749,'KRA-0',1,'2017-09-05 09:53:28','2017-09-05 09:53:28'),(2137,10750,'KRA-0',1,'2017-09-05 09:53:28','2017-09-05 09:53:28'),(2138,10765,'KRA-0',1,'2017-09-05 09:53:28','2017-09-05 09:53:28'),(2139,10770,'KRA-0',1,'2017-09-05 09:53:46','2017-09-05 09:53:46'),(2140,10771,'KRA-0',1,'2017-09-05 09:53:46','2017-09-05 09:53:46'),(2141,10772,'KRA-0',1,'2017-09-05 09:53:46','2017-09-05 09:53:46'),(2142,10787,'KRA-0',1,'2017-09-05 09:53:46','2017-09-05 09:53:46'),(2143,10792,'KRA-0',1,'2017-09-05 09:53:46','2017-09-05 09:53:46'),(2144,10793,'KRA-0',1,'2017-09-05 09:53:46','2017-09-05 09:53:46'),(2145,10794,'KRA-0',1,'2017-09-05 09:53:46','2017-09-05 09:53:46'),(2146,10809,'KRA-0',1,'2017-09-05 09:53:46','2017-09-05 09:53:46'),(2147,10814,'KRA-0',1,'2017-09-05 09:54:08','2017-09-05 09:54:08'),(2148,10815,'KRA-0',1,'2017-09-05 09:54:08','2017-09-05 09:54:08'),(2149,10816,'KRA-0',1,'2017-09-05 09:54:08','2017-09-05 09:54:08'),(2150,10831,'KRA-0',1,'2017-09-05 09:54:08','2017-09-05 09:54:08'),(2151,10836,'KRA-0',1,'2017-09-05 09:56:06','2017-09-05 09:56:06'),(2152,10837,'KRA-0',1,'2017-09-05 09:56:06','2017-09-05 09:56:06'),(2153,10838,'KRA-0',1,'2017-09-05 09:56:06','2017-09-05 09:56:06'),(2154,10853,'KRA-0',1,'2017-09-05 09:56:06','2017-09-05 09:56:06'),(2155,10858,'KRA-0',1,'2017-09-05 10:10:42','2017-09-05 10:10:42'),(2156,10859,'KRA-0',1,'2017-09-05 10:10:42','2017-09-05 10:10:42'),(2157,10860,'KRA-0',1,'2017-09-05 10:10:42','2017-09-05 10:10:42'),(2158,10875,'KRA-0',1,'2017-09-05 10:10:42','2017-09-05 10:10:42'),(2163,10906,'KRA-0',1,'2017-09-05 12:55:04','2017-09-05 12:55:04'),(2164,10907,'KRA-0',1,'2017-09-05 12:55:04','2017-09-05 12:55:04'),(2165,10908,'KRA-0',1,'2017-09-05 12:55:04','2017-09-05 12:55:04'),(2166,10923,'KRA-0',1,'2017-09-05 12:55:04','2017-09-05 12:55:04'),(2167,10929,'KRA-0',1,'2017-10-24 08:03:03','2017-10-24 08:03:03'),(2168,10930,'KRA-0',1,'2017-10-24 08:03:03','2017-10-24 08:03:03'),(2169,10931,'KRA-0',1,'2017-10-24 08:03:03','2017-10-24 08:03:03'),(2170,10946,'KRA-0',1,'2017-10-24 08:03:03','2017-10-24 08:03:03');
/*!40000 ALTER TABLE `kra_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaveType`
--

DROP TABLE IF EXISTS `leaveType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leaveType` (
  `leaveType_id` int(20) NOT NULL AUTO_INCREMENT,
  `Sick Leave` int(20) NOT NULL,
  `Casual Leave` int(20) NOT NULL,
  `Maternity Leave` int(20) NOT NULL,
  `Paternity Leave` int(20) NOT NULL,
  `Earned Leave` int(20) NOT NULL,
  PRIMARY KEY (`leaveType_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaveType`
--

LOCK TABLES `leaveType` WRITE;
/*!40000 ALTER TABLE `leaveType` DISABLE KEYS */;
INSERT INTO `leaveType` VALUES (1,2,2,2,2,2);
/*!40000 ALTER TABLE `leaveType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES (13,98,'dffsf','full-day','2017-11-21','2017-11-29',9,'2017-11-08 19:18:42','2017-11-08 19:19:18','Granted','Casual Leave','96',NULL,'2017-11-08 19:18:42','2017-11-08 19:19:18'),(14,94,'sdaasd','full-day','2017-11-24','2017-11-27',2,'2017-11-09 12:34:45','2017-11-09 12:38:10','Granted','Maternity Leave','96',NULL,'2017-11-09 12:34:45','2017-11-09 12:38:10'),(16,94,'sdaasd','full-day','2017-11-24','2017-11-27',2,'2017-11-09 12:34:46','2017-11-09 12:38:13','Rejected',NULL,'96','dfsfsf','2017-11-09 12:34:46','2017-11-09 12:38:13'),(17,1,'dsadadasdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','half-day','2017-11-22','2017-11-23',2,'2017-11-22 12:58:48',NULL,'Initial',NULL,NULL,NULL,'2017-11-22 12:58:48','2017-11-22 12:58:48'),(18,1,'dsadadasdadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','half-day','2017-11-22','2017-11-23',2,'2017-11-22 12:58:50',NULL,'Initial',NULL,NULL,NULL,'2017-11-22 12:58:50','2017-11-22 12:58:50'),(19,37,'fdgdg','full-day','2017-11-22','2017-11-24',3,'2017-11-22 13:32:07','2017-11-22 13:35:39','Granted','Casual Leave','98',NULL,'2017-11-22 13:32:07','2017-11-22 13:35:39'),(20,37,'hgfgh','full-day','2017-11-29','2017-11-29',1,'2017-11-22 13:33:50','2017-11-22 13:35:44','Rejected',NULL,'98','fdgdfgfdg','2017-11-22 13:33:50','2017-11-22 13:35:44'),(22,98,'dfsdsfds','half-day','2017-12-21','0000-00-00',1,'2017-11-22 17:56:01',NULL,'Initial',NULL,NULL,NULL,'2017-11-22 17:56:01','2017-11-22 17:56:01'),(23,37,'fdsfs','half-day','2017-11-30','0000-00-00',1,'2017-11-23 10:49:28',NULL,'Initial',NULL,NULL,NULL,'2017-11-23 10:49:28','2017-11-23 10:49:28'),(24,37,'sadsad','half-day','2017-11-30','2017-11-30',1,'2017-11-23 10:57:33',NULL,'Initial',NULL,NULL,NULL,'2017-11-23 10:57:33','2017-11-23 10:57:33'),(25,37,'ddasdasaddadaas','full-day','2017-12-13','2017-12-20',6,'2017-11-23 10:58:05',NULL,'Initial',NULL,NULL,NULL,'2017-11-23 10:58:05','2017-11-23 10:58:05'),(26,37,'dasasd','half-day','2017-11-29','2017-11-29',1,'2017-11-23 10:58:34',NULL,'Initial',NULL,NULL,NULL,'2017-11-23 10:58:34','2017-11-23 10:58:34');
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (5,5454,'srb tools','test street','test city','test state','2017-10-30 12:31:56','2017-10-30 12:31:56'),(6,2,'OMR','fdksfdm','Hyderabad','Andhra Pradesh','2017-11-17 10:44:26','2017-11-17 10:44:26');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (2,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:04','2017-11-08 19:20:04'),(3,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:04','2017-11-08 19:20:04'),(4,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:05','2017-11-08 19:20:05'),(5,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:14','2017-11-08 19:20:14'),(6,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:14','2017-11-08 19:20:14'),(7,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:14','2017-11-08 19:20:14'),(8,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:14','2017-11-08 19:20:14'),(9,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:14','2017-11-08 19:20:14'),(10,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:14','2017-11-08 19:20:14'),(11,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:15','2017-11-08 19:20:15'),(12,94,'dsfdsf','2017-11-15','04:25:00','03:32:00','Initial','2017-11-08','0000-00-00',NULL,NULL,'2017-11-08 19:20:15','2017-11-08 19:20:15'),(13,37,'dfsfd','2017-11-29','03:04:00','03:34:00','Initial','2017-11-27','0000-00-00',NULL,NULL,'2017-11-27 11:19:07','2017-11-27 11:19:07');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `project_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `active` tinyint(1) unsigned DEFAULT '1',
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `fk_project_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_project_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (3,'NBRS','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(7,'Encore','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(8,'TDM VOIP','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(9,'Jusshare','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(10,'Vitagen - CHIP','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(11,'Buckitdream','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(12,'Ix MFI','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(13,'Ix Tracker','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(14,'Online Exam','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(16,'Ionixx Career','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(17,'UI Design','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(18,'Vitagen - Website','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(19,'Ix-Messenger','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(20,'Ix-Track Mobile','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(21,'Ionixx Sales','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(22,'MFIN','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(23,'DCS','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(24,'HRMS','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(26,'Parkit','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(27,'EDV','','0000-00-00','0000-00-00',1,1,'2016-11-29 07:20:21','2016-11-29 07:20:21'),(28,'Nuvia','Nuvia','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(29,'Internal','Internal','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(30,'Ionixx','Ionixx','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(31,'Timesheet','Timesheet','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(32,'Mgmt','Mgmt','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(33,'R&D','R&D','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(34,'Family Tree','Family Tree','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(35,'IX Accounts','IX Accounts','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(36,'Ix Website','Ix Website','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(37,'ixAudit','ixAudit','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(38,'UNUM POC','UNUM POC','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(39,'BD_Analytics','BD_Analytics','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(40,'Sky Laundry','Sky Laundry','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(41,'unum_android','unum_android','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(42,'Parkit - Android','Parkit - Android','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(43,'HRMS_Leave Mgmt','HRMS_Leave Mgmt','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(44,'Parkit - BackEnd','Parkit - BackEnd','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(45,'ParkIt- IOT','ParkIt- IOT','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(46,'UNUM-WEB','UNUM-WEB','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(47,'zongbyte','zongbyte','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(48,'Dubuqu NXT','Dubuqu NXT','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(49,'Parkit - IOS','Parkit - IOS','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(50,'Fit2bemom','Fit2bemom','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(51,'Parkit_Design','Parkit_Design','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(52,'Clutch Health','Clutch Health','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(53,'Muster and Map','Muster and Map','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(54,'cibc_poc1','cibc_poc1','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(55,'CIBC-POC2','CIBC-POC2','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(56,'A2 Converter','A2 Converter','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26'),(57,'IX Instant Messenger','IX Instant Messenger','2017-07-12','2017-07-12',1,1,'2017-07-12 16:20:26','2017-07-12 16:20:26');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resource_request`
--

DROP TABLE IF EXISTS `resource_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resource_request` (
  `resource_request_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `request_employee_id` int(20) unsigned NOT NULL,
  `project_id` int(20) unsigned NOT NULL,
  `no_of_resource` int(20) unsigned NOT NULL,
  `comments` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `request_status` enum('RAISED','PENDING_APPROVAL','PARTIAL_APPROVAL','APPROVED','REJECTED','RELEASED') COLLATE utf8_unicode_ci DEFAULT 'RAISED',
  `request_date` datetime NOT NULL,
  `approver_employee_id` int(20) unsigned DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_timestamp` datetime NOT NULL,
  `updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`resource_request_id`),
  KEY `fk_resource_request_request_employee_id_idx` (`request_employee_id`),
  KEY `fk_resource_request_request_project_id_idx` (`project_id`),
  KEY `fk_resource_request_approver_employee_id_idx` (`approver_employee_id`),
  CONSTRAINT `fk_resource_request_approver_employee_id` FOREIGN KEY (`approver_employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_resource_request_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_resource_request_request_employee_id` FOREIGN KEY (`request_employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource_request`
--

LOCK TABLES `resource_request` WRITE;
/*!40000 ALTER TABLE `resource_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `resource_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resource_request_employee`
--

DROP TABLE IF EXISTS `resource_request_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resource_request_employee` (
  `resource_request_employee_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `resource_request_id` int(20) unsigned NOT NULL,
  `comments` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `request_start_date` datetime NOT NULL,
  `request_end_date` datetime NOT NULL,
  `employee_id` int(20) unsigned DEFAULT NULL,
  `status` enum('RAISED','HOLD','APPROVED','REJECTED','RELEASED') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'RAISED',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_timestamp` datetime NOT NULL,
  `updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`resource_request_employee_id`),
  KEY `fk_resource_request_employee_resource_request_id_idx` (`resource_request_id`),
  KEY `fk_resource_request_employee_employee_id_idx` (`employee_id`),
  CONSTRAINT `fk_resource_request_employee_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_resource_request_employee_resource_request_id` FOREIGN KEY (`resource_request_id`) REFERENCES `resource_request` (`resource_request_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource_request_employee`
--

LOCK TABLES `resource_request_employee` WRITE;
/*!40000 ALTER TABLE `resource_request_employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `resource_request_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `role_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `tenant_id` int(20) unsigned NOT NULL,
  `created_timestamp` datetime NOT NULL,
  `last_updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `fk_roles_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_roles_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenant` (`tenant_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN',1,'2017-07-17 11:30:52','2017-07-17 11:30:52'),(2,'MANAGER',1,'2017-07-17 11:30:52','2017-07-17 11:30:52'),(4,'LEAD',1,'2017-08-03 08:22:11','2017-08-03 08:22:11'),(5,'EMPLOYEE',1,'2017-08-03 08:22:11','2017-08-03 08:22:11');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tenant`
--

DROP TABLE IF EXISTS `tenant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tenant` (
  `tenant_id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `tenant_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `tenant_identifier` varchar(20) CHARACTER SET utf8 NOT NULL,
  `authentication_type` enum('DATABASE','GOOGLE','DATABASE_GOOGLE') COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) unsigned DEFAULT '1',
  `created_timestamp` datetime NOT NULL,
  `updated_timestamp` datetime NOT NULL,
  PRIMARY KEY (`tenant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tenant`
--

LOCK TABLES `tenant` WRITE;
/*!40000 ALTER TABLE `tenant` DISABLE KEYS */;
INSERT INTO `tenant` VALUES (1,'ionixx','ionixx','DATABASE',1,'2016-11-16 14:10:00','2016-11-16 14:10:00');
/*!40000 ALTER TABLE `tenant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_session`
--

DROP TABLE IF EXISTS `user_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_session` (
  `user_session_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) unsigned NOT NULL,
  `session_auth_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `expiry_time` datetime NOT NULL,
  PRIMARY KEY (`user_session_id`),
  UNIQUE KEY `uq_session_auth_token` (`session_auth_token`),
  KEY `fk_user_session_employee_id_idx` (`employee_id`),
  CONSTRAINT `fk_user_session_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1566 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_session`
--

LOCK TABLES `user_session` WRITE;
/*!40000 ALTER TABLE `user_session` DISABLE KEYS */;
INSERT INTO `user_session` VALUES (1523,1,'7fca38500d577d32f300efda615e5964','2017-11-23 16:57:18'),(1524,1,'18d7897333f01ec9065413e66be2a429','2017-11-23 17:03:41'),(1525,1,'1fc18d96a38234c49376a30778f19ae7','2017-11-23 17:11:39'),(1526,1,'64c689adfa8dedc10936f0de6e379846','2017-11-23 17:13:30'),(1527,1,'abdf17989ac978d65cf34f72e54a8d89','2017-11-23 17:13:54'),(1528,1,'49315731fad29c24c7b7e331eaf02bf8','2017-11-23 17:16:36'),(1529,1,'f0bf9e9aeaf87d57e2f0d287f0e688b9','2017-11-23 17:23:24'),(1530,1,'d8e0f55ab7538f899e42dbd2893752b1','2017-11-23 17:24:30'),(1531,1,'751a5f01d4ee294a90798b973ebfc0e7','2017-11-23 18:30:50'),(1533,1,'d57c49fb0077cb9876715a88bf3d1f0d','2017-11-23 18:32:19'),(1535,1,'7e5242bc54d7dd53a52400df025a1216','2017-11-23 18:33:45'),(1537,37,'a87db8575a5b9a16fbf13b79b2a4862f','2017-11-23 18:34:11'),(1539,37,'1870a16b48129fd2f9a01cdfb4aa3dca','2017-11-23 18:58:06'),(1541,1,'21be361c8f2599d7c054810c16099795','2017-11-27 10:46:57'),(1542,37,'03952e2573c98c7cf1137c5051819ad7','2017-11-27 10:56:44'),(1544,1,'03a88f2feb40ac2f0f46459a646624fc','2017-11-27 10:58:49'),(1546,3,'d768d0c4bc1ab1d854bf247a791b2397','2017-11-27 11:00:05'),(1548,1,'8e7b47f4def953f31c238e8c49de61c8','2017-11-27 11:00:31'),(1550,100,'a5790e8a47c835a997e4cccc25ecb378','2017-11-27 11:02:21'),(1552,1,'65d7a37625cc2afc3f00881d03c78ce6','2017-11-27 11:03:17'),(1554,100,'f34dfb8d77ff68ce1201a9c91a401f0a','2017-11-27 11:04:33'),(1556,1,'15514764f409887b13e731c83d8157fc','2017-11-27 11:07:16'),(1558,37,'3a6183f2f5a51e0f54172d721e5d785c','2017-11-27 11:23:56'),(1560,1,'cf37310aed1f3264404c666c9b1f743b','2017-11-27 12:36:14'),(1562,1,'db284d2a405d1e50ba56750cd93a5e5f','2017-11-27 12:45:38'),(1564,98,'701c5b3a8108764617cd80f90d9a266c','2017-11-27 12:46:03');
/*!40000 ALTER TABLE `user_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'lms_test1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-27 16:37:38
