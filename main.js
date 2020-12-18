/* Start the project */

// Access the link

// var lendData_url = "47.241.79.62";
var lendData_url = "127.0.0.1";
var lendData_port = "9802";

// Arouse the express
const express = require("express");
const app = express();

// Arouse the swagger
const swagger = require("./src/config/swagger");
swagger.swaggerConfig(app,lendData_url,lendData_port);

// Arouse the service
const service = require("./src/config/service");
service.serviceConfig(app,lendData_url,lendData_port);

// Arouse rest api
const restApi = require("./src/config/restApi");
restApi.restApiConfig(app);

// Arouse the task
const timingTask = require("./src/blockchain/timing-task");
timingTask.taskStart();