import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './LoginPage.css';

const LoginPage = () => {
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            alert('La password debe tener al menos 6 caracteres.');
            return;
        }

        try {
            await login(email, password);
            setMessage('Inicio de sesión exitoso.');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="container">
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btnLogin" type="submit">Login</button>
                </form>
                <p className='pLogin'>{message}</p>
            </div>
        </div>
    );
};

export default LoginPage;

