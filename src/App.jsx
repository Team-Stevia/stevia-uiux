import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import {useEffect} from "react";
import {useSelector} from "react-redux";


const roomId = "2b817f4a-3cb4-4a77-b0a5-78f3db9d6b9a"

const PrivateRoute = ({element}) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    return accessToken ? element : <Navigate to="/login"/>;
};

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<PrivateRoute element={<Home/>}/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/reservation" element={<PrivateRoute element={<Reservation/>}/>}/>
            </Routes>
        </div>
    );
}

export default App;
