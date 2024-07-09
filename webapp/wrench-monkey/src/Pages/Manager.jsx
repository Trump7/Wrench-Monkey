import React from 'react';
import Tools from '../components/Tools';
import CurrentStatus from '../components/CurrentStatus';
import History from '../components/History';
import '../index.css';

const Manager = () => {
    return (
        <div className="bg-[#00001B] min-h-screen flex flex-col items-center pt-5 pb-20">
            <div className="flex justify-between items-start space-x-8 w-full max-w-7xl">
                <div className="bg-gray-500 p-4 rounded-lg w-1/3 h-screen">
                    <Tools admin = {true}/>
                </div>
                <div className="bg-gray-500 p-4 rounded-lg w-1/3 h-screen">
                    <CurrentStatus />
                </div>
                <div className="bg-gray-500 p-4 rounded-lg w-1/3 h-screen">
                    <History />
                </div>
            </div>
        </div>
    );
};

export default Manager;
