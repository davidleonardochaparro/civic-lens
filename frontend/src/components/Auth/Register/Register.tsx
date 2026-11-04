import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router";

type RegisterProps = {
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    apiPost: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export default function Register({
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    apiPost,
}: RegisterProps) {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextName = event.target.value;
        setName(nextName);
        craftUsername(nextName, lastName);
    };

    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextLastName = event.target.value;
        setLastName(nextLastName);
        craftUsername(name, nextLastName);
    };

    const craftUsername = (firstName: string, surname: string) => {
        const generatedUsername = `${firstName.trim()}.${surname.trim()}`
            .toLowerCase()
            .replace(/\s/g, "");

        setUserName(generatedUsername);
    };

    return (
        <>
            <Row className="vh-100 ">
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <p className="display-6 fw-normal mb-5">Register</p>

                    <Form className="w-50" onSubmit={apiPost}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Name(s)</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. Pedro"
                                    required
                                    minLength={3}
                                    maxLength={10}
                                    pattern="[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*"
                                    value={name}
                                    onChange={handleName}                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. Fonseca"
                                    required
                                    minLength={3}
                                    maxLength={10}
                                    pattern="[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*"
                                    value={lastName}
                                    onChange={handleLastName}                                />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                pattern="^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text muted>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                minLength={8}
                                maxLength={16}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Text>
                                Your password must be 8~16 characters long.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check
                                type="checkbox"
                                label="Agree to terms and conditions"
                            />
                        </Form.Group>

                        <Button
                            className="w-100 mb-3"
                            variant="primary"
                            type="submit"
                        >
                            Create an account
                        </Button>

                        <div className="d-flex justify-content-center">
                            <p>
                                Already have one?{" "}
                                <Link
                                    to={"/auth/login"}
                                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
