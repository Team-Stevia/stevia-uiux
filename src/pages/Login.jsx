import logo from '../assets/logo.jpg'
import background from '../assets/background.svg'

import '../styles/Login.css'

const handleOnclick = () => {
}

const Login = () => {
    return (
        <div className="background-img" style={{backgroundImage: `url(${background})`}}>
            <div className="login-container" >
                <img className="logo-img"  src={logo} alt="logo"/>
                {/*<form>*/}
                    <div className="email" >
                        <input type="email" id="email" name="email"/>
                    </div>

                    <div className="password">
                        <input type="password" id="password" name="password"/>
                    </div>
                    <div className="find-password">
                        <p>Forgot Password?</p>
                    </div>
                    <button type="login">Login</button>
                {/*</form>*/}
            </div>
        </div>

    );
}

export default Login;