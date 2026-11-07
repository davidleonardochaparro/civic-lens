import Navbar from './Navbar/Navbar';
import IssueCard from './IssueCard/IssueCard';
import NewIssue from './NewIssue/NewIssue';
export default function Home() {
    return (
        <>
            <Navbar />
            <NewIssue />
            <IssueCard />
        </>
    );
}
