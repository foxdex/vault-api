/*Query data on the token*/

// Global Express Framework
const express = require("express");
const router = express.Router();
module.exports = router;

// Load configuration file
const config = require("../../config/mysql/localhost.json");
const mysql = require("mysql");
const conn = mysql.createConnection(config);

const url = require('url');

// getTokenList
exports.getTokenList = router.get("/getTokenList", (req, res) => {
    // Define the SQL statement
    const sqlStr = "SELECT name,address,img,balance,decimals,ctokenAddress from token_info ORDER BY sort_value DESC,token_id ASC";

    conn.query(sqlStr, null, (err, result) => {
        if (err) return result.json({code: 404, data: "For failure"});
        res.send({
            code: 0, data: result
        });
    });
});
