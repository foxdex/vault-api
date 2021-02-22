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

 Date: 13/02/2021 12:01:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contract_info
-- ----------------------------
DROP TABLE IF EXISTS `contract_info`;
CREATE TABLE `contract_info`  (
  `contract_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID，合约ID',
  `contract_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '合约名称',
  `contract_describe` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '合约描述',
  `contract_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '合约地址',
  `result_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '未解析前的合约地址展示',
  `network` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '网络',
  `event_type` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件类型',
  `trade_token_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交易Token名称',
  `trade_token_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交易Token地址',
  `trade_token_topics` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交易Token_topics',
  `trade_token_precision` int(11) NULL DEFAULT NULL COMMENT '交易Token精度',
  `trade_token_balance` decimal(20, 6) NULL DEFAULT NULL COMMENT '交易Token抵押余额',
  `base_token_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '结算Token名称',
  `base_token_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '结算Token地址',
  `base_token_topics` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '结算Token_topics',
  `base_token_precision` int(11) NULL DEFAULT NULL COMMENT '结算Token精度',
  `base_token_balance` decimal(20, 6) NULL DEFAULT NULL COMMENT '结算Token借款余额',
  `belong_chain` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属公链',
  `creation_date` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `api_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'api访问路径',
  `is_start_synchronization` tinyint(4) NULL DEFAULT NULL COMMENT '是否开启同步：0-否；1-是；',
  `sort_value` int(11) NULL DEFAULT NULL COMMENT '排序值',
  `decimals` int(11) NULL DEFAULT NULL COMMENT '精确度',
  `trade_token_id` int(11) NULL DEFAULT NULL COMMENT 'token1交易币种ID，参考token_info.token_id',
  `base_token_id` int(11) NULL DEFAULT NULL COMMENT 'token2结算币种ID，参考token_info.token_id',
  `is_start_show` tinyint(4) NULL DEFAULT NULL COMMENT '是否开启显示',
  `current_apy` int(11) NULL DEFAULT NULL COMMENT '收益率',
  PRIMARY KEY (`contract_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
