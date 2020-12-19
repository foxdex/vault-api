var express = require('express');
var router = express.Router();

const token = require('./../../api/token/token-info');


/**
 * @swagger
 * definitions:
 *   tokenList:
 *     properties:
 *       name:
 *         type: string
 *       address:
 *         type: string
 *       img:
 *         type: string
 *       balance:
 *         type: number
 *       decimals:
 *         type: number
 *       ctokenAddress:
 *         type: string
 */

/**
 * @swagger
 * /v1/lend/token/getTokenList:
 *   get:
 *     tags:
 *       - Token
 *     description: Returns All TokenList
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All TokenList
 *         schema:
 *           $ref: '#/definitions/tokenList'
 */
router.get('/v1/lend/token/getTokenList', token.getTokenList);


module.exports = router;