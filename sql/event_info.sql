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

 Date: 13/02/2021 12:03:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for event_info
-- ----------------------------
DROP TABLE IF EXISTS `event_info`;
CREATE TABLE `event_info`  (
  `event_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `event_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID，事件ID',
  `event_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件名称',
  `event_function` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件Keccak-256',
  `event_hash` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件哈希',
  `belong_contract_id` int(11) NULL DEFAULT NULL COMMENT '所属合约ID，参考contract_info.contract_id',
  PRIMARY KEY (`event_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
