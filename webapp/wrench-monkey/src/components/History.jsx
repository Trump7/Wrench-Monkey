import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const History = () => {
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            const response = await axios.get('http://localhost:5000/api/history');
            setHistory(response.data);
        };
        fetchHistory();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredHistory = history.filter(historyItem =>
        historyItem.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            <ul>
                {filteredHistory.map(historyItem => (
                    <li key={historyItem.id} className="text-white">{historyItem.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default History;
