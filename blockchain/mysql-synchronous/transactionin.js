/*Chain transactions - Data synchronization*/
const connection = require("../../config/connection");
const $http = require('../../api/http/config')
// Synchronize all transaction info information of this block
exports.getTransactionInfoByBlockTimestamp = async function getTransactionInfoByBlockTimestamp(config,ctoken){
  console.log('getTransactionInfoByBlockTimestamp' + JSON.stringify(config));
    console.log('getTransactionInfoByBlockTimestamp' + JSON.stringify(ctoken));
  //   config = {
  //   api_url:'https://api.shasta.trongrid.io',
  //   contract_address:'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET'
  //  }
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



exports.getContractInfoConfig = async function getContractInfoConfig() {
  
  // let selSql = "SELECT *  FROM contract_info"
  let selSql = "SELECT *  FROM dictionary_value"
  try {
  return await connection.selectAll(selSql);

  } catch (error) {
      console.log(error);
  }
}



exports.getTokenInfo = async function getTokenInfo() {
  
  // let selSql = "SELECT *  FROM contract_info"
  let selSql = "SELECT *  FROM token_info"
  try {
  return await connection.selectAll(selSql);

  } catch (error) {
      console.log(error);
  }
}







exports.updateTokenScope = async function updateTokenScope(ctoken,decimals){
    const sqlSTR1 = "select method,parameter from event_trigger where ctoken_address = ?";
    let data1 = await connection.select(sqlSTR1,[ctoken]);


    let mintAmount = 0;
    let repayBorrowAmount = 0;
    let redeemAmount = 0;
    let borrowAmount = 0;


   for(let i = 0;i < data1.length;i++){
            if(data1[i].method == "mint(uint256 mintAmount)" && data1[i].parameter != null){
                let temp = data1[i].parameter;
                let tmp = JSON.parse(temp);
                mintAmount += Number(tmp[0]);
                console.log(mintAmount);
            }else if (data1[i].method == "repayBorrow(uint256 repayAmount)" && data1[i].parameter != null){
                let temp = data1[i].parameter;
                let tmp = JSON.parse(temp);
                repayBorrowAmount += Number(tmp[0]);
            } else if (data1[i].method == "redeem(uint256 redeemTokens)" && data1[i].parameter != null){
                let temp = data1[i].parameter;
                let tmp = JSON.parse(temp);
                redeemAmount += Number(tmp[0]);
            } else if (data1[i].method == "borrow(uint256 borrowAmount)" && data1[i].parameter != null){
                let temp = data1[i].parameter;
                let tmp = JSON.parse(temp);
                borrowAmount += Number(tmp[0]);
            }
        }
         borrowAmount = borrowAmount / Math.pow(10,decimals);
         mintAmount = mintAmount / Math.pow(10,decimals);
        const sqlInsert = "update token_info set mint_scale = ?,borrow_scale = ? where ctokenAddress = ?"
        await connection.select(sqlInsert,[mintAmount,borrowAmount,ctoken]);

   console.log("更新成功")
};



