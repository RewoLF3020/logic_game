import React, { useContext } from 'react';
import { AuthContext } from '../context/context';
import Button from "./../components/UI/button/Button";

const Login = () => {
    const {/* isAuth, */ setIsAuth} = useContext(AuthContext);

    const login = (event) => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem("auth", "true");
    }

    return (
        <div className='login'>
            <h1>Magnum opus</h1>
            <Button onClick={login}>Начать игру</Button>
        </div>
    );
}

export default Login;
