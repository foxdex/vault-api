/*Chain transactions - Data synchronization*/
const connection = require("../../config/connection");
const $http = require('../../api/http/config')
const BigNumber = require('bignumber.js')
const {getCashPrior , totalBorrows ,decimals} = require('../show/tronweb-show')
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

async function getHashTransaction (hash) {
      return new Promise(relove,rejct =>{
            
      })
}
// Insert Contract Trade Synchronization Record
 async function contractTradeSynchronizationRecord(json,config){
   console.log('contractTradeSynchronizationRecord');
        let json1 = json.list;
        let selSql = 'SELECT hash FROM event_trigger'
        let data = await connection.select(selSql);
      for (let i = 0; i<json1.length;i++) {
      let { date_created, hash, method,owner_address,parameter,contract_address} = json1[i];
    if (parameter == "{}") {
        let strs = await $http.get(config.trig_url+'/api/transaction-info?hash=' + hash);
        parameter = JSON.stringify({'0':strs.trigger_info.call_value}) 
    }
      let addSql = "INSERT INTO event_trigger(date_created,hash,method,owber_address,parameter,ctoken_address)  VALUES(?,?,?,?,?,?)";
      let sqlData = [ date_created ,hash, method, owner_address, parameter ,contract_address];
      if (data.length == 0) {
        connection.insert(addSql,sqlData);
      } else {
        let flag = false
        for (let k = 0; k<data.length;k++) {
          let hash1 = data[k].hash;
          if (hash1 == hash) {
            flag = true;
            break;
          }
     }
      if (!flag ) {
          connection.insert(addSql,sqlData);
      }
      }

      }
    console.log('插入完成')
}


// Get current time
Date.prototype.Format = function(fmt) {
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



const getTokenInfo = async ()=> {
  
  // let selSql = "SELECT *  FROM contract_info"
  let selSql = "SELECT *  FROM token_info"
  try {
  return await connection.selectAll(selSql);

  } catch (error) {
      console.log(error);
  }
}

 const updateTokenInfo =  async  (data) => {
  // let selSql = "SELECT *  FROM token_info"
  // let data =await connection.selectAll(selSql);
  // for (let index = 0; index < data.length; index++) {
      let el = data;
     let cash = await getCashPrior(el.ctokenAddress);
     let totalBorrow = await totalBorrows(el.ctokenAddress)
     let decimal = el.decimals;
      let cashs=    new BigNumber(cash,16).div(new BigNumber(10).pow(decimal)).toFixed()
      let totalBorrowss=    new BigNumber(totalBorrow,16).div(new BigNumber(10).pow(decimal)).toFixed()
      let sql = 'update token_info set mint_scale = ?,borrow_scale = ? where ctokenAddress = ?'
      let pramas = [cashs ,totalBorrowss ,el.ctokenAddress]
       await connection.update(sql,pramas)
    console.log("tokenInfo更新成功");
  }



  const  getCoingeckoMarkets = async  () =>{
    let marketList = await $http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=300&page=1&sparkline=false');
    let getTokenInfos = await getTokenInfo();
          for (let index = 0; index < getTokenInfos.length; index++) {
              let el = getTokenInfos[index];
              for (let index1 = 0; index1 < marketList.length; index1++) {
                let el1 = marketList[index1];
                    if ( el.name.toLocaleUpperCase() == el1.symbol.toLocaleUpperCase()) {
                       await updateCurrentPriceByName(el1.current_price,el.name.toLocaleUpperCase())
                       break;
                    }
              }
          }
        
}

async function updateCurrentPriceByName(current_price,name){
  let updSql = "update token_info set current_price=? where name=?";
  let updParams = [ current_price,name ]
  await connection.update(updSql,updParams);
};
getCoingeckoMarkets()

module.exports = {
  getTransactionInfoByBlockTimestamp,
  getContractInfoConfig,
  getTokenInfo,
  updateTokenInfo,
  getCoingeckoMarkets,
}