// restApiConfig
exports.restApiConfig = function restApiConfig(app){
    app.use("/v1/lend/blockTransaction", require("./../api/transaction/block-transaction"));
    app.use("/v1/lend/token", require("./../api/token/token-info"));

    console.log(`RestApi start loading`);
}