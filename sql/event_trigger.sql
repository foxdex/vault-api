/*
 Navicat MySQL Data Transfer

 Source Server         : 13.250.102.41_3306
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : 13.250.102.41:3306
 Source Schema         : box

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 13/02/2021 12:03:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for event_trigger
-- ----------------------------
DROP TABLE IF EXISTS `event_trigger`;
CREATE TABLE `event_trigger`  (
  `event_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `date_created` bigint(20) NULL DEFAULT NULL COMMENT '事件时间戳',
  `hash` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '对应hash',
  `method` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '对应该事件是存取借贷中哪一种',
  `owber_address` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户address',
  `parameter` decimal(65, 0) NULL DEFAULT NULL COMMENT '该事件相关参数，存取规模',
  `ctoken_address` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ctoken地址',
  PRIMARY KEY (`event_id`) USING BTREE,
  UNIQUE INDEX `hash`(`hash`) USING BTREE,
  UNIQUE INDEX `hash_2`(`hash`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3674365 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
