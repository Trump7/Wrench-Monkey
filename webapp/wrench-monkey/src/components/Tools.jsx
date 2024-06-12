import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import config from '../config';

const Tools = () => {
    const [tools, setTools] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showRemovePopup, setShowRemovePopup] = useState(false);
    const [newTool, setNewTool] = useState({
        name: '',
        status: '',
        rfid: '',
        slot: ''
    });
    const [toolToRemove, setToolToRemove] = useState(null);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await axios.get(`${config.apiURL}/tools`);
                setTools(response.data);
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };
        fetchTools();
    }, []);

    const handleAddTool = async () => {
        try {
            const response = await axios.post(`${config.apiURL}/tools`, newTool);
            setTools([...tools, response.data]);
            setNewTool({ name: '', status: '', rfid: '', slot: '' });
            setShowAddPopup(false);
        } catch (error) {
            console.error('Error adding tool:', error);
        }
    };

    const handleRemoveTool = async () => {
        if (!toolToRemove) {
            console.error('No tool selected for removal');
            return;
        }

        try {
            await axios.delete(`${config.apiURL}/tools/${toolToRemove}`);
            setTools(tools.filter(tool => tool.id !== toolToRemove));
            setShowRemovePopup(false);
            setToolToRemove(null); // Clear the selected tool to remove
        } catch (error) {
            console.error('Error removing tool:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTool(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2 className="bg-gray-700 p-4 rounded-lg mb-4 text-white font-custom font-bold text-center text-2xl">Tools</h2>
            <div className="flex justify-center mb-6">
                <div className="flex justify-center w-full">
                    <button
                        onClick={() => setShowAddPopup(true)}
                        className="font-custom flex-grow bg-gray-700 hover:bg-gray-900 text-white py-2 px-7 rounded mx-1"
                    >
                        Add Tool
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {tools.map(tool => (
                    <div key={tool.id} className={`rounded-lg ${tool.status === '1' ? 'bg-green-500' : 'bg-red-500'} p-4 text-white flex justify-between items-center font-custom`}>
                        <span>{tool.name}</span>
                        <button className="font-custom bg-gray-700 hover:bg-gray-900 text-white text-sm py-2 px-1 rounded">
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                setToolToRemove(tool.id);
                                setShowRemovePopup(true);
                            }}
                            className="font-custom bg-gray-700 hover:bg-gray-900 text-white text-sm py-2 px-1 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            {showAddPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-bold mb-4">Add New Tool</h3>
                        <input type="text" name="name" value={newTool.name} onChange={handleChange} placeholder="Enter tool name" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                        <input type="text" name="status" value={newTool.status} onChange={handleChange} placeholder="Enter tool status" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                        <input type="text" name="rfid" value={newTool.rfid} onChange={handleChange} placeholder="Enter tool RFID" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                        <input type="text" name="slot" value={newTool.slot} onChange={handleChange} placeholder="Enter tool slot" className="border border-gray-300 rounded-md p-2 mb-4 w-full"/>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowAddPopup(false)}
                                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddTool}
                                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showRemovePopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-bold mb-4">Are you sure you would like to remove this item?</h3>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowRemovePopup(false)}
                                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
                            >
                                No
                            </button>
                            <button
                                onClick={handleRemoveTool}
                                className="font-custom bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tools;
