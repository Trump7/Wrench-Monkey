import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import config from '../config';
import robot from '../assets/logo.jpg';
import { eventSourceManager } from '../utilities/eventSource';

const CurrentStatus = () => {
    const [status, setStatus] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [selectedStation, setSelectedStation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    // Function to fetch initial status
    const fetchInitialStatus = async () => {
        try {
            const response = await axios.get(`${config.apiURL}/status`);
            setStatus(response.data);
        } catch (error) {
            console.error('Error fetching initial status:', error);
        }
    };

    const handleStationClick = (station) => {
        setSelectedStation(station);
        setShowPrompt(true);
    };

    const handleConfirmTravel = async () => {
        if (status.currentStation === selectedStation) {
            setErrorMessage('Robot is already at the selected station.');
            setShowErrorPopup(true);
            setShowPrompt(false);
            return;
        }

        try {
            await axios.post(`${config.apiURL}/status/updateStation`, {
                currentStation: status.currentStation,
                isTraveling: true,
                destinationStation: selectedStation
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }

        setShowPrompt(false);
    };

    const handleEmergencyStop = async () => {
        try {
            await axios.post(`${config.apiURL}/status/updateTraveling`, {
                isTraveling: false,
                destinationStation: null,
                currentStation: 'Unknown',
            });
        } catch (error) {
            console.error('Error updating status:', error);
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
                <div className="bg-gray-700 rounded-lg p-3 w-96 flex flex-col items-start">
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-white font-custom">Connected:</span>
                        <span className={`w-40 h-6 rounded-full ${status.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </div>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-white font-custom">Updated:</span>
                        <span className="text-white">{new Date(status.lastChecked).toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-6">
                <div className="bg-gray-700 rounded-lg p-3 w-96 flex items-center justify-between">
                    <span className="text-white font-custom">Current Station:</span>
                    <span className="text-white">{status.currentStation}</span>
                </div>
            </div>
            <div className="flex justify-center mb-6">
                <div className="bg-gray-700 rounded-lg p-3 w-96 flex items-center justify-between">
                    <span className="text-white font-custom">Traveling:</span>
                    <span className={`w-40 h-6 rounded-full ${status.isTraveling ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
            </div>
            {!status.isTraveling && (
                <div>
                    <span className="flex justify-center mb-2 text-xl text-white font-custom">Travel to a Station?</span>
                    <div className="flex justify-center mb-5">
                        <button
                            onClick={() => handleStationClick('Station A')}
                            className="font-custom bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded mx-1"
                        >
                            Station A
                        </button>
                        <button
                            onClick={() => handleStationClick('Station B')}
                            className="font-custom bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded mx-1"
                        >
                            Station B
                        </button>
                        <button
                            onClick={() => handleStationClick('Station C')}
                            className="font-custom bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded mx-1"
                        >
                            Station C
                        </button>
                    </div>
                </div>
            )}
            {status.isTraveling && (
                <div className="flex justify-center mb-6">
                    <button
                        onClick={handleEmergencyStop}
                        className="font-custom bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                        EMERGENCY STOP
                    </button>
                </div>
            )}
            {showPrompt && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-custom font-bold mb-4">Confirm Travel</h3>
                        <p className="font-custom mb-4">Are you sure you want the robot to travel to station {selectedStation}?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowPrompt(false)}
                                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
                            >
                                No
                            </button>
                            <button
                                onClick={handleConfirmTravel}
                                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showErrorPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-custom font-bold mb-4">Error</h3>
                        <p className="font-custom mb-4">{errorMessage}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowErrorPopup(false)}
                                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
