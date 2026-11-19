const router = require("express").Router();
const { entriesValidation, bodyNormalized } = require("../middlewares/issueValidation");
const { getIssues, issueByID, createIssue, updateIssue, deleteIssue, setIssueVote, getMyIssueVotes } = require("../controllers/issue.controller");
const requireRole = require("../middlewares/requireRole");
const validateSession = require("../middlewares/validate");

router.get("/issues", getIssues);
router.get("/issues/:id", issueByID);
router.post("/issues", validateSession, entriesValidation, createIssue);
router.put("/issues/:id", validateSession, bodyNormalized, updateIssue);
router.delete("/issues/:id", validateSession, deleteIssue);
router.put("/issues/:id/vote", validateSession, setIssueVote);
router.delete("/issues/:id/vote", validateSession, setIssueVote);
router.get("/issue-votes/me", validateSession, getMyIssueVotes);

module.exports = router;