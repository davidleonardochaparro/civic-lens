const express = require("express");
const path = require("path");
const cors = require("cors");
const { db } = require("./db");
const setupAssociations = require("./schemas/associations");
const authRoutes = require("./routes/auth.routes");
const issueRoutes = require("./routes/issue.routes");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middlewares/errorHandler"); 
const rateLimiter = require("./middlewares/rateLimiter");

const app = express();

const publicDir = path.join(__dirname, "..", "public");

const corsOptions = {
    origin: "http://localhost:5173"
}

app.disable("x-powered-by"); // Hide server

setupAssociations();

// Middlewares
app.use(cors(corsOptions)); 
app.use(rateLimiter);
app.use(express.json());
app.use(express.static(publicDir));
app.use(authRoutes);
app.use(userRoutes);
app.use(issueRoutes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(publicDir, "404.html"));
});

app.use(errorHandler); 

module.exports = {app, db};