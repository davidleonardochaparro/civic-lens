const router = require("express").Router();
const { entriesValidation, bodyNormalized, voteValidation } = require("../middlewares/issueValidation");
const { getIssues, issueByID, createIssue, updateIssue, deleteIssue, voteIssue, setIssueVote } = require("../controllers/issue.controller");
const requireRole = require("../middlewares/requireRole");
const validateSession = require("../middlewares/validate");

router.get("/issues", getIssues);
router.get("/issues/:id", issueByID);
router.post("/issues", validateSession, entriesValidation, createIssue);
router.put("/issues/:id", validateSession, bodyNormalized, updateIssue);
router.put("/issues/vote/:id", validateSession, voteValidation, voteIssue);
router.delete("/issues/:id", validateSession, deleteIssue);
router.put("/issues/:id/vote", validateSession, setIssueVote);
router.delete("/issues/:id/vote", validateSession, setIssueVote);

module.exports = router;