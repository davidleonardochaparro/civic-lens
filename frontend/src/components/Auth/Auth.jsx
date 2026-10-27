import { useState } from "react";
import { useParams } from "react-router";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ResetPwd from "./ResetPwd/ResetPwd";

export default function Auth() {
    const { logRoute } = useParams();

    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    console.log(userName);
    

    const apiPost = event => {
        event.preventDefault();
        let url = "";
        let body = "";
        let method = "";
        switch (logRoute) {
            case 'login':
                url = "http://127.0.0.1:4000/auth/login";
                body = {user_name: userName, password};
                method = "POST";
                break;
            case 'register':
                url = "http://127.0.0.1:4000/auth/register";
                body = {user_name: userName, email, password};
                method = "POST";
                break;
            case 'reset':
                console.log('Reset url and body');
                method = "PUT";
                break;
            default:
                console.log('Return out of the fx');
                break;
                
        }

        fetch( url, {
            method: method,
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }
    
    return (
        <>
            {logRoute === "login" ? (<Login setUserName={setUserName} password={password} setPassword={setPassword} apiPost={apiPost} />)
                : logRoute === "register" ? (<Register userName={userName} setUserName={setUserName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} apiPost={apiPost} />)
                : logRoute === "reset" ? (<ResetPwd />)
                : (<h1>This will be the 404 page component</h1>)}
    
        </>
    );
}
