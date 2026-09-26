const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        message: "Internal Error Occurred"
    });
}
module.exports = errorHandler;