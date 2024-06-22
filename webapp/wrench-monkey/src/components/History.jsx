import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import config from '../config';

const History = () => {
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyResponse = await axios.get(`${config.apiURL}/history`);

                const formattedHistory = historyResponse.data.map(item => ({
                    ...item,
                    toolName: item.toolId.name || 'Unknown Tool',
                    userName: item.userId.name || 'Unknown User',
                    checkOut: new Date(item.checkOut).toLocaleString(),
                    checkIn: new Date(item.checkIn).toLocaleString()
                }));

                setHistory(formattedHistory);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchHistory();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredHistory = history.filter(historyItem =>
        (historyItem.toolName || 'Unknown Tool').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (historyItem.userName || 'Unknown User').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="bg-gray-700 p-4 rounded-lg mb-4 text-white font-bold font-custom text-center text-2xl">History</h2>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search History"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 gap-4">
                {filteredHistory.map(historyItem => (
                    <div key={historyItem._id} className="rounded-lg bg-gray-700 p-4 text-white font-custom text-sm">
                        <p>Tool: {historyItem.toolName}</p>
                        <p>User: {historyItem.userName}</p>
                        <p>Check Out: {historyItem.checkOut}</p>
                        <p>Check In: {historyItem.checkIn}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
