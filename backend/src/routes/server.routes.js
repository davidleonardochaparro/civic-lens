const router = require("express").Router();

let db = [
    {id:"123", title:"Streetlight", description:"Broken streetlight on Bowery street.", category:"Safety", status:"Created", createdAt: new Date()},
    {id:"456", title:"Graffiti", description:"Graffiti found on Brooklyn bridge.", category:"Community", status:"Created", createdAt:new Date()},
    {id:"789", title:"Pathole", description:"Pathole on Brodway Avenue.", category:"Safety", status:"Created", createdAt:new Date()},
    {id:"100", title:"Unsafe intersection", description:"Unsafe intersection on Hudson St.", category:"Safety", status:"Created", createdAt:new Date()},
    {id:"110", title:"Abandoned property", description:"Abandoned property on West Village.", category:"Community", status:"Created", createdAt:new Date()}
]

router.get("/issues", (req, res) => {
    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}, retrieved all issues`,
        db
    });
});

router.get("/issues/:id", (req, res) => {
    const { id } = req.params;
    const issueObject = db.find( issue => issue.id === id);
    if (!issueObject) {
        return res.status(400).json({
            message: `ID not found.`
        });
    }
    res.status(200).json({
        message: `Reached ${req.method} route, from ${req.originalUrl}`,
        issueObject
    });    
});

router.post("/issues", (req, res) => {
    let { id, title, description, category, status} = req.body;
    category = category.toLowerCase();
    if (!id) {
        return res.status(406).json({
            message: "Missing ID."
        });
    }
    if (db.some(issue => issue.id === id)) {
        return res.status(409).json({ message: "ID already exists." });
    }
    if (!title) {
        return res.status(406).json({
            message: "Missing title."
        });
    }
    if (!description) {
        return res.status(406).json({
            message: "Missing description"
        });
    }
    if (!category) {
        return res.status(406).json({
            message: "Missing category"
        });
    }
    const VALID_CATEGORIES = ["safety", "community"];
    if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ message: "Invalid category." });
    }
    if (!status) {
        return res.status(406).json({
            message: "Missing status"
        });
    }

    const newIssue = { id, title, description, category, status, createdAt: new Date() };
    db.push(newIssue);
    res.status(201).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl}, added the issue`,
        newIssue 
    });
});

router.put("/issues/:id", (req, res) => {
    const { id } = req.params;
    let issueIndex = db.findIndex( issue => issue.id === id);
    if (issueIndex === -1) {
        return res.status(400).json({
            message: `ID not found.`
        });
    }

    let { title, description, category, status } = req.body;
    category = category.toLowerCase();
    if (!title) {
        return res.status(406).json({
            message: "Missing title."
        });
    }
    if (!description) {
        return res.status(406).json({
            message: "Missing description"
        });
    }
    if (!category) {
        return res.status(406).json({
            message: "Missing category"
        });
    }
    const VALID_CATEGORIES = ["safety", "community"];
    if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ message: "Invalid category." });
    }
    if (!status) {
        return res.status(406).json({
            message: "Missing status"
        });
    }

    let updatedIssue = { id, title, description, category, status, updatedAt: new Date() }
    const entries = Object.entries(updatedIssue); // Object to array
    entries.unshift(['id', id]); // id to the first position
    updatedIssue = Object.fromEntries(entries); // Back to object
    db[issueIndex] = updatedIssue;
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} updated the issue`,
        updatedIssue
    });
});

router.delete("/issues/:id", (req, res) => {
    const { id } = req.params;
    const issueIndex = db.findIndex( issue => issue.id === id);
    if (issueIndex === -1) {
        return res.status(400).json({
            message: `ID not found.`
        });
    }

    const issueObject = db[issueIndex];
    db.splice(issueIndex, 1);
    
    res.status(200).json({
        message: `Reached the ${req.method} route, from ${req.originalUrl} deleted the issue`,
        issueObject
    });
});

module.exports = router;