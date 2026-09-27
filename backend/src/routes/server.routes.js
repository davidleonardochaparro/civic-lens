const router = require("express").Router();
const { idValidation, entriesValidation, updateIssueValidation } = require("../middlewares/validation");

let db = [
    {id:"123", title:"Streetlight", description:"Broken streetlight on Bowery street.", category:"safety", status:"Created", createdAt: new Date()},
    {id:"456", title:"Graffiti", description:"Graffiti found on Brooklyn bridge.", category:"community", status:"Created", createdAt:new Date()},
    {id:"789", title:"Pathole", description:"Pathole on Brodway Avenue.", category:"safety", status:"Created", createdAt:new Date()},
    {id:"100", title:"Unsafe intersection", description:"Unsafe intersection on Hudson St.", category:"safety", status:"Created", createdAt:new Date()},
    {id:"110", title:"Abandoned property", description:"Abandoned property on West Village.", category:"community", status:"Created", createdAt:new Date()}
]

router.get("/issues", (req, res) => {
    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}, retrieved all issues`,
        db
    });
});

router.get("/issues/:id", idValidation(db), (req, res) => {
    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}`,
        issueObject: req.issue
    });    
});

router.post("/issues", entriesValidation(db), (req, res) => {

    db.push(req.newIssue);

    res.status(201).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl}, added the issue`,
        newIssue: req.newIssue
    });
});

router.put("/issues/:id", updateIssueValidation(db), (req, res) => {
    
    db[req.issueIndex] = req.updatedIssue;
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} updated the issue`,
        updatedIssue: req.updatedIssue
    });
});

router.delete("/issues/:id", idValidation(db), (req, res) => {

    const issueObject = db[req.issueIndex];
    db.splice(req.issueIndex, 1);
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} deleted the issue`,
        issueObject
    });
});

module.exports = router;