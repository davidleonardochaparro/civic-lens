const attributesValidation = (title, description, category, status, votes) => {
    if (!title) {
        return { error: { status: 422, message: "Missing title."} };
    }
    title = title.trim();
    if (!description) {
        return { error: { status: 422, message: "Missing description." } };
    }
    description = description.trim();
    if (!category) {
        return { error: { status: 422, message: "Missing category." } };
    }
    category = category.trim().toLowerCase();
    const VALID_CATEGORIES = ["safety", "community"];
    if (!VALID_CATEGORIES.includes(category)) {
        return { error: { status: 400, message: "Invalid category." } };
    }
    if (!status) {
        return { error: { status: 422, message: "Missing status." } };
    }
    status = status.trim();
    if (!votes) {
        return { error: { status: 422, message: "Missing votes."} };
    }
    return { data: { title, description, category, status, votes } };
}

const norm = (title, description, category, status, votes) => {
    if (title) {
        title = title.trim();
    }
    if (description) {
        description = description.trim();
    }
    if (category) {
        category = category.trim().toLowerCase();
        const VALID_CATEGORIES = ["safety", "community"];
        if (!VALID_CATEGORIES.includes(category)) {
            return { error: { status: 400, message: "Invalid category." } };
        }
    }
    if (status) {
        status = status.trim();
    }
    return { data: { title, description, category, status, votes } };
}
module.exports = { attributesValidation, norm };