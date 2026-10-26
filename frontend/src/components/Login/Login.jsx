import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Login() {
    return (
        <>
            <Row className='vh-100'>

                <Col className='d-flex flex-column justify-content-center align-items-center'>
                
                    <p className="display-6 fw-normal mb-5">Login</p>
                    <Form className='w-50'>
                        <Form.Group
                            className="mb-3"
                            controlId="validationCustomUsername"
                        >
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">
                                    @
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. pedro.fonseca1"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=" * * * * * * *"
                            />
                        </Form.Group>

                        <Button className="w-100" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Col>

            </Row>
        </>
    );
}
