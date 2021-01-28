// swaggerConfig
exports.swaggerConfig = function swaggerConfig(app,lenddata_url,lenddata_port){
    var swaggerUi = require('swagger-ui-express');
    var swaggerJSDoc = require('swagger-jsdoc');
    var path = require('path') 
    var swaggerDefinition = {
        info: {
            title: 'Lend Data Swagger API',
            version: 'v1',
            description: 'The interface path:'+lenddata_url+":"+lenddata_port,
        },
        host: lenddata_url+":"+lenddata_port,
        basePath: '/',
    };

    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./router/swagger/*/*.js'],
    };

    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);

    // serve swagger
    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log("Swagger running at "+lenddata_url+":"+lenddata_port+"/lend-api");
}