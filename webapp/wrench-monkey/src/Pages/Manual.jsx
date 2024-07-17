import React from 'react';
import registerImage from '../../src/assets/manual/register.png';
import adminDashboardImage from '../../src/assets/manual/admin.png';
import userDashboardImage from '../../src/assets/manual/user.png';

import addToolImage from '../../src/assets/manual/addTool.png';
import editToolImage from '../../src/assets/manual/editTool.png';
import checkOutToolsImage from '../../src/assets/manual/checkout.png';
import checkInToolsImage from '../../src/assets/manual/checkin.png';

import jobCheckoutImage from '../../src/assets/manual/jobs.png';
import newJobImage from '../../src/assets/manual/addJob.png';
import editJobImage from '../../src/assets/manual/editJob.png';
import jobCheckoutConfirmImage from '../../src/assets/manual/jobCheckout.png';

import requestStationImage from '../../src/assets/manual/travel.png';
import robotTravelingImage from '../../src/assets/manual/traveling.png';

import toolHistoryImage from '../../src/assets/manual/history.png';
import trackSetupImage from '../../src/assets/manual/track.jpg';

const Manual = () => {
    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen text-white">
            <div className="container mx-auto py-8 px-4 min-w-[1280px]">
                <h1 className="text-5xl font-bold mb-8 font-custom text-center">User Manual</h1>
                <p className="text-lg font-custom mb-8 text-center">
                    The following manual will provide instructions on how to operate the Wrench Monkey website, along with the toolbox itself.
                </p>

                {/* Section List */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold mb-4 font-custom text-center">Sections</h2>
                    <ul className="list-disc list-inside text-lg font-custom text-center">
                        <li><a href="#creating-account" className="text-blue-400 hover:underline">Creating an Account</a></li>
                        <li><a href="#using-admin-account" className="text-blue-400 hover:underline">Using an Admin Account</a></li>
                        <li><a href="#using-user-account" className="text-blue-400 hover:underline">Using a Standard User Account</a></li>
                        <li><a href="#setting-up-track" className="text-blue-400 hover:underline">Setting up the Track</a></li>
                    </ul>
                </div>

                {/* Section: Creating an Account */}
                <div id="creating-account" className="mb-24 bg-gray-900 py-8">
                    <h2 className="text-4xl font-bold mb-8 font-custom text-center underline">Creating an Account</h2>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-20 ">
                            <p className="text-lg font-custom ml-10 mr-10">
                                To create an account, go to the website registration page <a href="http://wrenchmonkey.life/register" className="text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">HERE</a>. The following login prompt will appear to fill out name, toolbox number, email, and password. Once an account has been created, the website will automatically redirect to the login page to login to their new account.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={registerImage} alt="Website Registration Page" className="w-full h-auto rounded-lg" style={{ maxWidth: '400px' }} />
                        </div>
                    </div>
                </div>

                {/* Section: Using an Admin Account */}
                <div id="using-admin-account" className="mb-24 bg-gray-800 py-8">
                    <h2 className="text-4xl font-bold mb-8 font-custom text-center underline">Using an Admin Account</h2>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4">
                            <img src={adminDashboardImage} alt="Admin Account Dashboard" className="w-full h-auto rounded-lg mb-8" />
                        </div>
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 flex justify-center ml-10 mr-10">
                                The first user to create an account will have access to an admin account. This account will have unique functionalities such as the ability to create, edit, and delete tools and jobs. The admin dashboard is shown above.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-custom text-center">Creating and Editing Tools</h3>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                To create a new tool, select the “Add Tool” button that is located at the top of the leftmost “Tools” column. That will bring up the following prompt, which will ask for a tool name and a slot number.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={addToolImage} alt="Add Tool Screen" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '500px' }} />
                        </div>
                        
                        
                    </div>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={editToolImage} alt="Add Tool Screen" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '500px' }} />
                        </div>
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                Selecting the “Edit” option next to an existing job will provide the option to change the name or the tool slot, and selecting “Remove” will remove the tool.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-custom text-center">Creating and Editing Jobs</h3>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                Jobs can be created through the admin account to help streamline processes within the workspace. If there is a task that is often completed that needs a specific set of tools, a job can be created, which will request all the required tools at once and save the employee time. When the “Create Job” button is pressed, the following prompt will appear to name a job and select the required tools from the list.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={newJobImage} alt="New Job Prompt" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '500px' }} />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={editJobImage} alt="New Job Prompt" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '500px' }} />
                        </div>
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                            If “Edit” is selected, a prompt will appear similar to the new job prompt, which allows the name of the job to be changed, and for tools to be added to or removed from the job.                         If the “Remove” option is selected next to an existing job, that job will disappear for all users. 
                            </p>
                        </div>
                        
                    </div>
                </div>

                {/* Section: Using a Standard User Account */}
                <div id="using-user-account" className="mb-24 bg-gray-900 py-8">
                    <h2 className="text-4xl font-bold mb-8 font-custom text-center underline">Using a Standard User Account</h2>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                A standard user account is used to request tools. It is also used to request the toolbox to travel to different stations. The dashboard is shown below.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={userDashboardImage} alt="Standard User Account Dashboard" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '700px' }} />
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-custom text-center">Calling to a Workstation</h3>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={requestStationImage} alt="Requesting a Station" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '250px' }} />
                            <img src={robotTravelingImage} alt="Robot Moving to a Station" className="w-full h-auto rounded-lg mb-8 ml-20" style={{ maxWidth: '250px' }} />
                        </div>
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                To request the toolbox to travel to a specific workstation, scroll to the bottom of the center column. The current station is listed there, as well as a bar that is either red or green to signify if the toolbox is in motion. There are three buttons, labeled Station A through C. This section is shown on the left. Select the desired station, and the “Traveling” bar will turn green and a spinning gear appears on the track to show that the toolbox is in motion. An “Emergency Stop” Button also appears to quickly stop the toolbox if needed. An image of the screen when the toolbox is moving is shown on the right.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-custom text-center">Checking Out Tools</h3>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                To check out a tool, navigate to the far left column to the “Tools” column. All the available tools will be listed there, and they will be highlighted green with a “Check Out” option if they are available, and red with a “Check In” option if they are not. Select the required tool, and then open the toolbox drawer. The LEDs located beneath the tool label will turn green to highlight the requested tool. After removing the tool, the LEDs will turn red before turning off. The tool name on the website will also change from green to red, and the “Check In” option will appear.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={checkOutToolsImage} alt="Checking Out Tools" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '400px' }} />
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-custom text-center">Checking Out Jobs</h3>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={jobCheckoutImage} alt="Job Checkout" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '400px' }} />
                        </div>
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                To check out a job, navigate to the leftmost column and scroll down to the “Jobs” section. In this section, all of the available jobs will be listed as shown below.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                After selecting the job, the following prompt will appear. This will list the different tools that are included in that job, and ask for confirmation. After confirming, the LEDs that correspond to the first requested tool on the list will turn green until that tool has been removed from the drawer. After it has been removed, the LEDs will turn red, and the LEDs for the next tool will turn green. This will occur for each subsequent tool within that job until all tools have been removed from the drawer.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={jobCheckoutConfirmImage} alt="Job Checkout Confirmation" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '600px' }} />
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-custom text-center">Checking In Tools</h3>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={checkInToolsImage} alt="Checking In Tools" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '400px' }} />
                        </div>
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                To return a tool to the toolbox, navigate to the same section of the website. Similarly to checking out a tool, select the “Check In” button. This will turn the LED within the drawer red to show the correct placement for the tool. For the tools that are detected via RFID sensors, placing the incorrect tool in the slot will cause the LEDs to flicker between blue and red until it has been removed. They will then turn back to red. Once the tool is replaced, the LEDs will turn green, and then off. The tool name on the website will also turn green, and the “Check In” option will change to “Check Out.”
                            </p>
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-custom text-center">Viewing History</h3>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                To quickly locate specific tools or user actions, navigate to the History section of the dashboard. You can type in any keyword related to the tool or user, and the system will automatically filter the history box to show relevant results. The tools are organized by their check-in/check-out times or the last modified date, ensuring the most recent activities are displayed first. This feature makes it easy to track tool usage and manage inventory efficiently.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={toolHistoryImage} alt="Checking In Tools" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '400px' }} />
                        </div>
                    </div>
                </div>

                {/* Section: Setting up the Track */}
                <div id="setting-up-track" className="mb-24 bg-gray-800 py-8">
                    <h2 className="text-4xl font-bold mb-8 font-custom text-center underline">Setting up the Track</h2>
                    <div className="flex flex-col md:flex-row items-center mb-8">
                        <div className="md:w-1/2 p-4">
                            <p className="text-lg font-custom mb-4 ml-10 mr-10">
                                To set up the track, all that is needed is a surface that is white and a thin black trace on top of the white surface. This can be done by placing printed sheets of paper with a black track on them, or by placing an electrical tape path between workstations. At each workstation, the appropriate RFID card should be placed underneath the line so the toolbox knows where each station is located.
                            </p>
                        </div>
                        <div className="md:w-1/2 p-4 flex justify-center">
                            <img src={trackSetupImage} alt="Printed Line-Following Path" className="w-full h-auto rounded-lg mb-8" style={{ maxWidth: '600px' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 w-full py-4 text-center">
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
    );
}

export default Manual;
