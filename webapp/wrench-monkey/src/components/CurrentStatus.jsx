import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const CurrentStatus = () => {
    const [status, setStatus] = useState([]);

    useEffect(() => {
        const fetchStatus = async () => {
            const response = await axios.get('http://localhost:5000/api/status');
            setStatus(response.data);
        };
        fetchStatus();
    }, []);

    return (
        <div>
            <h2 className="bg-gray-700 p-4 rounded-lg mb-4 text-white font-custom text-center text-2xl">Current Status</h2>
            {/* <div className="flex justify-center mb-7">
                <div className="flex space-x-4">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded">
                        Update Status
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded">
                        Edit Status
                    </button>
                </div>
            </div> */}
            <ul>
                {status.map(statusItem => (
                    <li key={statusItem.id} className="text-white">{statusItem.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default CurrentStatus;
