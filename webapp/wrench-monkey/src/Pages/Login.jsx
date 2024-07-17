import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button.jsx';
import Cookies from 'js-cookie';
import config from '../config.js';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePasswordComplexity = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!validatePasswordComplexity(password)) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post(`${config.apiURL}/auth/login`, { email, pass: password });
                const { token, userId } = response.data;
                // Store token and userId in Cookies
                Cookies.set('token', token, { expires: 0.0833 }); // 6 hours
                setErrors({});
                // Redirect to the manager page on successful login
                navigate('/manager');
                window.location.reload();
            } catch (error) {
                console.error('Login error:', error.response?.data || error.message);
                setErrors({ ...newErrors, api: 'Invalid email or password' });
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-custom mb-2 text-white">Monkey Manager</h2>
            <div className="bg-box rounded-lg p-8 max-w-md w-2/5 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-xs">
                    <div className="mb-1">
                        <label htmlFor="email" className="block text-xl font-custom mb-1">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 font-custom border rounded-lg focus:outline ${errors.email ? 'border-red-500' : 'focus:border-blue-500'}`}
                        />
                        {errors.email && <div className="text-red-500 text-sm font-custom">{errors.email}</div>}
                    </div>
                    <div className="mb-1 relative">
                        <label htmlFor="password" className="block text-xl font-custom mb-1">Password:</label>
                        <div className="relative w-full">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-3 py-2 font-custom border rounded-lg focus:outline ${errors.password ? 'border-red-500' : 'focus:border-blue-500'}`}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <EyeOffIcon className="h-6 w-6 text-gray-700" /> : <EyeIcon className="h-6 w-6 text-gray-700" />}
                            </button>
                        </div>
                        {errors.password && <div className="text-red-500 text-sm font-custom">{errors.password}</div>}
                    </div>
                    {errors.api && <div className="text-red-500 text-md mb-2 font-custom">{errors.api}</div>}
                    <div className="mt-5 flex justify-center font-custom">
                        <Button onClick={handleSubmit} text="Log In" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
