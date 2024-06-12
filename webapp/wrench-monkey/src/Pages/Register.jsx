import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx'; // Import the Button component
import config from '../config.js';

const Register = () => {
    const [name, setName] = useState('');
    const [robot, setRobot] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEmailError(false);
        setPasswordError(false);
        setPasswordMismatchError(false);

        if (password !== confirmPassword) {
            setPasswordMismatchError(true);
            setError('Passwords do not match');
            return;
        }

        try {
            await axios.post(`${config.apiURL}/auth/register`, {
                name,
                email,
                pass: password,
            });
            setError('');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailError(true);
                setError('Email already in use');
            } else {
                setError('Error registering user');
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-custom mb-2 text-white">New Monkey Manager</h2>
            <div className="bg-box rounded-lg p-4 max-w-md w-2/5 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-xs">
                    <div className="mb-1">
                        <label htmlFor="name" className="block text-sm font-custom mb-1">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 font-custom border rounded-lg focus:outline focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="robot" className="block text-sm font-custom mb-1">Robot Number:</label>
                        <input
                            type="text"
                            id="robot"
                            name="robot"
                            value={robot}
                            onChange={(e) => setRobot(e.target.value)}
                            className="w-full px-3 py-2 font-custom border rounded-lg focus:outline focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="email" className="block text-sm font-custom mb-1">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 font-custom border rounded-lg focus:outline ${emailError ? 'border-red-500' : 'focus:border-blue-500'}`}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="password" className="block text-sm font-custom mb-1">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-3 py-2 font-custom border rounded-lg focus:outline ${passwordError || passwordMismatchError ? 'border-red-500' : 'focus:border-blue-500'}`}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="confirmpassword" className="block text-sm font-custom mb-1">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`mb-4 w-full px-3 py-2 font-custom border rounded-lg focus:outline ${passwordMismatchError ? 'border-red-500' : 'focus:border-blue-500'}`}
                        />
                    </div>
                    {error && <div className="text-red-500 text-md mb-2 font-custom">{error}</div>}
                    <div className="flex justify-center font-custom">
                        <Button onClick={handleSubmit} text="Register"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
