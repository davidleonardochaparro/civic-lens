const { Issue } = require("../schemas/issue.model");

const getIssues = async (req, res) => {
    const allIssues = await Issue.findAll();

    if (!allIssues.length) {
        res.status(200).json({
            message: `Reached ${req.method} route, from ${req.originalUrl}, no issues registered.`
        });
    }

    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}, retrieved all issues.`,
        allIssues
    });
}

const issueByID = async (req, res) => {
    const { id } = req.params;
    const issue = await Issue.findByPk(id);

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

    const newIssue = await Issue.create(req.newIssue);

    res.status(201).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl}, added the issue`,
        newIssue: newIssue
    });
}

const updateIssue = async (req, res) => {
    
    const { id } = req.params;

    const issue = await Issue.findByPk(id);

    if (!issue) {
        return res.status(404).json({
            message: "ID not found."
        });
    }

    const { title, description, category, status, votes} = req.newIssue;

    const updatedIssue = {
        title: title ?? issue.title,
        description: description ?? issue.description,
        category: category ?? issue.category,
        status: status ?? issue.status,
        votes: votes ?? issue.votes
    };

    await issue.update(updatedIssue);
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} updated the issue`,
        updatedIssue: issue
    });
}

const deleteIssue = async (req, res) => {

    const { id } = req.params;

    const issue = await Issue.findByPk(id);

    if (!issue) {
        return res.status(404).json({
            message: "ID not found."
        });
    }

    await issue.destroy();
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} deleted the issue`,
        deletedIssue: issue
    });
}

module.exports = {getIssues, issueByID, createIssue, updateIssue, deleteIssue};