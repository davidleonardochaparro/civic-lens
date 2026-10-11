const router = require("express").Router();
const { entriesValidation, bodyNormalized } = require("../middlewares/issueValidation");
const { getIssues, issueByID, createIssue, updateIssue, deleteIssue } = require("../controllers/issue.controller");
const requireRole = require("../middlewares/requireRole");

router.get("/issues", requireRole("admin"), getIssues);

router.get("/issues/:id", issueByID);

router.post("/issues", entriesValidation, createIssue);

router.put("/issues/:id", bodyNormalized, updateIssue);

router.delete("/issues/:id", deleteIssue);

module.exports = router;