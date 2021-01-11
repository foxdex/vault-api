/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 09/01/2021 18:34:49
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contract_info
-- ----------------------------
DROP TABLE IF EXISTS `contract_info`;
CREATE TABLE `contract_info`  (
  `contract_id` int(0) NOT NULL COMMENT '自增ID，合约ID',
  `contract_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '合约名称',
  `contract_describe` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '合约描述',
  `contract_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '合约地址',
  `result_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '未解析前的合约地址展示',
  `network` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '网络',
  `event_type` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件类型',
  `trade_token_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交易Token名称',
  `trade_token_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交易Token地址',
  `trade_token_topics` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '交易Token_topics',
  `trade_token_precision` int(0) NULL DEFAULT NULL COMMENT '交易Token精度',
  `trade_token_balance` decimal(20, 6) NULL DEFAULT NULL COMMENT '交易Token抵押余额',
  `base_token_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '结算Token名称',
  `base_token_address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '结算Token地址',
  `base_token_topics` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '结算Token_topics',
  `base_token_precision` int(0) NULL DEFAULT NULL COMMENT '结算Token精度',
  `base_token_balance` decimal(20, 6) NULL DEFAULT NULL COMMENT '结算Token借款余额',
  `belong_chain` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属公链',
  `creation_date` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `api_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'api访问路径',
  `is_start_synchronization` tinyint(0) NULL DEFAULT NULL COMMENT '是否开启同步：0-否；1-是；',
  `sort_value` int(0) NULL DEFAULT NULL COMMENT '排序值',
  `decimals` int(0) NULL DEFAULT NULL COMMENT '精确度',
  `trade_token_id` int(0) NULL DEFAULT NULL COMMENT 'token1交易币种ID，参考token_info.token_id',
  `base_token_id` int(0) NULL DEFAULT NULL COMMENT 'token2结算币种ID，参考token_info.token_id',
  `is_start_show` tinyint(0) NULL DEFAULT NULL COMMENT '是否开启显示',
  `current_apy` int(0) NULL DEFAULT NULL COMMENT '收益率',
  PRIMARY KEY (`contract_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;





/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 09/01/2021 18:35:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contract_trade_synchronization_record
-- ----------------------------
DROP TABLE IF EXISTS `contract_trade_synchronization_record`;
CREATE TABLE `contract_trade_synchronization_record`  (
  `record_id` bigint(0) NOT NULL COMMENT '自增ID，记录ID',
  `block_number` bigint(0) NULL DEFAULT NULL COMMENT '区块高度',
  `block_timestamp` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '区块时间戳',
  `event_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '事件名称',
  `event_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '事件地址',
  `contract_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '合约ID，参考contract_info.contract_id',
  `contract_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '合约地址',
  `transaction_id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '交易哈希',
  `log_data_a` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '事件日志数据A',
  `log_data_b` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '事件日志数据B',
  `trade_quantity` decimal(20, 6) NULL DEFAULT NULL COMMENT '交易Token成交数量',
  `base_quantity` decimal(20, 6) NULL DEFAULT NULL COMMENT '结算Token成交数量',
  `trade_price` decimal(20, 6) NULL DEFAULT NULL COMMENT '交易价格',
  `transaction_info_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '区块交易信息json数据',
  `creation_date` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`record_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;









/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 09/01/2021 18:36:41
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dictionary_value
-- ----------------------------
DROP TABLE IF EXISTS `dictionary_value`;
CREATE TABLE `dictionary_value`  (
  `describe` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'key描述',
  `key_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '键',
  `key_value` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '-' COMMENT '值',
  UNIQUE INDEX `key_id`(`key_id`) USING BTREE COMMENT 'key_id唯一索引'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '字典键值表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dictionary_value
-- ----------------------------
INSERT INTO `dictionary_value` VALUES ('TronGrid API 服务访问地址', 'tron_api_url', 'https://api.trongrid.io');
INSERT INTO `dictionary_value` VALUES ('Token 分发合约地址', 'master_chef_address', '-');
INSERT INTO `dictionary_value` VALUES ('Current Environment 当前环境', 'current_environment', 'pro');
INSERT INTO `dictionary_value` VALUES ('BFactory 合约地址', 'bf_actory', '-');
INSERT INTO `dictionary_value` VALUES ('RewardToken 合约地址', 'reward_token_address', '-');

SET FOREIGN_KEY_CHECKS = 1;






/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 09/01/2021 18:36:50
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for event_info
-- ----------------------------
DROP TABLE IF EXISTS `event_info`;
CREATE TABLE `event_info`  (
  `event_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `event_id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID，事件ID',
  `event_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件名称',
  `event_function` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件Keccak-256',
  `event_hash` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件哈希',
  `belong_contract_id` int(0) NULL DEFAULT NULL COMMENT '所属合约ID，参考contract_info.contract_id',
  PRIMARY KEY (`event_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;













/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 09/01/2021 18:45:52
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for event_trigger
-- ----------------------------
DROP TABLE IF EXISTS `event_trigger`;
CREATE TABLE `event_trigger`  (
  `event_id` int(0) NOT NULL COMMENT '自增主键',
  `date_created` date NULL DEFAULT NULL COMMENT '事件时间戳',
  `hash` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '对应hash',
  `method` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '对应该事件是存取借贷中哪一种',
  `owber_address` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户address',
  `parameter` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '该事件相关参数，存取规模',
  `ctoken_address` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ctoken地址',
  PRIMARY KEY (`event_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of event_trigger
-- ----------------------------
INSERT INTO `event_trigger` VALUES (864, NULL, '5d56700cb53872ee594653a626bc87f78debc2ea9cd426213b9184469b22d59c', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (865, NULL, '5d56700cb53872ee594653a626bc87f78debc2ea9cd426213b9184469b22d59c', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (866, NULL, 'b0b8226a0d9d0bba0ff0088460a40269a2f157bae226cf901308f301e59ad8c8', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"999204777927\",\"redeemTokens\":\"999204777927\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (867, NULL, 'b5c102da0a2a522b3987082452f2c35c3d6bf007ff87e81603d3db04faf52e8a', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"999204777927\",\"redeemTokens\":\"999204777927\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (868, NULL, '90306c7a961ec16b312b200d25abd8f29bf514f9876b7bb0a518cf9b2dba2ebc', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"271499276\",\"repayAmount\":\"271499276\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (869, NULL, 'fc2dbefa17ebb64d56c20ffb0fcb91ca4b0f3325ab4ccad751ae9e6f9c82ca45', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"95131761124824\",\"repayAmount\":\"95131761124824\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (870, NULL, 'b5c102da0a2a522b3987082452f2c35c3d6bf007ff87e81603d3db04faf52e8a', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"999204777927\",\"redeemTokens\":\"999204777927\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (871, NULL, 'ed2e2593cae5d15543b363d0ec9a06ad7415fa8e4766e78c3d7f175496ab6e1d', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"775\",\"repayAmount\":\"775\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (872, NULL, 'ed2e2593cae5d15543b363d0ec9a06ad7415fa8e4766e78c3d7f175496ab6e1d', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"775\",\"repayAmount\":\"775\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (873, NULL, '9e598acc5635115c5ee1e10d9c848738d63ad1c15c917feaa89f49203c35ee78', 'borrow(uint256 borrowAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"49999999999971013579\",\"borrowAmount\":\"49999999999971013579\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (874, NULL, '90306c7a961ec16b312b200d25abd8f29bf514f9876b7bb0a518cf9b2dba2ebc', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"271499276\",\"repayAmount\":\"271499276\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (875, NULL, 'f09e03350e50b42158a2762f73bec5906a5af1352bd0e134e39403d915814e7c', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"50001308038281738586\",\"repayAmount\":\"50001308038281738586\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (876, NULL, 'b5c102da0a2a522b3987082452f2c35c3d6bf007ff87e81603d3db04faf52e8a', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"999204777927\",\"redeemTokens\":\"999204777927\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (877, NULL, '9e598acc5635115c5ee1e10d9c848738d63ad1c15c917feaa89f49203c35ee78', 'borrow(uint256 borrowAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"49999999999971013579\",\"borrowAmount\":\"49999999999971013579\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (878, NULL, 'cb4b8a2674f4c07776ba25a236fde880b29940d9cbcf123f25fa24049fd74c69', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"999204777927\",\"redeemTokens\":\"999204777927\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (879, NULL, 'f09e03350e50b42158a2762f73bec5906a5af1352bd0e134e39403d915814e7c', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"50001308038281738586\",\"repayAmount\":\"50001308038281738586\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (880, NULL, 'b0b8226a0d9d0bba0ff0088460a40269a2f157bae226cf901308f301e59ad8c8', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"999204777927\",\"redeemTokens\":\"999204777927\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (881, NULL, 'cb4b8a2674f4c07776ba25a236fde880b29940d9cbcf123f25fa24049fd74c69', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"999204777927\",\"redeemTokens\":\"999204777927\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (882, NULL, '5d56700cb53872ee594653a626bc87f78debc2ea9cd426213b9184469b22d59c', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (883, NULL, '6f806092c4463ce600bd9240eb4b0d1af5565bb6568003db892218f24e4bc5c4', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (884, NULL, '6f806092c4463ce600bd9240eb4b0d1af5565bb6568003db892218f24e4bc5c4', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (885, NULL, '6f806092c4463ce600bd9240eb4b0d1af5565bb6568003db892218f24e4bc5c4', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (886, NULL, '0d1456a85a6f657b5c1ab5aee34410d390f1140d265acf791f6b126059c5494f', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (887, NULL, '0d1456a85a6f657b5c1ab5aee34410d390f1140d265acf791f6b126059c5494f', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (888, NULL, '0d1456a85a6f657b5c1ab5aee34410d390f1140d265acf791f6b126059c5494f', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (889, NULL, '1a21ca96f80e12fac6a55dedced90477c3efd027e43ab14f53b2a96c3cb0e2c4', 'borrow(uint256 borrowAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"100000000000000000000\",\"borrowAmount\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (890, NULL, '1a21ca96f80e12fac6a55dedced90477c3efd027e43ab14f53b2a96c3cb0e2c4', 'borrow(uint256 borrowAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"100000000000000000000\",\"borrowAmount\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (891, NULL, 'c73dc53a75f347cc6fb3eedae00de553d856005eb190857572599be43e3d3128', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"100002949015417544135\",\"repayAmount\":\"100002949015417544135\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (892, NULL, 'c73dc53a75f347cc6fb3eedae00de553d856005eb190857572599be43e3d3128', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"100002949015417544135\",\"repayAmount\":\"100002949015417544135\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (893, NULL, 'db5c69d646985d5cc482632eda168493d0cf8d22df8429830cabbf71f448c433', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"285391982399467\",\"repayAmount\":\"285391982399467\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (894, NULL, 'db5c69d646985d5cc482632eda168493d0cf8d22df8429830cabbf71f448c433', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"285391982399467\",\"repayAmount\":\"285391982399467\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (895, NULL, '7b555340461dbe1b584e168b115920bcc4cd6d45548a08eb89058615b974710a', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"814473298\",\"repayAmount\":\"814473298\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (896, NULL, '7b555340461dbe1b584e168b115920bcc4cd6d45548a08eb89058615b974710a', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"814473298\",\"repayAmount\":\"814473298\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (897, NULL, '8d6590da9f9ee6e5b03734ea4d9b0b22ff191c7ba66bba0ce3dbf41432ef69e1', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"2997614332962\",\"redeemTokens\":\"2997614332962\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (898, NULL, '8d6590da9f9ee6e5b03734ea4d9b0b22ff191c7ba66bba0ce3dbf41432ef69e1', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"2997614332962\",\"redeemTokens\":\"2997614332962\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (899, NULL, '5f4a3b81dbb7a068ea1f0634da9c5c2ca13b5d707eba63b51166b7bc7c04a1c6', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"3099\",\"repayAmount\":\"3099\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (900, NULL, '5f4a3b81dbb7a068ea1f0634da9c5c2ca13b5d707eba63b51166b7bc7c04a1c6', 'repayBorrow(uint256 repayAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"3099\",\"repayAmount\":\"3099\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (901, NULL, '8ab680d0847adaaec6c2ac550573735f1ea0d4cdceca07c121cf5960960f5cff', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"2997614332962\",\"redeemTokens\":\"2997614332962\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (902, NULL, '8ab680d0847adaaec6c2ac550573735f1ea0d4cdceca07c121cf5960960f5cff', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"2997614332962\",\"redeemTokens\":\"2997614332962\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (903, NULL, '8ab680d0847adaaec6c2ac550573735f1ea0d4cdceca07c121cf5960960f5cff', 'redeem(uint256 redeemTokens)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"0\":\"2997614332962\",\"redeemTokens\":\"2997614332962\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (904, NULL, 'd8ae56a3c701323b3a27431ec13ada567e3a4d77b9e139a563ab2fad8d93cbd2', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (905, NULL, 'd8ae56a3c701323b3a27431ec13ada567e3a4d77b9e139a563ab2fad8d93cbd2', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (906, NULL, 'd8ae56a3c701323b3a27431ec13ada567e3a4d77b9e139a563ab2fad8d93cbd2', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (907, NULL, 'aeb23b77b1c3b5683c2e53aeea46f772205d586470c4bb427bf3232a6792e807', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (908, NULL, 'aeb23b77b1c3b5683c2e53aeea46f772205d586470c4bb427bf3232a6792e807', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (909, NULL, 'aeb23b77b1c3b5683c2e53aeea46f772205d586470c4bb427bf3232a6792e807', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (910, NULL, '9b4fd45e6195e9b5b34fcf5ba72920cc9cb460d8608d7e34e9b2df6d8b15cd64', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (911, NULL, '9b4fd45e6195e9b5b34fcf5ba72920cc9cb460d8608d7e34e9b2df6d8b15cd64', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (912, NULL, '9b4fd45e6195e9b5b34fcf5ba72920cc9cb460d8608d7e34e9b2df6d8b15cd64', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (913, NULL, '4aee06025f68d8bd26d0dd88c30f2fd05ae41ea1ccc8ffe34418451730f88910', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (914, NULL, '4aee06025f68d8bd26d0dd88c30f2fd05ae41ea1ccc8ffe34418451730f88910', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (915, NULL, '4aee06025f68d8bd26d0dd88c30f2fd05ae41ea1ccc8ffe34418451730f88910', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"100000000000000000000\",\"0\":\"100000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (916, NULL, '2d88d0fb1c83554c5218f6829676878c37ff125597d39dd4e8b538f586015645', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (917, NULL, '2d88d0fb1c83554c5218f6829676878c37ff125597d39dd4e8b538f586015645', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');
INSERT INTO `event_trigger` VALUES (918, NULL, '2d88d0fb1c83554c5218f6829676878c37ff125597d39dd4e8b538f586015645', 'mint(uint256 mintAmount)', 'TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', '{\"mintAmount\":\"10000000000000000000\",\"0\":\"10000000000000000000\"}', 'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET');

SET FOREIGN_KEY_CHECKS = 1;















/*
 Navicat Premium Data Transfer

 Source Server         : box-test
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : 18.166.58.56:3306
 Source Schema         : box-lend

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 11/01/2021 18:03:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for token_info
-- ----------------------------
DROP TABLE IF EXISTS `token_info`;
CREATE TABLE `token_info`  (
  `token_id` int(11) NOT NULL COMMENT '自增ID，Token-ID',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '币种名称',
  `token_alias` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Token别名',
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '代币合约地址',
  `img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片信息',
  `balance` decimal(20, 6) NULL DEFAULT NULL COMMENT '余额',
  `decimals` int(11) NULL DEFAULT NULL COMMENT '精确度',
  `ctokenAddress` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部署借贷合约地址',
  `mint_rate` decimal(20, 6) NULL DEFAULT NULL COMMENT '存款利率',
  `borrow_rate` decimal(20, 6) NULL DEFAULT NULL COMMENT '借款利率',
  `mint_scale` decimal(65, 30) NULL DEFAULT NULL COMMENT '存款规模',
  `borrow_scale` decimal(65, 30) NULL DEFAULT NULL COMMENT '借款规模',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `sort_value` int(11) NULL DEFAULT 0 COMMENT '排序值',
  `current_price` decimal(20, 6) NULL DEFAULT 0.000000 COMMENT '当前价格',
  `cdecimals` decimal(20, 0) NULL DEFAULT NULL COMMENT 'Ctoken精确度',
  `abi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`token_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of token_info
-- ----------------------------
INSERT INTO `token_info` VALUES (1, 'TRX', NULL, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', NULL, 0.000000, 6, 'TMtK1HFdw3wm9PEivno2btBs5C8EoxtuUV', 0.100000, 0.100000, 100.000000000000000000000000000000, 100.000000000000000000000000000000, NULL, 0, 1.000000, 18, '0');
INSERT INTO `token_info` VALUES (2, 'USDT', NULL, 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', NULL, 0.000000, 6, 'TKAcAFDT4xpuTnjtLab41e5cAFcZFcW9Ha', 0.100000, 0.100000, 100.000000000000000000000000000000, 100.000000000000000000000000000000, NULL, 0, 1.000000, 18, '0');
INSERT INTO `token_info` VALUES (3, 'JUSTSWAP-USDT-TRX', NULL, 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE', NULL, 0.000000, 6, 'TYM1GyCB8cg5YC37WgkkBnVXn8qwd5hr9L', 0.100000, 0.100000, 100.000000000000000000000000000000, 100.000000000000000000000000000000, NULL, 0, 1.000000, 18, '1');

SET FOREIGN_KEY_CHECKS = 1;







/*
 Navicat Premium Data Transfer

 Source Server         : box-test
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : 18.166.58.56:3306
 Source Schema         : box-lend

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 11/01/2021 18:04:08
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `owber_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户地址',
  `mint_scale` decimal(65, 6) NULL DEFAULT NULL COMMENT '借款规模',
  `borrow_scale` decimal(65, 6) NULL DEFAULT NULL COMMENT '存款规模',
  PRIMARY KEY (`owber_address`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x', 12.000000, 21.000000);

SET FOREIGN_KEY_CHECKS = 1;
