const router = require("express").Router();
const { entriesValidation, bodyNormalized } = require("../middlewares/issueValidation");
const { getIssues, issueByID, createIssue, updateIssue, deleteIssue } = require("../controllers/issue.controller");

router.get("/issues", getIssues);

router.get("/issues/:id", issueByID);

router.post("/issues", entriesValidation, createIssue);

router.put("/issues/:id", bodyNormalized, updateIssue);

router.delete("/issues/:id", deleteIssue);

module.exports = router;