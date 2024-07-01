import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import config from '../config';
import { getUserId } from '../utilities/auth';
import { eventSourceManager } from '../utilities/eventSource';


const Tools = ({ admin }) => {
  const [tools, setTools] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [checkoutTool, setCheckoutTool] = useState(null);
  const [showCheckinPopup, setShowCheckinPopup] = useState(false);
  const [checkinTool, setCheckinTool] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [newTool, setNewTool] = useState({
    name: '',
    slot: ''
  });
  const [toolToRemove, setToolToRemove] = useState(null);
  const [toolToEdit, setToolToEdit] = useState({
    id: null,
    name: '',
    slot: ''
  });

  const fetchTools = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/tools`);
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching initial status:', error);
    }
  };

  useEffect(() => {
    fetchTools(); // Fetch initial tools

    const cleanupEventSource = eventSourceManager(() => {}, setTools, () => {}); // Only setTools handler

    return () => {
        cleanupEventSource();
    };
}, []);

  const handleAddTool = async () => {
    if (tools.length >= 4) {
      setErrorMessage('Cannot add more than 4 tools.');
      setShowAddPopup(false);
      setShowErrorPopup(true);
      return;
    }
    if (tools.some(tool => tool.slot === newTool.slot)) {
      setErrorMessage(`Slot number ${newTool.slot} is already occupied.`);
      setShowAddPopup(false);
      setShowErrorPopup(true);
      return;
    }
    try {
      await axios.post(`${config.apiURL}/tools`, { ...newTool, status: 0, rfid: 0 });
      setNewTool({ name: '', slot: '' });
      setShowAddPopup(false);
    } catch (error) {
      console.error('Error adding tool:', error);
    }
  };

  const handleRemoveTool = async () => {
    try {
      await axios.delete(`${config.apiURL}/tools/${toolToRemove}`);
      setShowRemovePopup(false);
      setToolToRemove(null);
    } catch (error) {
      console.error('Error removing tool:', error);
    }
  };

  const handleEditTool = async () => {
    if (tools.some(tool => tool.slot === toolToEdit.slot && tool._id !== toolToEdit.id)) {
      setErrorMessage(`Slot number ${toolToEdit.slot} is already occupied.`);
      setShowEditPopup(false);
      setShowErrorPopup(true);
      return;
    }
    try {
      const { id, ...updatedTool } = toolToEdit;
      await axios.put(`${config.apiURL}/tools/${id}`, { ...updatedTool, status: null, rfid: null });
      setShowEditPopup(false);
      setToolToEdit({ id: null, name: '', slot: '' });
    } catch (error) {
      console.error('Error editing tool:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTool(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setToolToEdit(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckout = async (toolId) => {
    const tool = tools.find(t => t._id === toolId);
    if (tool.status !== '1') {
      setErrorMessage('Tool is not available for checkout.');
      setShowErrorPopup(true);
      return;
    }
    setCheckoutTool(tool);
    setShowCheckoutPopup(true);
  };

  const confirmCheckout = async () => {
    try {
      const userId = getUserId();
      await axios.post(`${config.apiURL}/tools/checkout`, {
        toolId: checkoutTool._id,
        userId,
        timestamp: new Date().toISOString()
      });

      setShowCheckoutPopup(false);
      setCheckoutTool(null);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error checking out tool.');
      setShowErrorPopup(true);
    }
  };

// lets do check in!
  const handleCheckin = async (toolId) => {
    const tool = tools.find(t => t._id === toolId);
    if (tool.status !== '0') {
      setErrorMessage('Tool is not available for checkout.');
      setShowErrorPopup(true);
      return;
    }
    setCheckinTool(tool);
    setShowCheckinPopup(true);
  };

  const confirmCheckin = async () => {
    try {
      const userId = getUserId();
      await axios.post(`${config.apiURL}/tools/checkin`, {
        toolId: checkinTool._id,
        userId,
        timestamp: new Date().toISOString()
      });

      setShowCheckinPopup(false);
      setCheckinTool(null);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error checking out tool.');
      setShowErrorPopup(true);
    }
  };

  const availableSlots = [1, 2, 3, 4];

  return (
    <div>
      <h2 className="bg-gray-700 p-4 rounded-lg mb-4 text-white font-custom font-bold text-center text-2xl">Tools</h2>
      {admin && (
        <div className="flex justify-center mb-6">
          <div className="flex justify-center w-full">
            <button
              onClick={() => setShowAddPopup(true)}
              className="font-custom flex-grow bg-gray-700 hover:bg-gray-900 text-white py-2 px-7 rounded mx-1">
              Add Tool
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {tools.map(tool => (
          <div key={tool._id} className={`rounded-lg ${tool.status === '1' ? 'bg-green-500' : 'bg-red-500'} p-4 text-white flex justify-between items-center font-custom`}>
            <span>{tool.name}</span>
            {admin ? (
              <>
                <button
                  onClick={() => {
                    setToolToEdit({ id: tool._id, name: tool.name, slot: tool.slot });
                    setShowEditPopup(true);
                  }}
                  className="font-custom bg-gray-700 hover:bg-gray-900 text-white text-sm py-2 px-1 rounded">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setToolToRemove(tool._id);
                    setShowRemovePopup(true);
                  }}
                  className="font-custom bg-gray-700 hover:bg-gray-900 text-white text-sm py-2 px-1 rounded">
                  Remove
                </button>
              </>
            ) : (
              tool.status === '1' ? (
              <button
                onClick={() => handleCheckout(tool._id)}
                className="font-custom bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-1 rounded">
                Check Out
              </button>
              ) : (
              <button
                onClick={() => handleCheckin(tool._id)}
                className="font-custom bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-1 rounded">
                Check In
              </button>
              )
            )}
          </div>
        ))}
      </div>
      {showCheckoutPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-custom font-bold mb-4">Confirm Checkout</h3>
            <p className="font-custom mb-4">Are you sure you want to check out this tool?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCheckoutPopup(false)}
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                No
              </button>
              <button
                onClick={confirmCheckout}
                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {showCheckinPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-custom font-bold mb-4">Confirm Checkin</h3>
            <p className="font-custom mb-4">Are you sure you want to check in this tool?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCheckinPopup(false)}
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                No
              </button>
              <button
                onClick={confirmCheckin}
                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Add New Tool</h3>
            <input type="text" name="name" value={newTool.name} onChange={handleChange} placeholder="Enter tool name" className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
            <select name="slot" value={newTool.slot} onChange={handleChange} className="border border-gray-300 rounded-md p-2 mb-4 w-full">
              <option value="" disabled>Select tool slot</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddPopup(false)}
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                Cancel
              </button>
              <button
                onClick={handleAddTool}
                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                No
              </button>
              <button
                onClick={handleRemoveTool}
                className="font-custom bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Edit Tool</h3>
            <input type="text" name="name" value={toolToEdit.name} onChange={handleEditChange} placeholder="Enter tool name" className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
            <select name="slot" value={toolToEdit.slot} onChange={handleEditChange} className="border border-gray-300 rounded-md p-2 mb-4 w-full">
              <option value="" disabled>Select tool slot</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditPopup(false)}
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                Cancel
              </button>
              <button
                onClick={handleEditTool}
                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save Changes
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
    </div>
  );
};

export default Tools;
