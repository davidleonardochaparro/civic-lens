const express = require("express");
const routes = require("./routes/server.routes");
const errorHandler = require("./middlewares/errorHandler"); 

const app = express();

// Middlewares
app.use(express.json());
app.use(routes);
app.use(errorHandler); 

module.exports = app;