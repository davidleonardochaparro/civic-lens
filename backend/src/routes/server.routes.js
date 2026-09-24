const router = require("express").Router();
let db = [
    {id:"123", issue:"Broken streetlight on Bowery street."},
    {id:"456", issue:"Graffiti found on Brooklyn bridge."},
    {id:"789", issue:"Pathole on Brodway Avenue."},
    {id:"100", issue:"Unsafe intersection on Hudson St."},
    {id:"110", issue:"Abandoned property on West Village."}
]
router.get("/issues", (req, res) => {
    res.status(200).json({
        message: "This are the issues",
        db
    });
});

router.get("/issues/:id", (req, res) => {
    const { id } = req.params;
    
    const issueObject = db.find( issue => issue.id === id);
    const issue = issueObject.issue;

    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}`,
        issue
    });    
});

router.post("/issues", (req, res) => {
    const newIssue = req.body;
    db.push(newIssue);
    res.status(201).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl}, added the issue`,
        newIssue 
    });
});

router.put("/issues/:id", (req, res) => {
    const { id } = req.params;
    const updatedIssue = req.body;
    const updatedIssueValue = updatedIssue.issue;
    
    let issueObject = db.find( issue => issue.id === id);    
    issueObject.issue = updatedIssueValue;
    
    res.status(202).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} updated the issue`,
        issueObject
    });
});

router.delete("/issues/:id", (req, res) => {
    const { id } = req.params;
    const issueObject = db.find( issue => issue.id === id);
    const issueIndex = db.findIndex( issue => issue.id === id);
    if (issueIndex !== -1) {
        db.splice(issueIndex, 1);
    }
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} deleted the issue`,
        issueObject
    });
});

module.exports = router;