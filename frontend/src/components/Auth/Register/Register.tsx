import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router";

type RegisterProps = {
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    apiPost: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function Register({ setUserName, email, setEmail, password, setPassword, apiPost}: RegisterProps) {
    const navigate = useNavigate();

    const [ name, setName ] = useState<string>("");
    const [ lastName, setLastName ] = useState<string>("");
    
    let username: string = name.trim().toLowerCase() + "."+ lastName.trim().toLocaleLowerCase();
    let usernameNorm: string = "";
    let usernameArr: string[] = [...username];

    usernameArr.forEach( (letter: string) => {
        if (letter !== " ") {
            usernameNorm += letter;
        }        
    });

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    
    const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const craftUsername = () => {
        setUserName(usernameNorm);
    }

    return (

        <>
            <Row className="vh-100 ">
                <Col className="d-flex flex-column justify-content-center align-items-center">

                    <p className="display-6 fw-normal mb-5">Register</p>

                    <Form className="w-50" onSubmit={apiPost} onChange={craftUsername}>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Name(s)</Form.Label>
                                <Form.Control type="text" placeholder="e.g. Pedro" value={name} onChange={handleName} required/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="e.g. Fonseca" value={lastName} onChange={handleLastName} required/>
                            </Form.Group>
                        </Row>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required/>
                            <Form.Text muted>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
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
                                    onClick={()=>navigate("/auth/login")}
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