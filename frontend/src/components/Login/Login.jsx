import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();
    return (
        <>
            <Row className="vh-100">
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <p className="display-6 fw-normal mb-5">Login</p>
                    <Form className="w-50">
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

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=" * * * * * * *"
                            />
                        </Form.Group>

                        <div
                            className="d-flex justify-content-end
                            mb-4"
                        >
                            <p>
                                <a
                                    href=""
                                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                    onClick={()=>navigate("/reset")}
                                >
                                    Reset password?
                                </a>
                            </p>
                        </div>

                        <Button
                            className="w-100 mb-3"
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>

                        <div className="d-flex justify-content-center">
                            <p>
                                Don't have an account?{" "}
                                <a
                                    href=""
                                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                    onClick={()=>navigate("/register")}
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
