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

 Date: 13/02/2021 12:03:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户地址',
  `mint_scale` decimal(60, 6) NOT NULL COMMENT '用户总存款规模',
  `borrow_scale` decimal(60, 6) NOT NULL COMMENT '用户总借款规模',
  `ctoken_address` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '合约地址',
  `save_json` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '预存json',
  PRIMARY KEY (`user_address`, `ctoken_address`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
