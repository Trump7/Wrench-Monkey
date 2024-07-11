import React from 'react';
import Tools from '../components/Tools';
import CurrentStatus from '../components/CurrentStatus';
import History from '../components/History';
import '../index.css';

const UserDashboard = () => {
    return (
        <div className="bg-[#00001B] min-h-screen flex flex-col items-center pt-5 pb-20">
            <div className="flex justify-between items-start space-x-8 w-full max-w-7xl flex-grow">
                <div className="bg-gray-500 p-4 rounded-lg w-1/3 flex-grow min-h-[750px]">
                    <Tools admin={true} /> {/* Pass admin prop to disable edit/delete/add */}
                </div>
                <div className="bg-gray-500 p-4 rounded-lg w-1/3 flex-grow min-h-[750px]">
                    <CurrentStatus />
                </div>
                <div className="bg-gray-500 p-4 rounded-lg w-1/3 flex-grow min-h-[750px]">
                    <History />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
