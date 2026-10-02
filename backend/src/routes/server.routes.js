const router = require("express").Router();
const { entriesValidation, bodyNormalized } = require("../middlewares/validation");
const { getIssues, issueByID, createIssue, updateIssue, deleteIssue } = require("../controllers/server.controller");

router.get("/issues", getIssues);

router.get("/issues/:id", issueByID);

router.post("/issues", entriesValidation, createIssue);

router.put("/issues/:id", bodyNormalized, updateIssue);

router.delete("/issues/:id", deleteIssue);

module.exports = router;