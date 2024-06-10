import React from 'react';
import Button from '../components/Button';
import robot from '../../src/assets/logo.jpg';

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
                        <h1 className="text-5xl font-bold mb-4 font-custom">Senior Design UCF</h1>
                        <p className="text-lg font-custom">
                            This is a description of our project. Here we can explain the purpose, features, and other
                            details about the robot and the project. Make sure to provide enough information to engage
                            your audience and give them a clear understanding of what your project is about.
                        </p>
                    </div>
                </div>

                {/* Banner */}
                <div className="mt-8 bg-gray-800 py-4 text-center font-custom">
                    <p className="text-xl mb-2">Already have a monkey?</p>
                    <Button href="/login" text="Go To Manager" />
                </div>
            </div>
        </div>
    );
}

export default Home;
