/*
 Navicat Premium Data Transfer

 Source Server         : wyt
 Source Server Type    : MySQL
 Source Server Version : 80039
 Source Host           : localhost:3306
 Source Schema         : crowdfunding_db

 Target Server Type    : MySQL
 Target Server Version : 80039
 File Encoding         : 65001

 Date: 13/10/2024 17:35:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL,
  `NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'MEDICAL');
INSERT INTO `category` VALUES (2, 'EDUCATION');
INSERT INTO `category` VALUES (3, 'SOCIAL IMPACT');
INSERT INTO `category` VALUES (4, 'CRISIS RELIEF');
INSERT INTO `category` VALUES (5, 'OTHER');

-- ----------------------------
-- Table structure for donation
-- ----------------------------
DROP TABLE IF EXISTS `donation`;
CREATE TABLE `donation`  (
  `DONTION_ID` int(0) NOT NULL AUTO_INCREMENT,
  `DATE` datetime(0) NOT NULL,
  `AMOUNT` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `GIVER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `FUNDRAISER_ID` int(0) NOT NULL,
  PRIMARY KEY (`DONTION_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of donation
-- ----------------------------
INSERT INTO `donation` VALUES (22, '2024-10-13 17:33:04', '6000', 'giver1', 33);
INSERT INTO `donation` VALUES (23, '2024-10-13 17:33:15', '200', 'giver2', 34);
INSERT INTO `donation` VALUES (24, '2024-10-13 17:33:28', '2000', 'giver3', 36);
INSERT INTO `donation` VALUES (25, '2024-10-13 17:33:38', '56', 'giver4', 33);
INSERT INTO `donation` VALUES (26, '2024-10-13 17:33:51', '1000', 'giver5', 41);
INSERT INTO `donation` VALUES (27, '2024-10-13 17:34:00', '5000', 'giver6', 34);
INSERT INTO `donation` VALUES (28, '2024-10-13 17:34:13', '30', 'giver7', 35);
INSERT INTO `donation` VALUES (29, '2024-10-13 17:34:21', '10000', 'giver10', 33);
INSERT INTO `donation` VALUES (30, '2024-10-13 17:34:54', '2000', 'giver1', 35);
INSERT INTO `donation` VALUES (31, '2024-10-13 17:35:06', '10.1', 'giver2', 33);
INSERT INTO `donation` VALUES (32, '2024-10-13 17:35:31', '5600', 'giver1', 37);

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------
DROP TABLE IF EXISTS `fundraiser`;
CREATE TABLE `fundraiser`  (
  `FUNDRAISER_ID` int(0) NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CAPTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TARGET_FUNDING` double NOT NULL,
  `CURRENT_FUNDING` double NOT NULL DEFAULT 0,
  `CITY` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL,
  `CATEGORY_ID` int(0) NOT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (33, 'user1', '‌Innovate Now: Bringing Your Idea to Life\"‌', 5656.88, 16066.1, 'ShenZhen', 1, 1);
INSERT INTO `fundraiser` VALUES (34, 'user2', 'Fund the Future: Supporting Your Vision', 100000, 5200, 'ShangHai', 1, 2);
INSERT INTO `fundraiser` VALUES (35, 'user3', 'Join the Revolution: Change the Game Together', 2000, 2030, 'BeiJing', 1, 3);
INSERT INTO `fundraiser` VALUES (36, 'user4', 'Make It Happen: Bringing Creativity to Life', 23000, 2000, 'YunNan', 1, 4);
INSERT INTO `fundraiser` VALUES (37, 'user4', 'Make It Happen: Bringing Creativity to Life', 23000, 5600, 'YunNan', 1, 4);
INSERT INTO `fundraiser` VALUES (38, 'user5', 'Empower the Dream: Together We Can Achieve Greatness', 56000, 0, 'ShangHai', 0, 5);
INSERT INTO `fundraiser` VALUES (39, 'user6', 'Transform Tomorrow: Funding Tomorrow\'s Innovations', 40000, 0, 'BeiJing', 1, 1);
INSERT INTO `fundraiser` VALUES (40, 'user7', 'Unlock Potential: Supporting Your Passion Project', 9000, 0, 'GuangZhou', 1, 2);
INSERT INTO `fundraiser` VALUES (41, 'user8', 'Change the World: One Project at a Time', 34000, 1000, 'TianJin', 1, 3);
INSERT INTO `fundraiser` VALUES (42, 'user9', 'Invest in the Future: Supporting Your Vision Today', 67000, 0, 'BeiJing', 1, 4);
INSERT INTO `fundraiser` VALUES (43, 'user10', 'Join the Movement: Funding Your Dreams Together', 7000, 0, 'ShangHai', 1, 5);

SET FOREIGN_KEY_CHECKS = 1;
