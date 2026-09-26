const idValidation = (db) => (req, res, next) => {
    const { id } = req.params;
    const issueIndex = db.findIndex( issue => issue.id === id);
    if (issueIndex === -1) {
        return res.status(404).json({
            message: "ID not found."
        });
    }
    req.issueIndex = issueIndex; // Attach new object to the request to access this property later
    req.issue = db[issueIndex]; 
    next();
}

const entriesValidation = (db) => (req, res, next) => {
    let { id, title, description, category, status} = req.body;
    if (!id) {
        return res.status(406).json({
            message: "Missing ID."
        });
    }
    if (db.some(issue => issue.id === id)) {
        return res.status(409).json({ message: "ID already exists." });
    }
    if (!title) {
        return res.status(406).json({
            message: "Missing title."
        });
    }
    title = title.trim();
    if (!description) {
        return res.status(406).json({
            message: "Missing description"
        });
    }
    description = description.trim();
    if (!category) {
        return res.status(406).json({
            message: "Missing category"
        });
    }
    category = category.trim().toLowerCase();
    const VALID_CATEGORIES = ["safety", "community"];
    if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ message: "Invalid category." });
    }
    if (!status) {
        return res.status(406).json({
            message: "Missing status"
        });
    }
    status = status.trim();

    const newIssue = { id, title, description, category, status, createdAt: new Date() };
    req.newIssue = newIssue;

    next();
}

const updateIssueValidation = (db) => (req, res, next) => {
    const { id } = req.params;
    const issueIndex = db.findIndex( issue => issue.id === id);
    if (issueIndex === -1) {
        return res.status(400).json({
            message: `ID not found.`
        });
    }

    let { title, description, category, status } = req.body;
    if (!title) {
        return res.status(406).json({
            message: "Missing title."
        });
    }
    title = title.trim();
    if (!description) {
        return res.status(406).json({
            message: "Missing description"
        });
    }
    description = description.trim();
    if (!category) {
        return res.status(406).json({
            message: "Missing category"
        });
    }
    category = category.trim().toLowerCase();
    const VALID_CATEGORIES = ["safety", "community"];
    if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ message: "Invalid category." });
    }
    if (!status) {
        return res.status(406).json({
            message: "Missing status"
        });
    }
    status = status.trim();

    let updatedIssue = { id, title, description, category, status, createdAt: db[issueIndex].createdAt, updatedAt: new Date()}

    req.updatedIssue = updatedIssue;
    req.issueIndex = issueIndex;

    next();
}

module.exports = {idValidation, entriesValidation, updateIssueValidation};