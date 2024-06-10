import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Outlet/>
      <footer className="bg-realBack font-custom text-white flex justify-center">Wrench Monkey Senior Project 2024</footer>
    </>
  )
}

export default App
