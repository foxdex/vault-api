const express = require("express");
const router = express.Router();


// Load configuration file
const connection =   require('../../config/connection')
const url = require('url');

// getTokenList
 exports.getTokenList =  router.get("/getTokenList", async (req, res) => {
    // Define the SQL statement



//获取tokenList
     const sqlStr = "SELECT name,address,img,balance,decimals,ctokenAddress,current_price,mint_scale,borrow_scale,cdecimals,abi from token_info ORDER BY sort_value DESC,token_id ASC";
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
    let {name}  = req.query;
    let totalMint = totalScale[0].mintScale;
    let totalBorrow = totalScale[0].borrowScale;
    let ownerMintScale = 0;
    let ownerBorrowScale = 0;


    if(name){
        const queryOwnerMintBorrowScope = "select mint_scale,borrow_scale,mintBorrowCount from user_info where owber_address = ?";
        let OwnerMintBorrowScope = await connection.select(queryOwnerMintBorrowScope,[name]);

        let array =  updateOwnerMintBorrowScope(req,res,name,OwnerMintBorrowScope[0].mintBorrowCount);
        ownerMintScale = OwnerMintBorrowScope[0].mint_scale;
        ownerBorrowScale = OwnerMintBorrowScope[0].borrow_scale;
    }



    let data ={
    "code":0,
    "data":{
      "market_deposit":totalMint,
      "market_withdrawals":totalBorrow,
        "ownerMintScale":ownerMintScale,
        "ownerBorrowScale":ownerBorrowScale,
        "apy":"17",
      "Pledgerate":"400"
    }
  }
  res.send({
    data
  })
});



module.exports = router;










// 个人存取规模
async function updateOwnerMintBorrowScope(req,res,ownerAddress,count) {


    let ownerMintAmount = 0;
    let ownerBorrowAmount = 0;

    const countStr = "SELECT count(*) as mintBorrowCount FROM event_trigger where method = \"mint(uint256 mintAmount)\" or method = \"borrow(uint256 borrowAmount)\" and owber_address = ?";
    let queryCount = await connection.select(countStr,[ownerAddress]);

    try {

    if(count != queryCount[0].mintBorrowCount) {

        //查询ctokenInfo
        const ctokenListSTR = "select contract_address from contract_info"
        let ctokenList = await connection.select(ctokenListSTR);

        for (let j = 0; j < ctokenList.length; j++) {


            const sqlSTR1 = "select method,parameter from event_trigger where owber_address = ? and ctoken_address = ? and ( method = \"mint(uint256 mintAmount)\" or method = \"borrow(uint256 borrowAmount)\" )";
            let data1 = await connection.select(sqlSTR1, [ownerAddress, ctokenList[j].contract_address]);

            const decimalSTR = "select decimals from token_info where ctokenAddress = ?"
            let decimalArray = await connection.select(decimalSTR, [ctokenList[j].contract_address])

            if (data1) {

                let ownerMintAmountTemp = 0;
                let ownerBorrowAmountTemp = 0;


                for (let i = 0; i < data1.length; i++) {
                    if (data1[i].method == "mint(uint256 mintAmount)") {
                        let temp = data1[i].parameter;
                        let tmp = JSON.parse(temp);
                        ownerMintAmountTemp += Number(tmp[0]);
                    } else if (data1[i].method == "borrow(uint256 borrowAmount)") {
                        let temp = data1[i].parameter;
                        let tmp = JSON.parse(temp);
                        ownerBorrowAmountTemp += Number(tmp[0]);
                    }
                }
                ownerMintAmount += ownerMintAmountTemp / Math.pow(10, decimalArray[0].decimals);
                ownerBorrowAmount += ownerBorrowAmountTemp / Math.pow(10, decimalArray[0].decimals);
                }
            }
        const updateUserInfo = "UPDATE user_info SET mint_scale = ?,borrow_scale = ?,mintBorrowCount = ? WHERE owber_address = ?"
        await connection.select(updateUserInfo,[ownerMintAmount,ownerBorrowAmount,queryCount[0].mintBorrowCount,ownerAddress]);
        console.log("用户信息更新成功")
        }
    }catch (e) {
        console.log(e);
    }
}


