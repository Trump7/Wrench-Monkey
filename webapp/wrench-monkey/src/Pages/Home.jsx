import React, { useState } from 'react';
import Button from '../components/Button';
import robot from '../../src/assets/roboto.png';
import appImage from '../../src/assets/phone.png'; // Replace with the actual path to your app image

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDownloadClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen text-white">
            <div className="container mx-auto py-8 px-4 min-w-[1280px]">
                {/* Two Columns */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
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

                {/* Divider */}
                <div className="border-t-2 border-gray-600 my-8"></div>

                {/* New Section: Android App Advertisement */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 bg-gray-900 p-6 rounded-lg">
                    {/* Left Column: Title and Description */}
                    <div className="md:w-1/2 p-20 font-custom">
                        <h2 className="text-6xl font-bold mb-4 font-custom">Check out our Android App!</h2>
                        <p className="text-lg font-custom mb-2">
                            Our app is designed for users only, offering all the features available on the website, but on a smaller screen! Tested on Android 9 and up.
                        </p>
                        <Button text="Download APK" onClick={handleDownloadClick} />
                    </div>

                    {/* Right Column: App Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <img src={appImage} alt="App screenshot" className="w-full h-auto max-w-xs transform scale-90" />
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-gray-600 my-8"></div>

                {/* Footer: GitHub Repositories */}
                <div className="bg-gray-800 w-full py-4 text-center rounded-lg">
                    <p className="text-lg mb-2 font-custom">
                        As part of our Senior Design project, we decided to make this project completely open source.
                    </p>
                    <p className="text-lg mb-2 font-custom">
                        Check out the repositories on GitHub:
                    </p>
                    <p className="text-lg">
                        <a href="https://github.com/Trump7/Wrench-Monkey" className="font-custom text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Website Repository</a>
                        <span className="mx-4">|</span>
                        <a href="https://github.com/Trump7/Wrench-Monkey-App" className="font-custom text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">App Repository</a>
                    </p>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg max-w-md mx-auto text-black">
                        <h2 className="text-2xl font-bold mb-4 underline">Important Notice</h2>
                        <p className="mb-4">
                            The app is not available on the Play Store. You are welcome to scan it with Google's app scanner during installation.
                        </p>
                        <p className="mb-4">
                            Please note that you must enable the option to install apps from unknown sources in your developer settings.
                        </p>
                        <div className="flex justify-end font-custom">
                            <Button text="Close" onClick={closeModal} />
                            <a href="../../src/assets/WrenchMonkey.apk" download className="ml-4">
                                <Button text="Download APK" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
