/*Chain transactions - Data synchronization*/
const request = require("request");
const connection = require("./connection");

// Synchronize all transaction info information of this block
exports.getTransactionInfoByBlockTimestamp = async function getTransactionInfoByBlockTimestamp(contractSynchronizationInfo,block_timestamp){

    return new Promise(function (resolve, reject) {
        request({
            timeout:10000,    // Set timeout
            method:'GET',     // Set method
            url:contractSynchronizationInfo.api_url+"/event/contract/"+contractSynchronizationInfo.contract_address+"?fromTimestamp="+block_timestamp+"&sort=block_timestamp"  //url
        },async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let json = JSON.parse(body);

                for(let i=0;i<json.length;i++){
                    let value = await getEventHashByEventName(json[i].event_name,contractSynchronizationInfo.contract_address);
                    if(value.length==0){
                        // This event does not exist in the contract. It is out of this cycle
                        continue;
                    }else{
                        contractTradeSynchronizationRecord(json[i].event_name,json[i].transaction_id,json[i].contract_address,value[0].event_hash,contractSynchronizationInfo);
                    }
                }
                resolve();
            }else{
                console.log("error");
            }
        })
    })
}

// Get event hash by event name
async function getEventHashByEventName(event_name,contract){
    let selSql = "SELECT event_hash FROM event_info where event_name=? and belong_contract_id=(SELECT contract_id FROM contract_info WHERE contract_address=?)";
    let selSqlParams = [event_name, contract];

    return await connection.select(selSql, selSqlParams);
}

// Get local synchronization block height progress
exports.getLocalSynchronizationBlock = async function getLocalSynchronizationBlock(contract){
        let selSql = "SELECT block_timestamp FROM contract_trade_synchronization_record where contract_address=? ORDER BY block_timestamp DESC LIMIT 1";
        let selSqlParams = [contract];
        return await connection.select(selSql,contract);
}

// Insert Contract Trade Synchronization Record
function contractTradeSynchronizationRecord(event_name,transaction_id,contract_address,event_hash,contractSynchronizationInfo){

        request({
            timeout:10000,    // Set timeout
            method:'GET',     // Set method
            url:contractSynchronizationInfo.api_url+"/wallet/gettransactioninfobyid?value="+transaction_id //url
        },function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let json = JSON.parse(body);

                let jsonLogArray = JSON.parse(JSON.stringify(json.log));
                for(let i=0;i<jsonLogArray.length;i++){

                    let jsonTopicsArray = JSON.parse(JSON.stringify(jsonLogArray[i].topics));
                    if(jsonTopicsArray[0]==event_hash){
                        if(event_name=="LOG_SWAP"){
                            let log_data_a = jsonTopicsArray[2];
                            let log_data_b = jsonTopicsArray[3];

                            let logData =  jsonLogArray[i].data;

                            // Intercept the parameter value, the first parameter value is 0-64 bits,
                            // the second parameter value is 65-128 bits, and eliminate the prefix redundant 0
                            let logData_A = getFirst(logData.substring(0,64));
                            let logData_B = getFirst(logData.substring(64,128));
                            // Convert from hexadecimal to decimal
                            let logData10_A = parseInt(logData_A,16);
                            let logData10_B = parseInt(logData_B,16);

                            // Make differential calculation for settlement currency
                            if(contractSynchronizationInfo.base_token_topics==log_data_a){
                                let base_quantity = logData10_A/Math.pow(10,contractSynchronizationInfo.base_token_precision);
                                let trade_quantity = logData10_B/Math.pow(10,contractSynchronizationInfo.trade_token_precision);
                                let trade_price = base_quantity/trade_quantity;

                                let creation_date = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                                let addSqlParams =  [ json.blockNumber,json.blockTimeStamp,event_name,event_hash,contractSynchronizationInfo.contract_id,
                                    contract_address,transaction_id,log_data_a,log_data_b,trade_quantity,base_quantity,
                                    trade_price,JSON.stringify(body),creation_date];
                                addSynchronizationRecord(addSqlParams);
                            }else if(contractSynchronizationInfo.base_token_topics==log_data_b){
                                let base_quantity = logData10_B/Math.pow(10,contractSynchronizationInfo.base_token_precision);
                                let trade_quantity = logData10_A/Math.pow(10,contractSynchronizationInfo.trade_token_precision);
                                let trade_price = base_quantity/trade_quantity;

                                let creation_date = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                                let addSqlParams =  [ json.blockNumber,json.blockTimeStamp,event_name,event_hash,contractSynchronizationInfo.contract_id,
                                    contract_address,transaction_id,log_data_a,log_data_b,trade_quantity,base_quantity,
                                    trade_price,JSON.stringify(body),creation_date];
                                addSynchronizationRecord(addSqlParams);
                            }else{
                                console.log("base_token_topics not found")
                            }
                        }else if(event_name=="LOG_JOIN" || event_name=="LOG_EXIT") {
                           let log_data_a = jsonTopicsArray[2];

                           let logData =  jsonLogArray[i].data;

                           // Intercept the parameter value, the first parameter value is 0-64 bits,
                           // the second parameter value is 65-128 bits, and eliminate the prefix redundant 0
                           let logData_A = getFirst(logData.substring(0,64));
                           // Convert from hexadecimal to decimal
                           let logData10_A = parseInt(logData_A,16);

                           let creation_date = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
                           let base_quantity;
                           if(log_data_a==contractSynchronizationInfo.base_token_topics){
                               base_quantity= logData10_A/Math.pow(10,contractSynchronizationInfo.base_token_precision);
                           }else if(log_data_a==contractSynchronizationInfo.trade_token_topics){
                               base_quantity = logData10_A/Math.pow(10,contractSynchronizationInfo.trade_token_precision);
                           }else{
                               console.log("log_data_a not found")
                               continue;// End current loop
                           }
                           let trade_quantity = base_quantity;
                           let trade_price = 0;
                           let addSqlParams =  [ json.blockNumber,json.blockTimeStamp,event_name,event_hash,contractSynchronizationInfo.contract_id,
                               contract_address,transaction_id,log_data_a,log_data_a,trade_quantity,base_quantity,
                               trade_price,JSON.stringify(body),creation_date];
                           addSynchronizationRecord(addSqlParams);
                       }
                    }
                }
            }else{
                console.log("error");
            }
        })
}

// Gets the subscript of the first non-0 character of the string,And from this location to intercept the following data
function getFirst(str) {
    let i = 0;
    for (let index=0;index<=str.length-1;index++) {
        //将字符串拆开成单个的字符
        let w = str.substring(index,index+1);
        if (w!=0) {//
            i = index;
            break;
        }
    }
    return str.substring(i,str.length);
}

// Add synchronization record data to database
function addSynchronizationRecord(addSqlParams){
    let addSql = "INSERT INTO contract_trade_synchronization_record(block_number,block_timestamp,event_name,event_address,contract_id," +
        "contract_address,transaction_id,log_data_a,log_data_b,trade_quantity,base_quantity,trade_price,transaction_info_data,creation_date) " +
        "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.insert(addSql,addSqlParams);
};

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

// Get the contract address to be synchronized , is_start_synchronization = 1
exports.getContractSynchronizationArray = async function getContractSynchronizationArray(contract){
    let selSql = "SELECT contract_id,contract_address,trade_token_topics,base_token_topics,trade_token_precision,base_token_precision,api_url FROM " +
        "contract_info where is_start_synchronization=1 ORDER BY contract_id ASC";
    return await connection.select(selSql,null);
}
