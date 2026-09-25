const router = require("express").Router();

let db = [
    {id:"123", title:"Streetlight", description:"Broken streetlight on Bowery street.", category:"Safety", status:"Created", createdAt: new Date()},
    {id:"456", title:"Graffiti", description:"Graffiti found on Brooklyn bridge.", category:"Community", status:"Created", createdAt:new Date()},
    {id:"789", title:"Pathole", description:"Pathole on Brodway Avenue.", category:"Safety", status:"Created", createdAt:new Date()},
    {id:"100", title:"Unsafe intersection", description:"Unsafe intersection on Hudson St.", category:"Safety", status:"Created", createdAt:new Date()},
    {id:"110", title:"Abandoned property", description:"Abandoned property on West Village.", category:"Community", status:"Created", createdAt:new Date()}
]
router.get("/issues", (req, res) => {
    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}, retrieved all issues`,
        db
    });
});

router.get("/issues/:id", (req, res) => {
    const { id } = req.params;
    const issueObject = db.find( issue => issue.id === id);
    if (!issueObject) {
        errorHandler(res)
        return;
    }
    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}`,
        issueObject
    });    
});

router.post("/issues", (req, res) => {
    const newIssue = req.body;
    newIssue.createdAt = new Date(Date.now());
    db.push(newIssue);
    res.status(201).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl}, added the issue`,
        newIssue 
    });
});

router.put("/issues/:id", (req, res) => {
    const { id } = req.params;
    let updatedIssue = req.body;
    
    let issueIndex = db.findIndex( issue => issue.id === id);
    if (issueIndex !== -1) {
        const entries = Object.entries(updatedIssue); // Object to array
        entries.unshift(['id', id]); // id to the first position
        updatedIssue = Object.fromEntries(entries); // Back to object
        updatedIssue.updatedAt = new Date(Date.now());
        db[issueIndex] = updatedIssue;
    }
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} updated the issue`,
        updatedIssue
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