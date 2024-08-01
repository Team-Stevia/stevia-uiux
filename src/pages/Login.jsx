import logo from '../assets/logo.jpg'
import background from '../assets/background.svg'
import '../styles/Login.css'
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../feature/slice/authSlice.js";


const Login = () => {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies(['refreshToken']);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);

    const handleOnclick = async () => {
        try {
            const {payload} = await dispatch(login({studentId, password}));
            console.log(payload);
            setCookie('refreshToken', payload.refreshToken, {path: '/'});
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    }

    return (
        <div className="background-img" style={{backgroundImage: `url(${background})`}}>
            <div className="login-container">
                <img className="logo-img" src={logo} alt="logo"/>
                <div className="student_id">
                    <input
                        type="text"
                        id="student_id"
                        name="student_id"
                        value={studentId}
                        onChange={(e) => {
                            setStudentId(e.target.value);
                        }}/>
                </div>
                <div className="password">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}/>
                </div>
                <div className="find-password">
                    <p>Forgot Password?</p>
                </div>
                <button type="button" onClick={handleOnclick}>Login</button>
                {authStatus === 'loading' && <p>Loading...</p>}
                {authStatus === 'failed' && <p>Error: {authError}</p>}
            </div>
        </div>
    );
}

export default Login;