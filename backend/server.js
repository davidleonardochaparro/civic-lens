require("dotenv").config();
const {app, db} = require("./src/app");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, async () => {

    try {
        await db.authenticate(); // Checks if sequelize can connect to the db
        await db.sync({ force: false }); // Keeps existing data inside the tables
        console.log(`[server] is running on ${HOST}:${PORT}`);
        console.log(`[database] running`);

    } catch (error) {
        console.error(error);
    }
});
