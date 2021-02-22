const express = require("express");
const connection = require("../sqlConfig/connection");
const router = express.Router();
const {initWeb3,Comptrollers} = require('../web3/index');
const {updateMarket} = require('../task/market');
const {updateUserInfo} = require('../task/user')

router.get('/web3',async (req,res)=>{
  try {
    let dist = await web3().getDecimals()
    res.send(dist)
  } catch (error) {
      console.log(error);
      res.send(error)
  }
      
})
router.get("/getTokenList", async (req, res) => {
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



