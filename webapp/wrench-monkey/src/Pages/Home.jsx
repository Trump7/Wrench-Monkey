import React from 'react';
import Button from '../components/Button';
import robot from '../../src/assets/roboto.png';

const Home = () => {
    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen text-white">
            <div className="container mx-auto py-8 px-4">
                {/* Two Columns */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Left Column: Robot Image */}
                    <div className="md:w-1/2 p-4">
                        <img src={robot} alt="Robot prototype drawing" className="w-full h-auto" />
                    </div>

                    {/* Right Column: Title and Description */}
                    <div className="md:w-1/2 p-4">
                        <h1 className="text-5xl font-bold mb-4 font-custom">UCF Senior Design</h1>
                        <p className="text-lg font-custom">
                        For decades, robotics have transformed industries by automating tasks and enhancing efficiency. 
                        Our project aims to improve tool management in the shared workspaces by creating a smart toolbox called the Wrench Monkey. 
                        It has two main functions, tool transportation and identification. Through this website, the toolbox can be called 
                        to individual work stations, as well as identify the requested tool to make tool selection and return efficient.
                        </p>
                    </div>
                </div>

                {/* Banner */}
                <div className="mt-8 bg-gray-800 py-4 text-center font-custom">
                    <p className="text-xl mb-2">Already have a monkey?</p>
                    <Button to="/login" text="Go To Manager" />
                </div>
            </div>
        </div>
    );
}

export default Home;
