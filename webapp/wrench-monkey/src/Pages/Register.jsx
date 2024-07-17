import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import Button from '../components/Button.jsx'; // Import the Button component
import config from '../config.js';

const Register = () => {
    const [name, setName] = useState('');
    const [robot, setRobot] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePasswordComplexity = (password) => {
        return password.length >= 8;
    };

    const validateRobotNumber = (robot) => {
        return /^\d+$/.test(robot);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!name) newErrors.name = 'Full Name is required';
        if (!robot) newErrors.robot = 'Robot Number is required';
        else if (!validateRobotNumber(robot)) newErrors.robot = 'Robot Number must be a number';
        if (!email) newErrors.email = 'Email is required';
        else if (!validateEmail(email)) newErrors.email = 'Invalid email address';
        if (!password) newErrors.password = 'Password is required';
        else if (!validatePasswordComplexity(password)) newErrors.password = 'Password must be at least 8 characters long';
        if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await axios.post(`${config.apiURL}/auth/register`, {
                    name,
                    email,
                    pass: password,
                });
                setErrors({});
                navigate('/login');
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setErrors({ email: 'Email already in use' });
                } else {
                    setErrors({ api: 'Error registering user' });
                }
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-custom mb-2 text-white">New Monkey Manager</h2>
            <div className="bg-box rounded-lg p-4 max-w-md w-2/5 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-xs">
                    <div className="mb-1">
                        <label htmlFor="name" className="block text-xl font-custom mb-1">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-3 py-2 font-custom border rounded-lg focus:outline ${errors.name ? 'border-red-500' : 'focus:border-blue-500'}`}
                        />
                        {errors.name && <div className="text-red-500 text-sm font-custom">{errors.name}</div>}
                    </div>
                    <div className="mb-1">
                        <label htmlFor="robot" className="block text-xl font-custom mb-1">Robot Number:</label>
                        <input
                            type="text"
                            id="robot"
                            name="robot"
                            value={robot}
                            onChange={(e) => setRobot(e.target.value)}
                            className={`w-full px-3 py-2 font-custom border rounded-lg focus:outline ${errors.robot ? 'border-red-500' : 'focus:border-blue-500'}`}
                        />
                        {errors.robot && <div className="text-red-500 text-sm font-custom">{errors.robot}</div>}
                    </div>
                    <div className="mb-1 relative">
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
                            className="absolute right-2 top-10"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <EyeOffIcon className="h-7 w-7 text-gray-700" /> : <EyeIcon className="h-7 w-7 text-gray-700" />}
                        </button>
                        {errors.password && <div className="text-red-500 text-sm font-custom">{errors.password}</div>}
                    </div>
                    <div className="mb-1 relative">
                        <label htmlFor="confirmpassword" className="block text-xl font-custom mb-1">Confirm Password:</label>
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            id="confirmpassword"
                            name="confirmpassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-3 py-2 font-custom border rounded-lg focus:outline ${errors.confirmPassword ? 'border-red-500' : 'focus:border-blue-500'}`}
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-10"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        >
                            {confirmPasswordVisible ? <EyeOffIcon className="h-7 w-7 text-gray-700" /> : <EyeIcon className="h-7 w-7 text-gray-700" />}
                        </button>
                        {errors.confirmPassword && <div className="text-red-500 text-sm font-custom">{errors.confirmPassword}</div>}
                    </div>
                    {errors.api && <div className="text-red-500 text-md mb-2 font-custom">{errors.api}</div>}
                    <div className="mt-5 flex justify-center font-custom">
                        <Button onClick={handleSubmit} text="Register"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
