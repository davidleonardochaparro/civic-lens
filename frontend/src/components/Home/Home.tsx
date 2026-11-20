import { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import IssuesCards from './IssuesCards/IssuesCards';
import PostIssue from './PostIssue/PostIssue'
import { decodeToken } from './Functions/HomeFunctions';

export default function Home() {

    // Every time this state switches the cards displayed re-render
    const [renderPosts, setRenderPosts] = useState<boolean>(false);
    const [tokenExpired, setTokenExpired] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

    // ! Before this, check if the token is trusted
    useEffect(() => {

        const jwtPayload = decodeToken(token);
        if(!jwtPayload) return;

        function expireSession() {
            if (localStorage.getItem("token") === token ) {
                localStorage.removeItem("token");
            }

            setTokenExpired(true);
            setToken(null);
        }

        let tokenExpiration = jwtPayload.exp * 1000;
        let currentTimestamp = Date.now();
        const millisecondsUntilExpiry = tokenExpiration - currentTimestamp;
        
        if (millisecondsUntilExpiry <= 0 ) {
            expireSession();
            return;
        } 

        setTokenExpired(false);

        const timeoutId = window.setTimeout(expireSession, millisecondsUntilExpiry);

        return () => window.clearTimeout(timeoutId);
        
    }, [token]);

    return (
        <>
            <Navbar token={token} tokenExpired={tokenExpired}/>
            <PostIssue renderPosts={renderPosts} setRenderPosts={setRenderPosts} token={token} tokenExpired={tokenExpired}/>
            <IssuesCards renderPosts={renderPosts} setRenderPosts={setRenderPosts} token={token} tokenExpired={tokenExpired}/>
        </>
    );
}
