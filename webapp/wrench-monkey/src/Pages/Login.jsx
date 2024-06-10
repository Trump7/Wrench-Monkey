import React from 'react';
import Button from '../components/Button.jsx'; // Import the Button component

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add login logic here
    };

    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-custom mb-2 text-white">Monkey Manager</h2>
            <div className="bg-box rounded-lg p-4 max-w-md w-2/5 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full max-w-xs">
                    <div className="mb-1">
                        <label htmlFor="email" className="block text-sm font-custom mb-1">Email:</label>
                        <input type="text" id="email" name="email" className="w-full px-3 py-2 font-custom border rounded-lg focus:outline focus:border-blue-500" />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="password" className="block text-sm font-custom mb-1">Password:</label>
                        <input type="password" id="password" name="password" className="mb-4 w-full px-3 py-2 font-custom border rounded-lg focus:outline focus:border-blue-500" />
                    </div>
                    <div className="flex justify-center font-custom">
                        <Button onclick={handleSubmit} text="Log In"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
