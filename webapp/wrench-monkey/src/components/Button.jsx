import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = ({ to, text, onClick, ...rest }) => {
    if (to) {
        return (
            <NavLink to={to} className="border border-white rounded-full px-4 py-2 text-white bg-button hover:bg-white hover:text-black transition-colors duration-300" {...rest}>
                {text}
            </NavLink>
        );
    } else {
        return (
            <button onClick={onClick} className="border border-white rounded-full px-4 py-2 text-white bg-button hover:bg-white hover:text-black transition-colors duration-300" {...rest}>
                {text}
            </button>
        );
    }
};

export default Button;
