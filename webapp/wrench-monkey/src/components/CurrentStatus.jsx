import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import config from '../config';
import robot from '../assets/logo.jpg';
import { eventSourceManager } from '../utilities/eventSource';

const CurrentStatus = () => {
    const [status, setStatus] = useState(null);

    // Function to fetch initial status
    const fetchInitialStatus = async () => {
        try {
            const response = await axios.get(`${config.apiURL}/status`);
            setStatus(response.data);
        } catch (error) {
            console.error('Error fetching initial status:', error);
        }
    };

    useEffect(() => {
        fetchInitialStatus(); // Fetch initial status

        const cleanupEventSource = eventSourceManager(setStatus, () => {}, () => {}); // Only setStatus handler

        return () => {
            cleanupEventSource();
        };
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
                <div className="bg-gray-700 rounded-lg p-3 w-60 flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-white font-custom">Connected:</span>
                        <span className={`w-6 h-6 rounded-full ${status.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </div>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-white font-custom">Last Checked:</span>
                        <span className="text-white">{new Date(status.lastChecked).toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-6">
                <div className="bg-gray-700 rounded-lg p-3 w-60 flex items-center justify-between">
                    <span className="text-white font-custom">Current Station:</span>
                    <span className="text-white">{status.currentStation}</span>
                </div>
            </div>
            <div className="flex justify-center mb-6">
                <div className="bg-gray-700 rounded-lg p-3 w-60 flex items-center justify-between">
                    <span className="text-white font-custom">Traveling:</span>
                    <span className={`w-6 h-6 rounded-full ${status.isTraveling ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
            </div>
            {status.isTraveling && (
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-700 rounded-lg p-3 w-60 flex items-center justify-between">
                        <span className="text-white font-custom">Destination:</span>
                        <span className="text-white">{status.destinationStation}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentStatus;
