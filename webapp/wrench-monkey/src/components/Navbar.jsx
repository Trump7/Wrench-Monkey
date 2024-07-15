import React, { useEffect, useState } from 'react';
import logo from '../../src/assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import Button from './Button'; // Import the Button component
import { isAuthenticated } from '../utilities/auth';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import config from '../config';
import '../index.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navItems = [
        { path: "/About", title: "About Us" },
        { path: "/Manual", title: "Manual" },
    ];

    const authenticated = isAuthenticated();

    useEffect(() => {
        if (authenticated) {
            fetchUser();
        }
    }, [authenticated]);

    const fetchUser = async () => {
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            if (!userId) {
                console.error('No userId found in token');
                return;
            }

            const response = await fetch(`${config.apiURL}/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            setUser(data);

        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <header style={{ backgroundColor: '#00001B' }}>
            <nav className="container mx-auto flex justify-between items-center py-4 min-w-[1280px]">
                {/* Wrench Monkey Logo */}
                <NavLink to="/" className="flex items-center gap-2 text-white">
                    <img src={logo} alt="Wrench Monkey Logo" className="h-20 w-auto" />
                    <span className="text-2xl font-custom">Wrench Monkey</span>
                </NavLink>

                {/* Space between Wrench Monkey and Nav Links */}
                <div className="hidden md:block w-4"></div>

                {/* Nav Links to the Right of Wrench Monkey Title */}
                <ul className="flex items-center space-x-4 font-custom">
                    {navItems.map(({ path, title }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className="text-white hover:text-gray-300"
                                activeClassName="text-blue-500 font-bold">
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    {authenticated && (
                        <li>
                            <NavLink
                                to="/manager"
                                className="text-white hover:text-gray-300"
                                activeClassName="text-blue-500 font-bold">
                                Manager
                            </NavLink>
                        </li>
                    )}
                </ul>

                {/* Space between Nav Links and Buttons */}
                <div className="hidden md:block w-4"></div>

                {/* User Info and Buttons Component Aligned to the Right */}
                <div className="flex items-center space-x-4 font-custom mr-8">
                    {authenticated && user && (
                        <div className="text-white">
                            <div>Logged in as</div>
                            <div>{user.name}</div>
                        </div>
                    )}
                    {authenticated ? (
                        <Button onClick={handleLogout} text="Log Out" />
                    ) : (
                        <>
                            <Button to="/login" text="Log In" />
                            <Button to="/register" text="Register" />
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

const handleLogout = () => {
    Cookies.remove('token');
    window.location.reload();
};

export default Navbar;
