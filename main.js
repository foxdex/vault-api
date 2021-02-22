const express = require("express");
const app = express();

const Router = require('./routers/index');
const port = "9701";
const url = "127.0.0.1"
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({extended: false}));
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", true);//Carrying a cookie across domain request
  req.method.toUpperCase() === "OPTIONS" ? res.sendStatus(200) : next();//Prevents interfaces from being responded to during the pre-request phase
});
app.use(Router);

const {updateMarket} = require('./task/market')
const {updateUserInfoByCtokenList} = require('./task/user')




updateMarket();
setInterval(updateMarket,45000)

updateUserInfoByCtokenList()
setInterval(updateUserInfoByCtokenList
  ,3000000)





app.listen(port, () => console.log("Server running at "+url+":"+port));//Print the interface use case address
