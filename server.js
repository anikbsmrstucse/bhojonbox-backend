const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });
dotenv.config();
process.on("uncaughtException", function (err) {
    console.log("Uncaught Exception!Shutting down...");
    console.log(err.name, err.message, err);
    process.exit(1);
});

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const app = require("./app");
const DB = process.env.MONGODB_URI.replace(
    "<PASSWORD>",
    process.env.DB_PASSWORD
);
const localDB = process.env.DB_LOCALHOST;
// connect to the database
mongoose.connect(DB, { autoIndex: true }).then((con) => {
    console.log(`Database connection established...`);
});

// start the server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message, err);
    server.close(() => {
        console.log("Unhandled rejection! Server is Shutting down...");
        process.exit(1);
    });
});
