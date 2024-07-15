import React, {useState} from 'react';
import logo from '../assets/logo.jpg';
import background from '../assets/background.svg';
import '../styles/Login.css';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../feature/slice/authSlice';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";


const Login = () => {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');

    const [cookies, setCookie] = useCookies(['refreshToken']);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {payload} = await dispatch(login({studentId, password}));
            setCookie('refreshToken', payload.refreshToken, {path: '/'});

            navigate('/');
        } catch (error) {
            console.log('Login failed', error);
        }

    };

    return (
        <div className="background-img" style={{backgroundImage: `url(${background})`}}>
            <div className="login-container">
                <img className="logo-img" src={logo} alt="logo"/>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="student-id">
                        <input
                            type="text"
                            placeholder="학번"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                    </div>
                    <div className="password">
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="find-password">
                        <p>Forgot Password?</p>
                    </div>
                    <button type="submit">Login</button>
                </form>
                {authStatus === 'loading' && <p>Loading...</p>}
                {authStatus === 'failed' && <p>Error: {authError}</p>}
            </div>
        </div>
    );
}

export default Login