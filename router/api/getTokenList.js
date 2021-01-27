const express = require("express");
const router = express.Router();
const transactionin = require("../../blockchain/mysql-synchronous/transactionin");

// Load configuration file
const connection =   require('../../config/connection')
const url = require('url');
const {getBalanceOfUnderlying,getBorrowBalanceCurrent} = require('../../blockchain/show/tronweb-show')
// const {getAccount} = require('../../blockchain/show/tronweb-show')
// getTokenList
 exports.getTokenList =  router.get("/getTokenList", async (req, res) => {
    // Define the SQL statement



//获取tokenList
     const sqlStr = "SELECT * from token_info ORDER BY sort_value ,token_id ASC";
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
        var arrayObject = JSON.parse(array[0].key_value);
        // let {name} = req.query;
        // let result = new Array();
        // for(let i = 0;i < arrayObject.length;i++ ){
        //     if (arrayObject[i].user_address == name){
        //         result.push(arrayObject[i])
        //     }
        // }
        let data ={
            "code":0,
            "data":arrayObject}
            res.send(data)
    }catch(e){
        res.json({code: 404, data: "For failure"});
    }
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
    let rate = 0;
    let healthIndex = 0;
    let temp;
    let {name} = req.query;
    let box_price;

    healthIndex = await HealthIndex(req, res, name);
    if (healthIndex == null){
        healthIndex = 0;
    }

   const sqlRate = "select key_value from dictionary_value where key_id = 'last_apy' or key_id ='box_price'"
   temp = await connection.select(sqlRate);
    rate = temp[0].key_value * 1;
    box_price = temp[1].key_value * 1;

    for (let i = 0; i < token.length; i++) {
        totalMint += token[i].mint_scale * token[i].current_price;
        totalBorrow += token[i].borrow_scale * token[i].current_price;
    }
    total = totalMint + totalBorrow
    if (total == 0){
        Apy = 0;
    } else {
        Apy = (rate * box_price/ total *100).toFixed(2) * 1
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

//
// exports.MarketSize =  router.get("/mint", async (req, res) =>{
//     try {
//
// const insertSql = "insert into user_info(user_address,mint_scale,borrow_scale,ctoken_address)  values(?,?,0,?) on  DUPLICATE key update mint_scale =  mint_scale + ?"
// const updateSql = "update token_info set mint_scale = mint_scale + ? where ctoken_address = ?"
//
//     }catch (e) {
//
//     }
// })
//
//
// exports.MarketSize =  router.get("/borrow", async (req, res) =>{
//     try {
//         const insertSql = "insert into user_info(user_address,mint_scale,borrow_scale,ctoken_address)  values(?,0,?,?) on  DUPLICATE key update borrow_scale = borrow_scale + ?"
//         const updateSql = "update token_info set borrow_scale = borrow_scale + ? where ctoken_address = ?"
//
//     }catch (e) {
//
//     }
// })
//
//
// exports.MarketSize =  router.get("/repayBorrow", async (req, res) =>{
//     try {
//
//         const insertSql = "insert into user_info(user_address,mint_scale,borrow_scale,ctoken_address)  values(?,?,0,?) on  DUPLICATE key update mint_scale =  mint_scale + ?"
//         const updateSql = "update token_info set mint_scale = mint_scale + ? where ctoken_address = ?"
//
//     }catch (e) {
//
//     }
// })
//
//
// exports.MarketSize =  router.get("/redeem", async (req, res) =>{
//     try {
//
//         const insertSql = "insert into user_info(user_address,mint_scale,borrow_scale,ctoken_address)  values(?,?,0,?) on  DUPLICATE key update mint_scale =  mint_scale + ?"
//         const updateSql = "update token_info set mint_scale = mint_scale + ? where ctoken_address = ?"
//
//     }catch (e) {
//
//     }
// })



exports.MarketSize =  router.get("/update", async (req, res) =>{
    try {
        await getBorrowBalanceCurrent();
        await getBalanceOfUnderlying();
        await transactionin.updateTokenInfo();
    }catch (e) {

    }
})