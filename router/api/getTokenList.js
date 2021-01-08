const express = require("express");
const router = express.Router();


// Load configuration file
const connection =   require('../../config/connection')
const url = require('url');

// getTokenList
 exports.getTokenList =  router.get("/getTokenList", async (req, res) => {
    // Define the SQL statement



//获取tokenList
     const sqlStr = "SELECT name,address,img,balance,decimals,ctokenAddress,current_price,mint_scale,borrow_scale from token_info ORDER BY sort_value DESC,token_id ASC";
     try {
     let data =  await connection.selectAll(sqlStr);
     res.send({
          code: 0, data: data
      });
    } catch (error) {
      res.json({code: 404, data: "For failure"});
    }
});

exports.Liquidation =  router.get("/Liquidation", async (req, res) => {
  // Define the SQL statement
  let data ={
    "code":0,
    "data":
       [
          {
            "address": "werhrerj…aefherb",
            "addrs": "75.87",
            "reward": "232.32232",
            "number": "7.56"
          },
          {
            "address": "werhrerj…aefherb",
            "addrs": "75.87",
            "reward": "232.32232",
            "number": "7.56"
          },
          {
            "address": "werhrerj…aefherb",
            "addrs": "75.87",
            "reward": "232.32232",
            "number": "7.56"
          }

       ]

  }
});

exports.MarketSize =  router.get("/marketSize", async (req, res) => {
    // Define the SQL statement
    const totalScaleSql = "select SUM(mint_scale) as mintScale,SUM(borrow_scale) as borrowScale FROM token_info"
    let totalScale = await connection.select(totalScaleSql)

    let totalMint = totalScale[0].mintScale;
    let totalBorrow = totalScale[0].borrowScale;

    let data ={
    "code":0,
    "data":{
      "market_deposit":totalMint,
      "market_withdrawals":totalBorrow,
      "apy":"17",
      "Pledgerate":"400"
    }
  }
  res.send({
    data
  })
});



module.exports = router;

