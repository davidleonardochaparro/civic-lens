import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();
    return (

        <>
            <Row className="vh-100 ">
                <Col className="d-flex flex-column justify-content-center align-items-center">

                    <p className="display-6 fw-normal mb-5">Register</p>

                    <Form className="w-50">

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="e.g. Pedro"/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="e.g. Fonseca"/>
                            </Form.Group>
                        </Row>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text muted>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            <Form.Text>
                                Your password must be 8~16 characters long.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Agree to terms and conditions" />
                        </Form.Group>

                        <Button className="w-100 mb-3" variant="primary" type="submit">
                            Create an account
                        </Button>

                        <div className="d-flex justify-content-center">
                            <p>
                                Already have one?{" "}
                                <a
                                    href=""
                                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                    onClick={()=>navigate("/login")}
                                >
                                    Log in
                                </a>
                            </p>
                        </div>

                    </Form>
                </Col>
            </Row>
            
        </>

    );
}
