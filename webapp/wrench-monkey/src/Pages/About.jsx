import React from 'react';

const teamMembers = [
    {
        name: 'Matthew Trump',
        role: 'Website and App Design, Software Design, Communication between Website and Project, Software Troubleshooting',
        degree: 'Computer Engineering',
        description: 'Matthew Trump is an aspiring computer engineering major at UCF. His interests include C, C++, Java, and JavaScript programming as well as tinkering with arduinos and other microcontrollers. Beyond his major, he enjoys gardening, building Legos, and video games. He is set to graduate from UCF the Summer of 2024.',
        image: '../../src/assets/matt-t.jpg'
    },
    {
        name: 'William Wandelt',
        role: 'PCB Design and Assembly, Power System Design, Hardware Troubleshooting',
        degree: 'Electrical Engineering',
        description: 'William Wandelt is an electrical engineering student at UCF, with deep interests in analog and digital circuit design. He will be graduating in Summer 2024, working as a hardware engineer for Ford.',
        image: '../../src/assets/will-w.png'
    },
    {
        name: 'Rachel Sak',
        role: 'PCB Design, Tool Detection Subsystem, Hardware Troubleshooting',
        degree: 'Electrical Engineering',
        description: 'Rachael Sak is an electrical engineering major at the University of Central Florida. She will graduate in August of 2024 with a Bachelors degree. From there she plans on going to work for Naval Nuclear Laboratories.',
        image: '../../src/assets/rach-s.png'
    },
    {
        name: 'Matthew Crespo',
        role: 'PCB Design, Motor Controls, Line Following Functionality, Hardware Troubleshooting',
        degree: 'Electrical Engineering',
        description: 'Matthew Crespo is an electrical engineering major at the University of Central Florida (UCF). He has great interest in areas such as controls, artificial intelligence, signal processing, and most math/physics related topics. He will be graduating from UCF the Summer of 2024 and will continue to attend UCF for his PhD in Electrical Engineering.',
        image: '../../src/assets/matt-c.png'
    },
];

const About = () => {
    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen text-white">
            <div className="min-w-[1280px] container mx-auto py-8 px-4">
                {teamMembers.map((member, index) => (
                    <div key={index} className={`flex flex-col md:flex-row items-center justify-center mb-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="md:w-1/3 p-4 flex justify-center max-w-xs">
                            <img src={member.image} alt={`${member.name}`} className="w-full h-auto rounded-lg" />
                        </div>
                        <div className="md:w-2/3 p-4 flex flex-col items-center md:items-start">
                            <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
                            <h3 className="text-xl mb-1">{member.role}</h3>
                            <p className="text-lg italic mb-2">{member.degree}</p>
                            <p className="text-lg text-center md:text-left">{member.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
