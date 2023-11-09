/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80034 (8.0.34)
 Source Host           : localhost:3306
 Source Schema         : suning

 Target Server Type    : MySQL
 Target Server Version : 80034 (8.0.34)
 File Encoding         : 65001

 Date: 09/11/2023 21:13:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Product
-- ----------------------------
DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product` (
  `productid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `sign` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `memory` varchar(50) DEFAULT NULL,
  `capacity` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `specification` varchar(50) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`productid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10016 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Product
-- ----------------------------
BEGIN;
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10001, 'Apple iPhone 15 128G 黑色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。', 5999.00, 'iPhone15', '黑色', '128G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10002, 'Apple iPhone 15 128G 绿色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 5999.00, 'iPhone15', '绿色', '128G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10003, 'Apple iPhone 15 128G 黄色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 5999.00, 'iPhone15', '黄色', '128G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10004, 'Apple iPhone 15 128G 粉色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 5999.00, 'iPhone15', '粉色', '128G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10005, 'Apple iPhone 15 128G 蓝色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 5999.00, 'iPhone15', '蓝色', '128G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10006, 'Apple iPhone 15 256G 黑色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。', 6999.00, 'iPhone15', '黑色', '256G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10007, 'Apple iPhone 15 256G 绿色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 6999.00, 'iPhone15', '绿色', '256G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10008, 'Apple iPhone 15 256G 黄色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 6999.00, 'iPhone15', '黄色', '256G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10009, 'Apple iPhone 15 256G 粉色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 6999.00, 'iPhone15', '粉色', '256G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10010, 'Apple iPhone 15 256G 蓝色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 6999.00, 'iPhone15', '蓝色', '256G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10011, 'Apple iPhone 15 512G 黑色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。', 8999.00, 'iPhone15', '黑色', '512G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10012, 'Apple iPhone 15 512G 绿色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 8999.00, 'iPhone15', '绿色', '512G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10013, 'Apple iPhone 15 512G 黄色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 8999.00, 'iPhone15', '黄色', '512G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10014, 'Apple iPhone 15 512G 粉色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 8999.00, 'iPhone15', '粉色', '512G', NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `sign`, `color`, `memory`, `capacity`, `model`, `specification`, `size`) VALUES (10015, 'Apple iPhone 15 512G 蓝色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 8999.00, 'iPhone15', '蓝色', '512G', NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for ProductImage
-- ----------------------------
DROP TABLE IF EXISTS `ProductImage`;
CREATE TABLE `ProductImage` (
  `imageid` int NOT NULL AUTO_INCREMENT,
  `productid` int DEFAULT NULL,
  `imageurl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sign` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`imageid`) USING BTREE,
  KEY `productid` (`productid`),
  CONSTRAINT `productimage_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `Product` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ProductImage
-- ----------------------------
BEGIN;
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (1, 10001, 'https://images.hooray.top/iPhone15/iPhone15_BLACK_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (2, 10001, 'https://images.hooray.top/iPhone15/iPhone15_BLACK_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (3, 10002, 'https://images.hooray.top/iPhone15/iPhone15_GREEN_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (4, 10002, 'https://images.hooray.top/iPhone15/iPhone15_GREEN_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (5, 10003, 'https://images.hooray.top/iPhone15/iPhone15_YELLOW_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (6, 10003, 'https://images.hooray.top/iPhone15/iPhone15_YELLOW_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (7, 10004, 'https://images.hooray.top/iPhone15/iPhone15_PINK_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (8, 10004, 'https://images.hooray.top/iPhone15/iPhone15_PINK_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (9, 10005, 'https://images.hooray.top/iPhone15/iPhone15_BLUE_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (10, 10005, 'https://images.hooray.top/iPhone15/iPhone15_BLUE_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (11, NULL, 'https://images.hooray.top/iPhone15/iPhone15_Public_001.jpg', 'iPhone15');
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (12, NULL, 'https://images.hooray.top/iPhone15/iPhone15_Public_002.jpg', 'iPhone15');
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (13, NULL, 'https://images.hooray.top/iPhone15/iPhone15_Public_001.jpg', 'iPhone15');
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (14, 10006, 'https://images.hooray.top/iPhone15/iPhone15_BLACK_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (15, 10006, 'https://images.hooray.top/iPhone15/iPhone15_BLACK_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (16, 10007, 'https://images.hooray.top/iPhone15/iPhone15_GREEN_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (17, 10007, 'https://images.hooray.top/iPhone15/iPhone15_GREEN_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (18, 10008, 'https://images.hooray.top/iPhone15/iPhone15_YELLOW_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (19, 10008, 'https://images.hooray.top/iPhone15/iPhone15_YELLOW_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (20, 10009, 'https://images.hooray.top/iPhone15/iPhone15_PINK_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (21, 10009, 'https://images.hooray.top/iPhone15/iPhone15_PINK_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (22, 10010, 'https://images.hooray.top/iPhone15/iPhone15_BLUE_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (23, 10010, 'https://images.hooray.top/iPhone15/iPhone15_BLUE_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (24, 10011, 'https://images.hooray.top/iPhone15/iPhone15_BLACK_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (25, 10011, 'https://images.hooray.top/iPhone15/iPhone15_BLACK_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (26, 10012, 'https://images.hooray.top/iPhone15/iPhone15_GREEN_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (27, 10012, 'https://images.hooray.top/iPhone15/iPhone15_GREEN_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (28, 10013, 'https://images.hooray.top/iPhone15/iPhone15_YELLOW_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (29, 10013, 'https://images.hooray.top/iPhone15/iPhone15_YELLOW_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (30, 10014, 'https://images.hooray.top/iPhone15/iPhone15_PINK_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (31, 10014, 'https://images.hooray.top/iPhone15/iPhone15_PINK_002.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (32, 10015, 'https://images.hooray.top/iPhone15/iPhone15_BLUE_001.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (33, 10015, 'https://images.hooray.top/iPhone15/iPhone15_BLUE_002.jpg', NULL);
COMMIT;

-- ----------------------------
-- Table structure for ShoppingCart
-- ----------------------------
DROP TABLE IF EXISTS `ShoppingCart`;
CREATE TABLE `ShoppingCart` (
  `cartid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `productid` int NOT NULL,
  `quantity` int NOT NULL,
  `selected` tinyint(1) NOT NULL,
  PRIMARY KEY (`cartid`),
  KEY `userid` (`userid`),
  KEY `productid` (`productid`),
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `User` (`userid`),
  CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `Product` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ShoppingCart
-- ----------------------------
BEGIN;
INSERT INTO `ShoppingCart` (`cartid`, `userid`, `productid`, `quantity`, `selected`) VALUES (1, 1, 10001, 2, 1);
COMMIT;

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) DEFAULT NULL,
  `password` varchar(64) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `gender` int DEFAULT '2',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO `User` (`userid`, `username`, `password`, `phone`, `name`, `gender`) VALUES (1, 'admin', '$2b$10$x1dUEGZexBKQewX89429zOfNZtN63QEqRDfLy18Lkqqwm9cxIgon.', '18677439605', 'Binbin', 2);
INSERT INTO `User` (`userid`, `username`, `password`, `phone`, `name`, `gender`) VALUES (6, 'CXK', '$2b$10$PTPJbFB5/8us31e5/gU57.NpkwgafH2UHBJzkGj6S5ivVsryPAGfu', '18677439608', '蔡徐坤', 0);
INSERT INTO `User` (`userid`, `username`, `password`, `phone`, `name`, `gender`) VALUES (19, NULL, '$2b$10$k262nikyRdEedztydDVbde3XWRPBcEZvAyLwbHjKpvBB.p6fqiK.C', '13877413948', NULL, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
