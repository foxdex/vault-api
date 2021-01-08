/*Chain transactions - Data synchronization*/
const connection = require("../../config/connection");
const $http = require('../../api/http/config')
// Synchronize all transaction info information of this block
exports.getTransactionInfoByBlockTimestamp = async function getTransactionInfoByBlockTimestamp(config,ctoken){
  console.log('getTransactionInfoByBlockTimestamp');
  //   config = {
  //   api_url:'https://api.shasta.trongrid.io',
  //   contract_address:'TWenbBceEyffcNGatuCw5JBnNpsNzio2ET'
  //  }
   try {
    let data = await $http.get(config.api_url+"/event/contract/"+ctoken.ctokenAddress);
    let hashList= data.map(el => {
         return el.transaction_id
    });


     let data1 = await $http.post(config.trig_url+'/api/contracts/smart-contract-triggers-batch',JSON.stringify({hashList:hashList}));
     contractTradeSynchronizationRecord(data1)


   } catch (error) {
      console.log('getTransactionInfoByBlockTimestamp==err='+error)
   }
 
}


// Insert Contract Trade Synchronization Record
 async function contractTradeSynchronizationRecord(json,ctoken){
   console.log('contractTradeSynchronizationRecord');
        let json1 = json.list;
        let selSql = 'SELECT hash FROM event_trigger'
        let data = await connection.select(selSql);
      for (let i = 0; i<json1.length;i++) {
      let { date_created, hash, method,owner_address,parameter,contract_address} = json1[i];
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









//个人存取规模
// async function queryOwnerMintBorrowScope(req,res,ownerAddress) {
//     const sqlSTR1 = "select method,parameter from event_trigger where owber_address = ?";
//     let data1 = await connection.select(sqlSTR1, [ownerAddress]);
//
//     let mintAmount = 0;
//     let repayBorrowAmount = 0;
//     let redeemAmount = 0;
//     let borrowAmount = 0;
//
//     if (data1) {
//         for (let i = 0; i < data1.length; i++) {
//             if (data1[i].method == "mint(uint256 mintAmount)") {
//                 let temp = data1[i].parameter;
//                 let tmp = JSON.parse(temp);
//                 mintAmount += Number(tmp[0]);
//                 console.log(mintAmount);
//             } else if (data1[i].method == "repayBorrow(uint256 repayAmount)") {
//                 let temp = data1[i].parameter;
//                 let tmp = JSON.parse(temp);
//                 repayBorrowAmount += Number(tmp[0]);
//             } else if (data1[i].method == "redeem(uint256 redeemTokens)") {
//                 let temp = data1[i].parameter;
//                 let tmp = JSON.parse(temp);
//                 redeemAmount += Number(tmp[0]);
//             } else if (data1[i].method == "borrow(uint256 borrowAmount)") {
//                 let temp = data1[i].parameter;
//                 let tmp = JSON.parse(temp);
//                 borrowAmount += Number(tmp[0]);
//             }
//         }
//     } else {
//         res.json({
//             code: 404,
//             data: "For failure"
//         })
//     }
//     let data ={
//         "code":0,
//         "data":{
//             "mintAmount":mintAmount,
//             "borrowAmount":borrowAmount
//         }
//     }
//     return data;
// }




exports.updateTokenScope = async function updateTokenScope(ctoken){
    const sqlSTR1 = "select method,parameter from event_trigger where ctoken_address = ?";
    let data1 = await connection.select(sqlSTR1,[ctoken]);


    let mintAmount = 0;
    let repayBorrowAmount = 0;
    let redeemAmount = 0;
    let borrowAmount = 0;


   for(let i = 0;i < data1.length;i++){
            if(data1[i].method == "mint(uint256 mintAmount)"){
                let temp = data1[i].parameter;
                let tmp = JSON.parse(temp);
                mintAmount += Number(tmp[0]);
                console.log(mintAmount);
            }else if (data1[i].method == "repayBorrow(uint256 repayAmount)"){
                let temp = data1[i].parameter;
                let tmp = JSON.parse(temp);
                repayBorrowAmount += Number(tmp[0]);
            } else if (data1[i].method == "redeem(uint256 redeemTokens)"){
                let temp = data1[i].parameter;
                let tmp = JSON.parse(temp);
                redeemAmount += Number(tmp[0]);
            } else if (data1[i].method == "borrow(uint256 borrowAmount)"){
                let temp = data1[i].parameter;
                let tmp = JSON.parse(temp);
                borrowAmount += Number(tmp[0]);
            }
        }
        const sqlInsert = "update token_info set mint_scale = ?,borrow_scale = ? where ctokenAddress = ?"
        await connection.select(sqlInsert,[mintAmount,borrowAmount,ctoken]);

   console.log("更新成功")
};
