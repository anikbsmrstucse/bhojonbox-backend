const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./utils/errorControl");
const recipeRouter = require("./routes/recipeRoutes");
const app = express();

// logging middleware for development environment
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/recipes", recipeRouter);

app.all("*", (req, res, next) => {
    // // res.status(404).json({
    // //     status: 'fail',
    // //     message: `Can't find ${req.originalUrl} on this server`,
    // // });
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = 'fail';
    // err.statusCode = 404;

    // next(err);
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
