/*Query data on the chain*/

// Global Express Framework
const express = require("express");
const router = express.Router();
module.exports = router;

// Load configuration file
const config = require("../../config/mysql.json");
const mysql = require("mysql");
const conn = mysql.createConnection(config);

// getTest
exports.getTest = router.get("/getTest", (req, res) => {
    // Define the SQL statement
    const sqlStr = "select 1";

    conn.query(sqlStr, null, (err, result) => {
        if (err) return result.json({code: 404, data: "For failure"});
        res.send({
            code: 0, data: result
        });
    });
});
