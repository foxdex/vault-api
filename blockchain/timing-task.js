/*Timing task*/

// After the project starts, the scheduled task will be started in five seconds
exports.taskStart = function taskStart(){
    console.log(`Tasks start loading`);

    // setTimeout(function () {
    //     setInterval(taskSynchronizationContractEventRecord,1000*60*1);// task I,Get block transaction records,Do it every one minute
    // }, 1000*10);
    //
    // setTimeout(function () {
    //     setInterval(taskSynchronizationCoinLatestPrice30s,1000*30);// task II,Get the latest price of currency, once every 30s
    // }, 1000*15);
    //
    // setTimeout(function () {
    //     setInterval(taskSynchronizationCoinLatestPrice5M,1000*60*5);// task III,Get the latest price of currency, once every 5m
    // }, 1000*20);
    //
    // setTimeout(function () {
    //     setInterval(taskSynchronizationLpComputeApy,1000*60*10);// task IV,Get apy data of flow cell, once every 10m
    // }, 1000*25);

}

// Synchronization contract event trigger record
async function taskSynchronizationContractEventRecord() {

    const transactionin = require("./mysql-synchronous/transactionin");

    // Get the contract address to be synchronized and do traversal synchronization
    let contractSynchronizationArray = await transactionin.getContractSynchronizationArray();
    if(contractSynchronizationArray.length==0){
         return;
    }
    for(let i=0;i<contractSynchronizationArray.length;i++){
        console.log(contractSynchronizationArray[i].contract_address)

        // Get local synchronization block timestamp progress, start -> Initialization timestamp
        let block_timestamp;
        let value = await transactionin.getLocalSynchronizationBlock(contractSynchronizationArray[i].contract_address);
        if(value.length==0){
            block_timestamp = "1607072931000";
        }else{
            block_timestamp = value[0].block_timestamp;
        }

        // Synchronizes all events that occur after the specified timestamp, starting with the specified timestamp,
        // in the most recent order (ascending) at the bottom of the page.
        await transactionin.getTransactionInfoByBlockTimestamp(contractSynchronizationArray[i],block_timestamp);
    }
}

// Synchronization coin latest price -> first page
async function taskSynchronizationCoinLatestPrice30s() {

    const coingeckoData = require("./mysql-synchronous/coingecko-data");

    // Get the token information table, convert the token name to lowercase, and convert it to string format
    let tokenListInfoChangeString = await coingeckoData.getTokenListInfoChangeString();

    // Get the coingecko currency price, and update the currency price if the database exists
    await coingeckoData.getCoingeckoMarkets(tokenListInfoChangeString[0].name_string,1);
}

// Synchronization coin latest price -> all page
async function taskSynchronizationCoinLatestPrice5M() {

    const coingeckoData = require("./mysql-synchronous/coingecko-data");

    // Get the token information table, convert the token name to lowercase, and convert it to string format
    let tokenListInfoChangeString = await coingeckoData.getTokenListInfoChangeString();

    // Get the coingecko currency price, and update the currency price if the database exists
    let coingecko_count = 6048;
    for(let i = 0;i<Math.ceil(coingecko_count/250);i++){
        await coingeckoData.getCoingeckoMarkets(tokenListInfoChangeString[0].name_string,i+1);
    }
}

// Synchronization lp compute apy
async function taskSynchronizationLpComputeApy() {

    const lpComputeData = require("./mysql-synchronous/lpCompute-data");

    // Get the flow pool information list that needs to be updated
    let lpContractListInfoArray = await lpComputeData.getLpContractListInfo();
    if(lpContractListInfoArray.length<=0){
        return;
    }
    // Update its apy
    for(let i=0;i<lpContractListInfoArray.length;i++){
        await lpComputeData.updateLpContractListApy(lpContractListInfoArray[i]);
    }

}

