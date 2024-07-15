import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import {useSelector} from "react-redux";

const PrivateRoute = ({element, ...rest}) => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    return accessToken ? element : <Navigate to="/login"/>;
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute element={<Home/>}/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/reservation" element={<PrivateRoute element={<Reservation/>}/>}/>
        </Routes>
    );
}
export default App;
