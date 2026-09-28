const getIssues = (db) => (req, res) => {
    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}, retrieved all issues`,
        db
    });
}

const issueByID = (req, res) => {
    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}`,
        issueObject: req.issue
    });    
}

const createIssue = (db) => (req, res) => {

    db.push(req.newIssue);

    res.status(201).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl}, added the issue`,
        newIssue: req.newIssue
    });
}

const updateIssue = (db) => (req, res) => {
    
    db[req.issueIndex] = req.updatedIssue;
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} updated the issue`,
        updatedIssue: req.updatedIssue
    });
}

const deleteIssue = (db) => (req, res) => {

    const issueObject = db[req.issueIndex];
    db.splice(req.issueIndex, 1);
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} deleted the issue`,
        issueObject
    });
}

module.exports = {getIssues, issueByID, createIssue, updateIssue, deleteIssue};