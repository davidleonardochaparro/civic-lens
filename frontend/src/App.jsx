import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router";

function App() {

    return (

        <>
            <Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/auth" element={<Auth />}>
                    <Route path="/auth/:logRoute" element={<Auth />}/>
                </Route>
                <Route path="*" element={<h1>This will be the 404 page component for Home</h1>}/>
            </Routes>
        </>

    );     
    
}

export default App;
