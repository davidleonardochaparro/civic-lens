const validateUserId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Missing id."
        });
    }

    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
        return res.status(422).json({
            message: "Unprocessable Entity"
        });
    }

    req.userId = id;
    next();
}

module.exports = { validateUserId };