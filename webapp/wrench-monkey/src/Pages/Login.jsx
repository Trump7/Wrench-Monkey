import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button.jsx';
import Cookies from 'js-cookie';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, pass: password });
            const { token, userId } = response.data;
            // Store token and userId in localStorage or sessionStorage
            console.log('Login successful:', token, userId);
            Cookies.set('token', token, { expires: 0.0833 }); //change time currently 6hrs
            setError('');
            // Redirect to the manager page on successful login using history
            navigate('/manager');
            window.location.reload();
        } catch (error) {
            console.error('Login error:', error.response.data);
            setError('Invalid email or password');
        }
    };

    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-custom mb-2 text-white">Monkey Manager</h2>
            <div className="bg-box rounded-lg p-4 max-w-md w-2/5 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-xs">
                    <div className="mb-1">
                        <label htmlFor="email" className="block text-sm font-custom mb-1">Email:</label>
                        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 font-custom border rounded-lg focus:outline focus:border-blue-500" />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="password" className="block text-sm font-custom mb-1">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 w-full px-3 py-2 font-custom border rounded-lg focus:outline focus:border-blue-500" />
                    </div>
                    {error && <div className="text-red-500 text-md mb-2 font-custom">{error}</div>}
                    <div className="flex justify-center font-custom">
                        <Button onClick={handleSubmit} text="Log In"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
