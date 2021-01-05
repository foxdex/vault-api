/*Timing task*/

// After the project starts, the scheduled task will be started in five seconds
exports.taskStart = function taskStart(){
    console.log(`Tasks start loading`);
    taskSynchronizationContractEventRecord()
    setTimeout(function () {
      console.log('211321321');
           setInterval(taskSynchronizationContractEventRecord,200000);;
    }, 1000);
}

async function taskSynchronizationContractEventRecord() {
  console.log('taskSynchronizationContractEventRecord');
    const transactionin = require("./mysql-synchronous/transactionin");
    try {
      let config =  await transactionin.getContractInfoConfig()
        
      await transactionin.getTransactionInfoByBlockTimestamp(config[0]);
    } catch (error) {
        console.log('taskSynchronizationContractEventRecord===='+error);
    }
        
}

