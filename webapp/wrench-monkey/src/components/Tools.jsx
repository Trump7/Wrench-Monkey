import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const Tools = () => {
    const [tools, setTools] = useState([]);

    useEffect(() => {
        const fetchTools = async () => {
            const response = await axios.get('http://localhost:5000/api/tools');
            setTools(response.data);
        };
        fetchTools();
    }, []);

    return (
        <div>
            <h2 className="bg-gray-700 p-4 rounded-lg mb-4 text-white font-custom font-bold text-center text-2xl">Tools</h2>
            <div className="flex justify-center mb-6">
                <div className="flex justify-center w-full">
                    <button className="font-custom flex-grow bg-gray-700 hover:bg-gray-900 text-white py-2 px-7 rounded mx-1">
                        Add Tool
                    </button>
                    <button className="font-custom flex-grow bg-gray-700 hover:bg-gray-900 text-white py-2 px-3 rounded mx-1">
                        Remove Tool
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {tools.map(tool => (
                    <div key={tool.id} className={`rounded-lg ${tool.status === '1' ? 'bg-green-500' : 'bg-red-500'} p-4 text-white flex justify-between items-center font-custom`}>
                        <span>{tool.name}</span>
                        <button className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tools;
