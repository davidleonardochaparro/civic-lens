import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router";

type LoginProps = {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    apiPost: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export default function Login({ userName, setUserName, password, setPassword, apiPost }: LoginProps) {

    return (
        <>
            <Row className="vh-100">
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <p className="display-6 fw-normal mb-5">Login</p>
                    <Form className="w-50"
                        onSubmit={apiPost}>
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
                                    minLength={6}
                                    maxLength={18}
                                    pattern="[a-zA-Z ]+"
                                    value={userName}
                                    onChange={event => {
                                        setUserName(event.target.value)
                                    }}
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
                                minLength={8}
                                maxLength={16}
                                required
                                value={password}
                                onChange={event => {
                                    setPassword(event.target.value)
                                }}
                            />
                        </Form.Group>

                        <div
                            className="d-flex justify-content-end
                            mb-4"
                        >
                            <p>
                                <Link 
                                    to={"/auth/reset"}
                                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                >
                                    Reset password?
                                </Link>
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
                                <Link
                                    to={"/auth/register"}
                                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
