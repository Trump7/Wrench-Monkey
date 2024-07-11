import { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-w-[1280px] min-h-[750px] flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <footer className="bg-realBack font-custom text-white flex justify-center">
        Wrench Monkey Senior Project 2024
      </footer>
    </div>
  );
}

export default App;
