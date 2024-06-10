import React from 'react';
import logo from '../../src/assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import Button from './Button'; // Import the Button component
import '../index.css';

const Navbar = () => {
    const navItems = [
        { path: "/About", title: "About Us" },
        { path: "/Manual", title: "Manual" },
    ];

    return (
        <header style={{ backgroundColor: '#00001B' }}>
            <nav className="container mx-auto flex justify-between items-center py-4 min-w-[800px]">
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
                                activeClassName="text-blue-500 font-bold"
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Space between Nav Links and Buttons */}
                <div className="hidden md:block w-4"></div>

                {/* Buttons Component Aligned to the Right */}
                <div className="flex items-center space-x-4 font-custom mr-8">
                    <Button href="/login" text="Log In" />
                    <Button href="/sign-up" text="Sign Up" />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
