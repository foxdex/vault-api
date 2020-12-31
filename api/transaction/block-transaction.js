/*Query data on the chain*/

// Global Express Framework
const express = require("express");
const router = express.Router();
module.exports = router;

// Load configuration file
const config = require("../../config/mysql/localhost.json");
const mysql = require("mysql");
const conn = mysql.createConnection(config);

// get24HourTradingVolume
exports.get24HourTradingVolume = router.get("/get24HourTradingVolume", (req, res) => {
    // Define the SQL statement
    const sqlStr = "select \n" +
        "\t\t\t\tMAX(t2.contract_address) as contract_address,\n" +
        "\t\t\t\tCONCAT(MAX(t2.trade_token_name),'/',MAX(t2.base_token_name)) as full_name,\n" +
        "\t\t\t\tMAX(t2.trade_token_name) as name,\n" +
        "        MAX(t2.base_token_name)  as symbol,\n" +
        "        MAX((select case when SUM(trade_quantity) is null then 0 else SUM(trade_quantity) end\n" +
        "\t\t\t\t\t\t from contract_trade_synchronization_record WHERE contract_id=t1.contract_id AND event_name=\"LOG_SWAP\" AND block_timestamp >= REPLACE(unix_timestamp(current_timestamp(3)),'.','') - 86400000)) as trade_quantity,\n" +
        "        MAX((select case when SUM(base_quantity) is null then 0 else SUM(base_quantity) end\n" +
        "\t\t\t\t\t\t from contract_trade_synchronization_record WHERE contract_id=t1.contract_id AND event_name=\"LOG_SWAP\" AND block_timestamp >= REPLACE(unix_timestamp(current_timestamp(3)),'.','') - 86400000)) as base_quantity,\n" +
        "\t\t\t\tMAX((select trade_price from contract_trade_synchronization_record WHERE contract_id=t1.contract_id AND event_name=\"LOG_SWAP\" ORDER BY block_timestamp DESC LIMIT 1)) as trade_price,\n" +
        "\t\t\t\tIFNULL(MAX(((select trade_price from contract_trade_synchronization_record WHERE contract_id=t1.contract_id AND event_name=\"LOG_SWAP\" ORDER BY block_timestamp DESC LIMIT 1) - \n" +
        "\t\t\t\t\t\t(select trade_price from contract_trade_synchronization_record WHERE contract_id=t1.contract_id AND event_name=\"LOG_SWAP\" AND \n" +
        "\t\t\t\t\t\tblock_timestamp < REPLACE(unix_timestamp(current_timestamp(3)),'.','') - 86400000 ORDER BY block_timestamp DESC LIMIT 1))\n" +
        "\t\t\t\t\t\t/\n" +
        "\t\t\t\t\t\t(select trade_price from contract_trade_synchronization_record WHERE contract_id=t1.contract_id AND event_name=\"LOG_SWAP\" AND \n" +
        "\t\t\t\t\t\tblock_timestamp < REPLACE(unix_timestamp(current_timestamp(3)),'.','') - 86400000 ORDER BY block_timestamp DESC LIMIT 1)\n" +
        "\t\t\t\t\t\t),0) as price_change_24\n" +
        "        from contract_trade_synchronization_record t1 LEFT JOIN contract_info t2 ON t1.contract_id = t2.contract_id\n" +
        "        WHERE event_name=\"LOG_SWAP\" GROUP BY t1.contract_id";

    conn.query(sqlStr, null, (err, result) => {
        if (err) return result.json({code: 404, data: "For failure"});
        res.send({
            code: 0, data: result
        });
    });
});
