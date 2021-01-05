// var express = require('express');
// var router = express.Router();
//
// const blockTransaction = require('./../../api/transaction/block-transaction');
//
//
// /**
//  * @swagger
//  * definitions:
//  *   tradeRecordList:
//  *     properties:
//  *       contract_address:
//  *         type: string
//  *       full_name:
//  *         type: string
//  *       name:
//  *         type: string
//  *       symbol:
//  *         type: string
//  *       trade_quantity:
//  *         type: number
//  *       base_quantity:
//  *         type: number
//  *       trade_price:
//  *         type: number
//  *       price_change_24:
//  *         type: number
//  */
//
// /**
//  * @swagger
//  * /v1/fox/blockTransaction/get24HourTradingVolume:
//  *   get:
//  *     tags:
//  *       - TradeRecord
//  *     description: Returns All TradeRecord (24H)
//  *     produces:
//  *       - application/json
//  *     responses:
//  *       200:
//  *         description: All TradeRecord (24H)
//  *         schema:
//  *           $ref: '#/definitions/tradeRecordList'
//  */
// router.get('/v1/fox/blockTransaction/get24HourTradingVolume', blockTransaction.get24HourTradingVolume);
//
// module.exports = router;