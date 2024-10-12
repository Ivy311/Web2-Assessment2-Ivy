/*
 Navicat Premium Data Transfer

 Source Server         : ryx
 Source Server Type    : MySQL
 Source Server Version : 80039
 Source Host           : localhost:3306
 Source Schema         : crowdfunding_db

 Target Server Type    : MySQL
 Target Server Version : 80039
 File Encoding         : 65001

 Date: 11/10/2024 22:10:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CATEGORY_ID` int(0) NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'MEDICAL');
INSERT INTO `category` VALUES (2, 'EDUCATION');
INSERT INTO `category` VALUES (3, 'SOCIAL IMPACT');
INSERT INTO `category` VALUES (4, 'CRISIS RELIEF');

-- ----------------------------
-- Table structure for donation
-- ----------------------------
DROP TABLE IF EXISTS `donation`;
CREATE TABLE `donation`  (
  `donation_id` int(0) NOT NULL AUTO_INCREMENT,
  `date` datetime(0) NOT NULL,
  `amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `giver` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `fundraiser_id` int(0) NOT NULL,
  PRIMARY KEY (`donation_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of donation
-- ----------------------------
INSERT INTO `donation` VALUES (1, '2024-10-11 21:39:32', '123', 'wyt', 1);
INSERT INTO `donation` VALUES (2, '2024-10-11 21:40:13', '666', 'wyt', 1);
INSERT INTO `donation` VALUES (3, '2024-10-11 21:41:31', '999', 'mzw', 1);
INSERT INTO `donation` VALUES (4, '2024-10-11 21:42:23', '777', 'mzw', 1);
INSERT INTO `donation` VALUES (5, '2024-10-11 21:57:44', '000', 'aa', 1);

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------
DROP TABLE IF EXISTS `fundraiser`;
CREATE TABLE `fundraiser`  (
  `FUNDRAISER_ID` int(0) NOT NULL,
  `ORGANIZER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CAPTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TARGET_FUNDING` double NOT NULL,
  `CURRENT_FUNDING` double NOT NULL,
  `CITY` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL,
  `CATEGORY_ID` int(0) NOT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'Asa', 'Pursue the dream of the covenant, light the light of hope - Dandelion missionary journey', 120000, 7272, 'GuiZhou', 1, 2);
INSERT INTO `fundraiser` VALUES (2, 'Bron', 'Intangible cultural heritage integrates economy to help rural revitalization', 90000, 1256.78, 'YunNan', 1, 3);
INSERT INTO `fundraiser` VALUES (3, 'Lynn', 'Rescuing a stray cat whose eyes are falling out', 1800, 956, 'HuNan', 1, 4);
INSERT INTO `fundraiser` VALUES (4, 'Jess', 'Youth without regret, without time', 15000, 10000, 'BeiJing', 1, 3);
INSERT INTO `fundraiser` VALUES (5, 'Jadyn', 'I want to hear voices! I want to go out to work!', 5000, 3336, 'ShenZhen', 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
