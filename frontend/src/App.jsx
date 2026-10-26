import { useState } from "react";
import "./App.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ResetPwd from "./components/ResetPwd/ResetPwd";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {

    return (

        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<h1>This will be the home page</h1>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/reset" element={<ResetPwd />}/>
                    <Route path="*" element={<h1>This will be the 404 page</h1>}/>

                </Routes>
            
            </BrowserRouter>
        </>

    );     
    
}

export default App;
