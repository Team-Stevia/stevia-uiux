import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import {useEffect} from "react";

const roomId = "2b817f4a-3cb4-4a77-b0a5-78f3db9d6b9a"


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/reservation" element={<Reservation roomId={roomId}/>}/>
            </Routes>
        </div>
    );
}

export default App;
