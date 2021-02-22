/*
 Navicat MySQL Data Transfer

 Source Server         : 18.162.61.131_3306
 Source Server Type    : MySQL
 Source Server Version : 50733
 Source Host           : 18.162.61.131:3306
 Source Schema         : lend

 Target Server Type    : MySQL
 Target Server Version : 50733
 File Encoding         : 65001

 Date: 13/02/2021 12:43:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contract_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `contract_dictionary`;
CREATE TABLE `contract_dictionary`  (
  `describe` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'key描述',
  `key_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '键',
  `key_value` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '值'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of contract_dictionary
-- ----------------------------
INSERT INTO `contract_dictionary` VALUES (NULL, 'risk_controll_address', '0xE3159fE1F98d498A632B95DC57EA9bf3Cbaa5AB4');

SET FOREIGN_KEY_CHECKS = 1;
