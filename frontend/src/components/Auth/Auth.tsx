import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import Login from "./Login/Login.tsx";
import Register from "./Register/Register.tsx";
import ResetPwd from "./ResetPwd/ResetPwd.tsx";

type AuthBody = {
    user_name: string;
    password: string;
    email?: string;
    new_password?: string;
}

export default function Auth() {
    const { logRoute } = useParams<string>();

    const [ userName, setUserName ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ newPassword, setNewPassword ] = useState<string>("");
    const [ token, setToken ] = useState<string | null>(() => localStorage.getItem("token"));
    const [ error, setError ] = useState<string>("");
    const [ success, setSuccess ] = useState<string>("");
    
    const headers = new Headers({
        "Content-Type": "application/json"
    });

    if (token) {
        headers.set("authorization", token);
    }
    
    const apiPost = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        let url: string = "";
        let method: string = "";
        let body: AuthBody;

        switch (logRoute) {
            case 'login':
                url = "http://127.0.0.1:4000/auth/login";
                method = "POST";
                body = {user_name: userName, password};
                break;
            case 'register':
                url = "http://127.0.0.1:4000/auth/register";
                method = "POST";
                body = {user_name: userName, email, password};
                break;
            case 'reset':
                url = "http://127.0.0.1:4000/auth/reset";
                body = {user_name: userName, password, new_password: newPassword};
                method = "PUT";
                break;
            default:
                console.log('No matching routes');
                return;
        }

        fetch( url, {
            method: method,
            body: JSON.stringify(body),
            headers
        })
        .then(async res => {
            const data: unknown = await res.json();
            
            if (typeof data !== "object" || data === null) {
                throw new Error("The server returned an unexpected response.");
            }

            const message = "message" in data && typeof data.message === "string"
                ? data.message
                : "";

            if (!res.ok) {
                throw new Error(
                    message || `Request failed (${res.status}).`
                );
            }

            if (logRoute === "login" || logRoute === "register") {
                if (!("token" in data) || typeof data.token !== "string" || data.token.trim() === "") {
                    throw new Error("The server did not return the expected token.");
                }
                localStorage.setItem("token", data.token);
                setToken(data.token);
            }
            
            setSuccess(message || "Request completed successfully.");
        })
        .catch((err: unknown) => {
            setSuccess("");
            setError(
                err instanceof Error 
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        });
    }
    
    return (
        <>
            {error && (
                <div className="alert alert-danger" role="alert">{error}</div>
            )}
            {success && (
                <div className="alert alert-success" role="status">
                    {success}
                </div>
            )}
            {logRoute === "login" ? (<Login userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} apiPost={apiPost} />)
                : logRoute === "register" ? (<Register setUserName={setUserName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} apiPost={apiPost} />)
                : logRoute === "reset" ? (<ResetPwd userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} newPassword={newPassword} setNewPassword={setNewPassword} apiPost={apiPost} />)
                : (<h1>This will be the 404 page component</h1>)}
        </>
    );
}

