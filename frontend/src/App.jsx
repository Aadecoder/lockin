import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
