const normRegitration = (userName, email, password) => {

    if (!userName) {
        return { error: { status: 422, message: "Missing user_name."}};
    }
    userName = userName.toLowerCase().trim();
    let userNameNorm = "";
    let userArr = [...userName];
    for (letter of userArr) {
        if (letter !== " ") {
            userNameNorm += letter;
        }
    }
    userName = userNameNorm;


    if (!email) {
        return { error: { status: 422, message: "Missing email."}};
    }
    email = email.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return { error: { status: 400, message: "Valid email is required."}};
    }

    // Minimum characters
    if (!password) {
        return { error: { status: 422, message: "Missing password."}};
    }

    return { data: { userName, email, password } };
}

module.exports = {normRegitration};