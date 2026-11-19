const { Op, fn, col } = require("sequelize");
const { db } = require("../db");
const { Issue } = require("../schemas/issue.model");
const { IssueVote } = require("../schemas/issueVote.model");

async function readIssues(issueId = null) {
    // An empty filter fetches all issues
    const where = {};
    if (issueId !== null) {
        where.id = issueId;
    }

    const issues = await Issue.findAll({
        where,
        raw: true,
    });

    if (issues.length === 0) {
        return [];
    }

    const issueIds = issues.map( issue => issue.id);
    const countVotes = fn("COUNT", col("issue_id"));

    // Get one count for each requested issue that has votes
    const voteCounts = await IssueVote.findAll({
        attributes: ["issue_id", [countVotes, "votes"]],
        where: {
            issue_id: { [Op.in]: issueIds},
        },
        group: ["issue_id"],
        raw: true,
    });

    // Store each count under its issue ID
    const votesByIssue = new Map();
    for (const row of voteCounts) {
        votesByIssue.set(row.issue_id, Number(row.votes));
    }

    return issues.map( issue => {
        const votes = votesByIssue.get(issue.id) ?? 0;

        return {
            ...issue,
            votes,
            hasVoted: false,
        };
    });
}

const getIssues = async (req, res) => {

    const allIssues = await readIssues();

    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}, retrieved all issues.`,
        allIssues
    });
}

const issueByID = async (req, res) => {
    const { id } = req.params;

    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
        return res.status(400).json({
            message: "Malformed param."
        });
    }

    // const issue = await Issue.findByPk(id);
    const [issue] = await readIssues(numericId);

    if (!issue) {
        return res.status(404).json({
            message: "ID not found."
        });
    }

    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}, issue found.`,
        issueObject: issue
    });    
}

const createIssue = async (req, res) => {

    const newIssue = await Issue.create({
        ...req.newIssue,
        user_id: req.user.id
    },
    {
        fields: ["title", "description", "category", "status", "user_id"]
    });

    res.status(201).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl}, added the issue`,
        newIssue: newIssue
    });
}

const updateIssue = async (req, res) => {
    
    const { id } = req.params;
    const userId = req.user.id;

    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
        return res.status(400).json({
            message: "Malformed param."
        });
    }

    const issue = await Issue.findByPk(id);

    if (!issue) {
        return res.status(404).json({
            message: "ID not found."
        });
    }

    if (issue.user_id !== userId) {
        return res.status(403).json({
            message: "Users can just update their own issues."
        });
    }

    const { title, description, category, status} = req.newIssue;

    const updatedIssue = {
        title: title ?? issue.title,
        description: description ?? issue.description,
        category: category ?? issue.category,
        status: status ?? issue.status,
    };

    await issue.update(updatedIssue);
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} updated the issue`,
        updatedIssue: issue
    });
}

const deleteIssue = async (req, res) => {

    const { id } = req.params;
    const userId = req.user.id;
    
    const issue = await Issue.findByPk(id);
    
    if (!issue) {
        return res.status(404).json({
            message: "ID not found."
        });
    }    
    
    if (issue.user_id !== userId) {
        return res.status(403).json({
            message: "Users can just delete their own created issues."
        });
    }

    await issue.destroy();
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} deleted the issue`,
        deletedIssue: issue
    });
}

async function setIssueVote(req, res) {
    const { id } = req.params;
    const issueId = Number(id);

    if (!/^\d+$/.test(id) || issueId < 1 || issueId > 2147483647) {
        return res.status(400).json({ message: "Invalid issue ID." });
    }

    const userId = req.user?.id;

    if (!userId) {
        return res.status(403).json({ message: "A valid session is required"});
    }

    const result = await db.transaction(async (transaction) => {
        // Lock the issue so it cannot be deleted during the vote
        const issue = await Issue.findByPk(issueId, {
            attributes: ["id", "user_id"],
            transaction,
            lock: transaction.LOCK.SHARE,
        });

        if (!issue) {
            return { status: 404, body: { message: "ID not found." } };
        }

        if (issue.user_id === userId) {
            return {
                status: 403,
                body: { message: "You cannot vote on your own issue."},
            };
        }

        const vote = {
            issue_id: issueId,
            user_id: userId,
        };

        if (req.method === "PUT") {
            // Insert one vote. A repeated like leaves the existing row in place
            await IssueVote.bulkCreate([vote], {
                ignoreDuplicates: true,
                transaction,
            });
        } else {
            // DELETE removes only this user's vote on this issue
            await IssueVote.destroy({
                where: vote,
                transaction,
            });
        }

        const voteRows = await IssueVote.findAll({
            where: { issue_id: issueId },
            attributes: ["user_id"],
            raw: true,
            transaction,
        });

        const votes = voteRows.length;
        const hasVoted = voteRows.some( row => row.user_id === userId);

        return {
            status: 200,
            body: { id: issueId, votes, hasVoted },
        };
    });

    return res.status(result.status).json(result.body);
}

async function getMyIssueVotes(req, res) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(403).json({message: "A valid session is required."});
    }

    const votes = await IssueVote.findAll({
        where: { user_id: userId },
        attributes: ["issue_id"],
        raw: true,
    });

    const issueIds = votes.map((vote) => vote.issue_id);

    res.set("Cache-Control", "private, no-store");
    return res.status(200).json({ issueIds});

}


module.exports = { getIssues, issueByID, createIssue, updateIssue, deleteIssue, setIssueVote, getMyIssueVotes };