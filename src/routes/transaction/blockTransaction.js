var express = require('express');
var router = express.Router();

const blockTransaction = require('./../../api/transaction/block-transaction');


/**
 * @swagger
 * definitions:
 *   LendRecordList:
 *     properties:
 *       contract_address:
 *         type: string
 */

/**
 * @swagger
 * /v1/lend/blockTransaction/getTest:
 *   get:
 *     tags:
 *       - LendRecord
 *     description: Returns All LendRecord
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All LendRecord
 *         schema:
 *           $ref: '#/definitions/LendRecordList'
 */
router.get('/v1/lend/blockTransaction/getTest', blockTransaction.getTest);

module.exports = router;