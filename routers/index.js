const express = require("express");
const connection = require("../sqlConfig/connection");
const router = express.Router();
const {initWeb3,Comptrollers} = require('../web3/index');
const {updateMarket} = require('../task/market');




router.get("/getTokenList", async (req, res) => {
  // Define the SQL statement

//获取tokenList
   const sqlStr = "SELECT * from index_info ";
   try {
   let data =  await connection.selectAll(sqlStr);
   res.send({
        code: 0, data: data
    });
  } catch (error) {
    res.json({code: 404, data: "For failure"});
  }
});



router.get('/notice',async(req,res)=>{
  try{
    let {address,user} = req.query;
  updateMarket(address)
  updateUserInfo(address,user)

  }catch(e){
   console.log("updateUserInfo  ==============="+e)
  }
})





module.exports = router;



