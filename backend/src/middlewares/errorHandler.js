const errorHandler = (error, req, res, next) => {
    console.error(error);
    
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "Malformed JSON in request body."
        });
    }

    res.status(500).json({
        message: "Internal Error Occurred"
    });
}
module.exports = errorHandler;