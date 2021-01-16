const express = require("express");
const router = express.Router();
const transactionin = require("../../blockchain/mysql-synchronous/transactionin");

// Load configuration file
const connection =   require('../../config/connection')
const url = require('url');
const {getCompRate} = require('../../blockchain/show/tronweb-show')
const {getAccount} = require('../../blockchain/show/tronweb-show')
// getTokenList
 exports.getTokenList =  router.get("/getTokenList", async (req, res) => {
    // Define the SQL statement



//获取tokenList
     const sqlStr = "SELECT name,address,img,balance,decimals,ctokenAddress,current_price,mint_scale,borrow_scale,cdecimals,abi,mint_rate,borrow_rate,pledge_rate from token_info ORDER BY sort_value DESC,token_id ASC";
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
    try {
        const selectLiquidationJson = "select key_value from dictionary_value where key_id = 'last_liquidation'"
       var array = await connection.select(selectLiquidationJson)
    }catch(e){

    }
    let data ={
    "code":0,
    "data":array[0].key_value
  }
  res.send(data)
});

exports.MarketSize =  router.get("/marketSize", async (req, res) => {
    // Define the SQL statement
    const sqlStr = "SELECT name,address,img,balance,decimals,ctokenAddress,current_price,mint_scale,borrow_scale,cdecimals,abi from token_info ORDER BY sort_value DESC,token_id ASC";
try {
    let token = await connection.select(sqlStr);
    let totalMint = 0
    let totalBorrow = 0
    let total = 0;
    let Apy = 0;
    let healthIndex = 0;
    let {name} = req.query;
    
    let tronweb = await getCompRate();
    let rate = tronweb * 60 *24 *365 * 1;
    
    for (let i = 0; i < token.length; i++) {
        totalMint += token[i].mint_scale * token[i].current_price;
        totalBorrow += token[i].borrow_scale * token[i].current_price;
    }
    total = totalMint + totalBorrow
    if (total == 0){
        Apy = 0;
    } else {
        Apy = (rate / total).toFixed(2) * 1
    }

    healthIndex = await HealthIndex(req, res, name);
    if (healthIndex == null){
        healthIndex = 0;
    }

    let data = {
        "code": 0,
        "data": {
            "market_deposit": totalMint,
            "market_withdrawals": totalBorrow,
            "apy": Apy,
            "healthIndex": healthIndex,
        }
    }
    res.send({
        code: 0, data: data
    })
}catch (e) {
    res.json({code: 404, data: "For failure"});
}
});



module.exports = router;










// 个人存取规模
async function HealthIndex(req,res,ownerAddress) {
   try{
     const selectUserInfo ="select   SUM((u.mint_scale * t.current_price)) as mint,SUM((u.borrow_scale * t.current_price)) as borrow  from user_info as u left JOIN token_info as t on u.ctoken_address = t.ctokenAddress " +
         "WHERE u.user_address = ?"


      let array = await connection.select(selectUserInfo,[ownerAddress])
       let index;
       if ((array[0].mint == 0 && array[0].borrow == 0) || (array[0].mint == null && array[0].borrow == null)){
           index = 1;
           return index
       }
       else {
           index = array[0].mint / (array[0].mint + array[0].borrow)
       }
       return index
                }catch (e) {
                console.log("HealthIndex ========" + e)
    }
}