/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50724
Source Host           : 127.0.0.1:3306
Source Database       : lend

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2020-12-19 14:26:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for contract_info
-- ----------------------------
DROP TABLE IF EXISTS `contract_info`;
CREATE TABLE `contract_info` (
  `contract_id` int(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID，合约ID',
  `contract_name` varchar(50) DEFAULT NULL COMMENT '合约名称',
  `contract_describe` varchar(255) DEFAULT NULL COMMENT '合约描述',
  `contract_address` varchar(200) DEFAULT NULL COMMENT '合约地址',
  `result_address` varchar(255) DEFAULT NULL COMMENT '未解析前的合约地址展示',
  `network` varchar(20) DEFAULT NULL COMMENT '网络',
  `event_type` varchar(200) DEFAULT NULL COMMENT '事件类型',
  `trade_token_name` varchar(50) DEFAULT '' COMMENT '交易Token名称',
  `trade_token_address` varchar(200) DEFAULT NULL COMMENT '交易Token地址',
  `trade_token_topics` varchar(200) DEFAULT NULL COMMENT '交易Token_topics',
  `trade_token_precision` int(10) DEFAULT NULL COMMENT '交易Token精度',
  `base_token_name` varchar(50) DEFAULT '' COMMENT '结算Token名称',
  `base_token_address` varchar(200) DEFAULT NULL COMMENT '结算Token地址',
  `base_token_topics` varchar(200) DEFAULT NULL COMMENT '结算Token_topics',
  `base_token_precision` int(10) DEFAULT NULL COMMENT '结算Token精度',
  `belong_chain` varchar(255) DEFAULT NULL COMMENT '所属公链',
  `creation_date` datetime DEFAULT NULL COMMENT '创建时间',
  `api_url` varchar(200) DEFAULT NULL COMMENT 'api访问路径',
  `is_start_synchronization` int(10) DEFAULT '0' COMMENT '是否开启同步：0-否；1-是；',
  `sort_value` int(10) DEFAULT '0' COMMENT '排序值',
  `decimals` int(10) DEFAULT NULL COMMENT '精确度',
  `trade_token_id` int(10) DEFAULT NULL COMMENT 'token1交易币种ID，参考token_info.token_id',
  `base_token_id` int(10) DEFAULT NULL COMMENT 'token2结算币种ID，参考token_info.token_id',
  `is_start_show` int(10) DEFAULT '0' COMMENT '是否开启显示',
  `current_apy` decimal(20,6) DEFAULT '0.000000' COMMENT '收益率',
  PRIMARY KEY (`contract_id`),
  KEY `contract_id` (`contract_id`) USING BTREE COMMENT '查询索引',
  KEY `contract_name` (`contract_name`) USING BTREE COMMENT '查询索引'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='合约信息表';

-- ----------------------------
-- Records of contract_info
-- ----------------------------
INSERT INTO `contract_info` VALUES ('6', 'wtrx-usdt', 'WTRX/USDT', 'TMMypXZP4z4dV9XuraDq3VdweY7PtsSUX8', 'd1d6dafcb3068b646ee844e6288e6e0fd1abbeca', 'Shasta Testnet', '[LOG_SWAP,Transfer,Approval,LOG_EXIT,LOG_JOIN]', 'WTRX', 'TGky6zKfhrisXh92emTvPAbkenhXHTU8m6', null, '6', 'USDT', 'TQKzfGM1F1bvjo2tnQ5Kirqdu2hR8mFWs2', null, '8', 'Tron', '2020-12-16 11:00:52', 'https://api.shasta.trongrid.io', '1', '0', '18', '1', '3', '1', '0.613800');
INSERT INTO `contract_info` VALUES ('7', 'MasterChef', 'MasterChef', 'TEDKHvxU89jA61e7BhmXptUaaBkHZhziC8', null, 'Shasta Testnet', 'FOX', '', 'TE9oQF7Y8tbq5Lqdfr9S47QNXHt7GRcHh4', null, '18', '', null, null, null, null, null, null, '0', '0', null, null, null, '0', '0.000000');

-- ----------------------------
-- Table structure for contract_trade_synchronization_record
-- ----------------------------
DROP TABLE IF EXISTS `contract_trade_synchronization_record`;
CREATE TABLE `contract_trade_synchronization_record` (
  `record_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID，记录ID',
  `block_number` bigint(20) DEFAULT NULL COMMENT '区块高度',
  `block_timestamp` varchar(50) DEFAULT NULL COMMENT '区块时间戳',
  `event_name` varchar(200) DEFAULT NULL COMMENT '事件名称',
  `event_address` varchar(200) DEFAULT NULL COMMENT '事件地址',
  `contract_id` varchar(200) DEFAULT NULL COMMENT '合约ID，参考contract_info.contract_id',
  `contract_address` varchar(200) DEFAULT NULL COMMENT '合约地址',
  `transaction_id` varchar(200) DEFAULT NULL COMMENT '交易哈希',
  `log_data_a` varchar(200) DEFAULT NULL COMMENT '事件日志数据A',
  `log_data_b` varchar(200) DEFAULT NULL COMMENT '事件日志数据B',
  `trade_quantity` decimal(20,6) DEFAULT NULL COMMENT '交易Token成交数量',
  `base_quantity` decimal(20,6) DEFAULT NULL COMMENT '结算Token成交数量',
  `trade_price` decimal(20,6) DEFAULT NULL COMMENT '交易价格',
  `transaction_info_data` text COMMENT '区块交易信息json数据',
  `creation_date` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`record_id`),
  UNIQUE KEY `transaction_id&event_name&log_data` (`transaction_id`,`event_name`,`log_data_a`) USING BTREE COMMENT 'transaction_id&event_name&log_data 唯一索引',
  KEY `block_number` (`block_number`) USING BTREE COMMENT '查询索引',
  KEY `block_timestamp` (`block_timestamp`) USING BTREE COMMENT '查询索引',
  KEY `event_name` (`event_name`) USING BTREE COMMENT '查询索引',
  KEY `contract_address` (`contract_address`) USING BTREE COMMENT '查询索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='合约交易同步记录表';

-- ----------------------------
-- Records of contract_trade_synchronization_record
-- ----------------------------

-- ----------------------------
-- Table structure for event_info
-- ----------------------------
DROP TABLE IF EXISTS `event_info`;
CREATE TABLE `event_info` (
  `event_id` int(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID，事件ID',
  `event_name` varchar(50) DEFAULT NULL COMMENT '事件名称',
  `event_function` varchar(200) DEFAULT NULL COMMENT '事件Keccak-256',
  `event_hash` varchar(200) DEFAULT NULL COMMENT '事件哈希',
  `belong_contract_id` int(10) DEFAULT NULL COMMENT '所属合约ID，参考contract_info.contract_id',
  PRIMARY KEY (`event_id`),
  KEY `event_name` (`event_name`) USING BTREE COMMENT '查询索引'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COMMENT='事件信息表';

-- ----------------------------
-- Records of event_info
-- ----------------------------
INSERT INTO `event_info` VALUES ('1', 'LOG_SWAP', 'LOG_SWAP(address,address,address,uint256,uint256)', '908fb5ee8f16c6bc9bc3690973819f32a4d4b10188134543c88706e0e1d43378', '6');
INSERT INTO `event_info` VALUES ('2', 'LOG_JOIN', 'LOG_JOIN(address,address,uint256)', '63982df10efd8dfaaaa0fcc7f50b2d93b7cba26ccc48adee2873220d485dc39a', '6');
INSERT INTO `event_info` VALUES ('3', 'LOG_EXIT', 'LOG_EXIT(address,address,uint256)', 'e74c91552b64c2e2e7bd255639e004e693bd3e1d01cc33e65610b86afcc1ffed', '6');

-- ----------------------------
-- Table structure for token_info
-- ----------------------------
DROP TABLE IF EXISTS `token_info`;
CREATE TABLE `token_info` (
  `token_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID，Token-ID',
  `name` varchar(50) DEFAULT NULL COMMENT '币种名称',
  `address` varchar(200) DEFAULT NULL COMMENT '代币合约地址',
  `img` varchar(200) DEFAULT NULL COMMENT '图片信息',
  `balance` decimal(20,6) DEFAULT NULL COMMENT '余额',
  `decimals` int(10) DEFAULT NULL COMMENT '精确度',
  `ctokenAddress` varchar(200) DEFAULT NULL COMMENT '部署合约地址',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `sort_value` int(10) DEFAULT '0' COMMENT '排序值',
  `current_price` decimal(20,6) DEFAULT '0.000000' COMMENT '当前价格',
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='token信息表';

-- ----------------------------
-- Records of token_info
-- ----------------------------
INSERT INTO `token_info` VALUES ('1', 'DAI', 'TDFPVQJQnYFZrw1SvxKBsc34i9xiSe73bq', '-', '0.000000', '18', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET', '2020-12-19 14:25:32', '0', '1.000000');
