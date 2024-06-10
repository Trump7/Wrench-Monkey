import React from 'react';

const teamMembers = [
    {
        name: 'Matthew Trump',
        role: 'Unknown Role',
        degree: 'Computer Engineering',
        description: 'To Be Filled.',
        image: '../../src/assets/matt-t.jpg'
    },
    {
        name: 'William Wandelt',
        role: 'Unknown Role',
        degree: 'Electrical Engineering',
        description: 'To Be Filled.',
        image: '../../src/assets/will-w.png'
    },
    {
        name: 'Rachel Sak',
        role: 'Unknown Role',
        degree: 'Electrical Engineering',
        description: 'To Be Filled.',
        image: '../../src/assets/rach-s.png'
    },
    {
        name: 'Matthew Crespo',
        role: 'Unknown Role',
        degree: 'Electrical Engineering',
        description: 'To Be Filled.',
        image: '../../src/assets/matt-c.png'
    },
];

const About = () => {
    return (
        <div style={{ backgroundColor: '#00001B' }} className="min-h-screen text-white">
            <div className="container mx-auto py-8 px-4">
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
