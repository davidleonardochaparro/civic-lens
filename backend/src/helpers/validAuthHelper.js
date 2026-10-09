const normRegitration = (userName, email, password) => {

    if (!userName) {
        return { error: { status: 422, message: "Missing user_name."}};
    }

    if (!email) {
        return { error: { status: 422, message: "Missing email."}};
    }

    if (!password) {
        return { error: { status: 422, message: "Missing password."}};
    }
    
    if (password.length < 8) {
        return { error: { status: 400, message: "Password must have 8 characters minimum."}};
    }

    // Normalize entries
    userName = userName.toLowerCase().trim();
    let userNameNorm = "";
    let userArr = [...userName];
    for (letter of userArr) {
        if (letter !== " ") {
            userNameNorm += letter;
        }
    }
    userName = userNameNorm;

    email = email.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { error: { status: 400, message: "Valid email is required."}};
    }

    return { data: { userName, email, password } };
}

const normLogin = (userName, password) => {

    if (!userName) {
        return { error: { status: 422, message: "Missing user_name."}};
    }

    if (!password) {
        return { error: { status: 422, message: "Missing password"}};
    }

    userName = userName.trim();
    password = password.trim();

    return { data: { userName, password }};
}

module.exports = { normRegitration, normLogin };