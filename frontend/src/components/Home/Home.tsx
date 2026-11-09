import Navbar from './Navbar/Navbar';
import IssueCard from './IssueCard/IssueCard';
import PostIssue from './PostIssue/PostIssue'
export default function Home() {
    return (
        <>
            <Navbar />
            <PostIssue />
            <IssueCard />
        </>
    );
}
