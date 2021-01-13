const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);
const BigNumber = require('bignumber.js')
// Initializing tronweb
const initTronWeb = () => {
    return new Promise(function (resolve, reject) {
        let tries = 0;
        const loadFinish = function () {
            resolve(tronWeb);
        };
        let timer = setInterval(function () {
            if (tronWeb) {
                clearInterval(timer);
                if (!tronWeb.defaultAddress.base58) {
                    tronWeb.on('addressChanged', function () {
                        return loadFinish();
                    });
                } else {
                    return loadFinish();
                }
            }
            if (tries > 10) {
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}

// Query precision
const decimals = (address) => {
    return new Promise(function (resolve, reject) {
        try {
            tronWeb.contract().at(address).then((Contract)=>{
                Contract["decimals"]().call().then((res)=>{
                    if(res){
                        resolve(res);
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }
    })
}

// Get the balance of a single currency in the pool
const getBalanceInPool = (contractAddress,coinAddress,coinDecimals) =>{
    return new Promise(function (resolve, reject) {
        var functionSelector = 'getBalance(address)';
        var parameter = [
            {type: 'address', value: coinAddress}
        ]
        tronWeb.transactionBuilder.triggerConstantContract(contractAddress,functionSelector,{}, parameter).then((transaction)=>{
            let tokenBalanceInPool = parseInt(transaction.constant_result[0],16)/Math.pow(10,coinDecimals)
            resolve(tokenBalanceInPool);
        })
    })
}

// Get total lptoken
const getLpBalanceInPool = (pair) =>{
    return new Promise(function (resolve, reject) {
        var functionSelector = 'totalSupply()';
        var parameter = []
        tronWeb.transactionBuilder.triggerConstantContract(pair.address,functionSelector,{}, parameter).then((transaction)=>{
            let lpTotal = parseInt(transaction.constant_result[0],16)
            resolve(lpTotal);
        })
    })
}

// Get the weight of token in the transaction pair
const getTokenDenormalizedWeight =(coinAddress,contractAddress) => {
    return new Promise(function (resolve, reject) {
        var functionSelector = 'getDenorm(address)';
        var parameter = [
            { type: 'address', value: coinAddress }
        ]
        tronWeb.transactionBuilder.triggerConstantContract(contractAddress, functionSelector, {}, parameter).then((transaction)=>{
            if (transaction) {
                let denormalizedWeight = transaction.constant_result[0]
                resolve(denormalizedWeight)
            }
        })
    })
}

const getCashPrior  = (contractAddress) => {
  return new Promise ((resolve, reject)=> {
    var functionSelector = 'getCash()';
    var parameter = [ ]
    tronWeb.transactionBuilder.triggerConstantContract(contractAddress, functionSelector, {}, parameter).then((transaction)=>{
        if (transaction) {
            let getCashPrior = transaction.constant_result[0]
            resolve(getCashPrior)
        }else{
           reject()
        }
    })
  })
}

const totalBorrows   = (contractAddress) => {
  return new Promise ((resolve, reject)=> {
    var functionSelector = 'totalBorrows()';
    var parameter = [ ]
    tronWeb.transactionBuilder.triggerConstantContract(contractAddress, functionSelector, {}, parameter).then((transaction)=>{
        if (transaction) {
            let totalBorrows = transaction.constant_result[0]
            resolve(totalBorrows)
        }else{
           reject()
        }
    })
  })
}
// Get the output quantity of each flow pool
const getLpPerBlockToken = (contractAddress) =>{
    return new Promise(function (resolve, reject) {
        var functionSelector = 'poolInfo(uint256)';
        var parameter = [
            { type: 'uint256', value: 0 }
        ]
        tronWeb.transactionBuilder.triggerConstantContract(contractAddress,functionSelector,{}, parameter).then((transaction)=>{
            resolve(transaction.constant_result);
        })
    })
}

const getSupplyRatePerBlock = async (token) => { // Deposit block rate
  return new Promise(function(resolve, reject) {
    let that = this
    var functionSelector = 'supplyRatePerBlock()';
    var parameter = []
    tronWeb.transactionBuilder.triggerConstantContract(item.ctokenAddress, functionSelector, {}, parameter).then((transaction) => {
      let supplyRatePerBlock = new BigNumber(parseInt(transaction.constant_result[0], 16)).times(new BigNumber(28800)).times(365).div(new BigNumber(10).pow(item.cdecimals)).times(100).toFixed(2)
      resolve(supplyRatePerBlock);
    })
  })
}
const getBorrowRatePerBlock = async (token) => { //  Borrowing block rate
 return new Promise(function(resolve, reject) {
    let that = this
    var functionSelector = 'borrowRatePerBlock()';
    var parameter = []
    tronWeb.transactionBuilder.triggerConstantContract(item.ctokenAddress, functionSelector, {}, parameter).then((transaction) => {
      let borrowRatePerBlock = new BigNumber(parseInt(transaction.constant_result[0], 16)).times(new BigNumber(28800)).times(365).div(new BigNumber(10).pow(token.cdecimals)).times(100).toFixed(2)
      resolve(borrowRatePerBlock);
    })
  })
}


module.exports = {
    decimals,// Query precision
    getBalanceInPool,// Get the balance of a single currency in the pool
    getLpBalanceInPool,// Get total lptoken
    getTokenDenormalizedWeight,// Get the weight of token in the transaction pair
    getLpPerBlockToken,// Get the output quantity of each flow pool
    getCashPrior,
    totalBorrows,
    getSupplyRatePerBlock,
    getBorrowRatePerBlock
};
