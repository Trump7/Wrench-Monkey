import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import config from '../config';
import robot from '../assets/logo.jpg';

const CurrentStatus = () => {
    const [status, setStatus] = useState([]);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${config.apiURL}/status`);
                setStatus(response.data);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };
        fetchStatus();
    }, []);

    if (!status) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="bg-gray-700 p-4 rounded-lg mb-4 text-white font-custom text-center text-2xl">Current Status</h2>
            <div className="flex justify-center mb-6">
                <img src={robot} alt="Robot" className="w-60 h-auto rounded" />
            </div>
            <div className="flex justify-center mb-6">
                <div className="bg-gray-700 rounded-lg p-3 w-40 flex items-center justify-between">
                    <span className="text-white font-custom">Status:</span>
                    <span className={`w-6 h-6 rounded-full ${status.length && status[0].isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
            </div>
        </div>
    );
};

export default CurrentStatus;
