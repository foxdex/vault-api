const connection = require("../sqlConfig/connection");
const {initWeb3,Comptrollers} = require('../web3/index');



const updateUserInfo  = async (ctokenAddress,userAddress) =>{
   try{
    const updateUserInfo = "insert into user_info(user_address,your_supply,ctoken_address)  values(?,?,?) on  DUPLICATE key update your_supply = ?"

    

    let web3 = await initWeb3(ctokenAddress)
    let your_supply = await web3.userMintAmount(userAddress)

    
    await connection.select(updateUserInfo,[userAddress,your_supply,ctokenAddress])
   }catch(e){
       console.log("updateUserInfo ============" + e)
   }
}

const updateUserInfoByCtokenList  = async () =>{
    console.log("updateUserInfoByCtokenList ===============  start")
    try{
     const updateUserInfo = "insert into user_info(user_address,your_supply,ctoken_address)  values(?,?,?) on  DUPLICATE key update your_supply = ?"
     const ctokenListSql = "select ctokenAddress from token_info"
     const userInfoSql = "select user_address from user_info GROUP BY user_address"

     let userInfoList = await connection.select(userInfoSql)
     let ctokenList = await connection.select(ctokenListSql)
     for(let i = 0;i < ctokenList.length;i++){
     let web3 = await initWeb3(ctokenList[i].ctokenAddress)
     for(let j = 0;j < userInfoList.length;j++){
        let your_supply = await web3.userMintAmount(userAddress)
            
             connection.select(updateUserInfo,[userInfoList[j].user_address,your_supply,ctokenAddress])
     }
    }
    }catch(e){
        console.log("updateUserInfoByCtokenList ============" + e)
    }
    console.log('=========================updateUserInfoByCtokenList== end ==================================');
 }

















module.exports = {updateUserInfo,updateUserInfoByCtokenList};
