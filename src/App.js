import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Signup from '../src/Pages/Signup'
import Login from '../src/Pages/Login'

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route exact path='/' element={<Home />} ></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
