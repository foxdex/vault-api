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

 Date: 13/02/2021 12:43:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dictionary_value
-- ----------------------------
DROP TABLE IF EXISTS `dictionary_value`;
CREATE TABLE `dictionary_value`  (
  `describe` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'key描述',
  `key_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '键',
  `key_value` varchar(4000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '-' COMMENT '值',
  UNIQUE INDEX `key_id`(`key_id`) USING BTREE COMMENT 'key_id唯一索引'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典键值表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dictionary_value
-- ----------------------------
INSERT INTO `dictionary_value` VALUES (NULL, 'hf_price', '3.407554372603059068');

SET FOREIGN_KEY_CHECKS = 1;
