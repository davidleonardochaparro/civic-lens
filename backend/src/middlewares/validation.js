const  { attributesValidation, norm  } = require("../helpers/validationHelper");

const entriesValidation = (req, res, next) => {

    const { title, description, category, status, votes } = req.body;
    // Validation helper call
    const validationResult = attributesValidation(title, description, category, status, votes);

    if (validationResult.error) {
        return res.status(validationResult.error.status).json({ message: validationResult.error.message});
    }

    const newIssue = {...validationResult.data};
    // Attach the issue to the request
    req.newIssue = newIssue;
    next();
}

const bodyNormalized = (req, res, next) => {
    const { title, description, category, status, votes } = req.body;

    // Validation helper call
    const validationResult = norm(title, description, category, status, votes);

    if (validationResult.error) {
        return res.status(validationResult.error.status).json({ message: validationResult.error.message});
    }

    const newIssue = {...validationResult.data};
    req.newIssue = newIssue;
    next();
}

module.exports = {entriesValidation, bodyNormalized};