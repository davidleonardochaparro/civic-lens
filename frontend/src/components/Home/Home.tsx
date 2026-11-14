import { useState } from 'react';
import Navbar from './Navbar/Navbar';
import IssuesCards from './IssuesCards/IssuesCards';
import PostIssue from './PostIssue/PostIssue'
export default function Home() {

    // Every time this state switches the cards displayed re-render
    const [renderPosts, setRenderPosts] = useState<boolean>(false);

    return (
        <>
            <Navbar />
            <PostIssue renderPosts={renderPosts} setRenderPosts={setRenderPosts}/>
            <IssuesCards renderPosts={renderPosts} setRenderPosts={setRenderPosts}/>
        </>
    );
}
