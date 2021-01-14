const express = require("express");
const router = express.Router();
const transactionin = require("../../blockchain/mysql-synchronous/transactionin");

// Load configuration file
const connection =   require('../../config/connection')
const url = require('url');
const {getCompRate} = require('../../blockchain/show/tronweb-show')
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
    total = totalMint + totalBorrow;
    Apy = (rate  / total).toFixed(2) *1


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
    let healthIndex = 0;
    let ownerEventList
    let ownerMintAmount = 0;
    let ownerBorrowAmount = 0;
    try {
    const eventTrriggerOwnerSQL = "select e.method,e.parameter,t.current_price FROM  event_trigger as e  RIGHT JOIN token_info as t on e.ctoken_address = t.ctokenAddress WHERE e.owber_address = ? and ( e.method = 'mint(uint256 mintAmount)' or e.method = 'borrow(uint256 borrowAmount)' or e.method = 'mint()' )"
    ownerEventList = await connection.select(eventTrriggerOwnerSQL,[ownerAddress]);



        for (let i = 0; i < ownerEventList.length; i++) {

                    if (ownerEventList[i].method == "mint(uint256 mintAmount)" || ownerEventList[i].method == "mint()") {
                        let temp = ownerEventList[i].parameter;
                        let tmp = JSON.parse(temp);
                        ownerMintAmount += (Number(tmp[0]) * ownerEventList[i].current_price);
                    } else if (ownerEventList[i].method == "borrow(uint256 borrowAmount)") {
                        let temp = ownerEventList[i].parameter;
                        let tmp = JSON.parse(temp);
                        ownerBorrowAmount += (Number(tmp[0]) * ownerEventList[i].current_price)
                    }
                }
        if  (ownerBorrowAmount != 0 && ownerMintAmount == 0) {
            healthIndex = 0
        }else if ((ownerBorrowAmount == 0 && ownerMintAmount != 0) || (ownerMintAmount == 0 && ownerBorrowAmount == 0)) {
            healthIndex = 1
        }else {
            healthIndex = ownerMintAmount/(ownerMintAmount + ownerBorrowAmount)
        }
        return healthIndex;


                }catch (e) {
                console.log("HealthIndex ========" + e)
    }
}