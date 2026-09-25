const express = require("express");
const routes = require("./routes/server.routes");
const errorHandler = require("./middlewares/errorHandler"); // <-- Update

const app = express();

// Middlewares
app.use(express.json());
app.use(routes);
app.use(errorHandler); // <-- Update

module.exports = app;