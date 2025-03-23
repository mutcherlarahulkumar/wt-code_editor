import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

import HomePage from './pages/HomePage'
import Codes from './pages/Codes'

function App() {

  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mycodes" element={<Codes />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
