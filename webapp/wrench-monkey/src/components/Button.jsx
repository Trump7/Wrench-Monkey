import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = ({ href, text }) => {
    return (
        <NavLink to={href} className="border border-white rounded-full px-4 py-2 text-white bg-button hover:bg-white hover:text-black transition-colors duration-300">
            {text}
        </NavLink>
    );
};

export default Button;
