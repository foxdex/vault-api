const connection = require("../sqlConfig/connection");
const {initWeb3,Comptrollers} = require('../web3/index');


const updateMarket  = async (address) => {
    const selectTokenListSql = "select * from index_info"
    const updateSql = "update index_info set apy = ? where vault_address = ?"
    const selectSql = "select vault_decimal from index_info where vault_address = ?"
    const selectComptroller = "select key_value from contract_dictionary where key_id = 'risk_controll_address'"

try{
    if(address){
    let result = await connection.select(selectSql,address)
    let comptrollerQuery = await connection.select(selectComptroller)

     let webapi = await initWeb3(address)
     let comptroller =await Comptrollers(comptrollerQuery[0].key_value)

     webapi.decimals = result[0].vault_decimal
     let mintAmount = 1
    //  await webapi.getCash()
     let rate = await comptroller.compRate()
     let currentPriceContract = await comptroller.getUnderlyingPrice(address)
     let apy = (rate * 20 * 60 * 24 * 365 * 1 * currentPriceContract/ mintAmount *100).toFixed(2) * 1



     await connection.update(updateSql,[apy,address])
    }else{
     
    let strategyList = await connection.select(selectTokenListSql)
    let address = await connection.select(selectComptroller)
    let comptroller =await Comptrollers(address[0].key_value)
    
    for(let i = 0;i < strategyList.length;i++){
        let webapi =  await initWeb3(strategyList[i].vault_address)
       
  
        webapi.decimals = strategyList[i].vault_decimal
        let mintAmount = 1
        // await webapi.getCash()
        let rate = await comptroller.compRate()
        let current_price_contract = await comptroller.getUnderlyingPrice(strategyList[i].vault_address)
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
