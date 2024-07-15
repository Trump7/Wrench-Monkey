import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import config from '../config';
import './custom-scrollbar.css';
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
  const [newTool, setNewTool] = useState({name: '',slot: ''});
  const [toolToRemove, setToolToRemove] = useState(null);
  const [toolToEdit, setToolToEdit] = useState({id: null,name: '',slot: ''});
  
  //jobs variables
  const [jobs, setJobs] = useState([]);
  const [showAddJobPopup, setShowAddJobPopup] = useState(false);
  const [showRemoveJobPopup, setShowRemoveJobPopup] = useState(false);
  const [showEditJobPopup, setShowEditJobPopup] = useState(false);  
  const [showCheckoutJobPopup, setShowCheckoutJobPopup] = useState(false);
  const [checkoutJob, setCheckoutJob] = useState(null);
  const [newJob, setNewJob] = useState({name: '',tools: []});
  const [jobToRemove, setJobToRemove] = useState(null);
  const [jobToEdit, setJobToEdit] = useState({id: null,name: '',tools: []});

  //robot status
  const [status, setStatus] = useState(null);

  const fetchInitialStatus = async () => {
    try {
        const response = await axios.get(`${config.apiURL}/status`);
        setStatus(prevStatus => ({
            ...response.data,
            lastChecked: new Date().toISOString()
        }));
    } catch (error) {
        console.error('Error fetching initial status:', error);
    }
};


  const fetchTools = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/tools`);
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching initial status:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${config.apiURL}/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  

  useEffect(() => {
    fetchTools();
    fetchJobs();
    fetchInitialStatus();  // Fetch initial status

    const cleanupEventSource = eventSourceManager((newStatus) => {
        setStatus(prevStatus => ({
            ...newStatus,
            lastChecked: new Date().toISOString()
        }));
    }, setTools);

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

  const handleAddJob = async () => {
    if (newJob.tools.length < 2 || newJob.tools.length > 4) {
      setErrorMessage('A job must have between 2 and 4 tools.');
      setShowAddJobPopup(false);
      setShowErrorPopup(true);
      return;
    }
    try {
      await axios.post(`${config.apiURL}/jobs`, newJob);
      setNewJob({ name: '', tools: [] });
      setShowAddJobPopup(false);
      fetchJobs();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  

  const handleRemoveTool = async () => {
    try {
      await axios.delete(`${config.apiURL}/tools/${toolToRemove}`);
      setShowRemovePopup(false);
      setToolToRemove(null);
    } catch (error) {
      console.error('Error removing tool:', error);
      setErrorMessage('Error removing job.');
      setShowErrorPopup(true);
    }
  };

  const handleRemoveJob = async () => {
    try {
      await axios.delete(`${config.apiURL}/jobs/${jobToRemove}`);
      setShowRemoveJobPopup(false);
      setJobToRemove(null);
      fetchJobs();
    } catch (error) {
      console.error('Error removing job:', error);
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

  const handleEditJob = async () => {
    if (!jobToEdit.name.trim()) {
      setErrorMessage('Job name cannot be blank.');
      setShowEditJobPopup(false);
      setShowErrorPopup(true);
      return;
    }
  
    if (jobToEdit.tools.length < 2) {
      setErrorMessage('A job must have at least two tools.');
      setShowEditJobPopup(false);
      setShowErrorPopup(true);
      return;
    }
  
    try {
      const { id, name, tools } = jobToEdit;
      const updatedJob = { name, tools: tools.map(tool => typeof tool === 'object' ? tool._id : tool) };
  
      await axios.put(`${config.apiURL}/jobs/${id}`, updatedJob);
      setShowEditJobPopup(false);
      setJobToEdit({ id: null, name: '', tools: [] });
      fetchJobs();
    } catch (error) {
      console.error('Error editing job:', error);
      setErrorMessage('Error editing job.');
      setShowErrorPopup(true);
    }
  };
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTool(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleToolSelection = (toolId) => {
    setNewJob(prevState => ({
      ...prevState,
      tools: prevState.tools.includes(toolId)
        ? prevState.tools.filter(id => id !== toolId)
        : [...prevState.tools, toolId]
    }));
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setToolToEdit(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditJobChange = (e) => {
    const { name, value } = e.target;
    console.log('Before update:', jobToEdit);
    setJobToEdit(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log('After update:', jobToEdit);
  };
  

  const handleEditToolSelection = (toolId) => {
    console.log(`Toggling tool selection for tool ID: ${toolId}`);
  
    setJobToEdit(prevState => {
      // Create an array of tool IDs (handling both object and ID cases)
      const toolIds = prevState.tools.map(tool => typeof tool === 'object' ? tool._id : tool);
  
      const updatedTools = toolIds.includes(toolId)
        ? toolIds.filter(id => id !== toolId)  // Remove the tool if already selected
        : [...toolIds, toolId];                // Add the tool if not already selected
  
      console.log('Updated tools:', updatedTools);
      return {
        ...prevState,
        tools: updatedTools
      };
    });
  };
  
  
  

  const handleOpenEditJobPopup = (job) => {
    console.log('Opening edit job popup with job:', job);
    setJobToEdit({ id: job._id, name: job.name, tools: [...job.tools] });
    setShowEditJobPopup(true);
  };
  

  const handleCheckout = async (toolId) => {
    if (!status?.isConnected) {
      setErrorMessage('Cannot check out tool. Robot is not connected.');
      setShowErrorPopup(true);
      return;
    }
    
    const tool = tools.find(t => t._id === toolId);
    if (tool.status !== '1') {
      setErrorMessage('Tool is not available for checkout.');
      setShowErrorPopup(true);
      return;
    }
    setCheckoutTool(tool);
    setShowCheckoutPopup(true);
  };

  const handleCheckoutJob = async (jobId) => {
    if (!status?.isConnected) {
      setErrorMessage('Cannot check out tool. Robot is not connected.');
      setShowErrorPopup(true);
      return;
    }

    const job = jobs.find(j => j._id === jobId);
    
    // Debugging logs
    console.log('Job tools:', job.tools);

    if (job.tools.some(tool => tool.status !== '1')) {
      setErrorMessage('One or more tools are not available for checkout.');
      setShowErrorPopup(true);
      return;
    }
  
    setCheckoutJob({ jobId, tools: job.tools });
    setShowCheckoutJobPopup(true);
  };

  const confirmCheckoutJob = async () => {
    const { jobId, tools } = checkoutJob;

    try {
      const userId = getUserId();
      const timestamp = new Date().toISOString();
      await axios.post(`${config.apiURL}/jobs/checkout`, { jobId, userId, timestamp });
      // fetchTools();
      // fetchJobs();
      setShowCheckoutJobPopup(false);
      setCheckoutJob(null);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error checking out job.');
      setShowErrorPopup(true);
    }
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
    <div className="h-screen min-h-[750px] flex flex-col">
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
      <h2 className="bg-gray-700 p-4 rounded-lg mt-8 mb-4 text-white font-custom font-bold text-center text-2xl">Jobs</h2>
      {admin && (
        <div className="flex justify-center mb-6">
          <div className="flex justify-center w-full">
            <button
              onClick={() => setShowAddJobPopup(true)}
              className="font-custom flex-grow bg-gray-700 hover:bg-gray-900 text-white py-2 px-7 rounded mx-1">
              Add Job
            </button>
          </div>
        </div>
      )}
      <div className="flex-grow overflow-y-auto custom-scrollbar mb-5">
        <div className="grid grid-cols-1 gap-4">
          {jobs.map(job => (
            <div key={job._id} className="rounded-lg bg-gray-700 p-4 text-white flex justify-between items-center font-custom">
              <span>{job.name}</span>
              {admin ? (
                <>
                  <button
                    onClick={() => handleOpenEditJobPopup(job)}
                    className="font-custom bg-gray-700 hover:bg-gray-900 text-white text-sm py-2 px-1 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setJobToRemove(job._id);
                      setShowRemoveJobPopup(true);
                    }}
                    className="font-custom bg-gray-700 hover:bg-gray-900 text-white text-sm py-2 px-1 rounded">
                    Remove
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleCheckoutJob(job._id)}
                  className="font-custom bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-1 rounded">
                  Check Out Job
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {showCheckoutPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
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
      {showAddJobPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-bold mb-4 font-custom">Add New Job</h3>
            <input type="text" name="name" value={newJob.name} onChange={handleJobChange} placeholder="Enter job name" className="font-custom border border-gray-300 rounded-md p-2 mb-4 w-full" />
            <h4 className="text-md font-bold mb-2 font-custom">Select Tools (2-4)</h4>
            <div className="grid grid-cols-1 gap-2 mb-4">
              {tools.map(tool => (
                <label key={tool._id} className="font-custom flex items-center">
                  <input
                    type="checkbox"
                    value={tool._id}
                    onChange={() => handleToolSelection(tool._id)}
                    className="mr-2"
                    checked={newJob.tools.includes(tool._id)}
                  />
                  <span>{tool.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddJobPopup(false)}
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                Cancel
              </button>
              <button
                onClick={handleAddJob}
                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showRemoveJobPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-bold mb-4 font-custom">Are you sure you would like to remove this job?</h3>
            <div className="flex justify-end">
              <button
                onClick={() => setShowRemoveJobPopup(false)}
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                No
              </button>
              <button
                onClick={handleRemoveJob}
                className="font-custom bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditJobPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-bold mb-4 font-custom">Edit Job</h3>
            <input type="text" name="name" value={jobToEdit.name} onChange={handleEditJobChange} placeholder="Enter job name" className="font-custom border border-gray-300 rounded-md p-2 mb-4 w-full" />
            <h4 className="text-md font-bold mb-2 font-custom">Select Tools (2-4)</h4>
            <div className="grid grid-cols-1 gap-2 mb-4">
              {tools.map(tool => (
                <label key={tool._id} className="font-custom flex items-center">
                  <input
                    type="checkbox"
                    value={tool._id}
                    onChange={() => handleEditToolSelection(tool._id)}
                    className="mr-2"
                    checked={jobToEdit.tools.some(id => (typeof id === 'object' ? id._id : id) === tool._id)}
                  />
                  <span>{tool.name}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowEditJobPopup(false)}
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                Cancel
              </button>
              <button
                onClick={handleEditJob}
                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {showCheckoutJobPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-custom font-bold mb-4">Confirm Checkout Job</h3>
            <p className="font-custom mb-4">Are you sure you want to check out this job with the following tools?</p>
            <ul className="mb-4">
              {checkoutJob.tools.map(tool => (
                <li key={tool._id} className="font-custom">{tool.name}</li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCheckoutJobPopup(false)}
                className="font-custom bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4">
                No
              </button>
              <button
                onClick={confirmCheckoutJob}
                className="font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
