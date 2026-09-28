const express = require("express");
const cors = require("cors");
const routes = require("./routes/server.routes");
const errorHandler = require("./middlewares/errorHandler"); 
const rateLimiter = require("./middlewares/rateLimiter");

const app = express();

const corsOptions = {
    origin: "http://localhost:4000"
}

app.disable("x-powered-by"); // Hide server

// Middlewares
app.use(cors(corsOptions)); 
app.use(rateLimiter);
app.use(express.json());
app.use(routes);
app.use(errorHandler); 

module.exports = app;