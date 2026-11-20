type Payload = {
    id: number;
    iat: number;
    exp: number;
};

function decodeToken(token: string | null): Payload | undefined {
    if(!token)return;
    const base64URL: string = token.split(".")[1];
    const base64 = base64URL.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
    );
    const objectPayload: Payload = JSON.parse(jsonPayload);
    return objectPayload;
}

export { decodeToken };