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

 Date: 16/11/2023 16:00:01
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
  `storename` varchar(255) DEFAULT '苏宁自营',
  `type` varchar(255) DEFAULT '手机',
  `sign` varchar(255) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `memory` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `specification` varchar(50) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`productid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10033 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Product
-- ----------------------------
BEGIN;
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10001, 'Apple iPhone 15 128G 黑色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。', 5999.00, '苏宁自营', '手机', 'iPhone15', '黑色', '128G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10002, 'Apple iPhone 15 128G 绿色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 5999.00, '苏宁自营', '手机', 'iPhone15', '绿色', '128G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10003, 'Apple iPhone 15 128G 黄色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 5999.00, '苏宁自营', '手机', 'iPhone15', '黄色', '128G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10004, 'Apple iPhone 15 128G 粉色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 5999.00, '苏宁自营', '手机', 'iPhone15', '粉色', '128G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10005, 'Apple iPhone 15 128G 蓝色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 5999.00, '苏宁自营', '手机', 'iPhone15', '蓝色', '128G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10006, 'Apple iPhone 15 256G 黑色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。', 6999.00, '苏宁自营', '手机', 'iPhone15', '黑色', '256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10007, 'Apple iPhone 15 256G 绿色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 6999.00, '苏宁自营', '手机', 'iPhone15', '绿色', '256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10008, 'Apple iPhone 15 256G 黄色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 6999.00, '苏宁自营', '手机', 'iPhone15', '黄色', '256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10009, 'Apple iPhone 15 256G 粉色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 6999.00, '苏宁自营', '手机', 'iPhone15', '粉色', '256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10010, 'Apple iPhone 15 256G 蓝色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 6999.00, '苏宁自营', '手机', 'iPhone15', '蓝色', '256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10011, 'Apple iPhone 15 512G 黑色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。', 8999.00, '苏宁自营', '手机', 'iPhone15', '黑色', '512G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10012, 'Apple iPhone 15 512G 绿色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 8999.00, '苏宁自营', '手机', 'iPhone15', '绿色', '512G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10013, 'Apple iPhone 15 512G 黄色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 8999.00, '苏宁自营', '手机', 'iPhone15', '黄色', '512G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10014, 'Apple iPhone 15 512G 粉色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。 ', 8999.00, '苏宁自营', '手机', 'iPhone15', '粉色', '512G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10015, 'Apple iPhone 15 512G 蓝色 移动联通电信手机 5G全网通手机', '全新4800万像素主摄上位，开心上镜，大作上手；A16仿生芯片，Pro级实力认证。  ', 8999.00, '苏宁自营', '手机', 'iPhone15', '蓝色', '512G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10016, '小米14 徕卡光学镜头 光影猎人900 徕卡75mm浮动长焦 骁龙8Gen3 12+256 白色 小米手机 红米手机 5G', '旗舰产品，货量有限，小米澎湃OS 骁龙8Gen', 4299.00, '苏宁自营', '手机', 'Xiaomi14', '白色', '12+256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10017, '小米14 徕卡光学镜头 光影猎人900 徕卡75mm浮动长焦 骁龙8Gen3 12+256 雪山粉 小米手机 红米手机 5G', '旗舰产品，货量有限，小米澎湃OS 骁龙8Gen', 4299.00, '苏宁自营', '手机', 'Xiaomi14', '粉色', '12+256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10018, '语娄白色双面呢大衣女中长款小个子2023新款加厚高级感毛呢外套 奶白色 S', '【大促进行中】品质保障，放心购买！', 284.00, '银湖女装专营店', '衣服', '语娄白色双面呢大衣女中长款小个子2023新款加厚高级感毛呢外套 奶白色', '奶白色', NULL, NULL, NULL, 'S');
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10019, '语娄白色双面呢大衣女中长款小个子2023新款加厚高级感毛呢外套 奶白色 M', '【大促进行中】品质保障，放心购买！', 284.00, '银湖女装专营店', '衣服', '语娄白色双面呢大衣女中长款小个子2023新款加厚高级感毛呢外套 奶白色', '奶白色', NULL, NULL, NULL, 'M');
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10020, '语娄白色双面呢大衣女中长款小个子2023新款加厚高级感毛呢外套 奶白色 L', '【大促进行中】品质保障，放心购买！', 284.00, '银湖女装专营店', '衣服', '语娄白色双面呢大衣女中长款小个子2023新款加厚高级感毛呢外套 奶白色', '奶白色', NULL, NULL, NULL, 'L');
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10021, 'OPPO Reno10 灿烂金 8GB+256GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头', 1999.00, '苏宁自营', '手机', 'OPPOReno10', '灿烂金', '8+256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10022, 'OPPO Reno10 灿烂金 12GB+256GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头', 2539.00, '苏宁自营', '手机', 'OPPOReno10', '灿烂金', '12+256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10023, 'OPPO Reno10 灿烂金 12GB+512GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头', 2739.00, '苏宁自营', '手机', 'OPPOReno10', '灿烂金', '12+512G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10024, 'OPPO Reno10 溢彩蓝 8GB+256GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头  \n', 1999.00, '苏宁自营', '手机', 'OPPOReno10', '溢彩蓝', '8+256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10025, 'OPPO Reno10 溢彩蓝 12GB+256GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 ', 2539.00, '苏宁自营', '手机', 'OPPOReno10', '溢彩蓝', '12+256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10026, 'OPPO Reno10 溢彩蓝 12GB+512GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头', 2739.00, '苏宁自营', '手机', 'OPPOReno10', '溢彩蓝', '12+512G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10027, 'OPPO Reno10 月海黑 8GB+256GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 ', 1999.00, '苏宁自营', '手机', 'OPPOReno10', '月海黑', '8+256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10028, 'OPPO Reno10 月海黑 12GB+256GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 ', 2539.00, '苏宁自营', '手机', 'OPPOReno10', '月海黑', '12+256G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10029, 'OPPO Reno10 月海黑 12GB+512GB 5G手机 120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头 全网通游戏拍照学生oppo手机', '120Hz OLED 超清曲面屏 超光影长焦镜头 6400 万水光人像镜头', 2739.00, '苏宁自营', '手机', 'OPPOReno10', '月海黑', '12+512G', NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10030, '维达超韧抽取面巾3层S码100抽×20包纸巾抽纸卫生纸整箱家用纸巾超韧抽纸', '苏宁定制 超韧品质 家居蓝神 湿水不易破', 39.90, '苏宁超市', '纸巾', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10031, 'Freeplus 芙丽芳丝 净润洗面奶 100g 孕妇可用 补水保湿 调节水油平衡 氨基酸洁面 弱酸性 日本原装进口', '日本原装进口 萃取植物养肤成分，另肌肤温润平和。泡沫细腻有很强亲水性，易冲洗不易有紧绷感~', 89.90, '苏宁国际', '洗面奶,护肤品', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `Product` (`productid`, `name`, `description`, `price`, `storename`, `type`, `sign`, `color`, `memory`, `model`, `specification`, `size`) VALUES (10032, '[人气大红瓶]SK-II 美之匙R.N.A.超肌能大红瓶面霜紧致活肤面霜 80g/瓶 sk2 紧肤淡皱 任何肤质通用', '紧致淡纹减淡细纹，立体紧致 提升肌肤水润光泽 焕发年轻光彩，适合任何肤质！', 868.00, '苏宁国际', '肤面霜,护肤品', NULL, NULL, NULL, NULL, NULL, NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (34, 10016, 'https://images.hooray.top/Xiaomi14/Xiaomi14_WHITE_01.png', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (35, 10016, 'https://images.hooray.top/Xiaomi14/Xiaomi14_WHITE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (36, 10016, 'https://images.hooray.top/Xiaomi14/Xiaomi14_WHITE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (37, 10016, 'https://images.hooray.top/Xiaomi14/Xiaomi14_WHITE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (38, 10016, 'https://images.hooray.top/Xiaomi14/Xiaomi14_WHITE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (39, 10017, 'https://images.hooray.top/Xiaomi14/Xiaomi14_PINK_01.png', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (40, 10017, 'https://images.hooray.top/Xiaomi14/Xiaomi14_PINK_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (41, 10017, 'https://images.hooray.top/Xiaomi14/Xiaomi14_PINK_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (42, 10017, 'https://images.hooray.top/Xiaomi14/Xiaomi14_PINK_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (43, 10017, 'https://images.hooray.top/Xiaomi14/Xiaomi14_PINK_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (44, 10018, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (45, 10018, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (46, 10018, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (47, 10018, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (48, 10018, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (49, 10019, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (50, 10019, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (51, 10019, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (52, 10019, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (53, 10019, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (54, 10020, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (55, 10020, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (56, 10020, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (57, 10020, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (58, 10020, 'https://images.hooray.top/%E8%AF%AD%E5%A8%84%E7%99%BD%E8%89%B2%E5%8F%8C%E9%9D%A2%E5%A4%A7%E8%A1%A3/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (59, 10021, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (60, 10021, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (61, 10021, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (62, 10021, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (63, 10021, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (64, 10022, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (65, 10022, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (66, 10022, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (67, 10022, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (68, 10022, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (69, 10023, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (70, 10023, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (71, 10023, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (72, 10023, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (73, 10023, 'https://images.hooray.top/OPPO_Reno10_%E7%81%BF%E7%83%82%E9%87%91/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (74, 10024, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (75, 10024, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (76, 10024, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (77, 10024, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (78, 10024, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (79, 10025, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (80, 10025, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (81, 10025, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (82, 10025, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (83, 10025, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (84, 10026, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (85, 10026, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (86, 10026, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (87, 10026, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (88, 10026, 'https://images.hooray.top/OPPO_Reno10_%E6%BA%A2%E5%BD%A9%E8%93%9D/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (89, 10027, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (90, 10027, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (91, 10027, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (92, 10027, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (93, 10027, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (94, 10028, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (95, 10028, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (96, 10028, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (97, 10028, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (98, 10028, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (99, 10029, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (100, 10029, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (101, 10029, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (102, 10029, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (103, 10029, 'https://images.hooray.top/OPPO_Reno10_%E6%9C%88%E6%B5%B7%E9%BB%91/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (104, 10030, 'https://images.hooray.top/%E7%BB%B4%E8%BE%BE%E8%B6%85%E9%9F%A7%E6%8A%BD%E5%8F%96%E9%9D%A2%E5%B7%BE3%E5%B1%82S%E7%A0%81100%E6%8A%BD/%E4%B8%BB%E5%9B%BE_01.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (105, 10030, 'https://images.hooray.top/%E7%BB%B4%E8%BE%BE%E8%B6%85%E9%9F%A7%E6%8A%BD%E5%8F%96%E9%9D%A2%E5%B7%BE3%E5%B1%82S%E7%A0%81100%E6%8A%BD/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (106, 10030, 'https://images.hooray.top/%E7%BB%B4%E8%BE%BE%E8%B6%85%E9%9F%A7%E6%8A%BD%E5%8F%96%E9%9D%A2%E5%B7%BE3%E5%B1%82S%E7%A0%81100%E6%8A%BD/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (107, 10030, 'https://images.hooray.top/%E7%BB%B4%E8%BE%BE%E8%B6%85%E9%9F%A7%E6%8A%BD%E5%8F%96%E9%9D%A2%E5%B7%BE3%E5%B1%82S%E7%A0%81100%E6%8A%BD/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (108, 10030, 'https://images.hooray.top/%E7%BB%B4%E8%BE%BE%E8%B6%85%E9%9F%A7%E6%8A%BD%E5%8F%96%E9%9D%A2%E5%B7%BE3%E5%B1%82S%E7%A0%81100%E6%8A%BD/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (109, 10031, 'https://images.hooray.top/Freeplus_%E8%8A%99%E4%B8%BD%E8%8A%B3%E4%B8%9D_%E5%87%80%E6%B6%A6%E6%B4%97%E9%9D%A2%E5%A5%B6_100g_/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (110, 10031, 'https://images.hooray.top/Freeplus_%E8%8A%99%E4%B8%BD%E8%8A%B3%E4%B8%9D_%E5%87%80%E6%B6%A6%E6%B4%97%E9%9D%A2%E5%A5%B6_100g_/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (111, 10031, 'https://images.hooray.top/Freeplus_%E8%8A%99%E4%B8%BD%E8%8A%B3%E4%B8%9D_%E5%87%80%E6%B6%A6%E6%B4%97%E9%9D%A2%E5%A5%B6_100g_/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (112, 10031, 'https://images.hooray.top/Freeplus_%E8%8A%99%E4%B8%BD%E8%8A%B3%E4%B8%9D_%E5%87%80%E6%B6%A6%E6%B4%97%E9%9D%A2%E5%A5%B6_100g_/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (113, 10031, 'https://images.hooray.top/Freeplus_%E8%8A%99%E4%B8%BD%E8%8A%B3%E4%B8%9D_%E5%87%80%E6%B6%A6%E6%B4%97%E9%9D%A2%E5%A5%B6_100g_/%E4%B8%BB%E5%9B%BE_06.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (114, 10032, 'https://images.hooray.top/SK-II_%E7%BE%8E%E4%B9%8B%E5%8C%99R.N.A.%E8%B6%85%E8%82%8C%E8%83%BD%E5%A4%A7%E7%BA%A2%E7%93%B6%E9%9D%A2%E9%9C%9C%E7%B4%A7%E8%87%B4%E6%B4%BB%E8%82%A4%E9%9D%A2%E9%9C%9C/%E4%B8%BB%E5%9B%BE_02.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (115, 10032, 'https://images.hooray.top/SK-II_%E7%BE%8E%E4%B9%8B%E5%8C%99R.N.A.%E8%B6%85%E8%82%8C%E8%83%BD%E5%A4%A7%E7%BA%A2%E7%93%B6%E9%9D%A2%E9%9C%9C%E7%B4%A7%E8%87%B4%E6%B4%BB%E8%82%A4%E9%9D%A2%E9%9C%9C/%E4%B8%BB%E5%9B%BE_03.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (116, 10032, 'https://images.hooray.top/SK-II_%E7%BE%8E%E4%B9%8B%E5%8C%99R.N.A.%E8%B6%85%E8%82%8C%E8%83%BD%E5%A4%A7%E7%BA%A2%E7%93%B6%E9%9D%A2%E9%9C%9C%E7%B4%A7%E8%87%B4%E6%B4%BB%E8%82%A4%E9%9D%A2%E9%9C%9C/%E4%B8%BB%E5%9B%BE_04.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (117, 10032, 'https://images.hooray.top/SK-II_%E7%BE%8E%E4%B9%8B%E5%8C%99R.N.A.%E8%B6%85%E8%82%8C%E8%83%BD%E5%A4%A7%E7%BA%A2%E7%93%B6%E9%9D%A2%E9%9C%9C%E7%B4%A7%E8%87%B4%E6%B4%BB%E8%82%A4%E9%9D%A2%E9%9C%9C/%E4%B8%BB%E5%9B%BE_05.jpg', NULL);
INSERT INTO `ProductImage` (`imageid`, `productid`, `imageurl`, `sign`) VALUES (118, 10032, 'https://images.hooray.top/SK-II_%E7%BE%8E%E4%B9%8B%E5%8C%99R.N.A.%E8%B6%85%E8%82%8C%E8%83%BD%E5%A4%A7%E7%BA%A2%E7%93%B6%E9%9D%A2%E9%9C%9C%E7%B4%A7%E8%87%B4%E6%B4%BB%E8%82%A4%E9%9D%A2%E9%9C%9C/%E4%B8%BB%E5%9B%BE_06.jpg', NULL);
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
  UNIQUE KEY `unique_user_product` (`userid`,`productid`),
  KEY `productid` (`productid`),
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `User` (`userid`),
  CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `Product` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of ShoppingCart
-- ----------------------------
BEGIN;
INSERT INTO `ShoppingCart` (`cartid`, `userid`, `productid`, `quantity`, `selected`) VALUES (81, 25, 10013, 1, 0);
INSERT INTO `ShoppingCart` (`cartid`, `userid`, `productid`, `quantity`, `selected`) VALUES (82, 25, 10024, 1, 0);
INSERT INTO `ShoppingCart` (`cartid`, `userid`, `productid`, `quantity`, `selected`) VALUES (83, 25, 10016, 1, 0);
INSERT INTO `ShoppingCart` (`cartid`, `userid`, `productid`, `quantity`, `selected`) VALUES (84, 25, 10031, 1, 0);
INSERT INTO `ShoppingCart` (`cartid`, `userid`, `productid`, `quantity`, `selected`) VALUES (85, 25, 10030, 1, 0);
INSERT INTO `ShoppingCart` (`cartid`, `userid`, `productid`, `quantity`, `selected`) VALUES (86, 25, 10032, 1, 0);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO `User` (`userid`, `username`, `password`, `phone`, `name`, `gender`) VALUES (25, 'admin', '$2b$10$H2Q28UA5ZE2h53lWzw9hEuQ2.eyANz5lhqCOWReLDsu4.8Q3H00M.', '18677439605', '杨云彬', 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
