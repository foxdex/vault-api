/*Timing task*/

// After the project starts, the scheduled task will be started in five seconds
exports.taskStart = function taskStart(){
    console.log(`Tasks start loading`);
    taskSynchronizationContractEventRecord()
    setTimeout(function () {
           setInterval(taskSynchronizationContractEventRecord,100000);;

    }, 1000);
}

async function taskSynchronizationContractEventRecord() {;
  console.log('taskSynchronizationContractEventRecord');
    const transactionin = require("./mysql-synchronous/transactionin");
    const tronwebShow = require("./show/tronweb-show");
    try {
      let config =  await transactionin.getContractInfoConfig()
      let token  =  await transactionin.getTokenInfo()
      let apiData = {}
        config.forEach(el => {
              if (el.key_id == 'tron_api_url') {
                apiData.api_url = el.key_value
              } else if (el.key_id == 'trig_url') {
                apiData.trig_url = el.key_value
              } else if (el.key_id == 'current_environment') {
                  apiData.environment = el.key_value
              }
        });
      await transactionin.updateUserInfo();
      await transactionin.updateArrayLiquidation();
      await transactionin.updateTokenPrice(token);//从网上扒并更新token的currentPrice
      for (let i = 0 ;i< token.length;i++) {
      await transactionin.getTransactionInfoByBlockTimestamp(apiData,token[i]);
      await transactionin.updateTokenInfo(token[i]);//从合约中取token的存借规模
          await transactionin.updateTokenRate(token[i]);
      }
    } catch (error) {
        console.log('taskSynchronizationContractEventRecord===='+error);
    }


}

