import { useState } from 'react';
import Navbar from './Navbar/Navbar';
import IssueCard from './IssueCard/IssueCard';
import PostIssue from './PostIssue/PostIssue'
export default function Home() {

    const [renderPosts, setRenderPosts] = useState<boolean>(false);

    return (
        <>
            <Navbar />
            <PostIssue renderPosts={renderPosts} setRenderPosts={setRenderPosts}/>
            <IssueCard renderPosts={renderPosts}/>
        </>
    );
}
