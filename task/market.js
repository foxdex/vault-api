const connection = require("../sqlConfig/connection");
const {initWeb3,Comptrollers} = require('../web3/index');


const updateMarket  = async (address) => {
    const selectTokenListSql = "select * from token_info"
    const updateSql = "update token_info set total_value_locked = ?,apy = ? where ctokenAddress = ?"
    const selectSql = "select cdecimals from token_info where ctokenAddress = ?"
    const selectComptroller = "select key_value from contract_dictionary where key_id = 'risk_controll_address'"

try{
    if(address){
    let result = await connection.select(selectSql,address)
    let comptrollerQuery = await connection.select(selectComptroller)

     let webapi = await initWeb3(address)
     let comptroller =await Comptrollers(comptrollerQuery[0].key_value)

     webapi.decimals = result[0].cdecimals
     let mintAmount = await webapi.getCash()
     let rate = await comptroller.compRate()
     let current_price_contract = await comptroller.getUnderlyingPrice(address)
     let Apy = (rate * 20 * 60 * 24 * 365 * 1 * current_price_contract/ mintAmount *100).toFixed(2) * 1



     await connection.update(updateSql,[mintAmount,Apy,address])
    }else{
     
    let tokenList = await connection.select(selectTokenListSql)
    let address = await connection.select(selectComptroller)
    let comptroller =await Comptrollers(address[0].key_value)
    
    for(let i = 0;i < tokenList.length;i++){
        let webapi =  await initWeb3(tokenList[i].ctokenAddress)
       
  
        webapi.decimals = tokenList[i].cdecimals
        let mintAmount = await webapi.getCash()
        let rate = await comptroller.compRate()
        let current_price_contract = await comptroller.getUnderlyingPrice(tokenList[i].ctokenAddress)
        let Apy = (rate * 20 * 60 * 24 * 365 * 1 * current_price_contract/ mintAmount *100).toFixed(2) * 1   
        


        await connection.update(updateSql,[mintAmount,Apy,address])
    }
    }
}catch(e){
    console.log("updataCtokenMarketAmount ===============================" +e)
}
console.log('===============updataCtokenMarketAmount end=======================');
}

module.exports = {updateMarket};
