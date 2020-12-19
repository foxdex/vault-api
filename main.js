/* Start the project */

// Access the link

//var foxdata_url = "47.241.79.62";
var lenddata_url = "127.0.0.1";
var lenddata_port = "9701";

// Arouse the express
const express = require("express");
const app = express();

// Arouse the swagger
const swagger = require("./config/swagger");
swagger.swaggerConfig(app,lenddata_url,lenddata_port);

// Arouse the service
const service = require("./config/service");
service.serviceConfig(app,lenddata_url,lenddata_port);

// Arouse rest api
const restApi = require("./config/restApi");
restApi.restApiConfig(app);

// Arouse the task
const timingTask = require("./blockchain/timing-task");
timingTask.taskStart();