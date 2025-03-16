-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: food_delivery
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add restaurant',7,'add_restaurant'),(26,'Can change restaurant',7,'change_restaurant'),(27,'Can delete restaurant',7,'delete_restaurant'),(28,'Can view restaurant',7,'view_restaurant'),(29,'Can add menu item',8,'add_menuitem'),(30,'Can change menu item',8,'change_menuitem'),(31,'Can delete menu item',8,'delete_menuitem'),(32,'Can view menu item',8,'view_menuitem'),(33,'Can add order',9,'add_order'),(34,'Can change order',9,'change_order'),(35,'Can delete order',9,'delete_order'),(36,'Can view order',9,'view_order'),(37,'Can add order item',10,'add_orderitem'),(38,'Can change order item',10,'change_orderitem'),(39,'Can delete order item',10,'delete_orderitem'),(40,'Can view order item',10,'view_orderitem'),(41,'Can add address',11,'add_address'),(42,'Can change address',11,'change_address'),(43,'Can delete address',11,'delete_address'),(44,'Can view address',11,'view_address');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_users_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(9,'orders','order'),(10,'orders','orderitem'),(8,'restaurants','menuitem'),(7,'restaurants','restaurant'),(5,'sessions','session'),(11,'users','address'),(6,'users','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-03-06 14:18:59.682828'),(2,'contenttypes','0002_remove_content_type_name','2025-03-06 14:18:59.715121'),(3,'auth','0001_initial','2025-03-06 14:18:59.793839'),(4,'auth','0002_alter_permission_name_max_length','2025-03-06 14:18:59.817208'),(5,'auth','0003_alter_user_email_max_length','2025-03-06 14:18:59.824775'),(6,'auth','0004_alter_user_username_opts','2025-03-06 14:18:59.830855'),(7,'auth','0005_alter_user_last_login_null','2025-03-06 14:18:59.836896'),(8,'auth','0006_require_contenttypes_0002','2025-03-06 14:18:59.839334'),(9,'auth','0007_alter_validators_add_error_messages','2025-03-06 14:18:59.845314'),(10,'auth','0008_alter_user_username_max_length','2025-03-06 14:18:59.850908'),(11,'auth','0009_alter_user_last_name_max_length','2025-03-06 14:18:59.856476'),(12,'auth','0010_alter_group_name_max_length','2025-03-06 14:18:59.868212'),(13,'auth','0011_update_proxy_permissions','2025-03-06 14:18:59.874350'),(14,'auth','0012_alter_user_first_name_max_length','2025-03-06 14:18:59.880531'),(15,'users','0001_initial','2025-03-06 14:18:59.987285'),(16,'admin','0001_initial','2025-03-06 14:19:00.086014'),(17,'admin','0002_logentry_remove_auto_add','2025-03-06 14:19:00.093454'),(18,'admin','0003_logentry_add_action_flag_choices','2025-03-06 14:19:00.101159'),(19,'restaurants','0001_initial','2025-03-06 14:19:00.127594'),(20,'sessions','0001_initial','2025-03-06 14:19:00.141176'),(21,'restaurants','0002_alter_restaurant_options_restaurant_category','2025-03-10 13:37:11.252002'),(22,'restaurants','0003_alter_restaurant_options_remove_restaurant_address_and_more','2025-03-11 17:58:30.644648'),(23,'restaurants','0004_restaurant_minimum_order','2025-03-11 18:50:25.297334'),(24,'users','0002_remove_user_address_user_gender_user_latitude_and_more','2025-03-11 20:19:00.056436'),(25,'users','0003_alter_user_email','2025-03-11 20:37:47.136013'),(26,'users','0004_alter_user_email','2025-03-12 12:15:49.331451'),(27,'users','0005_alter_user_email','2025-03-12 12:15:49.375598'),(28,'users','0006_address','2025-03-13 13:41:34.431968'),(29,'users','0007_address_is_default','2025-03-13 14:47:53.086940'),(30,'users','0008_remove_address_is_default','2025-03-13 15:25:14.843528'),(31,'restaurants','0005_restaurant_password','2025-03-13 16:41:26.328163'),(32,'restaurants','0006_restaurant_username','2025-03-13 16:42:07.746789'),(33,'restaurants','0007_alter_restaurant_username','2025-03-14 12:43:29.440206'),(34,'restaurants','0008_alter_restaurant_username','2025-03-15 12:30:04.861164'),(35,'restaurants','0009_alter_restaurant_username','2025-03-15 12:31:02.539513'),(36,'restaurants','0010_menuitem_image','2025-03-15 12:36:29.588826'),(37,'orders','0001_initial','2025-03-15 16:19:48.402100'),(38,'orders','0002_alter_order_status','2025-03-16 13:52:22.067353'),(39,'orders','0003_remove_order_items_order_items','2025-03-16 14:00:59.455013'),(40,'orders','0004_order_created_at_alter_order_items_delete_orderitem','2025-03-16 14:16:29.210611'),(41,'orders','0005_alter_order_items','2025-03-16 14:45:45.247596'),(42,'orders','0006_remove_order_created_at_remove_order_items_and_more','2025-03-16 15:06:21.034419'),(43,'orders','0007_alter_order_status','2025-03-16 15:14:48.993555'),(44,'orders','0008_alter_order_status','2025-03-16 17:28:48.449391');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('nskkcpfd4blc4p6hntrpjkuupo2vraz4','.eJxVjssOgyAQRf-FdWPQFhSX3fsNZGCGaquQ8Fg1_fdi46Ju7z338WYaSp51SRT1gmxkHWeXf9GAfZHfHXyCf4TGBp_jYpodaQ43NVNAWu8HeyqYIc01zZ26ihs5IRQa0RGRw8GgNKp1dpAdV1JAL61sCQQQN04h70GBrRll2loaKWUoEXz-XW1Pyr7lYaM6NYHF4GHdjyxJbxTtXBE25ljo8wWZDVL5:1ttsED:75O2-_cdzb0DPYxmHMr9A9KIkenYzI0O2kmFYMPqDeQ','2025-03-30 17:56:49.595361');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_order`
--

DROP TABLE IF EXISTS `orders_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaurant_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_order_restaurant_id_a38fbfc0_fk_restaurants_restaurant_id` (`restaurant_id`),
  KEY `orders_order_user_id_e9b59eb1_fk_users_user_id` (`user_id`),
  CONSTRAINT `orders_order_restaurant_id_a38fbfc0_fk_restaurants_restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants_restaurant` (`id`),
  CONSTRAINT `orders_order_user_id_e9b59eb1_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_order`
--

LOCK TABLES `orders_order` WRITE;
/*!40000 ALTER TABLE `orders_order` DISABLE KEYS */;
INSERT INTO `orders_order` VALUES (14,23.66,'C',1,20),(15,14.30,'C',38,20),(16,30.12,'C',1,19),(17,14.38,'P',1,20);
/*!40000 ALTER TABLE `orders_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_orderitem`
--

DROP TABLE IF EXISTS `orders_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `item_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_orderitem_item_id_0f65da43_fk_restaurants_menuitem_id` (`item_id`),
  KEY `orders_orderitem_order_id_fe61a34d_fk_orders_order_id` (`order_id`),
  CONSTRAINT `orders_orderitem_item_id_0f65da43_fk_restaurants_menuitem_id` FOREIGN KEY (`item_id`) REFERENCES `restaurants_menuitem` (`id`),
  CONSTRAINT `orders_orderitem_order_id_fe61a34d_fk_orders_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders_order` (`id`),
  CONSTRAINT `orders_orderitem_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_orderitem`
--

LOCK TABLES `orders_orderitem` WRITE;
/*!40000 ALTER TABLE `orders_orderitem` DISABLE KEYS */;
INSERT INTO `orders_orderitem` VALUES (1,3,2,14),(2,1,3,14),(3,1,15,15),(4,2,16,15),(5,1,9,16),(6,1,13,16),(7,2,3,17);
/*!40000 ALTER TABLE `orders_orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants_menuitem`
--

DROP TABLE IF EXISTS `restaurants_menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurants_menuitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `restaurant_id` bigint NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurants_menuitem_restaurant_id_107d938c_fk_restauran` (`restaurant_id`),
  CONSTRAINT `restaurants_menuitem_restaurant_id_107d938c_fk_restauran` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants_restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants_menuitem`
--

LOCK TABLES `restaurants_menuitem` WRITE;
/*!40000 ALTER TABLE `restaurants_menuitem` DISABLE KEYS */;
INSERT INTO `restaurants_menuitem` VALUES (2,'Big Mac',4.99,1,'menu_images/401742045659_.pic_hd.jpg'),(3,'9 Chicken McNuggets',5.69,1,'menu_images/411742049393_.pic_hd.jpg'),(8,'5 Chicken Selects',6.49,1,'menu_images/421742054270_.pic_hd_V2GMJaD.jpg'),(9,'Double Quarter Pounder with Cheese',6.09,1,'menu_images/441742055957_.pic_hd.jpg'),(10,'McSpicy',5.39,1,'menu_images/451742055958_.pic_hd.jpg'),(11,'The Sweet Chilli Chicken One (Crispy)',4.09,1,'menu_images/461742055959_.pic_hd.jpg'),(12,'Large Fries [VE]',2.69,1,'menu_images/471742055960_.pic_hd.jpg'),(13,'Filet-O-Fish',4.59,1,'menu_images/481742055961_.pic_hd.jpg'),(14,'Double Cheeseburger',2.79,1,'menu_images/491742055962_.pic_hd.jpg'),(15,'Pure Life Still Spring Water',2.74,38,'menu_images/561742143535_.pic_hd.jpg'),(16,'Dr Pepper Soft Drink',4.28,38,'menu_images/571742143537_.pic_hd.jpg');
/*!40000 ALTER TABLE `restaurants_menuitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants_restaurant`
--

DROP TABLE IF EXISTS `restaurants_restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurants_restaurant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `minimum_order` decimal(6,2) NOT NULL,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `restaurants_restaurant_username_223c0fca_uniq` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants_restaurant`
--

LOCK TABLES `restaurants_restaurant` WRITE;
/*!40000 ALTER TABLE `restaurants_restaurant` DISABLE KEYS */;
INSERT INTO `restaurants_restaurant` VALUES (1,'Macdonald','fastfood','restaurant_images/macdonald.jpg',33.571378,-70.661504,10.00,'mac','Macdonald'),(2,'Jollibee','fastfood','restaurant_images/jollibee.jpg',46.006117,35.878834,10.00,'a','b'),(3,'Lord of Fries','fastfood','restaurant_images/lord_of_fired.jpg',-5.344027,-110.066481,15.00,'a','c'),(4,'Popeyes','fastfood','restaurant_images/popeyes.jpg',0.223399,-166.611937,10.00,'a','d'),(5,'KFC','fastfood','restaurant_images/kfc.jpg',-77.078787,-31.689838,10.00,'a','e'),(6,'Papa Johns Pizza','fastfood','restaurant_images/papa_johns_pizza.jpg',-64.620493,9.12822,10.00,'a','f'),(7,'Taco Bell','fastfood','restaurant_images/taco_bell.jpg',85.513002,-106.831616,20.00,'a','g'),(8,'GDK','fastfood','restaurant_images/gdk.jpg',-66.23437,135.75313,10.00,'a','h'),(9,'Burger King','fastfood','restaurant_images/burger_king.jpg',45.078771,-31.638006,5.00,'a','i'),(10,'Starbucks','drinkAndCoffee','restaurant_images/star_bucks.jpg',9.525175,-94.02261,10.00,'a','j'),(11,'Panda Tea','drinkAndCoffee','restaurant_images/panda_tea.jpg',-38.116228,71.101301,10.00,'a','k'),(12,'Interestea','drinkAndCoffee','restaurant_images/interestea.jpg',17.941209,128.604536,10.00,'a','l'),(13,'Cupp Bubble Tea','drinkAndCoffee','restaurant_images/cupp_bubble_tea.jpg',55.060819,143.2656,10.00,'a','m'),(14,'Meet Fresh','drinkAndCoffee','restaurant_images/meet_fresh.jpg',86.98906,-4.389757,15.00,'a','n'),(15,'CoCo Bubble Tea','drinkAndCoffee','restaurant_images/coco_bubble_tea.jpg',30.298376,-91.495151,10.00,'a','o'),(16,'Hi Tea','drinkAndCoffee','restaurant_images/hi_tea.jpg',73.424453,-99.1432,10.00,'a','p'),(17,'Xitiejie','chineseFood','restaurant_images/xitiejie.jpg',-22.481151,-120.464116,10.00,'a','q'),(18,'Tofu Asian Fusion','chineseFood','restaurant_images/tofu_asian_fusion.jpg',16.261157,-112.05619,10.00,'a','r'),(19,'Crazy Wok','chineseFood','restaurant_images/crazy_wok.jpg',-49.953014,133.07308,10.00,'a','s'),(20,'Little Canteen','chineseFood','restaurant_images/little_canteen.jpg',-49.911175,-73.088803,10.00,'a','t'),(21,'Dumpling Monkey','chineseFood','restaurant_images/dumpling_monkey.jpg',82.521108,-112.270551,18.00,'a','u'),(22,'Rice and Noodle','chineseFood','restaurant_images/rice_and_noodle.jpg',19.940369,-113.598151,10.00,'a','v'),(23,'Sichuan House','chineseFood','restaurant_images/si_chuan_house.jpg',-1.464622,-152.358865,10.00,'a','w'),(24,'Meets Noodle','chinese food','restaurant_images/meets_noodle.jpg',18.723584,134.123814,10.00,'a','x'),(25,'Hanami','sushi','restaurant_images/hanami.jpg',-53.620742,82.660054,10.00,'a','y'),(26,'Pickled Ginger','sushi','restaurant_images/pickled_ginger.jpg',-88.596071,105.00607,10.00,'a','z'),(27,'Umami','sushi','restaurant_images/umami.jpg',63.053864,-9.048672,10.00,'a','a'),(28,'Masa Sushi','sushi','restaurant_images/masa_sushi.jpg',-2.335115,103.03002,10.00,'a','aa'),(29,'Okome','sushi','restaurant_images/okome.jpg',2.309797,169.560021,10.00,'a','bb'),(30,'Korrito','sushi','restaurant_images/korrito.jpg',17.112926,-44.024371,10.00,'a','cc'),(31,'Sushi Daily','sushi','restaurant_images/sushi_daily.jpg',83.952334,6.345966,10.00,'a','dd'),(32,'Donya Sushi','sushi','restaurant_images/donya_sushi.jpg',-37.048028,-131.129549,10.00,'a','ee'),(33,'M&S','groceries','restaurant_images/m&s.jpg',26.923873,58.137153,10.00,'a','ff'),(34,'Waitrose','groceries','restaurant_images/waitrose.jpg',-39.458516,174.800816,10.00,'a','gg'),(35,'Morrisons','groceries','restaurant_images/morrisons.jpg',-66.691663,-108.828314,10.00,'a','hh'),(36,'Sainsbury','groceries','restaurant_images/sainsbury.jpg',88.123223,34.553788,10.00,'a','ii'),(37,'Co-op','groceries','restaurant_images/co-op.jpg',89.20911,-37.081279,10.00,'a','jj'),(38,'Asda','groceries','restaurant_images/asda.jpg',-72.87344,44.739453,10.00,'a','kk'),(39,'Iceland','groceries','restaurant_images/iceland.jpg',-57.464732,-76.690454,10.00,'a','ll'),(40,'Majestic','groceries','restaurant_images/majestic.jpg',49.67161,-79.828843,0.00,'a','mm');
/*!40000 ALTER TABLE `restaurants_restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_address`
--

DROP TABLE IF EXISTS `users_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_address_user_id_4c106ba4_fk_users_user_id` (`user_id`),
  CONSTRAINT `users_address_user_id_4c106ba4_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_address`
--

LOCK TABLES `users_address` WRITE;
/*!40000 ALTER TABLE `users_address` DISABLE KEYS */;
INSERT INTO `users_address` VALUES (1,'Xinyi','07538963216','31 Gilbert St, Glasgow','2025-03-13 14:26:21.367866','2025-03-13 15:52:54.895865',20),(2,'Yuxuan','07538963216','Dalnair St, Yorkhill St, Glasgow G3 8SJ','2025-03-13 15:08:51.858559','2025-03-13 15:08:51.858592',20),(3,'Siyu','07538963216','1445 Argyle St, Glasgow G3 8AW','2025-03-13 15:27:57.454121','2025-03-13 15:27:57.454156',20);
/*!40000 ALTER TABLE `users_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user`
--

DROP TABLE IF EXISTS `users_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user`
--

LOCK TABLES `users_user` WRITE;
/*!40000 ALTER TABLE `users_user` DISABLE KEYS */;
INSERT INTO `users_user` VALUES (8,'pbkdf2_sha256$600000$eUqqh8H29IDFZwQlTGJaOH$F64ErC+lH0MOGvCrR2zc8vWajCOMGa5msRfJLKRy4kY=','2025-03-12 16:03:45.952682',0,'Kimi','','','777@77.com',0,1,'2025-03-12 14:51:05.900946','78901234567','male',NULL,NULL),(9,'pbkdf2_sha256$600000$5dO14QeCMPOvqzRn17uGHr$/u09xnEzgyHUTXFKpPwqOucqB7RM74uJk4Jdi5+PnUo=',NULL,0,'Amy','','','111@11.com',0,1,'2025-03-12 16:12:54.484521','12345678901','female',NULL,NULL),(10,'pbkdf2_sha256$600000$nTroMn5TIz2ddPmT32rmi5$wSaybXFrACwt2AtuMzKvZQxTBv4Se93QfFr1EFKgRSE=',NULL,0,'Lucy','','','222@22.com',0,1,'2025-03-12 16:23:19.843252','23456789012','female',NULL,NULL),(12,'pbkdf2_sha256$600000$DTUIwTxX5wvc6771h1IYE3$P6G/vx+ZGrYnFBGXrQQTL4jW64W4Ob50TzTofxxDh6s=',NULL,0,'Wendy','','','333@33.com',0,1,'2025-03-12 16:24:17.415466','34567890123','female',NULL,NULL),(15,'pbkdf2_sha256$600000$LpDXfoK2eEh8q07ShjRqvc$7PzZ/db8M0E6tt6419fmBC04IurkNrABA+mihC2Zhbg=',NULL,0,'Judy','','','444@44.com',0,1,'2025-03-12 16:26:48.430406','45678901234','female',NULL,NULL),(16,'pbkdf2_sha256$600000$bbyNvjsGfhLk3c4L7jJ21U$PjAkhzex4eRcZe0J/Xmm9aAI+T0HaQYnA8i1ebLz31g=',NULL,0,'Didi','','','555@55.com',0,1,'2025-03-12 16:27:35.428771','56789012345','male',NULL,NULL),(19,'pbkdf2_sha256$600000$7ulvrySgfZ9OmOufdxI2Ac$mE9Lorn2fACPAcGgr2xvb6GY3CYFAB10OFg/ich1tVQ=','2025-03-12 16:29:11.802627',0,'Lily','','','666@66.com',0,1,'2025-03-12 16:29:02.976881','67890123456','male',NULL,NULL),(20,'pbkdf2_sha256$600000$pmvcIdCFoB3Bb7Q9RlUHen$ZNIAh6L7RBYjmF9dfU9zOVQNDKdv47DOG+poKiLUx7Q=','2025-03-16 17:56:49.589557',0,'Sunny','','','qhmgyyw@163.com',0,1,'2025-03-12 17:02:34.754505','07538963216','female',NULL,NULL),(30,'pbkdf2_sha256$600000$MbsfxRg2fIvt4bo7sAa7Op$qQXZCpZpHhyBpM4WRcVoYZua12ToV/pRUOf/SDapl1Y=',NULL,0,'Clone','','','888@88.com',0,1,'2025-03-14 11:45:44.488758','89012345678','male',NULL,NULL);
/*!40000 ALTER TABLE `users_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_groups`
--

DROP TABLE IF EXISTS `users_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_groups_user_id_group_id_b88eab82_uniq` (`user_id`,`group_id`),
  KEY `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `users_user_groups_user_id_5f6f5a90_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_groups`
--

LOCK TABLES `users_user_groups` WRITE;
/*!40000 ALTER TABLE `users_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_user_permissions`
--

DROP TABLE IF EXISTS `users_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_user_permissions_user_id_permission_id_43338c45_uniq` (`user_id`,`permission_id`),
  KEY `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_user_user_permissions_user_id_20aca447_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_user_permissions`
--

LOCK TABLES `users_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 19:36:28
