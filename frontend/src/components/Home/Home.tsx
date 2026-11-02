import Container from 'react-bootstrap/Container';
import Navbar from './Navbar/Navbar';
export default function Home() {
    return (
        <>
            <Container className='d-flex justify-content-center'>
                <h1 className="display-1">Civic-lens Home Page</h1>
            </Container>
            <Navbar />
        </>
    );
}
