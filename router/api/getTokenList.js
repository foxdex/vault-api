const express = require("express");
const router = express.Router();


// Load configuration file
const connection =   require('../../config/connection')
const url = require('url');

// getTokenList
 exports.getTokenList =  router.get("/getTokenList", async (req, res) => {
    // Define the SQL statement


    //更新token_info中，ctoken_address的存款取款规模  mint_scale   borrow_scale
     const allctoken = "select ctokenAddress from token_info ";
     let ctokenArray = await connection.select(allctoken);
     await updateTokenKind(req,res,ctokenArray);

     // for (var i = 0;i < ctokenArray.length;i++ ) {
     //     const selectSql = "select name,mint_scale,borrow_scale from token_info  "
     //
     //     let data = await connection.select(selectSql)
     // }
         //更新代码到此-----------------------------


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
  //  let MintBorrow = await queryOwnerMintBorrowScope(req,res,"TSZJSaYq4q2oNaVUwgBj5ywCA1QxAMVw5x")
  //
  // res.send(MintBorrow)
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






















async function updateTokenKind(req,res,ctokenArray) {

    try {

    if (ctokenArray) {
            for(var i = 0;i < ctokenArray.length;i++){
                let ctoken = ctokenArray[i].ctokenAddress;
               await queryTokenScope(req,res,ctoken);
            }
        }else {
        res.json({code: 404,
            data: "For failure"})
    }
}catch (e) {
        res.json({code: 404,
                  data: "For failure"})
    }
    }

    async function queryOwnerMintBorrowScope(req,res,ownerAddress) {
        const sqlSTR1 = "select method,parameter from event_trigger where owber_address = ?";
        let data1 = await connection.select(sqlSTR1, [ownerAddress]);

        let mintAmount = 0;
        let repayBorrowAmount = 0;
        let redeemAmount = 0;
        let borrowAmount = 0;

        if (data1) {
            for (let i = 0; i < data1.length; i++) {
                if (data1[i].method == "mint(uint256 mintAmount)") {
                    let temp = data1[i].parameter;
                    let tmp = JSON.parse(temp);
                    mintAmount += Number(tmp[0]);
                    console.log(mintAmount);
                } else if (data1[i].method == "repayBorrow(uint256 repayAmount)") {
                    let temp = data1[i].parameter;
                    let tmp = JSON.parse(temp);
                    repayBorrowAmount += Number(tmp[0]);
                } else if (data1[i].method == "redeem(uint256 redeemTokens)") {
                    let temp = data1[i].parameter;
                    let tmp = JSON.parse(temp);
                    redeemAmount += Number(tmp[0]);
                } else if (data1[i].method == "borrow(uint256 borrowAmount)") {
                    let temp = data1[i].parameter;
                    let tmp = JSON.parse(temp);
                    borrowAmount += Number(tmp[0]);
                }
            }
        } else {
            res.json({
                code: 404,
                data: "For failure"
            })
        }
        let data ={
                      "code":0,
                      "data":{
                      "mintAmount":mintAmount,
                      "borrowAmount":borrowAmount
                      }
  }
        return data;
    }




async function queryTokenScope(req,res,ctoken){
    const sqlSTR1 = "select method,parameter from event_trigger where ctoken_address = ?";
     let data1 = await connection.select(sqlSTR1,[ctoken]);


        let mintAmount = 0;
        let repayBorrowAmount = 0;
        let redeemAmount = 0;
        let borrowAmount = 0;

        if (data1) {
            for(let i = 0;i < data1.length;i++){
                if(data1[i].method == "mint(uint256 mintAmount)"){
                    let temp = data1[i].parameter;
                    let tmp = JSON.parse(temp);
                    mintAmount += Number(tmp[0]);
                    console.log(mintAmount);
                }else if (data1[i].method == "repayBorrow(uint256 repayAmount)"){
                    let temp = data1[i].parameter;
                    let tmp = JSON.parse(temp);
                    repayBorrowAmount += Number(tmp[0]);
                } else if (data1[i].method == "redeem(uint256 redeemTokens)"){
                    let temp = data1[i].parameter;
                    let tmp = JSON.parse(temp);
                    redeemAmount += Number(tmp[0]);
                } else if (data1[i].method == "borrow(uint256 borrowAmount)"){
                    let temp = data1[i].parameter;
                    let tmp = JSON.parse(temp);
                    borrowAmount += Number(tmp[0]);
                }
            }
                        const sqlInsert = "update token_info set mint_scale = ?,borrow_scale = ? where ctokenAddress = ?"
            await connection.select(sqlInsert,[mintAmount,borrowAmount,ctoken]);
        }else
        {res.json({code: 404,
            data: "For failure"})
}

};















module.exports = router;

