// restApiConfig
exports.restApiConfig = function restApiConfig(app){
    app.use("/v1/lend/blockTransaction", require("./../api/transaction/block-transaction"));

    console.log(`RestApi start loading`);
}