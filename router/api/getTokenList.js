const express = require("express");
const router = express.Router();


// Load configuration file
const connection =   require('../../config/connection')
const url = require('url');

// getTokenList
 exports.getTokenList =  router.get("/getTokenList", async (req, res) => {
    // Define the SQL statement
    const sqlStr = "SELECT name,address,img,balance,decimals,ctokenAddress,current_price,mint_scale,borrow_scale from token_info ORDER BY sort_value DESC,token_id ASC";
    try {
     let data =  await connection.selectAll(sqlStr);
     res.send({
          code: 0, data: data
      });
    } catch (error) {
      result.json({code: 404, data: "For failure"});
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
  res.send({
    data
  })
});

exports.Liquidation =  router.get("/marketSize", async (req, res) => {
  // Define the SQL statement
  let data ={
    "code":0,
    "data":{
      "market_deposit":"1111",
      "market_withdrawals":"213213",
      "apy":"17",
      "Pledgerate":"400"
    }
  }
  res.send({
    data
  })
});




module.exports = router;

