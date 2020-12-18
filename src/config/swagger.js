// swaggerConfig
exports.swaggerConfig = function swaggerConfig(app,lendData_url,lendData_port){
    var swaggerUi = require('swagger-ui-express');
    var swaggerJSDoc = require('swagger-jsdoc');

    var swaggerDefinition = {
        info: {
            title: 'Lend-Data Swagger API',
            version: 'v1',
            description: 'The interface path:'+lendData_url+":"+lendData_port,
        },
        host: lendData_url+":"+lendData_port,
        basePath: '/',
    };

    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./routes/*/*.js'],
    };

    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);

    // serve swagger
    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    app.use('/lend-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    console.log("Swagger running at "+lendData_url+":"+lendData_port+"/lend-api");
}