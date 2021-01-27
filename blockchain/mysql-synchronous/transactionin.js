/*Chain transactions - Data synchronization*/
const connection = require("../../config/connection");
const $http = require('../../api/http/config')
const BigNumber = require('bignumber.js')
const {getCashPrior , totalBorrows ,decimals ,getBpoolToken ,getSupplyRatePerBlock ,getBorrowRatePerBlock,getCloseFactorMantissa,getAccount,getBalanceOfUnderlying,getBorrowBalanceCurrent,getCompRate} = require('../show/tronweb-show')
// Synchronize all transaction info information of this block
const getTransactionInfoByBlockTimestamp = async (config,ctoken) =>{
  console.log('getTransactionInfoByBlockTimestamp' + JSON.stringify(config));
    console.log('getTransactionInfoByBlockTimestamp' + JSON.stringify(ctoken));
   //  config = {
   //  api_url:'https://api.shasta.trongrid.io',
   //  contract_address:'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET'
   // }
   try {
    let data = await $http.get(config.api_url+"/event/contract/"+ctoken.ctokenAddress);
    let hashList= data.map(el => {
         return el.transaction_id
    });
    console.log(data);
     let data1 = await $http.post(config.trig_url+'/api/contracts/smart-contract-triggers-batch',JSON.stringify({hashList:hashList}));
     contractTradeSynchronizationRecord(data1,config)

   } catch (error) {
      console.log('getTransactionInfoByBlockTimestamp==err='+error)
   }

}

// Insert Contract Trade Synchronization Record
 async function contractTradeSynchronizationRecord(json,config) {
     console.log('contractTradeSynchronizationRecord');
     let json1 = json.list;

     for (let i = 0; i < json1.length; i++) {
         let {date_created, hash, method, owner_address, parameter, contract_address} = json1[i];
         if (parameter == "{}") {
             let strs = await $http.get(config.trig_url + '/api/transaction-info?hash=' + hash);
             parameter = JSON.stringify({'0': strs.trigger_info.call_value})
         }

         let  temp = JSON.parse(parameter)
         let amount = Number(temp[0])
         let addSql = "INSERT INTO event_trigger(date_created,hash,method,owber_address,parameter,ctoken_address)  VALUES(?,?,?,?,?,?)";
         let sqlData = [date_created*1, hash, method, owner_address, amount, contract_address];
         try {
             connection.insert(addSql, sqlData);
         } catch (e) {
             console.log("contractTradeSynchronizationRecord =======" + e)
             return;
         }
     }
     console.log("插入成功")
 }

// Get current time
     Date.prototype.Format = function (fmt) {
         var o = {
             "M+": this.getMonth() + 1,
             "d+": this.getDate(),
             "h+": this.getHours(),
             "m+": this.getMinutes(),
             "s+": this.getSeconds(),
             "S": this.getMilliseconds()
         };
         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
         for (var k in o)
             if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         return fmt;
     }


     const getContractInfoConfig = async function getContractInfoConfig() {

         // let selSql = "SELECT *  FROM contract_info"
         let selSql = "SELECT *  FROM dictionary_value"
         try {
             return await connection.selectAll(selSql);

         } catch (error) {
             console.log(error);
         }
     }


     const getTokenInfo = async () => {

         // let selSql = "SELECT *  FROM contract_info"
         let selSql = "SELECT *  FROM token_info"
         try {
             return await connection.selectAll(selSql);

         } catch (error) {
             console.log(error);
         }
     }

     const updateTokenInfo = async (data) => {
        try {
            // let selSql = "SELECT *  FROM token_info"
            // let data =await connection.selectAll(selSql);
            // for (let index = 0; index < data.length; index++) {
            let el = data;
            let cash = await getCashPrior(el.ctokenAddress);
            let totalBorrow = await totalBorrows(el.ctokenAddress)
            let decimal = el.decimals;
            let cashs = new BigNumber(cash, 16).div(new BigNumber(10).pow(decimal)).toFixed()
            let totalBorrowss = new BigNumber(totalBorrow, 16).div(new BigNumber(10).pow(decimal)).toFixed()
            let sql = 'update token_info set mint_scale = ?,borrow_scale = ? where ctokenAddress = ?'
            let pramas = [cashs, totalBorrowss, el.ctokenAddress]
            await connection.update(sql, pramas)
            console.log("tokenInfo更新成功");
        }catch (e) {
            console.log("updateTokenInfo ========" + e)
        }
     }


     const updateTokenPrice = async function updatePrice(token) {
         getCoingeckoMarkets();

         try {

             let total = 0;
             const updatePrice = "update token_info set current_price_contract = ? where token_id = ?"
             const updatePriceByApi = "update token_info set current_price_contract = ? ,current_price = ?where token_id = ?"
             for (let i = 0; i < token.length; i++) {

                 token[i].current_price_contract = await getBpoolToken(token[i]);
                 if (token[i].current_price_contract == null) {
                     continue
                 }else if (token[i].abi == 1){
                     let result = await connection.update(updatePriceByApi, [token[i].current_price_contract,token[i].current_price_contract, token[i].token_id])
                     let a = 0;
                     continue
                 }else if (token[i].decimals != 6){
                     token[i].current_price_contract = token[i].current_price_contract * Math.pow(10,token[i].decimals - 6)
                 }
                 let result = await connection.update(updatePrice, [token[i].current_price_contract, token[i].token_id])
             }

         } catch (e) {
             console.log('updateApyAndTokenPrice======' + e)
         }
     }

     const getCoingeckoMarkets = async () => {
         let marketList = await $http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=300&page=1&sparkline=false');
         let getTokenInfos = await getTokenInfo();
         for (let index = 0; index < getTokenInfos.length; index++) {
             let el = getTokenInfos[index];
             for (let index1 = 0; index1 < marketList.length; index1++) {
                 let el1 = marketList[index1];
                 if (el.name.toLocaleUpperCase() == el1.symbol.toLocaleUpperCase()) {
                     await updateCurrentPriceByName(el1.current_price, el.name.toLocaleUpperCase())
                     break;
                 }
             }
         }
     }


     async function updateCurrentPriceByName(current_price, name) {
         let updSql = "update token_info set current_price=? where name=?";
         let updParams = [current_price, name]
         await connection.update(updSql, updParams);
     };

     const updateTokenRate = async function updateTokenRate(token) {

         try {
             let pledgeRate;
             let borrowRate;
             let mintRate;
             mintRate = await getSupplyRatePerBlock(token);
             borrowRate = await getBorrowRatePerBlock(token);
             pledgeRate = await getCloseFactorMantissa(token);
             let updSql = "update token_info set mint_rate = ?,borrow_rate = ?,pledge_rate = ? where token_id = ?";
             await connection.update(updSql, [mintRate, borrowRate, pledgeRate, token.token_id])
             console.log(mintRate, borrowRate, pledgeRate + "更新成功")

         } catch (error) {
             console.log('updateTokenRatesss====' + error);
         }


     }


     const updateArrayLiquidation = async function updateArrayLiquidation() {
         try {
             const selectUserInfo = "select  u.user_address ,t.*   FROM user_info as u LEFT JOIN token_info as t  on u.ctoken_address = t.ctokenAddress WHERE (u.mint_scale/2) < u.borrow_scale"
             var array = await connection.select(selectUserInfo);
             var arrayLiquidation;

             arrayLiquidation = await getAccount(array)

                let json ;
                    json = JSON.stringify(arrayLiquidation)

             const updateLiquidation = "update dictionary_value set key_value = ? where key_id = 'last_liquidation' "
             await connection.update(updateLiquidation,[json])
         } catch (e) {
          console.log("updateUserInfoJson ======" + e )
         }
     }


     const updateUserInfo = async function updateUserInfo() {
       try {
           let array
       const sql = "select e.owber_address as owner_address,t.decimals as decimals,e.ctoken_address           FROM event_trigger as e LEFT JOIN token_info as t on e.ctoken_address = t.ctokenAddress\n" +
           "WHERE t.decimals != 'null'  GROUP BY e.owber_address,t.decimals,e.ctoken_address\n"

    array =  await connection.select(sql)

           for(let i = 0;i < array.length;i++) {
               var date=new Date();

               await getBalanceOfUnderlying(array[i]);
               var date1=new Date();

               await getBorrowBalanceCurrent(array[i]);
               var date2=new Date();
           }


       }catch (e) {
console.log("updateUserInfo ==========" + e)
           console.log("s")
       }
     }
// try {
//
//     const selectDate = "SELECT key_value FROM dictionary_value WHERE key_id = \"last_update_time\""
//
//     let temp = await connection.select(selectDate);
//     let lastUpdateTime = Number(temp[0]);
//
//     const selectEventSQL = "SELECT SUM(parameter) as total,method,owber_address,MAX(date_created) as time ,ctoken_address FROM event_trigger" +
//         " WHERE method = \"mint(uint256 mintAmount)\" or method = \"borrow(uint256 borrowAmount)\" GROUP BY owber_address,method,ctoken_address order BY owber_address"
//
//     const mintScaleSQL ="insert into user_info(user_address,mint_scale,borrow_scale,ctoken_address)  values(?,?,0,?) on  DUPLICATE key update mint_scale =  ?"
//
//     const borrowScaleSQL = "insert into user_info(user_address,mint_scale,borrow_scale,ctoken_address)  values(?,0,?,?) on  DUPLICATE key update borrow_scale = ?\n"
//
//
//     const updateDictionary = "update dictionary_value set key_value = ? where key_id = 'last_update_time'"
//
//     let array = await connection.select(selectEventSQL)
//
//
//     let updateTime = 0;
//
//     for (let i = 0; i < array.length; i++) {
//         if (array[i].time > updateTime) {
//             updateTime = array[i].time
//         }
//         if (array[i].method == "mint(uint256 mintAmount)") {
//             await connection.update(mintScaleSQL, [array[i].owber_address, array[i].total, array[i].ctoken_address,array[i].total])
//
//         } else if (array[i].method == "borrow(uint256 borrowAmount)") {
//             await connection.update(borrowScaleSQL, [array[i].owber_address, array[i].total, array[i].ctoken_address,array[i].total])
//         }
//     }
//     await connection.insert(updateDictionary, [updateTime])
// }catch (e) {
//     console.log("updateUserInfo() =======" + e)
// }
//      }

const updateRate = async function updateRate(){
    try {
        let tronweb = await getCompRate();//待存缓存
        if (tronweb == null) return;
        let temp = tronweb *20 * 60 * 24 * 365 * 1;
        let rate;
        rate = JSON.stringify(temp);

        const sql = "update dictionary_value set key_value = ? where key_id = 'last_apy'"
        await connection.update(sql, [rate])
        let a;
    }catch (e) {
        console.log("updateRat ==========" + e)
    }
}





module.exports = {
    getTransactionInfoByBlockTimestamp,
    getContractInfoConfig,
    getTokenInfo,
    updateTokenPrice,
    updateTokenInfo,
    updateTokenRate,
    updateUserInfo,
    updateArrayLiquidation,
    updateRate,
    getCoingeckoMarkets
}