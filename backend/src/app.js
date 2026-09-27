const express = require("express");
// const cors = require("cors");
const routes = require("./routes/server.routes");
const errorHandler = require("./middlewares/errorHandler"); 
const headers = require("./middlewares/headers"); 

const app = express();

// const corsOptions = {
//     origin: "http://localhost:4000"
// }

// Middlewares
app.use(headers);
app.use(express.json());
// app.use(cors(corsOptions)); // Ask if order is correct
app.use(routes);
app.use(errorHandler); 

module.exports = app;