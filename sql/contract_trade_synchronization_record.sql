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

 Date: 13/02/2021 12:01:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contract_trade_synchronization_record
-- ----------------------------
DROP TABLE IF EXISTS `contract_trade_synchronization_record`;
CREATE TABLE `contract_trade_synchronization_record`  (
  `record_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增ID，记录ID',
  `block_number` bigint(20) NULL DEFAULT NULL COMMENT '区块高度',
  `block_timestamp` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '区块时间戳',
  `event_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件名称',
  `event_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件地址',
  `contract_id` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '合约ID，参考contract_info.contract_id',
  `contract_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '合约地址',
  `transaction_id` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交易哈希',
  `log_data_a` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件日志数据A',
  `log_data_b` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件日志数据B',
  `trade_quantity` decimal(20, 6) NULL DEFAULT NULL COMMENT '交易Token成交数量',
  `base_quantity` decimal(20, 6) NULL DEFAULT NULL COMMENT '结算Token成交数量',
  `trade_price` decimal(20, 6) NULL DEFAULT NULL COMMENT '交易价格',
  `transaction_info_data` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '区块交易信息json数据',
  `creation_date` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`record_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
