const swaggerApi  = [
     {
       wpath:'/v1/lend/blockTransaction',
       rpath:'./api/getTokenList'
     }

]
var router = require('./api/getTokenList')
exports.restApiConfig = function restApiConfig(app){
  app.use("/v1/lend/blockTransaction", require("./api/getTokenList"));
  app.use("/v1/lend/token", require("./api/getTokenList"));
  // swaggerApi.forEach(el=>{
  //   app.use(el.wpath, require(el.rpath))
  // })
app.use(router)
  console.log(`RestApi start loading`);
}