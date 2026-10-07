const express = require("express");
const path = require("path");
const cors = require("cors");
const issueRoutes = require("./routes/issue.routes");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/errorHandler"); 
const rateLimiter = require("./middlewares/rateLimiter");
const { db } = require("./db");

const app = express();
const publicDir = path.join(__dirname, "..", "public");

const corsOptions = {
    origin: "http://localhost:4000"
}

app.disable("x-powered-by"); // Hide server

// Middlewares
app.use(cors(corsOptions)); 
app.use(rateLimiter);
app.use(express.json());
app.use(express.static(publicDir));
app.use(authRoutes);
app.use(issueRoutes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(publicDir, "404.html"));
});

app.use(errorHandler); 

module.exports = {app, db};