const router = require("express").Router();
const { entriesValidation, bodyNormalized, voteValidation } = require("../middlewares/issueValidation");
const { getIssues, issueByID, createIssue, updateIssue, deleteIssue, voteIssue } = require("../controllers/issue.controller");
const requireRole = require("../middlewares/requireRole");
const validateSession = require("../middlewares/validate");

router.get("/issues", getIssues);
router.get("/issues/:id", issueByID);
router.post("/issues", validateSession, entriesValidation, createIssue);
router.put("/issues/:id", validateSession, bodyNormalized, updateIssue);
router.put("/issues/vote/:id", validateSession, voteValidation, voteIssue);
router.delete("/issues/:id", validateSession, deleteIssue);

module.exports = router;