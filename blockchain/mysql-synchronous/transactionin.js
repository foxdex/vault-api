/*Chain transactions - Data synchronization*/
const request = require("request");
const connection = require("./connection");
const $http = require('../../api/http/config')
// Synchronize all transaction info information of this block
exports.getTransactionInfoByBlockTimestamp = async function getTransactionInfoByBlockTimestamp(config){
  console.log('getTransactionInfoByBlockTimestamp');
    config = {
    api_url:'https://api.shasta.trongrid.io',
    contract_address:'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET'
   }
   try {
    let data = await $http.get(config.api_url+"/event/contract/"+config.contract_address);
    let hashList= data.map(el => {
         return el.transaction_id
    });
     let data1 = await $http.post('https://api.shasta.tronscan.org/api/contracts/smart-contract-triggers-batch',JSON.stringify({hashList:hashList}));
     console.log(data1);
     contractTradeSynchronizationRecord(data1)
   } catch (error) {
      console.log('getTransactionInfoByBlockTimestamp==err='+error)
   }
 
}


// Insert Contract Trade Synchronization Record
 async function contractTradeSynchronizationRecord(json){
   console.log('contractTradeSynchronizationRecord');
        let json1 = json.list;
        let selSql = 'SELECT hash FROM event_trigger'
        let data = await connection.select(selSql);
      for (let i = 0; i<json1.length;i++) {
      let { date_created, hash, method,owner_address,parameter} = json1[i];
      let addSql = "INSERT INTO event_trigger(date_created,hash,method,owber_address,parameter)  VALUES(?,?,?,?,?)";
      let sqlData = [ date_created ,hash, method, owner_address, parameter];
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



exports.getContractInfoConfig = async function getContractInfoConfig() {
  
  let selSql = "SELECT *  FROM contract_info"
  try {
  return await connection.selectAll(selSql);

  } catch (error) {
      console.log(error);
  }
}
