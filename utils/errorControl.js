const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.name;
    const message = `Duplicate field value: ${value}. Please use another name!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const handleTokenErrorDB = () => {
    const message = "Invalid Token! Please login first.";
    return new AppError(message, 401);
};

const handleTokenExpireErrorDB = () => {
    const message = "Token expired! Please login again.";
    return new AppError(message, 401);
};

const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Programming or other unknown error: don't leak error details
        console.error("Error in server: ", err);

        // Send generic error message
        res.status(500).json({
            status: "error",
            message: "Something went wrong, please try again later.",
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        console.error(err);
        sendDevError(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        error.message = err.message; // Copy error message
        error.name = err.name;
        error.code = err.code;

        if (error.name === "CastError") {
            error = handleCastErrorDB(error);
        }
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === "ValidationError")
            error = handleValidationErrorDB(error);
        if (error.name === "JsonWebTokenError") error = handleTokenErrorDB();
        if (error.name === "TokenExpiredError")
            error = handleTokenExpireErrorDB();

        sendErrorProd(error, res);
    }
};
