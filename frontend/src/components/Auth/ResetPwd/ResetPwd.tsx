import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router";

type ResetProps = {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    apiPost: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function ResetPwd({ userName, setUserName, password, setPassword, newPassword, setNewPassword, apiPost }: ResetProps) {
    
    return (
        <>

            <Row className="vh-100">

                <Col className="d-flex flex-column justify-content-center align-items-center">

                    <p className="display-6 fw-normal mb-5">Reset password</p>
                    <Form className="w-50" onSubmit={apiPost}>
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
                                    maxLength={20}
                                    pattern="[a-zA-Z0-9. ]+"
                                    value={userName}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUserName(event.target.value)}}
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
                                minLength={8}
                                maxLength={16}
                                required
                                value={password}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=" * * * * * * *"
                                minLength={8}
                                maxLength={16}
                                required
                                value={newPassword}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setNewPassword(event.target.value)}}
                            />
                        </Form.Group>
                        
                        <div
                            className="d-flex justify-content-end
                            mb-4"
                        >
                            <p>
                                <Link
                                    to={"/auth/login"}
                                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                >
                                    Go login
                                </Link>
                            </p>
                        </div>

                        <Button className="w-100 mb-3" variant="primary" type="submit">
                            Restore password
                        </Button>

                        <div
                            className="d-flex justify-content-center
                            mb-4"
                        >
                            <p>
                                <a
                                    href=""
                                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                >
                                    Forgot password?
                                </a>
                            </p>
                        </div>

                    </Form>
                
                </Col>

            </Row>

        </>
    );
}