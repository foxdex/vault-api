const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

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

module.exports = {
    decimals,// Query precision
    getBalanceInPool,// Get the balance of a single currency in the pool
    getLpBalanceInPool,// Get total lptoken
    getTokenDenormalizedWeight,// Get the weight of token in the transaction pair
    getLpPerBlockToken,// Get the output quantity of each flow pool
};
