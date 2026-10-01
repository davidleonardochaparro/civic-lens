const router = require("express").Router();
const { entriesValidation, bodyNormalized } = require("../middlewares/validation");
const { getIssues, issueByID, createIssue, updateIssue, deleteIssue } = require("../controllers/server.controller");

let db = [
    {id:"123", title:"Streetlight", description:"Broken streetlight on Bowery street.", category:"safety", status:"Created", createdAt: new Date()},
    {id:"456", title:"Graffiti", description:"Graffiti found on Brooklyn bridge.", category:"community", status:"Created", createdAt:new Date()},
    {id:"789", title:"Pathole", description:"Pathole on Brodway Avenue.", category:"safety", status:"Created", createdAt:new Date()},
    {id:"100", title:"Unsafe intersection", description:"Unsafe intersection on Hudson St.", category:"safety", status:"Created", createdAt:new Date()},
    {id:"110", title:"Abandoned property", description:"Abandoned property on West Village.", category:"community", status:"Created", createdAt:new Date()}
]

router.get("/issues", getIssues);

router.get("/issues/:id", issueByID);

router.post("/issues", entriesValidation, createIssue);

router.put("/issues/:id", bodyNormalized, updateIssue);

router.delete("/issues/:id", deleteIssue(db));

module.exports = router;