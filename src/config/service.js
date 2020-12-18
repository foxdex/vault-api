// serviceConfig
exports.serviceConfig = function serviceConfig(app,lendData_url,lendData_port){
    app.listen(lendData_port, () => console.log("Server running at "+lendData_url+":"+lendData_port));//Print the interface use case address
    app.use(require("body-parser").json());
    app.use(require("body-parser").urlencoded({extended: false}));

    //  Set up cross-domain access
    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.header("Access-Control-Allow-Credentials", true);//Carrying a cookie across domain request
        req.method.toUpperCase() === "OPTIONS" ? res.sendStatus(200) : next();//Prevents interfaces from being responded to during the pre-request phase
    });
}