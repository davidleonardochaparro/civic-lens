const router = require("express").Router();
const { idValidation, entriesValidation, updateIssueValidation } = require("../middlewares/validation");
const { getIssues, issueByID, createIssue, updateIssue, deleteIssue } = require("../controllers/server.controller");

let db = [
    {id:"123", title:"Streetlight", description:"Broken streetlight on Bowery street.", category:"safety", status:"Created", createdAt: new Date()},
    {id:"456", title:"Graffiti", description:"Graffiti found on Brooklyn bridge.", category:"community", status:"Created", createdAt:new Date()},
    {id:"789", title:"Pathole", description:"Pathole on Brodway Avenue.", category:"safety", status:"Created", createdAt:new Date()},
    {id:"100", title:"Unsafe intersection", description:"Unsafe intersection on Hudson St.", category:"safety", status:"Created", createdAt:new Date()},
    {id:"110", title:"Abandoned property", description:"Abandoned property on West Village.", category:"community", status:"Created", createdAt:new Date()}
]

router.get("/issues", getIssues(db));

router.get("/issues/:id", idValidation(db), issueByID);

router.post("/issues", entriesValidation(db), createIssue(db));

router.put("/issues/:id", updateIssueValidation(db), updateIssue(db));

router.delete("/issues/:id", idValidation(db), deleteIssue(db));

module.exports = router;