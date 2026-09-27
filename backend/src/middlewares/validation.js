const dbAttributesValidation = require("../helpers/validationHelper");

const idValidation = (db) => (req, res, next) => {
    const { id } = req.params;
    const issueIndex = db.findIndex( issue => issue.id === id);
    if (issueIndex === -1) {
        return res.status(404).json({
            message: "ID not found."
        });
    }
    // Attach new object to the request to access this property later
    req.issueIndex = issueIndex; 
    req.issue = db[issueIndex]; 
    next();
}

const entriesValidation = (db) => (req, res, next) => {
    let { id } = req.body;
    if (!id) {
        return res.status(406).json({
            message: "Missing ID."
        });
    }
    if (db.some(issue => issue.id === id)) {
        return res.status(409).json({ message: "ID already exists." });
    }

    const { title, description, category, status } = req.body;
    // Helper call
    const result = dbAttributesValidation(title, description, category, status);

    if (result.error) {
        return res.status(result.error.status).json({ message: result.error.message});
    }

    const newIssue = { id, ...result.data, createdAt: new Date() };
    req.newIssue = newIssue;
    next();
}

const updateIssueValidation = (db) => (req, res, next) => {
    const { id } = req.params;
    const issueIndex = db.findIndex( issue => issue.id === id);
    if (issueIndex === -1) {
        return res.status(400).json({
            message: "ID not found."
        });
    }

    const { title, description, category, status } = req.body;
    // Helper call
    const result = dbAttributesValidation(title, description, category, status);

    if (result.error) {
        return res.status(result.error.status).json({ message: result.error.message});
    }

    let updatedIssue = { id, ...result.data, createdAt: db[issueIndex].createdAt, updatedAt: new Date()}

    req.updatedIssue = updatedIssue;
    req.issueIndex = issueIndex;
    next();
}

module.exports = {idValidation, entriesValidation, updateIssueValidation};